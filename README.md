# Luau Lab

로블록스 **Luau** 문법을 브라우저에서 쓰고, 바로 퀴즈로 확인하는 연습장입니다.

- 문법 강조 + 자동완성 편집기 (Monaco, Luau 토큰)
- `print` 결과를 보여주는 실행 콘솔 (Lua 5.4 WASM + 학습용 Roblox API 모형)
- 10개 레슨: 객관식 + 코드 채점
- 종합 퀴즈, 플레이그라운드, 문법 노트

실제 Roblox Studio가 아닙니다. `Instance`, `Vector3`, `Touched` 등은 학습용으로 흉내 낸 것이고, 물리·네트워크·플러그인은 없습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 을 엽니다. 편집기에서 `Ctrl`/`Cmd` + `Enter` 로 실행합니다.

```bash
npm test      # 변환기·레슨 데이터·런타임 채점
npm run build
```

## 학습 경로

1. 첫 출력
2. 변수
3. 숫자 연산
4. 문자열
5. 조건문
6. 반복문
7. 함수
8. 테이블
9. Instance와 Workspace
10. 이벤트
