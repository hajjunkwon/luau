import type { CodeTask } from "../types";

export type CodeMission = CodeTask & {
  topic: string;
  goals: string[];
};

function mission(item: CodeMission): CodeMission {
  return item;
}

export const challengeBank: CodeMission[] = [
  mission({
    kind: "code",
    id: "c-hello",
    topic: "출력",
    prompt: "Ready 한 줄을 출력하세요.",
    goals: ["print로 Ready 를 출력한다"],
    starter: `-- 조건: 출력 창에 Ready 한 줄

`,
    tests: [{ kind: "output-equals", value: "Ready" }],
    hint: 'print("Ready")',
    solution: `print("Ready")`,
  }),
  mission({
    kind: "code",
    id: "c-count",
    topic: "반복",
    prompt: "1부터 4까지 한 줄에 하나씩 숫자를 출력하세요.",
    goals: ["출력이 1 / 2 / 3 / 4 순서"],
    starter: `-- for 나 while 아무거나 됩니다

`,
    tests: [{ kind: "output-lines", values: ["1", "2", "3", "4"] }],
    hint: "for i = 1, 4 do print(i) end",
    solution: `for i = 1, 4 do
  print(i)
end`,
  }),
  mission({
    kind: "code",
    id: "c-double",
    topic: "변수",
    prompt: "coins를 두 배로 만든 뒤 출력하세요. 시작값은 이미 7입니다.",
    goals: ["최종 출력이 14"],
    starter: `local coins = 7
-- coins를 두 배로

print(coins)
`,
    tests: [{ kind: "output-equals", value: "14" }],
    hint: "coins = coins * 2 또는 coins *= 2",
    solution: `local coins = 7
coins *= 2
print(coins)`,
  }),
  mission({
    kind: "code",
    id: "c-greet",
    topic: "문자열",
    prompt: '이름 Nova 앞에 "Hi "를 붙여 Hi Nova 를 출력하세요.',
    goals: ['출력이 Hi Nova', ".. 연결을 사용한다"],
    starter: `local name = "Nova"
-- Hi Nova 를 출력

`,
    tests: [
      { kind: "source-includes", values: [".."] },
      { kind: "output-equals", value: "Hi Nova" },
    ],
    hint: 'print("Hi " .. name)',
    solution: `local name = "Nova"
print("Hi " .. name)`,
  }),
  mission({
    kind: "code",
    id: "c-pass",
    topic: "조건",
    prompt: "score가 10 이상이면 pass, 아니면 fail 을 출력하세요.",
    goals: ["지금 score는 12라서 pass 가 나와야 한다", "if / then / end 를 쓴다"],
    starter: `local score = 12

`,
    tests: [
      { kind: "source-includes", values: ["if", "then", "end"] },
      { kind: "output-equals", value: "pass" },
    ],
    hint: 'if score >= 10 then print("pass") else print("fail") end',
    solution: `local score = 12
if score >= 10 then
  print("pass")
else
  print("fail")
end`,
  }),
  mission({
    kind: "code",
    id: "c-add",
    topic: "함수",
    prompt: "두 수를 더해 돌려주는 함수 add를 만드세요.",
    goals: ["add(2, 3) 은 5", "add(10, 5) 는 15", "return을 사용한다"],
    starter: `-- function add(a, b)

`,
    after: `\nprint(add(2, 3))\nprint(add(10, 5))\n`,
    tests: [
      { kind: "source-regex", pattern: "function\\s+add\\s*\\(" },
      { kind: "source-includes", values: ["return"] },
      { kind: "output-lines", values: ["5", "15"] },
    ],
    hint: "function add(a, b) return a + b end",
    solution: `function add(a, b)
  return a + b
end`,
  }),
  mission({
    kind: "code",
    id: "c-pets",
    topic: "테이블",
    prompt: "pets 배열의 첫 번째 값을 출력하세요.",
    goals: ["첫 칸은 1번 인덱스", "출력은 cat"],
    starter: `local pets = {"cat", "dog", "fox"}

`,
    tests: [{ kind: "output-equals", value: "cat" }],
    hint: "print(pets[1])",
    solution: `local pets = {"cat", "dog", "fox"}
print(pets[1])`,
  }),
  mission({
    kind: "code",
    id: "c-len",
    topic: "테이블",
    prompt: "items 길이(#)를 출력하세요.",
    goals: ["# 연산자를 쓴다", "출력은 3"],
    starter: `local items = {"a", "b", "c"}

`,
    tests: [
      { kind: "source-includes", values: ["#"] },
      { kind: "output-equals", value: "3" },
    ],
    hint: "print(#items)",
    solution: `local items = {"a", "b", "c"}
print(#items)`,
  }),
  mission({
    kind: "code",
    id: "c-gate",
    topic: "Instance",
    prompt: "Part를 만들고 이름을 Gate 로 붙인 뒤 workspace에 넣고 이름을 출력하세요.",
    goals: ['Instance.new("Part")', "Name 은 Gate", "Parent 는 workspace", "이름 출력"],
    starter: `-- local part = Instance.new("Part")

`,
    tests: [
      { kind: "source-includes", values: ['Instance.new("Part")', "workspace"] },
      { kind: "output-includes", value: "Gate" },
    ],
    hint: 'part.Name = "Gate" / part.Parent = workspace / print(part.Name)',
    solution: `local part = Instance.new("Part")
part.Name = "Gate"
part.Parent = workspace
print(part.Name)`,
  }),
  mission({
    kind: "code",
    id: "c-size",
    topic: "Vector3",
    prompt: "파트의 Size를 2, 4, 2 로 정한 뒤 Size를 출력하세요.",
    goals: ["Vector3.new(2, 4, 2)", "출력에 2, 4, 2 가 보인다"],
    starter: `local part = Instance.new("Part")
part.Parent = workspace

`,
    tests: [
      { kind: "source-includes", values: ["Vector3.new"] },
      { kind: "output-includes", value: "2, 4, 2" },
    ],
    hint: "part.Size = Vector3.new(2, 4, 2) print(part.Size)",
    solution: `local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(2, 4, 2)
print(part.Size)`,
  }),
  mission({
    kind: "code",
    id: "c-player",
    topic: "Players",
    prompt: "LocalPlayer의 Name을 출력하세요.",
    goals: ['game:GetService("Players") 또는 game.Players', "LocalPlayer.Name 출력"],
    starter: `-- 연습장의 로컬 플레이어 이름은 Player1 입니다

`,
    tests: [{ kind: "output-includes", value: "Player1" }],
    hint: 'local Players = game:GetService("Players") print(Players.LocalPlayer.Name)',
    solution: `local Players = game:GetService("Players")
print(Players.LocalPlayer.Name)`,
  }),
  mission({
    kind: "code",
    id: "c-floor",
    topic: "math",
    prompt: "7.9 의 소수점 아래를 버린 정수를 출력하세요.",
    goals: ["math.floor를 쓴다", "출력은 7"],
    starter: `local n = 7.9

`,
    tests: [
      { kind: "source-includes", values: ["math.floor"] },
      { kind: "output-equals", value: "7" },
    ],
    hint: "print(math.floor(n))",
    solution: `local n = 7.9
print(math.floor(n))`,
  }),
  mission({
    kind: "code",
    id: "c-upper",
    topic: "문자열",
    prompt: "word를 대문자로 바꿔 출력하세요.",
    goals: ["string.upper 사용", "출력은 LUAU"],
    starter: `local word = "luau"

`,
    tests: [
      { kind: "source-includes", values: ["string.upper"] },
      { kind: "output-equals", value: "LUAU" },
    ],
    hint: "print(string.upper(word))",
    solution: `local word = "luau"
print(string.upper(word))`,
  }),
  mission({
    kind: "code",
    id: "c-insert",
    topic: "테이블",
    prompt: "bag에 gem 을 넣은 뒤 마지막 값을 출력하세요.",
    goals: ["table.insert 사용", "출력은 gem"],
    starter: `local bag = {"coin", "key"}
-- gem 추가

print(bag[#bag])
`,
    tests: [
      { kind: "source-includes", values: ["table.insert"] },
      { kind: "output-equals", value: "gem" },
    ],
    hint: 'table.insert(bag, "gem")',
    solution: `local bag = {"coin", "key"}
table.insert(bag, "gem")
print(bag[#bag])`,
  }),
  mission({
    kind: "code",
    id: "c-even",
    topic: "반복",
    prompt: "2, 4, 6 을 한 줄씩 출력하세요.",
    goals: ["세 줄: 2 / 4 / 6"],
    starter: `-- for i = 2, 6, 2 를 떠올려 보세요

`,
    tests: [{ kind: "output-lines", values: ["2", "4", "6"] }],
    hint: "for i = 2, 6, 2 do print(i) end",
    solution: `for i = 2, 6, 2 do
  print(i)
end`,
  }),
  mission({
    kind: "code",
    id: "c-lava",
    topic: "이벤트",
    prompt: "trap.Touched에 연결해서 닿은 대상 이름을 출력하세요. 테스트가 한 번 닿게 해 줍니다.",
    goals: ["Touched:Connect", "hit.Name 출력"],
    starter: `local trap = Instance.new("Part")
trap.Name = "Trap"
trap.Parent = workspace

`,
    after: `\nlocal dummy = Instance.new("Part")\ndummy.Name = "Foot"\ntrap.Touched:Fire(dummy)\n`,
    tests: [
      { kind: "source-includes", values: ["Touched", "Connect"] },
      { kind: "output-includes", value: "Foot" },
    ],
    hint: "trap.Touched:Connect(function(hit) print(hit.Name) end)",
    solution: `local trap = Instance.new("Part")
trap.Name = "Trap"
trap.Parent = workspace

trap.Touched:Connect(function(hit)
  print(hit.Name)
end)`,
  }),
  mission({
    kind: "code",
    id: "c-hp",
    topic: "Humanoid",
    prompt: "Humanoid에 30 데미지를 주고 남은 Health를 출력하세요. 시작 체력은 100입니다.",
    goals: [":TakeDamage(30)", "출력은 70"],
    starter: `local humanoid = Instance.new("Humanoid")

`,
    tests: [
      { kind: "source-includes", values: ["TakeDamage"] },
      { kind: "output-equals", value: "70" },
    ],
    hint: "humanoid:TakeDamage(30) print(humanoid.Health)",
    solution: `local humanoid = Instance.new("Humanoid")
humanoid:TakeDamage(30)
print(humanoid.Health)`,
  }),
  mission({
    kind: "code",
    id: "c-click",
    topic: "클릭",
    prompt: "ClickDetector의 MouseClick에 연결해 opened 를 출력하세요. 테스트가 한 번 클릭합니다.",
    goals: ["Instance.new(\"ClickDetector\")", "MouseClick:Connect", "출력 opened"],
    starter: `local detector = Instance.new("ClickDetector")
detector.Parent = workspace

`,
    after: `\ndetector.MouseClick:Fire()\n`,
    tests: [
      { kind: "source-includes", values: ["MouseClick", "Connect"] },
      { kind: "output-includes", value: "opened" },
    ],
    hint: 'detector.MouseClick:Connect(function() print("opened") end)',
    solution: `local detector = Instance.new("ClickDetector")
detector.Parent = workspace

detector.MouseClick:Connect(function()
  print("opened")
end)`,
  }),
  mission({
    kind: "code",
    id: "c-rep",
    topic: "문자열",
    prompt: "Go 를 3번 이어 GoGoGo 를 출력하세요.",
    goals: ["string.rep 사용", "출력 GoGoGo"],
    starter: `-- string.rep("Go", 3)

`,
    tests: [
      { kind: "source-includes", values: ["string.rep"] },
      { kind: "output-equals", value: "GoGoGo" },
    ],
    hint: 'print(string.rep("Go", 3))',
    solution: `print(string.rep("Go", 3))`,
  }),
  mission({
    kind: "code",
    id: "c-find",
    topic: "탐색",
    prompt: "workspace에서 Door 를 찾아 이름을 출력하세요. 이미 만들어 두었습니다.",
    goals: [":FindFirstChild(\"Door\")", "찾은 객체의 Name 출력"],
    starter: `-- door는 이미 workspace 안에 있습니다

`,
    before: `local __door = Instance.new("Part")
__door.Name = "Door"
__door.Parent = workspace
`,
    tests: [
      { kind: "source-includes", values: ["FindFirstChild"] },
      { kind: "output-includes", value: "Door" },
    ],
    hint: 'print(workspace:FindFirstChild("Door").Name)',
    solution: `local door = workspace:FindFirstChild("Door")
print(door.Name)`,
  }),
  mission({
    kind: "code",
    id: "c-ipairs",
    topic: "순회",
    prompt: "ipairs로 pets 이름을 한 줄씩 출력하세요.",
    goals: ["ipairs 사용", "출력 cat / dog"],
    starter: `local pets = {"cat", "dog"}

`,
    tests: [
      { kind: "source-includes", values: ["ipairs"] },
      { kind: "output-lines", values: ["cat", "dog"] },
    ],
    hint: "for _, name in ipairs(pets) do print(name) end",
    solution: `local pets = {"cat", "dog"}
for _, name in ipairs(pets) do
  print(name)
end`,
  }),
  mission({
    kind: "code",
    id: "c-sub",
    topic: "문자열",
    prompt: "word의 앞 세 글자를 잘라 출력하세요.",
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
  }),
  mission({
    kind: "code",
    id: "c-max",
    topic: "math",
    prompt: "a와 b 중 큰 수를 출력하세요.",
    goals: ["math.max 사용", "출력 20"],
    starter: `local a = 7
local b = 20

`,
    tests: [
      { kind: "source-includes", values: ["math.max"] },
      { kind: "output-equals", value: "20" },
    ],
    hint: "print(math.max(a, b))",
    solution: `local a = 7
local b = 20
print(math.max(a, b))`,
  }),
  mission({
    kind: "code",
    id: "c-while",
    topic: "반복",
    prompt: "while로 3, 2, 1 을 한 줄씩 출력하세요.",
    goals: ["while 사용", "출력 3 / 2 / 1"],
    starter: `local n = 3

`,
    tests: [
      { kind: "source-includes", values: ["while"] },
      { kind: "output-lines", values: ["3", "2", "1"] },
    ],
    hint: "while n > 0 do print(n) n -= 1 end",
    solution: `local n = 3
while n > 0 do
  print(n)
  n -= 1
end`,
  }),
  mission({
    kind: "code",
    id: "c-color",
    topic: "색",
    prompt: "Color3.new(0, 1, 0)의 G 값을 출력하세요.",
    goals: ["Color3.new 사용", "출력 1"],
    starter: `-- local c = Color3.new(...)

`,
    tests: [
      { kind: "source-includes", values: ["Color3.new"] },
      { kind: "output-equals", value: "1" },
    ],
    hint: "local c = Color3.new(0, 1, 0) print(c.G)",
    solution: `local c = Color3.new(0, 1, 0)
print(c.G)`,
  }),
  mission({
    kind: "code",
    id: "c-join",
    topic: "이벤트",
    prompt: "PlayerAdded에 연결해 들어온 플레이어 이름을 출력하세요. 테스트가 한 명 입장시킵니다.",
    goals: ["PlayerAdded:Connect", "출력 Nova"],
    starter: `local Players = game:GetService("Players")

`,
    after: `\nPlayers.PlayerAdded:Fire({ Name = "Nova", ClassName = "Player" })\n`,
    tests: [
      { kind: "source-includes", values: ["PlayerAdded", "Connect"] },
      { kind: "output-includes", value: "Nova" },
    ],
    hint: "Players.PlayerAdded:Connect(function(player) print(player.Name) end)",
    solution: `local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
  print(player.Name)
end)`,
  }),
  mission({
    kind: "code",
    id: "c-lower",
    topic: "문자열",
    prompt: "title을 소문자로 바꿔 출력하세요.",
    goals: ["string.lower 사용", "출력 lobby"],
    starter: `local title = "LOBBY"

`,
    tests: [
      { kind: "source-includes", values: ["string.lower"] },
      { kind: "output-equals", value: "lobby" },
    ],
    hint: "print(string.lower(title))",
    solution: `local title = "LOBBY"
print(string.lower(title))`,
  }),
  mission({
    kind: "code",
    id: "c-abs",
    topic: "math",
    prompt: "음수 값의 절댓값을 출력하세요.",
    goals: ["math.abs 사용", "출력 12"],
    starter: `local n = -12

`,
    tests: [
      { kind: "source-includes", values: ["math.abs"] },
      { kind: "output-equals", value: "12" },
    ],
    hint: "print(math.abs(n))",
    solution: `local n = -12
print(math.abs(n))`,
  }),
  mission({
    kind: "code",
    id: "c-waitchild",
    topic: "탐색",
    prompt: "WaitForChild로 Chest를 찾아 이름을 출력하세요. 이미 만들어 두었습니다.",
    goals: [":WaitForChild(\"Chest\")", "이름 출력"],
    starter: `-- Chest는 이미 workspace 안에 있습니다

`,
    before: `local __chest = Instance.new("Part")
__chest.Name = "Chest"
__chest.Parent = workspace
`,
    tests: [
      { kind: "source-includes", values: ["WaitForChild"] },
      { kind: "output-includes", value: "Chest" },
    ],
    hint: 'print(workspace:WaitForChild("Chest").Name)',
    solution: `local chest = workspace:WaitForChild("Chest")
print(chest.Name)`,
  }),
  mission({
    kind: "code",
    id: "c-strlen",
    topic: "문자열",
    prompt: "word의 글자 수를 출력하세요.",
    goals: ["# 연산자를 쓴다", "출력은 4"],
    starter: `local word = "Luau"

`,
    tests: [
      { kind: "source-includes", values: ["#"] },
      { kind: "output-equals", value: "4" },
    ],
    hint: "print(#word)",
    solution: `local word = "Luau"
print(#word)`,
  }),
  mission({
    kind: "code",
    id: "c-and",
    topic: "조건",
    prompt: "alive가 참이고 hp가 0보다 크면 ok, 아니면 down 을 출력하세요.",
    goals: ["and 를 쓴다", "지금 값은 ok"],
    starter: `local alive = true
local hp = 40

`,
    tests: [
      { kind: "source-includes", values: ["and"] },
      { kind: "output-equals", value: "ok" },
    ],
    hint: 'if alive and hp > 0 then print("ok") else print("down") end',
    solution: `local alive = true
local hp = 40
if alive and hp > 0 then
  print("ok")
else
  print("down")
end`,
  }),
  mission({
    kind: "code",
    id: "c-kids",
    topic: "탐색",
    prompt: "workspace 자식 개수를 GetChildren으로 세어 출력하세요. 연습장 Script 하나와 아래 파트가 있습니다.",
    goals: ["GetChildren 사용", "출력 2"],
    starter: `local part = Instance.new("Part")
part.Parent = workspace

`,
    tests: [
      { kind: "source-includes", values: ["GetChildren"] },
      { kind: "output-equals", value: "2" },
    ],
    hint: "print(#workspace:GetChildren())",
    solution: `local part = Instance.new("Part")
part.Parent = workspace
print(#workspace:GetChildren())`,
  }),
];

export const QUIZ_LENGTH = 6;

export function pickChallenges(count = QUIZ_LENGTH): CodeMission[] {
  const next = [...challengeBank];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next.slice(0, Math.min(count, next.length));
}
