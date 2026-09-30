import type { Lesson } from "../types";

export const extraLessons: Lesson[] = [
  {
    id: "math",
    order: 11,
    title: "math 라이브러리",
    subtitle: "내림, 올림, 최댓값, 절댓값",
    difficulty: "기초",
    minutes: 8,
    theory: [
      {
        heading: "숫자는 math 테이블에 모아 둡니다",
        body: "math.floor는 소수점 아래를 버립니다. math.ceil은 올립니다. math.max / math.min은 여러 값 중 큰 것·작은 것을 고릅니다. math.abs는 절댓값입니다.",
        code: `print(math.floor(7.9))
print(math.ceil(7.1))
print(math.max(3, 10, 4))
print(math.abs(-5))`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "math-q1",
        prompt: "damage 3.7을 정수로 내린 값을 출력하세요.",
        goals: ["math.floor를 쓴다", "출력은 3"],
        starter: `local damage = 3.7

`,
        tests: [
          { kind: "source-includes", values: ["math.floor"] },
          { kind: "output-equals", value: "3" },
        ],
        hint: "print(math.floor(damage))",
        solution: `local damage = 3.7
print(math.floor(damage))`,
      },
      {
        kind: "code",
        id: "math-q2",
        prompt: "a, b 중 큰 수를 출력하세요.",
        goals: ["math.max를 쓴다", "출력은 15"],
        starter: `local a = 9
local b = 15

`,
        tests: [
          { kind: "source-includes", values: ["math.max"] },
          { kind: "output-equals", value: "15" },
        ],
        hint: "print(math.max(a, b))",
        solution: `local a = 9
local b = 15
print(math.max(a, b))`,
      },
      {
        kind: "code",
        id: "math-q3",
        prompt: "음수 hp의 절댓값을 출력하세요.",
        goals: ["math.abs를 쓴다", "출력은 8"],
        starter: `local hp = -8

`,
        tests: [
          { kind: "source-includes", values: ["math.abs"] },
          { kind: "output-equals", value: "8" },
        ],
        hint: "print(math.abs(hp))",
        solution: `local hp = -8
print(math.abs(hp))`,
      },
    ],
  },
  {
    id: "stringlib",
    order: 12,
    title: "문자열 함수",
    subtitle: "upper, lower, rep, sub",
    difficulty: "기초",
    minutes: 9,
    theory: [
      {
        heading: "string 라이브러리",
        body: "string.upper는 대문자, string.lower는 소문자, string.rep는 반복, string.sub는 잘라 내기입니다. 인덱스는 문자열도 1부터입니다.",
        code: `print(string.upper("hi"))
print(string.lower("HI"))
print(string.rep("na", 2))
print(string.sub("Roblox", 1, 3))`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "strlib-q1",
        prompt: "title을 대문자로 출력하세요.",
        goals: ["string.upper 사용", "출력 STUDIO"],
        starter: `local title = "studio"

`,
        tests: [
          { kind: "source-includes", values: ["string.upper"] },
          { kind: "output-equals", value: "STUDIO" },
        ],
        hint: "print(string.upper(title))",
        solution: `local title = "studio"
print(string.upper(title))`,
      },
      {
        kind: "code",
        id: "strlib-q2",
        prompt: '"go"를 4번 이어 gogogogo 를 출력하세요.',
        goals: ["string.rep 사용", "출력 gogogogo"],
        starter: `-- string.rep

`,
        tests: [
          { kind: "source-includes", values: ["string.rep"] },
          { kind: "output-equals", value: "gogogogo" },
        ],
        hint: 'print(string.rep("go", 4))',
        solution: `print(string.rep("go", 4))`,
      },
      {
        kind: "code",
        id: "strlib-q3",
        prompt: "word의 앞 세 글자만 잘라 출력하세요.",
        goals: ["string.sub 사용", "출력 Rob"],
        starter: `local word = "Roblox"

`,
        tests: [
          { kind: "source-includes", values: ["string.sub"] },
          { kind: "output-equals", value: "Rob" },
        ],
        hint: "print(string.sub(word, 1, 3))",
        solution: `local word = "Roblox"
print(string.sub(word, 1, 3))`,
      },
    ],
  },
  {
    id: "tablelib",
    order: 13,
    title: "테이블 고치기",
    subtitle: "insert와 remove",
    difficulty: "기초",
    minutes: 9,
    theory: [
      {
        heading: "배열 끝에 넣고 빼기",
        body: "table.insert(list, value)는 맨 뒤에 넣고, table.remove(list)는 맨 뒤를 뺍니다. 뺀 값은 return됩니다. 길이는 #list 입니다.",
        code: `local inv = {"sword"}
table.insert(inv, "potion")
print(inv[2])
local last = table.remove(inv)
print(last)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "tbl-q3",
        prompt: "inv에 shield를 넣은 뒤 길이를 출력하세요.",
        goals: ["table.insert 사용", "출력은 3"],
        starter: `local inv = {"sword", "potion"}

print(#inv)
`,
        tests: [
          { kind: "source-includes", values: ["table.insert"] },
          { kind: "output-equals", value: "3" },
        ],
        hint: 'table.insert(inv, "shield")',
        solution: `local inv = {"sword", "potion"}
table.insert(inv, "shield")
print(#inv)`,
      },
      {
        kind: "code",
        id: "tbl-q4",
        prompt: "queue에서 맨 뒤를 빼고, 뺀 값을 출력하세요.",
        goals: ["table.remove 사용", "출력은 gold"],
        starter: `local queue = {"wood", "gold"}

`,
        tests: [
          { kind: "source-includes", values: ["table.remove"] },
          { kind: "output-equals", value: "gold" },
        ],
        hint: "print(table.remove(queue))",
        solution: `local queue = {"wood", "gold"}
print(table.remove(queue))`,
      },
    ],
  },
  {
    id: "click-hp",
    order: 14,
    title: "클릭과 체력",
    subtitle: "ClickDetector와 Humanoid",
    difficulty: "실전",
    minutes: 12,
    theory: [
      {
        heading: "클릭은 MouseClick",
        body: "ClickDetector를 파트에 넣으면 클릭할 수 있습니다. MouseClick:Connect로 그때 할 일을 붙입니다. 이 연습장은 Fire로 클릭을 흉내 냅니다.",
        code: `local detector = Instance.new("ClickDetector")
detector.MouseClick:Connect(function()
  print("clicked")
end)`,
      },
      {
        heading: "Humanoid는 체력입니다",
        body: "Health는 기본 100입니다. :TakeDamage(n)은 체력을 깎습니다. 0 아래로 내려가지 않습니다.",
        code: `local humanoid = Instance.new("Humanoid")
humanoid:TakeDamage(20)
print(humanoid.Health)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "click-q1",
        prompt: "MouseClick에 연결해 ping 을 출력하세요. 테스트가 한 번 클릭합니다.",
        goals: ["MouseClick:Connect", "출력 ping"],
        starter: `local detector = Instance.new("ClickDetector")

`,
        after: `\ndetector.MouseClick:Fire()\n`,
        tests: [
          { kind: "source-includes", values: ["MouseClick"] },
          { kind: "output-includes", value: "ping" },
        ],
        hint: 'detector.MouseClick:Connect(function() print("ping") end)',
        solution: `local detector = Instance.new("ClickDetector")
detector.MouseClick:Connect(function()
  print("ping")
end)`,
      },
      {
        kind: "code",
        id: "click-q2",
        prompt: "Humanoid에 45 데미지를 주고 Health를 출력하세요.",
        goals: ["TakeDamage(45)", "출력 55"],
        starter: `local humanoid = Instance.new("Humanoid")

`,
        tests: [
          { kind: "source-includes", values: ["TakeDamage"] },
          { kind: "output-equals", value: "55" },
        ],
        hint: "humanoid:TakeDamage(45) print(humanoid.Health)",
        solution: `local humanoid = Instance.new("Humanoid")
humanoid:TakeDamage(45)
print(humanoid.Health)`,
      },
    ],
  },
  {
    id: "ipairs-pairs",
    order: 15,
    title: "테이블 순회",
    subtitle: "ipairs와 pairs",
    difficulty: "기초",
    minutes: 10,
    theory: [
      {
        heading: "배열은 ipairs",
        body: "1부터 이어진 목록은 ipairs로 돕니다. i는 번호, v는 값입니다. 중간에 nil이 있으면 거기서 멈춥니다.",
        code: `local pets = {"cat", "dog", "fox"}
for i, name in ipairs(pets) do
  print(i, name)
end`,
      },
      {
        heading: "이름 붙은 칸은 pairs",
        body: "Key = Value 테이블은 pairs로 돕니다. 순서는 보장되지 않으니, 퀴즈에서는 특정 키만 출력하게 합니다.",
        code: `local stats = { hp = 80, speed = 16 }
for key, value in pairs(stats) do
  print(key)
end`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "ip-q1",
        prompt: "ipairs로 pets의 이름을 한 줄씩 출력하세요.",
        goals: ["ipairs 사용", "출력 cat / dog"],
        starter: `local pets = {"cat", "dog"}

`,
        tests: [
          { kind: "source-includes", values: ["ipairs"] },
          { kind: "output-lines", values: ["cat", "dog"] },
        ],
        hint: "for i, name in ipairs(pets) do print(name) end",
        solution: `local pets = {"cat", "dog"}
for i, name in ipairs(pets) do
  print(name)
end`,
      },
      {
        kind: "code",
        id: "ip-q2",
        prompt: "stats.hp 값을 출력하세요. pairs로 돌며 hp 키만 골라도 됩니다.",
        goals: ["출력은 80"],
        starter: `local stats = { hp = 80, speed = 16 }

`,
        tests: [{ kind: "output-equals", value: "80" }],
        hint: "print(stats.hp) 또는 pairs에서 key == \"hp\"",
        solution: `local stats = { hp = 80, speed = 16 }
print(stats.hp)`,
      },
    ],
  },
  {
    id: "color",
    order: 16,
    title: "색과 재질",
    subtitle: "Color3, BrickColor, Enum.Material",
    difficulty: "기초",
    minutes: 8,
    theory: [
      {
        heading: "Color3는 0~1 비율입니다",
        body: "Color3.new(1, 0, 0)은 빨간 빛입니다. 0~255로 쓰려면 Color3.fromRGB를 씁니다. BrickColor는 이름 붙은 팔레트입니다.",
        code: `local part = Instance.new("Part")
part.Color = Color3.fromRGB(0, 162, 255)
part.BrickColor = BrickColor.new("Bright red")
part.Material = Enum.Material.Neon
print(part.BrickColor.Name)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "color-q1",
        prompt: "Color3.new(1, 0, 0)의 R 값을 출력하세요.",
        goals: ["Color3.new 사용", "출력은 1"],
        starter: `-- local c = Color3.new(...)

`,
        tests: [
          { kind: "source-includes", values: ["Color3.new"] },
          { kind: "output-equals", value: "1" },
        ],
        hint: "local c = Color3.new(1, 0, 0) print(c.R)",
        solution: `local c = Color3.new(1, 0, 0)
print(c.R)`,
      },
      {
        kind: "code",
        id: "color-q2",
        prompt: '파트의 BrickColor를 "Bright red"로 정한 뒤 그 이름을 출력하세요.',
        goals: ["BrickColor.new", "출력 Bright red"],
        starter: `local part = Instance.new("Part")

`,
        tests: [
          { kind: "source-includes", values: ["BrickColor"] },
          { kind: "output-includes", value: "Bright red" },
        ],
        hint: 'part.BrickColor = BrickColor.new("Bright red") print(part.BrickColor.Name)',
        solution: `local part = Instance.new("Part")
part.BrickColor = BrickColor.new("Bright red")
print(part.BrickColor.Name)`,
      },
    ],
  },
  {
    id: "task-lib",
    order: 17,
    title: "task와 여러 값",
    subtitle: "spawn과 return 두 개",
    difficulty: "기초",
    minutes: 10,
    theory: [
      {
        heading: "task.spawn은 함수를 바로 돌립니다",
        body: "Studio에서는 다음 프레임에 돌 수 있지만, 이 연습장은 바로 실행합니다. task.wait는 학습용으로 아무것도 기다리지 않습니다.",
        code: `task.spawn(function()
  print("spawned")
end)
print("main")`,
      },
      {
        heading: "함수는 값을 여러 개 돌려줄 수 있습니다",
        body: "return a, b 다음에 local x, y = f() 로 받습니다. 로블록스 API도 종종 두 값을 줍니다.",
        code: `local function split(n)
  return n, n * 2
end

local a, b = split(3)
print(a)
print(b)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "task-q1",
        prompt: "task.spawn으로 go 를 출력하세요. 연습장은 spawn을 바로 실행합니다.",
        goals: ["task.spawn 사용", "출력 go"],
        starter: `-- task.spawn(function()

`,
        tests: [
          { kind: "source-includes", values: ["task.spawn"] },
          { kind: "output-includes", value: "go" },
        ],
        hint: 'task.spawn(function() print("go") end)',
        solution: `task.spawn(function()
  print("go")
end)`,
      },
      {
        kind: "code",
        id: "task-q2",
        prompt: "두 값을 돌려주는 함수 pair를 만드세요. pair(4)는 4와 8을 줍니다.",
        goals: ["function pair", "return 두 개", "출력 4 / 8"],
        starter: `-- function pair(n)

`,
        after: `\nlocal a, b = pair(4)\nprint(a)\nprint(b)\n`,
        tests: [
          { kind: "source-regex", pattern: "function\\s+pair\\s*\\(" },
          { kind: "source-includes", values: ["return"] },
          { kind: "output-lines", values: ["4", "8"] },
        ],
        hint: "function pair(n) return n, n * 2 end",
        solution: `function pair(n)
  return n, n * 2
end`,
      },
    ],
  },
  {
    id: "find-child",
    order: 18,
    title: "자식 찾기",
    subtitle: "FindFirstChild와 WaitForChild",
    difficulty: "실전",
    minutes: 10,
    theory: [
      {
        heading: "이름으로 자식을 찾습니다",
        body: "workspace:FindFirstChild(\"Door\")는 이름이 Door인 자식을 돌려줍니다. 없으면 nil입니다. WaitForChild는 Studio에서 생길 때까지 기다리지만, 이 연습장에서는 바로 찾습니다.",
        code: `local door = workspace:FindFirstChild("Door")
if door then
  print(door.Name)
end`,
      },
      {
        heading: "GetChildren은 목록입니다",
        body: "GetChildren()은 자식 배열을 줍니다. #로 개수를 셀 수 있습니다.",
        code: `local kids = workspace:GetChildren()
print(#kids)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "find-q1",
        prompt: "workspace에서 Flag를 찾아 이름을 출력하세요. 이미 만들어 두었습니다.",
        goals: [":FindFirstChild(\"Flag\")", "이름 출력"],
        starter: `-- Flag는 이미 workspace 안에 있습니다

`,
        before: `local __flag = Instance.new("Part")
__flag.Name = "Flag"
__flag.Parent = workspace
`,
        tests: [
          { kind: "source-includes", values: ["FindFirstChild"] },
          { kind: "output-includes", value: "Flag" },
        ],
        hint: 'print(workspace:FindFirstChild("Flag").Name)',
        solution: `local flag = workspace:FindFirstChild("Flag")
print(flag.Name)`,
      },
      {
        kind: "code",
        id: "find-q2",
        prompt: "WaitForChild로 Pad를 찾은 뒤 이름을 출력하세요.",
        goals: [":WaitForChild(\"Pad\")", "이름 출력"],
        starter: `-- Pad는 이미 workspace 안에 있습니다

`,
        before: `local __pad = Instance.new("Part")
__pad.Name = "Pad"
__pad.Parent = workspace
`,
        tests: [
          { kind: "source-includes", values: ["WaitForChild"] },
          { kind: "output-includes", value: "Pad" },
        ],
        hint: 'print(workspace:WaitForChild("Pad").Name)',
        solution: `local pad = workspace:WaitForChild("Pad")
print(pad.Name)`,
      },
    ],
  },
];
