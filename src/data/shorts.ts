import type { ShortTask } from "../types";

function short(
  id: string,
  topic: string,
  prompt: string,
  answers: string[],
  explain: string,
  placeholder?: string,
): ShortTask {
  return { kind: "short", id, topic, prompt, answers, explain, placeholder };
}

export const shortBank: ShortTask[] = [
  short("s-print", "출력", "화면에 값을 출력하는 함수 이름은?", ["print", "print()"], "print(...) 가 Luau의 기본 출력입니다."),
  short("s-comment", "주석", "한 줄 주석을 시작하는 기호는?", ["--"], "두 개의 하이픈입니다. -- 메모"),
  short("s-nil", "값", "아무 값도 없을 때 쓰는 이름은?", ["nil"], "JavaScript의 undefined가 아니라 nil입니다."),
  short("s-true", "값", "참을 나타내는 키워드는?", ["true"], "소문자 true 입니다. True 가 아닙니다."),
  short("s-false", "값", "거짓을 나타내는 키워드는?", ["false"], "소문자 false 입니다."),
  short("s-local", "변수", "스크립트 안에서 변수를 만들 때 붙이는 키워드는?", ["local"], "local coins = 0"),
  short("s-and", "논리", "둘 다 참일 때만 참인 연산자는?", ["and"], "if hp > 0 and alive then"),
  short("s-or", "논리", "하나라도 참이면 참인 연산자는?", ["or"], "if a or b then"),
  short("s-not", "논리", "참/거짓을 뒤집는 연산자는?", ["not"], "if not seated then"),
  short("s-eq", "비교", "두 값이 같은지 비교하는 연산자는?", ["=="], "a == b. 대입은 = 하나, 비교는 == 둘입니다."),
  short("s-neq", "비교", "두 값이 다른지 비교하는 연산자는?", ["~="], "!= 가 아니라 ~= 입니다."),
  short("s-gt", "비교", "왼쪽이 더 클 때 쓰는 기호는?", [">"], "score > 10"),
  short("s-lt", "비교", "왼쪽이 더 작을 때 쓰는 기호는?", ["<"], "hp < 1"),
  short("s-ge", "비교", "이상(≥)을 나타내는 연산자는?", [">="], "rank >= 10"),
  short("s-le", "비교", "이하(≤)를 나타내는 연산자는?", ["<="], "hp <= 0"),
  short("s-plus", "연산", "더하기 기호는?", ["+"], "1 + 2"),
  short("s-minus", "연산", "빼기 기호는?", ["-"], "10 - 3"),
  short("s-mul", "연산", "곱하기 기호는?", ["*"], "7 * 6"),
  short("s-div", "연산", "나누기 기호는?", ["/"], "10 / 2"),
  short("s-mod", "연산", "나머지(modulo) 연산자는?", ["%"], "10 % 3 은 1"),
  short("s-pow", "연산", "거듭제곱 연산자는?", ["^"], "2 ^ 3 은 8"),
  short("s-idiv", "연산", "나눗셈의 정수 몫 연산자는?", ["//"], "7 // 2 는 3"),
  short("s-add-eq", "연산", "변수에 숫자를 더해 다시 넣는 복합 대입은?", ["+="], "score += 5 는 score = score + 5"),
  short("s-concat", "문자열", "두 문자열을 이어 붙이는 연산자는?", [".."], '"Hi " .. name'),
  short("s-len", "테이블", "배열 길이를 구하는 연산자는?", ["#"], "#pets"),
  short("s-index1", "테이블", "배열에서 첫 번째 칸의 번호는?", ["1"], "Lua/Luau는 1부터 셉니다. pets[1]"),
  short("s-table-brace", "테이블", "테이블을 만들 때 쓰는 괄호는? (여는 것만)", ["{"], 'local t = { 1, 2 }'),
  short("s-if", "조건", "조건문의 시작 키워드는?", ["if"], "if hp <= 0 then"),
  short("s-then", "조건", "if 조건 바로 뒤에 오는 키워드는?", ["then"], "if ready then"),
  short("s-else", "조건", "조건이 아닐 때 실행하는 키워드는?", ["else"], "if ... then ... else ... end"),
  short("s-elseif", "조건", "다른 조건을 이어서 붙이는 키워드는?", ["elseif"], "elseif 은 한 단어입니다."),
  short("s-end", "문법", "if / function / for 블록을 닫는 키워드는?", ["end"], "중괄호 {} 대신 end 를 씁니다."),
  short("s-for", "반복", "숫자를 정해진 횟수만큼 도는 키워드는?", ["for"], "for i = 1, 10 do"),
  short("s-do", "반복", "for / while 본문 앞에 오는 키워드는?", ["do"], "for i = 1, 3 do print(i) end"),
  short("s-while", "반복", "조건이 참인 동안 반복하는 키워드는?", ["while"], "while n > 0 do"),
  short("s-repeat", "반복", "일단 한 번 실행하고 조건으로 끝나는 반복의 시작은?", ["repeat"], "repeat ... until cond"),
  short("s-until", "반복", "repeat 반복을 끝내는 키워드는?", ["until"], "until done"),
  short("s-break", "반복", "반복을 중간에 끊는 키워드는?", ["break"], "if found then break end"),
  short("s-function", "함수", "함수를 만드는 키워드는?", ["function"], "function add(a, b)"),
  short("s-return", "함수", "함수에서 값을 돌려주는 키워드는?", ["return"], "return a + b"),
  short("s-type", "타입", "값의 기본 타입 이름을 문자열로 돌려주는 함수는?", ["type", "type()"], 'type(1) 은 "number"'),
  short("s-typeof", "타입", "Roblox 타입(Vector3, Instance)까지 구분하는 함수는?", ["typeof", "typeof()"], "Luau/Roblox에서는 typeof 를 자주 씁니다."),
  short("s-tostring", "변환", "값을 문자열로 바꾸는 함수는?", ["tostring", "tostring()"], "tostring(25)"),
  short("s-tonumber", "변환", "문자열을 숫자로 바꾸는 함수는?", ["tonumber", "tonumber()"], 'tonumber("12")'),
  short("s-wait", "시간", "잠시 멈추는 예전 전역 함수는? (한 단어)", ["wait", "wait()"], "요즘은 task.wait 를 권장합니다."),
  short("s-task-wait", "시간", "권장하는 대기 함수는? (점 포함)", ["task.wait", "task.wait()"], "task.wait(1)"),
  short("s-instance-new", "Roblox", "새 객체를 만드는 코드의 앞부분은? (점 포함)", ["Instance.new", "Instance.new()"], 'Instance.new("Part")'),
  short("s-part", "Roblox", 'Instance.new("____") 에 넣을, 기본 블록 클래스 이름은?', ["Part"], "가장 많이 만드는 3D 블록입니다."),
  short("s-parent", "Roblox", "객체를 어디에 붙일지 정하는 속성 이름은?", ["Parent"], "part.Parent = workspace"),
  short("s-name", "Roblox", "객체의 이름 속성은?", ["Name"], 'part.Name = "Floor"'),
  short("s-workspace", "Roblox", "3D 월드가 들어 있는 전역 이름은?", ["workspace", "Workspace", "game.Workspace"], "보통 소문자 workspace 를 씁니다."),
  short("s-game", "Roblox", "게임에 붙어 있는 최상위 DataModel 전역은?", ["game"], "game:GetService(...)"),
  short("s-getservice", "Roblox", "서비스를 가져오는 메서드 이름은?", ["GetService", "game:GetService"], 'game:GetService("Players")'),
  short("s-players", "Roblox", "플레이어 목록 서비스 이름은?", ["Players"], 'game:GetService("Players")'),
  short("s-localplayer", "Roblox", "내 플레이어 객체 속성 이름은?", ["LocalPlayer"], "Players.LocalPlayer"),
  short("s-vector3", "Roblox", "위치·크기를 만드는 타입 이름은?", ["Vector3", "Vector3.new"], "Vector3.new(0, 5, 0)"),
  short("s-color3", "Roblox", "색을 나타내는 타입 이름은?", ["Color3", "Color3.fromRGB", "Color3.new"], "Color3.fromRGB(0, 162, 255)"),
  short("s-fromrgb", "Roblox", "0–255 색으로 Color3를 만드는 함수는? (점 포함)", ["Color3.fromRGB", "fromRGB"], "Color3.fromRGB(r, g, b)"),
  short("s-anchored", "Roblox", "파트가 물리로 안 떨어지게 고정하는 속성은?", ["Anchored"], "part.Anchored = true"),
  short("s-cancollide", "Roblox", "파트에 충돌을 켤지 정하는 속성은?", ["CanCollide"], "part.CanCollide = false"),
  short("s-size", "Roblox", "파트의 크기 속성 이름은?", ["Size"], "part.Size = Vector3.new(4, 1, 2)"),
  short("s-position", "Roblox", "파트의 위치 속성 이름은?", ["Position"], "part.Position = Vector3.new(0, 10, 0)"),
  short("s-connect", "이벤트", "이벤트에 함수를 연결하는 메서드 이름은?", ["Connect", ":Connect"], "Touched:Connect(function(hit) end)"),
  short("s-touched", "이벤트", "파트에 무언가 닿았을 때 나는 이벤트 이름은?", ["Touched"], "part.Touched:Connect(...)"),
  short("s-playeradded", "이벤트", "새 플레이어가 들어왔을 때 나는 이벤트 이름은?", ["PlayerAdded"], "Players.PlayerAdded:Connect(...)"),
  short("s-script", "Roblox", "지금 실행 중인 스크립트 객체 전역은?", ["script"], "script.Parent"),
  short("s-script-parent", "Roblox", "이 스크립트가 들어 있는 객체는? (점 포함)", ["script.Parent"], "도구, 파트 안에 스크립트를 넣을 때 씁니다."),
  short("s-pairs", "테이블", "딕셔너리 테이블을 순회할 때 쓰는 함수는?", ["pairs", "pairs()"], "for k, v in pairs(t) do"),
  short("s-ipairs", "테이블", "배열을 순서대로 순회할 때 쓰는 함수는?", ["ipairs", "ipairs()"], "for i, v in ipairs(list) do"),
  short("s-pcall", "오류", "에러가 나도 스크립트가 안 죽게 감싸는 함수는?", ["pcall", "pcall()"], "local ok, result = pcall(fn)"),
  short("s-warn", "출력", "경고로 출력하는 함수는?", ["warn", "warn()"], "print와 비슷하지만 노란 경고로 보입니다."),
  short("s-in", "반복", "for k, v in pairs(t) 에서 in 은 무슨 키워드? (그대로)", ["in"], "generic for 문법입니다."),
  short("s-dot", "문법", "part.Name 처럼 속성에 접근할 때 쓰는 기호는?", ["."], "점 문법. 키 이름이 식별자일 때."),
  short("s-colon", "문법", "part:Destroy() 처럼 메서드를 부를 때 쓰는 기호는?", [":"], "콜론은 self를 자동으로 넘깁니다."),
];

export const QUIZ_LENGTH = 20;

export function pickShortQuiz(count = QUIZ_LENGTH): ShortTask[] {
  const next = [...shortBank];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next.slice(0, Math.min(count, next.length));
}
