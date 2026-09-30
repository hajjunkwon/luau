# Luau Lab

로블록스 **Luau** 문법을 브라우저에서 쓰고, 조건에 맞게 코드를 짜는 연습장입니다.

- 문법 강조 + 자동완성 편집기 (Monaco, Luau 토큰)
- `print` 결과를 보여주는 실행 콘솔 (Lua 5.4 WASM + 학습용 Roblox API 모형)
- 18개 레슨: 설명 뒤에 플레이그라운드형 코드 미션
- 코딩 퀴즈: 조건을 보고 코드를 짜면 실행 결과로 채점 (미션 은행에서 무작위)

실제 Roblox Studio가 아닙니다. `Instance`, `Vector3`, `Touched`, `ClickDetector`, `Humanoid` 등은 학습용으로 흉내 낸 것이고, 물리·네트워크·플러그인은 없습니다.

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
11. math 라이브러리
12. 문자열 함수
13. 테이블 고치기
14. 클릭과 체력
15. 테이블 순회
16. 색과 재질
17. task와 여러 값
18. 자식 찾기
