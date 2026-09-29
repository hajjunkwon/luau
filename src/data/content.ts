export type PlaygroundTemplate = {
  id: string;
  title: string;
  blurb: string;
  code: string;
};

export const playgroundTemplates: PlaygroundTemplate[] = [
  {
    id: "blank",
    title: "빈 스크립트",
    blurb: "출력과 메모만 있는 시작점",
    code: `-- Luau Lab 플레이그라운드
-- Ctrl/Cmd + Enter 로 실행

print("ready")
`,
  },
  {
    id: "hello",
    title: "입장 인사",
    blurb: "플레이어 이름을 이어 붙이기",
    code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("Welcome, " .. player.Name)
print("UserId " .. player.UserId)
`,
  },
  {
    id: "score",
    title: "점수 계산",
    blurb: "변수, 복합 대입, 조건문",
    code: `local score = 0
local combo = 4

for i = 1, combo do
  score += 10
end

if score >= 30 then
  print("Nice combo")
else
  print("Keep going")
end

print("Score: " .. score)
`,
  },
  {
    id: "part",
    title: "파트 만들기",
    blurb: "Instance.new와 속성",
    code: `local part = Instance.new("Part")
part.Name = "SpawnPad"
part.Anchored = true
part.Size = Vector3.new(6, 1, 6)
part.Position = Vector3.new(0, 2, 0)
part.Color = Color3.fromRGB(0, 162, 255)
part.Parent = workspace

print(part.Name)
print(part.Size)
print(part.Parent.Name)
print("children: " .. #workspace:GetChildren())
`,
  },
  {
    id: "trap",
    title: "닿으면 출력",
    blurb: "Touched:Connect 연습",
    code: `local lava = Instance.new("Part")
lava.Name = "Lava"
lava.Parent = workspace

lava.Touched:Connect(function(hit)
  print("burned by " .. lava.Name)
  print("hit: " .. hit.Name)
end)

-- 연습장에서는 Fire로 이벤트를 흉내 냅니다.
local foot = Instance.new("Part")
foot.Name = "LeftFoot"
lava.Touched:Fire(foot)
`,
  },
];

export type CheatSection = {
  title: string;
  rows: { token: string; meaning: string }[];
};

export const cheatSections: CheatSection[] = [
  {
    title: "문법",
    rows: [
      { token: "local x = 1", meaning: "이 스크립트 범위의 변수" },
      { token: "x += 1", meaning: "x = x + 1 과 같음" },
      { token: '"a" .. "b"', meaning: "문자열 연결" },
      { token: "if a then .. end", meaning: "조건 블록" },
      { token: "a ~= b", meaning: "같지 않음" },
      { token: "for i = 1, n do", meaning: "숫자 반복. 끝값 포함" },
      { token: "function f(a)", meaning: "함수 선언. 끝은 end" },
      { token: "{1, 2} / {Name=..}", meaning: "배열은 1부터, 키-값도 가능" },
    ],
  },
  {
    title: "Roblox 객체",
    rows: [
      { token: 'Instance.new("Part")', meaning: "새 인스턴스 생성" },
      { token: "part.Parent = workspace", meaning: "계층에 넣기" },
      { token: "Vector3.new(x, y, z)", meaning: "위치·크기" },
      { token: "Color3.fromRGB(r,g,b)", meaning: "0–255 색" },
      { token: 'game:GetService("Players")', meaning: "서비스 가져오기" },
      { token: "event:Connect(fn)", meaning: "이벤트 구독" },
      { token: "part.Touched", meaning: "무언가 닿았을 때" },
      { token: "Players.PlayerAdded", meaning: "플레이어 입장" },
    ],
  },
];
