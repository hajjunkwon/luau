import type { LuaFactory } from "wasmoon";
import type { RunResult } from "../types";
import { detectUnsupported, transpileLuau } from "./transpile";

const PRELUDE = String.raw`
__output = {}
__warned = false

local function stringify(v)
  local tv = type(v)
  if tv == "nil" then
    return "nil"
  elseif tv == "table" then
    local mt = getmetatable(v)
    if mt and mt.__tostring then
      return tostring(v)
    end
    if v.ClassName then
      return v.ClassName
    end
    return "table"
  end
  return tostring(v)
end

function print(...)
  local n = select("#", ...)
  local parts = {}
  for i = 1, n do
    parts[i] = stringify(select(i, ...))
  end
  __output[#__output + 1] = table.concat(parts, "\t")
end

function warn(...)
  print(...)
end

function typeof(v)
  if type(v) == "table" and type(v.ClassName) == "string" then
    return v.ClassName
  end
  return type(v)
end

local function Signal()
  local listeners = {}
  local sig = {}
  function sig:Connect(fn)
    listeners[#listeners + 1] = fn
    return {
      Disconnect = function() end
    }
  end
  function sig:Fire(...)
    for i = 1, #listeners do
      listeners[i](...)
    end
  end
  return sig
end

Vector3 = {}
Vector3.__index = Vector3
function Vector3.new(x, y, z)
  return setmetatable({
    X = x or 0,
    Y = y or 0,
    Z = z or 0,
    ClassName = "Vector3",
  }, Vector3)
end
function Vector3:__tostring()
  return string.format("%g, %g, %g", self.X, self.Y, self.Z)
end

Color3 = {}
function Color3.new(r, g, b)
  return { R = r or 0, G = g or 0, B = b or 0, ClassName = "Color3" }
end
function Color3.fromRGB(r, g, b)
  return Color3.new((r or 0) / 255, (g or 0) / 255, (b or 0) / 255)
end

BrickColor = {}
function BrickColor.new(name)
  return { Name = name or "Medium stone grey", ClassName = "BrickColor" }
end

local function bindParent(child, parent)
  local prev = rawget(child, "Parent")
  if type(prev) == "table" and type(prev.__children) == "table" then
    local list = prev.__children
    for i = #list, 1, -1 do
      if list[i] == child then
        table.remove(list, i)
      end
    end
  end
  rawset(child, "Parent", parent)
  if type(parent) == "table" and type(parent.__children) == "table" then
    parent.__children[#parent.__children + 1] = child
  end
end

local InstanceMt = {}
InstanceMt.__index = function(self, key)
  if key == "Touched" then
    return rawget(self, "__touched")
  end
  return InstanceMt[key] or rawget(self, key)
end
InstanceMt.__newindex = function(self, key, value)
  if key == "Parent" then
    bindParent(self, value)
    return
  end
  rawset(self, key, value)
end
function InstanceMt:GetChildren()
  local copy = {}
  for i = 1, #self.__children do
    copy[i] = self.__children[i]
  end
  return copy
end
function InstanceMt:FindFirstChild(name)
  for i = 1, #self.__children do
    if self.__children[i].Name == name then
      return self.__children[i]
    end
  end
  return nil
end
function InstanceMt:WaitForChild(name)
  return self:FindFirstChild(name)
end
function InstanceMt:IsA(name)
  return self.ClassName == name
end
function InstanceMt:Destroy()
  bindParent(self, nil)
end
function InstanceMt:__tostring()
  return self.Name
end

Instance = {}
function Instance.new(className)
  local obj = {
    ClassName = className or "Instance",
    Name = className or "Instance",
    Anchored = false,
    CanCollide = true,
    Transparency = 0,
    Size = Vector3.new(4, 1, 2),
    Position = Vector3.new(0, 0, 0),
    Color = Color3.fromRGB(163, 162, 165),
    BrickColor = BrickColor.new("Medium stone grey"),
    __children = {},
    __touched = Signal(),
  }
  obj.Touched = obj.__touched
  if className == "ClickDetector" then
    obj.__clicked = Signal()
    obj.MouseClick = obj.__clicked
  elseif className == "Humanoid" then
    obj.Health = 100
    obj.MaxHealth = 100
    function obj:TakeDamage(n)
      self.Health = math.max(0, (self.Health or 0) - (n or 0))
    end
  end
  return setmetatable(obj, InstanceMt)
end

workspace = Instance.new("Workspace")
workspace.Name = "Workspace"

local playersService = {
  ClassName = "Players",
  Name = "Players",
  LocalPlayer = {
    Name = "Player1",
    DisplayName = "Player1",
    UserId = 1,
    ClassName = "Player",
  },
  PlayerAdded = Signal(),
}

game = {
  Workspace = workspace,
  Players = playersService,
  GetService = function(_, name)
    if name == "Players" then
      return playersService
    end
    if name == "Workspace" or name == "workspace" then
      return workspace
    end
    error("Unknown service: " .. tostring(name))
  end,
}

script = Instance.new("Script")
script.Name = "Script"
script.Parent = workspace

task = {
  wait = function(_) end,
  spawn = function(fn)
    if type(fn) == "function" then
      fn()
    end
  end,
  delay = function(_, fn)
    if type(fn) == "function" then
      fn()
    end
  end,
}

wait = task.wait
tick = function()
  return 0
end
time = tick
Enum = {
  Material = {
    Plastic = "Plastic",
    Neon = "Neon",
    Grass = "Grass",
    SmoothPlastic = "SmoothPlastic",
  },
}

pcall(function()
  if debug and debug.sethook then
    debug.sethook(function()
      error("실행이 너무 깁니다. 무한 루프가 있는지 확인하세요.", 0)
    end, "", 250000)
  end
end)

os.execute = nil
io = nil
package = nil
dofile = nil
loadfile = nil
require = nil
`;

