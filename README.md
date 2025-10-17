# 🧾 CODEX 입력용 — 소모품 관리 웹앱

## 📌 프로젝트 개요
- **프로젝트명:** 소모품 관리 웹앱 (Consumable Manager)
- **목표:** 사무실/현장별 소모품 요청, 지급, 구매요청, 재고관리 통합
- **핵심 기능:** 로그인(일반/관리자 분리), 재고관리, 요청(지급·구매), 이력, 사용자 관리
- **호스팅:** Vercel
- **DB:** Supabase(PostgreSQL)

---

## 👥 사용자 권한
### 1. 일반 사용자 (USER)
- 로그인: 아이디 + 비밀번호
- 기능: 재고 조회, 지급 요청, 구매 요청, 내 이력 확인

### 2. 관리자 (ADMIN)
- 로그인: 전용 페이지(비밀번호만 입력)
- 기능: 재고 조정, 지급 처리, 구매 승인·입고, 사용자·설정 관리

---

## 🧱 주요 메뉴
- **대시보드:** 재고 부족, 대기 요청, 최근 지급/입고
- **품목:** 코드·명칭·규격·단위·환산계수·최소재고 (단가 선택 입력)
- **재고:** 위치별 재고, 낱개/박스 동시 표기
- **요청:**
  - **지급 요청** → 재고 출고
  - **구매 요청** → 재고 없음/신규 품목 요청
- **이력:** 요청/승인/지급/입고 내역
- **사용자 관리:** 등록·비활성화
- **설정:** 원가방식, 승인규칙, 안전재고, 알림

---

## 💡 요청 프로세스
### 지급 요청
- 상태: 요청됨 → 준비중 → 지급완료 → 반려
- 단위: 낱개(EA) / 박스(BOX) 선택
- 내부저장은 EA 기준으로 환산

### 구매 요청
- 상태: 요청됨 → 승인 → 발주 → 입고완료
- 입력 항목:
  - **품명 (필수)**
  - **수량 (필수)**
  - **가격 (선택)**
  - **상품 링크 URL (선택)**
  - **사유 (선택)**

---

## 🧮 데이터 구조 (Supabase)
**users**
`id, username, name, process_code, role, password_hash, active`

**items**
`id, code, name, spec, base_uom, pack_uom, pack_factor, min_stock, list_price (optional)`

**inventory**
`id, item_id, location, qty_base, lot_no?, expiry?`

**requests**
`id, type[ISSUE|PURCHASE], requester_id, item_id?, free_item_name?, qty, uom, proposed_price?, link_url?, status, process_code, created_at`

**issues**
`id, request_id, issued_qty, issued_at`

**purchases**
`id, request_id, status, ordered_qty, expected_date`

**receipts**
`id, purchase_id, received_qty, unit_cost?, received_at`

---

## ⚙️ API 요약 (Next.js API Routes)
```
POST /auth/login            // 일반 로그인
POST /auth/admin-login      // 관리자 로그인
GET  /items                 // 품목 목록
POST /requests              // 지급/구매 요청 생성
PUT  /requests/:id/approve  // 요청 승인/반려
GET  /inventory             // 재고 조회
POST /issues                // 지급 처리
POST /purchases             // 구매/발주 생성
POST /receipts              // 입고 처리
GET  /logs                  // 이력/감사 로그
```

---

## 💵 가격/원가 관련
- 가격은 **선택 입력 필드**
- 원가 계산, 회계 연동 **없음**
- 금액 필드가 없을 경우 **수량 기준만 저장/표시**
- 보고서에서도 금액 항목은 **입력된 경우만 표시**

---

## 🖥️ 기술 스택
- **Frontend:** Next.js (React + TypeScript)
- **UI:** Tailwind + shadcn/ui
- **DB:** Supabase (PostgreSQL)
- **ORM:** Prisma 또는 Supabase Client
- **Auth:** Supabase Auth 또는 커스텀 JWT
- **Deploy:** Vercel (Environment Variables: SUPABASE_URL, SUPABASE_ANON_KEY)

---

## ✅ 수용 기준
- USER는 로그인 후 요청 생성 및 조회 가능
- ADMIN은 관리자 전용 페이지에서 로그인(비밀번호만)
- 구매요청 시 **품명 필수**, **가격/링크는 선택**
- 단위 EA/BOX 구분, 내부 저장은 EA 기준
- 모든 요청/출고/입고 이력은 DB에 기록

---

## 🚀 로컬 실행 방법
1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

### 🔐 테스트 로그인 정보
- **일반 사용자**: `user1` / `password123`
- **관리자**: 비밀번호 `admin123`

로그인 후 좌측 내비게이션을 통해 대시보드, 품목, 재고, 요청, 이력, 사용자, 설정 메뉴를 확인할 수 있습니다.
