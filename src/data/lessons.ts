import type { Lesson } from "../types";
import { extraLessons } from "./extraLessons";

export const lessons: Lesson[] = [
  {
    id: "print",
    order: 1,
    title: "첫 출력",
    subtitle: "print와 주석으로 스크립트를 시작하기",
    difficulty: "입문",
    minutes: 6,
    theory: [
      {
        heading: "스크립트는 위에서 아래로 실행됩니다",
        body: "로블록스에서 보는 파란 글자가 Luau입니다. 가장 먼저 익힐 함수는 print입니다. print에 넣은 값은 출력 창에 한 줄로 나타납니다.",
        code: `print("Hello Luau")
print(1 + 1)`,
      },
      {
        heading: "주석은 실행되지 않습니다",
        body: "두 개의 하이픈(--)으로 시작하는 줄은 메모입니다. 나중에 읽을 나를 위해 의도를 적어 두세요.",
        code: `-- 이건 실행되지 않음
print("이건 실행됨")`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "print-q2",
        prompt: 'print를 써서 Hello Roblox 를 출력하세요. 대소문자와 띄어쓰기를 그대로 맞추면 됩니다.',
        goals: ['print로 Hello Roblox 한 줄을 출력한다'],
        starter: `-- 한 줄로 출력해 보세요

`,
        tests: [{ kind: "output-equals", value: "Hello Roblox" }],
        hint: 'print("Hello Roblox")',
        solution: `print("Hello Roblox")`,
      },
      {
        kind: "choice",
        id: "print-q3",
        prompt: "다음 중 실행되지 않는 줄은 무엇인가요?",
        choices: [
          'print("go")',
          "-- print(\"go\")",
          'print(3)',
          'print("Luau")',
        ],
        answer: 1,
        explain: "-- 뒤에 오는 내용은 주석이라 실행되지 않습니다.",
      },
    ],
  },
  {
    id: "variables",
    order: 2,
    title: "변수",
    subtitle: "local로 이름을 붙이고 값을 담기",
    difficulty: "입문",
    minutes: 7,
    theory: [
      {
        heading: "local은 이 스크립트만의 상자입니다",
        body: "로블록스 스타일 가이드는 거의 항상 local을 쓰라고 합니다. 이름 = 값 형태로 담아 두고, 나중에 그 이름으로 꺼냅니다.",
        code: `local playerName = "Guest"
print(playerName)`,
      },
      {
        heading: "값을 바꿀 수 있습니다",
        body: "이미 만든 이름에 새 값을 넣으면 이전 값은 덮입니다. Luau는 숫자, 문자열, 참/거짓, nil을 기본으로 다룹니다.",
        code: `local coins = 0
coins = 10
print(coins)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "var-q2",
        prompt: 'local 변수 name에 "Nova"를 넣고, print(name)으로 출력하세요.',
        goals: ['local name 을 만든다', '출력은 Nova'],
        starter: `-- local 변수를 만들고 출력하세요

`,
        tests: [
          { kind: "source-includes", values: ["local"] },
          { kind: "output-equals", value: "Nova" },
        ],
        hint: 'local name = "Nova" 다음에 print(name)',
        solution: `local name = "Nova"
print(name)`,
      },
      {
        kind: "choice",
        id: "var-q3",
        prompt: "아직 아무 값도 넣지 않은 변수가 기본적으로 갖는 값은?",
        choices: ["0", '""', "nil", "undefined"],
        answer: 2,
        explain: "Luau에는 undefined가 없습니다. 비어 있으면 nil입니다.",
      },
    ],
  },
  {
    id: "numbers",
    order: 3,
    title: "숫자 연산",
    subtitle: "더하기부터 복합 대입까지",
    difficulty: "입문",
    minutes: 8,
    theory: [
      {
        heading: "산술은 익숙한 기호입니다",
        body: "+ - * / % ^ 를 사용할 수 있습니다. 괄호로 순서를 정하세요.",
        code: `local damage = 12
local bonus = 3
print(damage * bonus)
print((10 + 2) / 4)`,
      },
      {
        heading: "Luau는 += 같은 복합 대입을 지원합니다",
        body: "coins += 5 는 coins = coins + 5 와 같습니다. 점수를 쌓을 때 자주 씁니다.",
        code: `local coins = 10
coins += 5
print(coins)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "num-q2",
        prompt: "7과 6을 곱한 결과를 print로 출력하세요. 계산은 코드가 하게 하세요.",
        goals: ["7 * 6 을 코드에서 계산한다", "출력은 42", "42를 직접 적지 않는다"],
        starter: `-- 7 * 6 의 결과를 출력

`,
        tests: [
          { kind: "source-excludes", values: ["42"] },
          { kind: "output-equals", value: "42" },
        ],
        hint: "print(7 * 6)",
        solution: `print(7 * 6)`,
      },
      {
        kind: "code",
        id: "num-q3",
        prompt: "local score = 10 에서 시작해 += 로 5를 더한 뒤 score를 출력하세요.",
        goals: ["+= 를 쓴다", "출력은 15"],
        starter: `local score = 10
-- 여기에 += 를 쓰세요

print(score)
`,
        tests: [
          { kind: "source-includes", values: ["+="] },
          { kind: "output-equals", value: "15" },
        ],
        hint: "score += 5",
        solution: `local score = 10
score += 5
print(score)`,
      },
    ],
  },
  {
    id: "strings",
    order: 4,
    title: "문자열",
    subtitle: "글자를 잇고 플레이어 이름을 만들기",
    difficulty: "입문",
    minutes: 7,
    theory: [
      {
        heading: "문자열은 따옴표로 감쌉니다",
        body: '작은따옴표나 큰따옴표 모두 됩니다. 여러 줄을 이을 때는 .. 연산자를 씁니다.',
        code: `local first = "Blue"
local last = "Fox"
print(first .. last)
print(first .. " " .. last)`,
      },
      {
        heading: "숫자와 이어 붙일 때도 .. 입니다",
        body: "Luau는 문자열 보간(백틱)도 있지만, 이 연습장은 .. 연결을 먼저 익히게 합니다. tostring으로 숫자를 글자로 바꿀 수도 있습니다.",
        code: `local coins = 25
print("Coins: " .. coins)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "str-q2",
        prompt: 'local map = "Lobby" 와 local id = 3 을 이어 "Lobby-3" 을 출력하세요.',
        goals: [".. 으로 이어 붙인다", "출력은 Lobby-3"],
        starter: `local map = "Lobby"
local id = 3
-- map과 id를 이어 출력하세요

`,
        tests: [
          { kind: "source-includes", values: [".."] },
          { kind: "output-equals", value: "Lobby-3" },
        ],
        hint: 'print(map .. "-" .. id)',
        solution: `local map = "Lobby"
local id = 3
print(map .. "-" .. id)`,
      },
      {
        kind: "code",
        id: "str-q3",
        prompt: "word의 글자 수를 #로 세어 출력하세요.",
        goals: ["# 연산자를 쓴다", "출력은 5"],
        starter: `local word = "Luau!"

`,
        tests: [
          { kind: "source-includes", values: ["#"] },
          { kind: "output-equals", value: "5" },
        ],
        hint: "print(#word)",
        solution: `local word = "Luau!"
print(#word)`,
      },
    ],
  },
  {
    id: "conditions",
    order: 5,
    title: "조건문",
    subtitle: "if / then / elseif / else",
    difficulty: "기초",
    minutes: 9,
    theory: [
      {
        heading: "참일 때만 실행합니다",
        body: "비교 연산자는 == ~= > < >= <= 입니다. 특히 같지 않음은 != 가 아니라 ~= 입니다.",
        code: `local hp = 0
if hp <= 0 then
  print("game over")
end`,
      },
      {
        heading: "갈래를 나눕니다",
        body: "elseif과 else로 여러 길을 만들 수 있습니다. then과 end를 잊지 마세요.",
        code: `local rank = 12
if rank >= 20 then
  print("gold")
elseif rank >= 10 then
  print("silver")
else
  print("bronze")
end`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "if-q2",
        prompt: "score가 10 이상이면 pass, 아니면 fail 을 출력하세요. if문을 사용하세요.",
        goals: ["if / then / end 를 쓴다", "지금 score는 12라서 pass"],
        starter: `local score = 12
-- if score >= 10 then ...

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
      },
      {
        kind: "choice",
        id: "if-q3",
        prompt: "다음 중 올바른 if 문법는?",
        choices: [
          "if (hp > 0) { print(hp) }",
          "if hp > 0 then print(hp) end",
          "if hp > 0: print(hp)",
          "if hp > 0 do print(hp) end",
        ],
        answer: 1,
        explain: "조건 뒤에는 then, 블록 끝에는 end가 필요합니다. 중괄호 블록은 쓰지 않습니다.",
      },
    ],
  },
  {
    id: "loops",
    order: 6,
    title: "반복문",
    subtitle: "for와 while로 여러 번 실행하기",
    difficulty: "기초",
    minutes: 9,
    theory: [
      {
        heading: "숫자 for",
        body: "for i = 시작, 끝 do ... end 는 시작부터 끝까지 1씩 증가하며 돕니다. 세 번째 숫자로 간격도 정할 수 있습니다.",
        code: `for i = 1, 3 do
  print(i)
end`,
      },
      {
        heading: "while은 조건이 참인 동안",
        body: "조건이 언제 거짓이 될지 반드시 만드세요. 아니면 무한 루프가 됩니다. 이 연습장은 너무 긴 실행을 자동으로 끊습니다.",
        code: `local n = 3
while n > 0 do
  print(n)
  n -= 1
end`,
      },
    ],
    tasks: [
      {
        kind: "choice",
        id: "loop-q1",
        prompt: "for i = 1, 4 do print(i) end 는 몇 줄을 출력하나요?",
        choices: ["3줄", "4줄", "5줄", "1줄"],
        answer: 1,
        explain: "1, 2, 3, 4 — 시작과 끝을 모두 포함합니다.",
      },
      {
        kind: "code",
        id: "loop-q2",
        prompt: "for문으로 1부터 5까지 한 줄에 하나씩 숫자를 출력하세요.",
        goals: ["for / do / end 를 쓴다", "출력 1 / 2 / 3 / 4 / 5"],
        starter: `-- for i = 1, 5 do

`,
        tests: [
          { kind: "source-includes", values: ["for", "do", "end"] },
          { kind: "output-lines", values: ["1", "2", "3", "4", "5"] },
        ],
        hint: "for i = 1, 5 do print(i) end",
        solution: `for i = 1, 5 do
  print(i)
end`,
      },
      {
        kind: "code",
        id: "loop-q3",
        prompt: "while로 2, 1 을 한 줄씩 출력하세요.",
        goals: ["while 사용", "출력 2 / 1"],
        starter: `local n = 2

`,
        tests: [
          { kind: "source-includes", values: ["while"] },
          { kind: "output-lines", values: ["2", "1"] },
        ],
        hint: "while n > 0 do print(n) n -= 1 end",
        solution: `local n = 2
while n > 0 do
  print(n)
  n -= 1
end`,
      },
    ],
  },
  {
    id: "functions",
    order: 7,
    title: "함수",
    subtitle: "반복되는 일을 이름 붙이기",
    difficulty: "기초",
    minutes: 10,
    theory: [
      {
        heading: "function 이름(인자) ... end",
        body: "함수는 입력을 받아 일을 하고, 필요하면 return으로 결과를 돌려줍니다.",
        code: `local function heal(hp, amount)
  return hp + amount
end

print(heal(50, 10))`,
      },
      {
        heading: "local function을 권장합니다",
        body: "스크립트 안에서만 쓰는 함수는 local function으로 선언하세요. 호출은 이름 뒤에 괄호입니다.",
        code: `local function greet(name)
  print("Hi " .. name)
end

greet("Nova")`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "fn-q2",
        prompt: "두 숫자를 더해 돌려주는 함수 add를 만들고, add(2, 3)과 add(10, 5)가 동작하게 하세요.",
        goals: ["function add(a, b)", "return을 쓴다", "테스트가 5와 15를 확인한다"],
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
      },
    ],
  },
  {
    id: "tables",
    order: 8,
    title: "테이블",
    subtitle: "배열과 딕셔너리를 한 구조로",
    difficulty: "기초",
    minutes: 10,
    theory: [
      {
        heading: "Luau의 핵심 자료구조입니다",
        body: "목록처럼 쓰려면 중괄호에 값을 나열합니다. 인덱스는 0이 아니라 1부터입니다.",
        code: `local pets = {"cat", "dog", "fox"}
print(pets[1])
print(#pets)`,
      },
      {
        heading: "이름 붙은 칸도 됩니다",
        body: "Roblox 오브젝트의 속성처럼 Key = Value 형태를 자주 씁니다. 점은 이름 키에 접근하는 단축 문법입니다.",
        code: `local part = {
  Name = "Gate",
  Anchored = true,
}
print(part.Name)
print(part["Anchored"])`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "tbl-q2",
        prompt: 'Name이 "Pad"인 테이블 part를 만들고 part.Name을 출력하세요.',
        goals: ["중괄호 테이블을 만든다", "출력은 Pad"],
        starter: `-- local part = { Name = ... }

`,
        tests: [
          { kind: "source-includes", values: ["{"] },
          { kind: "output-equals", value: "Pad" },
        ],
        hint: 'local part = { Name = "Pad" } print(part.Name)',
        solution: `local part = { Name = "Pad" }
print(part.Name)`,
      },
      {
        kind: "code",
        id: "tbl-q1",
        prompt: "pets 배열의 두 번째 값을 출력하세요.",
        goals: ["인덱스는 1부터", "출력은 dog"],
        starter: `local pets = {"cat", "dog", "fox"}

`,
        tests: [{ kind: "output-equals", value: "dog" }],
        hint: "print(pets[2])",
        solution: `local pets = {"cat", "dog", "fox"}
print(pets[2])`,
      },
    ],
  },
  {
    id: "instances",
    order: 9,
    title: "Instance와 Workspace",
    subtitle: "파트를 만들고 속성을 바꾸기",
    difficulty: "실전",
    minutes: 12,
    theory: [
      {
        heading: "Roblox의 모든 것은 Instance입니다",
        body: "Part, Script, Player처럼 게임에 존재하는 객체는 Instance.new로 만들 수 있습니다. Name, Parent, Size, Position 같은 속성을 가집니다.",
        code: `local part = Instance.new("Part")
part.Name = "Floor"
part.Anchored = true
part.Parent = workspace
print(part.Name)
print(part.Parent.Name)`,
      },
      {
        heading: "서비스는 game:GetService로 가져옵니다",
        body: "Players, TweenService처럼 하나만 있는 시스템은 GetService로 얻습니다. workspace는 전역으로도 열려 있습니다.",
        code: `local Players = game:GetService("Players")
print(Players.LocalPlayer.Name)`,
      },
    ],
    tasks: [
      {
        kind: "choice",
        id: "inst-q1",
        prompt: "새 Part를 만드는 올바른 코드는?",
        choices: [
          'Part.new()',
          'Instance.new("Part")',
          'game.create("Part")',
          'new Part()',
        ],
        answer: 1,
        explain: 'Instance.new("클래스이름") 이 Roblox의 생성 방식입니다.',
      },
      {
        kind: "code",
        id: "inst-q2",
        prompt: 'Instance.new("Part")로 파트를 만들고 Name을 "Beacon"으로 정한 뒤 그 이름을 출력하세요. Parent는 workspace로 두세요.',
        goals: ['Instance.new("Part")', "Name 은 Beacon", "Parent 는 workspace", "이름 출력"],
        starter: `-- local part = Instance.new("Part")

`,
        tests: [
          { kind: "source-includes", values: ['Instance.new("Part")', "workspace"] },
          { kind: "output-includes", value: "Beacon" },
        ],
        hint: "part.Name = \"Beacon\" / part.Parent = workspace / print(part.Name)",
        solution: `local part = Instance.new("Part")
part.Name = "Beacon"
part.Parent = workspace
print(part.Name)`,
      },
      {
        kind: "choice",
        id: "inst-q3",
        prompt: "플레이어 목록 서비스를 가져오는 방법은?",
        choices: [
          "game.PlayersService",
          'game:GetService("Players")',
          "workspace:GetPlayers()",
          'Instance.new("Players")',
        ],
        answer: 1,
        explain: "서비스는 new로 만들지 않습니다. GetService로 이미 있는 것을 받습니다.",
      },
    ],
  },
  {
    id: "events",
    order: 10,
    title: "이벤트",
    subtitle: "Touched와 Connect",
    difficulty: "실전",
    minutes: 12,
    theory: [
      {
        heading: "이벤트는 나중에 일어나는 일입니다",
        body: "파트에 무언가 닿으면 Touched가 발생합니다. :Connect(함수)로 그때 실행할 코드를 등록합니다. hit는 닿은 쪽의 Instance입니다.",
        code: `local lava = Instance.new("Part")
lava.Name = "Lava"
lava.Parent = workspace

lava.Touched:Connect(function(hit)
  print("touched " .. hit.Name)
end)`,
      },
      {
        heading: "Connect는 구독입니다",
        body: "함수를 한 번 연결해 두면, 이벤트가 날 때마다 다시 호출됩니다. 플레이어가 들어올 때는 Players.PlayerAdded를 씁니다.",
        code: `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  print(player.Name .. " joined")
end)`,
      },
    ],
    tasks: [
      {
        kind: "code",
        id: "ev-q2",
        prompt: "trap 파트의 Touched에 Connect를 걸고, 닿은 대상의 Name을 출력하세요. 아래 코드는 테스트가 한 번 닿게 해 줍니다.",
        goals: ["Touched:Connect", "hit.Name 출력", "테스트가 Foot 을 닿게 한다"],
        starter: `local trap = Instance.new("Part")
trap.Name = "Trap"
trap.Parent = workspace

-- trap.Touched:Connect(function(hit)
--   print(hit.Name)
-- end)
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
      },
      {
        kind: "choice",
        id: "ev-q3",
        prompt: "새 플레이어가 서버에 들어왔을 때 쓰는 이벤트는?",
        choices: [
          "workspace.ChildAdded",
          "Players.PlayerAdded",
          "game.Started",
          "Player.Touched",
        ],
        answer: 1,
        explain: "game:GetService(\"Players\").PlayerAdded:Connect(function(player) ... end)",
      },
    ],
  },
  ...extraLessons,
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getNextLesson(id: string): Lesson | undefined {
  const current = getLesson(id);
  if (!current) return undefined;
  return lessons.find((l) => l.order === current.order + 1);
}

export function allTasks() {
  return lessons.flatMap((lesson) =>
    lesson.tasks.map((task) => ({ lesson, task })),
  );
}