type LuaFactoryClass = new (customWasmUri?: string) => LuaFactory;

let factoryPromise: Promise<LuaFactory> | null = null;

function wasmUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}/glue.wasm`;
}

async function loadLuaFactoryClass(): Promise<LuaFactoryClass> {
  const mod = await import("wasmoon");
  const record = mod as {
    LuaFactory?: LuaFactoryClass;
    default?: { LuaFactory?: LuaFactoryClass } | LuaFactoryClass;
  };
  const Ctor =
    record.LuaFactory ??
    (typeof record.default === "function"
      ? record.default
      : record.default?.LuaFactory);
  if (!Ctor) {
    throw new Error("Lua 엔진을 불러오지 못했습니다.");
  }
  return Ctor;
}

async function getFactory(): Promise<LuaFactory> {
  if (!factoryPromise) {
    factoryPromise = loadLuaFactoryClass().then((Ctor) => new Ctor(wasmUrl()));
  }
  return factoryPromise;
}

function cleanError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const line = raw.replace(/^\[string "[^"]*"\]:/, "줄 ");
  return line.replace(/^Lua Error\([^)]+\):\s*/i, "");
}

function snapshotGlobals(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
      out[key] = value;
    }
  }
  return out;
}

export async function runLuau(source: string, after = "", before = ""): Promise<RunResult> {
  const unsupported = detectUnsupported(source);
  if (unsupported) {
    return { ok: false, output: [], globals: {}, error: unsupported };
  }

  const factory = await getFactory();
  const engine = await factory.createEngine({
    openStandardLibs: true,
    injectObjects: false,
    enableProxy: false,
  });

  try {
    await engine.doString(PRELUDE);
    const lua = `${before ? transpileLuau(before) + "\n" : ""}${transpileLuau(source)}\n${after ? transpileLuau(after) : ""}`;
    await engine.doString(lua);
    const output = (engine.global.get("__output") as string[] | undefined) ?? [];
    const globals = snapshotGlobals(engine.global.get("_G"));
    return {
      ok: true,
      output: Array.isArray(output) ? output.map(String) : [],
      globals,
    };
  } catch (error) {
    return { ok: false, output: [], globals: {}, error: cleanError(error) };
  } finally {
    engine.global.close();
  }
}
