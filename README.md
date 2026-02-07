# AI 친화적 쇼핑몰 데모

AI가 쇼핑몰 데이터를 얼마나 잘 이해하는지 보여주는 간단한 데모 프로젝트입니다.

## 🎯 프로젝트 목적

- AI 에이전트가 **구조화된 데이터를 쉽게 수집·이해**할 수 있도록 설계된 쇼핑몰
- AI가 실제로 데이터를 파싱하고 이해했음을 **테스팅 페이지에서 실시간 증명**
- 간단한 쇼핑몰 (상품 15개) + AI 친화적 마크업 + AI 테스트 페이지
- **CopilotKit 통합**으로 실시간 AI 어시스턴트 기능 제공

## 🛠️ 기술 스택

- **Frontend**: Next.js 16 (App Router, TypeScript, SSR)
- **스타일링**: Tailwind CSS v4
- **데이터**: JSON 파일 (DB 불필요)
- **AI**: OpenAI API
- **AI 통합**: CopilotKit (AI 어시스턴트)
- **아이콘**: Lucide React

## 📁 프로젝트 구조

```
AI_Commerce_Demo/
├── data/
│   └── products.json              # 상품 데이터 (15개, 5개 카테고리)
├── app/
│   ├── layout.tsx                 # 루트 레이아웃 (CopilotKit 설정)
│   ├── page.tsx                   # 메인 (상품 목록)
│   ├── products/[slug]/
│   │   └── page.tsx               # 상품 상세 페이지
│   ├── ai-test/
│   │   └── page.tsx               # AI 테스팅 페이지 ⭐
│   └── api/
│       ├── ai-test/
│       │   └── route.ts           # AI 테스트 API
│       └── copilotkit/
│           └── route.ts           # CopilotKit API 엔드포인트
├── components/
│   ├── ProductCard.tsx            # 상품 카드 컴포넌트
│   ├── ProductDetail.tsx          # 상품 상세 컴포넌트
│   ├── ProductJsonLd.tsx          # JSON-LD 스크립트 (Schema.org)
│   ├── AIReadabilityScore.tsx     # AI 가독성 점수 표시
│   ├── CopilotActions.tsx         # CopilotKit 액션 정의
│   └── ai-test/
│       └── TestRunner.tsx         # AI 테스트 실행기
└── lib/
    ├── products.ts                # 상품 데이터 로드 유틸
    └── ai-test.ts                 # LLM API 호출 로직
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 OpenAI API 키를 설정하세요:

```env
# OpenAI API (필수)
OPENAI_API_KEY=sk-your-api-key-here

# LLM Provider 설정 (선택, 기본값: openai)
LLM_PROVIDER=openai
```

**참고**: CopilotKit과 AI 테스트 기능 모두 OpenAI API를 사용합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 브라우저에서 확인

- **쇼핑몰**: http://localhost:3000
- **AI 테스트**: http://localhost:3000/ai-test
- **상품 상세 예시**: http://localhost:3000/products/macbook-pro-16

## ✨ 주요 기능

### 1. AI 친화적 쇼핑몰
- 15개 상품 (전자기기, 신발, 의류, 가방, 생활용품)
- JSON-LD, Semantic HTML, Data 속성으로 완벽한 구조화
- SSR로 JavaScript 없이도 AI가 데이터 추출 가능

### 2. CopilotKit AI 어시스턴트
- 실시간 AI 채팅 인터페이스
- 상품 검색, 추천, 가격 비교 등 AI 액션 제공
- OpenAI GPT-4 기반 자연어 대화

### 3. AI 테스트 페이지
- HTML 파싱, JSON-LD 이해도, 데이터 분석, 추론 테스트
- 실시간 정확도 측정 (목표: 90% 이상)
- AI 가독성 점수 표시

## 🤖 AI 친화적 기능

### 1. JSON-LD (Schema.org)

모든 상품 페이지에 구조화된 데이터 삽입:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "상품명",
  "brand": { "@type": "Brand", "name": "브랜드명" },
  "offers": {
    "@type": "Offer",
    "price": 129000,
    "priceCurrency": "KRW"
  }
}
```

### 2. Semantic HTML

```html
<article itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">상품명</h1>
  <data itemprop="price" value="129000">129,000원</data>
</article>
```

### 3. Data 속성

```html
<article
  data-product-id="prod-001"
  data-price="129000"
  data-in-stock="true">
```

## 🧪 AI 테스트

### 테스트 1: HTML 파싱
- 상품 페이지의 SSR HTML에서 AI가 상품 정보를 정확하게 추출하는지 검증

### 테스트 2: JSON-LD 이해도
- JSON-LD 스키마만 전달하여 AI가 구조화된 데이터를 이해하는지 검증

### 테스트 3: 데이터 분석
- 전체 상품 데이터를 분석하여 가격, 카테고리 분포 등을 정확하게 계산하는지 검증

### 테스트 4: 추론 및 추천
- 상품 데이터를 기반으로 AI가 논리적인 추천과 분석을 제공하는지 검증

## 📊 상품 데이터

총 15개 상품:
- 전자기기: 3개 (MacBook Pro, Galaxy S24, AirPods Pro)
- 신발: 2개 (Nike Air Max, Adidas Ultraboost)
- 의류: 4개 (North Face 재킷, 유니클로 히트텍, Zara 코트, Levi's 청바지)
- 가방: 2개 (Louis Vuitton, Herschel)
- 생활용품: 4개 (Dyson 청소기, Philips 에어프라이어, Balmuda 토스터, IKEA 램프)

## 🎯 성공 지표

1. ✅ `npm run dev` 한 번으로 전체 환경 실행
2. ✅ 15개 상품 데이터 (5개 카테고리) 정상 표시
3. ✅ AI 테스팅 4개 항목 전체 실행 가능
4. ✅ 종합 정확도 **90% 이상** 목표
5. ✅ SSR HTML에서 JavaScript 없이 모든 상품 데이터 추출 가능
6. ✅ JSON-LD, Semantic HTML, Meta 태그 정상 작동
7. ✅ CopilotKit AI 어시스턴트 실시간 동작
8. ✅ TypeScript + Tailwind CSS v4 완벽 통합

## 🔗 저장소

GitHub: [jinyounghwa/AI_Commerce_Demo](https://github.com/jinyounghwa/AI_Commerce_Demo)

## 📖 추가 문서

- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - 상세 구현 내역
- [CLAUDE.md](./CLAUDE.md) - 프로젝트 명세서 (PRD)

## 🛠️ 개발 가이드

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 상품 데이터 수정

`data/products.json` 파일을 편집하여 상품을 추가/수정/삭제할 수 있습니다.

### AI 테스트 커스터마이징

`lib/ai-test.ts` 및 `components/ai-test/TestRunner.tsx` 파일에서 테스트 로직을 수정할 수 있습니다.

## 📝 라이센스

ISC License

## 👨‍💻 개발 배경

이 프로젝트는 AI가 웹 데이터를 이해하는 최적의 방법을 시연하기 위해 만들어졌습니다.
Schema.org JSON-LD, Semantic HTML, 그리고 CopilotKit을 활용하여 AI 친화적인 웹 애플리케이션의 모범 사례를 제시합니다.
