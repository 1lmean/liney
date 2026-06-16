# Liney

> 종이책도 좋고, 기록도 좋지만 글씨 쓰기는 싫은 사람들을 위한 필사 앱

책 페이지를 찍으면 OCR로 문장을 추출하고, 마음에 드는 줄을 골라 저장합니다.

<br/>

## 기술 스택

| 분류         | 스택                           |
| ------------ | ------------------------------ |
| 프레임워크   | React Native + Expo SDK 54     |
| 라우팅       | Expo Router                    |
| 스타일       | NativeWind (Tailwind CSS)      |
| 애니메이션   | Moti + React Native Reanimated |
| 상태관리     | Zustand                        |
| 백엔드/DB    | Supabase                       |
| 언어         | TypeScript                     |
| 패키지매니저 | pnpm                           |
| 아키텍처     | Feature-Sliced Design (FSD)    |

<br/>

## 디렉토리 구조

```
liney/
├── app/                        # Expo Router 진입점
│   ├── _layout.tsx
│   ├── index.tsx               # 컬렉션 메인
│   ├── scan.tsx                # 카메라 촬영
│   ├── select.tsx              # 문장 선택 (OCR)
│   └── book-info.tsx           # 책 정보 입력
├── src/
│   ├── pages/
│   │   ├── collection/         # 메인 컬렉션 화면
│   │   ├── scan/               # 카메라 촬영 화면
│   │   ├── select/             # OCR 문장 선택 화면
│   │   └── book-info/          # 책 정보 입력 화면
│   ├── widgets/
│   │   ├── user-profile/       # 유저 헤더 섹션
│   │   └── line-grid/          # 카드 그리드 + FAB
│   ├── entities/
│   │   └── line/               # 문장 도메인 (타입, 스토어, 카드 UI)
│   └── shared/
│       ├── ui/                 # 공통 컴포넌트
│       ├── lib/                # 외부 클라이언트 (Supabase)
│       ├── tokens/             # 디자인 토큰
│       └── utils/              # 유틸 함수
└── assets/
    └── fonts/
        └── BuheungJuwon.ttf    # 온글잎 부흥주원체
```

<br/>

## 디자인 시스템

### 컬러 — Stone 팔레트

| 토큰        | Light     | Dark      | 용도         |
| ----------- | --------- | --------- | ------------ |
| `bg`        | `#F8F8F7` | `#191919` | 앱 배경      |
| `bgSub`     | `#F0EFEE` | `#202020` | 보조 면      |
| `surface`   | `#FFFFFF` | `#252525` | 카드 · 칩    |
| `ink`       | `#1C1C1B` | `#EBEBEA` | 프라이머리   |
| `inkMuted`  | `#787774` | `#787774` | 보조 텍스트  |
| `inkSubtle` | `#AEACA8` | `#4A4A48` | 플레이스홀더 |
| `accent`    | `#37352F` | `#AEACA8` | 강조         |
| `highlight` | `#ECEAE8` | `#2A2A28` | 문장 선택    |
| `line`      | `#E3E2E0` | `#2F2F2D` | 구분선       |

### 타이포그래피

| variant     | 용도                        |
| ----------- | --------------------------- |
| `display`   | 유저명 등 대형 제목         |
| `wordmark`  | 앱 로고 (부흥주원체)        |
| `title`     | 섹션 제목                   |
| `bodySerif` | 문장 카드 본문 (부흥주원체) |
| `body`      | 일반 본문                   |
| `tag`       | 태그 · 칩                   |
| `caption`   | 메타 정보 · 날짜            |

### 공통 컴포넌트

- `Text` — variant · weight · color props
- `Button` — dark · soft · white variant
- `Chip` — selected 토글
- `Card` — shadow · radius 기본값 포함
- `Input` — label · focus 상태
- `Avatar` — 이미지 · 이니셜 · editable

<br/>

## 구현 현황

### ✅ 완료

- [x] 프로젝트 셋업 (Expo SDK 54 + NativeWind + Expo Router)
- [x] 디자인 토큰 정의 (colors · typography · spacing · shadow)
- [x] 공통 컴포넌트 구현 (Text · Button · Chip · Card · Input · Avatar)
- [x] `useLineStore` — 문장 CRUD (Zustand, 인메모리)
- [x] 메인 컬렉션 화면
  - [x] 유저 프로필 헤더 (이름 · 서브텍스트 · 줄/권 통계 · 아바타)
  - [x] 2열 카드 그리드
  - [x] 카드 — 문장 · 책 정보 · 날짜 포맷
  - [x] FAB (줄 추가 버튼)
- [x] 날짜 포맷 유틸 (`formatCardDate`)
  - 방금 / N분 전 / N시간 전 / 어제 / N일 전 / MM.DD / N년 전
- [x] FSD 아키텍처 마이그레이션
- [x] 다크모드 지원
- [x] 카메라 촬영 화면 (`ScanPage`)
- [x] OCR 기반 문장 선택 · 하이라이팅 UI (`SelectPage`)
- [x] 책 정보 입력 화면 — 제목 · 저자 · 페이지 (`BookInfoPage`)
- [x] Supabase 클라이언트 셋업 (`shared/lib/supabase.ts`)
- [x] Supabase `lines` 테이블 + RLS 정책 (본인 데이터만 접근)
- [x] 익명 로그인 (`signInAnonymously`) — 앱 진입 시 자동 인증
- [x] `useLineStore` → Supabase 영속화 연동 (fetch / insert / delete / update)


### 📋 진행 예정

#### 핵심 플로우

- [ ] 책 검색 연동
- [ ] 문장 수정 · 삭제 (바텀시트 메뉴)

#### 컬렉션

- [ ] 필터 (전체 · 이번주 · 이달 · 책별 · 랜덤)
- [ ] 책별 그룹핑 뷰

#### 나중에

- [ ] 홈 화면 위젯 (오늘의 줄)
- [ ] 1년 전 · 1달 전 문장 알림
- [ ] 선택한 사람에게만 공유
- [ ] 퍼블릭 피드

<br/>

## 로컬 실행

```bash
# 의존성 설치
pnpm install

# 웹 실행
pnpm expo start --web

# 실기기 (Expo Go)
pnpm expo start --tunnel
```

<br/>

## 네이밍

**Liney** — _line(줄)_ + _-y_ 접미사. 책의 한 줄을 긋고 담는다는 의미.
