# AI 친화적 쇼핑몰 데모 - 간소화 버전

## 1. 프로젝트 개요

### 1.1 목적
AI가 쇼핑몰 데이터를 얼마나 잘 이해하는지 보여주는 간단한 데모
- AI 에이전트가 **구조화된 데이터를 쉽게 수집·이해**할 수 있도록 설계
- AI가 실제로 데이터를 파싱하고 이해했음을 **테스팅 페이지에서 실시간 증명**
- 간단한 쇼핑몰 (상품 10-20개) + AI 친화적 마크업 + AI 테스트 페이지

### 1.2 기술 스택 (최소화)
| 구분 | 기술 | 비고 |
|---|---|---|
| Frontend | Next.js 15 (App Router, SSR) | TypeScript |
| 스타일링 | Tailwind CSS | |
| 데이터 저장 | JSON 파일 | DB 불필요 |
| AI 테스트 | LLM API | OpenAI 또는 로컬 LLM |

**제거된 것들**:
- ❌ NestJS 백엔드
- ❌ PostgreSQL, TypeORM
- ❌ Redis
- ❌ LocalStack
- ❌ Docker Compose
- ❌ GraphQL
- ❌ 복잡한 엔티티 관계

**예상 소요 시간**: 2-3시간 (기존 10시간 → 2-3시간으로 단축)

---

## 2. 프로젝트 구조

```
AI_Commerce_Demo/
├── package.json
├── next.config.js
├── tailwind.config.js
├── .env.local
├── data/
│   └── products.json          # 상품 데이터 (10-20개)
├── public/
│   └── images/
│       └── products/          # placeholder 이미지
├── app/
│   ├── layout.tsx
│   ├── page.tsx               # 메인 (상품 목록)
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx       # 상품 상세
│   ├── ai-test/
│   │   └── page.tsx           # AI 테스팅 페이지 ⭐
│   └── api/
│       └── ai-test/
│           └── route.ts       # AI 테스트 API
├── components/
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   ├── ProductJsonLd.tsx      # JSON-LD 스크립트
│   └── ai-test/
│       ├── TestRunner.tsx
│       └── ResultDisplay.tsx
└── lib/
    ├── products.ts            # 상품 데이터 로드
    └── ai-test.ts             # LLM API 호출
```

---

## 3. 데이터 구조

### 3.1 products.json

```json
[
  {
    "id": "prod-001",
    "slug": "nike-air-max-90",
    "name": "Nike Air Max 90",
    "description": "클래식한 디자인의 러닝화",
    "price": 129000,
    "currency": "KRW",
    "brand": "Nike",
    "category": "신발",
    "inStock": true,
    "images": [
      "/images/products/nike-air-max-90/1.jpg",
      "/images/products/nike-air-max-90/2.jpg"
    ],
    "rating": 4.5,
    "reviewCount": 230
  }
]
```

**총 상품 수**: 10-20개 (다양한 카테고리)
- 전자기기: 2-3개
- 의류: 3-4개
- 신발: 2-3개
- 가방: 2-3개
- 생활용품: 2-3개

---

## 4. AI 친화적 마크업

### 4.1 JSON-LD (Schema.org)

상품 상세 페이지의 `<head>`에 삽입:

```typescript
// components/ProductJsonLd.tsx
export function ProductJsonLd({ product }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "brand": { "@type": "Brand", "name": product.brand },
    "offers": {
      "@type": "Offer",
      "priceCurrency": product.currency,
      "price": product.price,
      "availability": product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### 4.2 Semantic HTML + data 속성

```tsx
<article
  itemScope
  itemType="https://schema.org/Product"
  data-product-id={product.id}
  data-price={product.price}
  data-currency={product.currency}
  data-in-stock={product.inStock}
>
  <h1 itemProp="name">{product.name}</h1>
  <img itemProp="image" src={product.images[0]} alt={product.name} />
  <p itemProp="description">{product.description}</p>
  <data itemProp="price" value={product.price}>
    {product.price.toLocaleString()}원
  </data>
</article>
```

### 4.3 Meta 태그

```tsx
export const metadata = {
  title: product.name,
  description: product.description,
  openGraph: {
    title: product.name,
    description: product.description,
    images: product.images,
  },
  other: {
    'ai-content-type': 'product-detail',
    'ai-data-price': product.price,
    'ai-data-brand': product.brand,
  }
};
```

---

## 5. AI 테스팅 페이지 (`/ai-test`)

### 5.1 테스트 항목 (3-4개)

#### 테스트 1: HTML 파싱 테스트
- 입력: 상품 페이지의 SSR HTML
- AI 작업: HTML에서 상품 정보 추출
- 검증: 추출된 데이터 vs 원본 JSON 비교

#### 테스트 2: JSON-LD 이해도 테스트
- 입력: JSON-LD 스크립트만 전달
- AI 작업: 상품 정보 요약
- 검증: 핵심 필드 정확도

#### 테스트 3: 데이터 분석 테스트
- 입력: 전체 상품 목록 JSON
- AI 작업: 가장 비싼 상품, 평균 가격, 카테고리별 분포 분석
- 검증: 계산 정확도

#### 테스트 4: 추론 테스트 (선택)
- 입력: 상품 데이터
- AI 작업: 추천 상품 제안, 가격 트렌드 분석
- 검증: 논리성 평가

### 5.2 UI 구조

```
/ai-test 페이지
├── 상단: 전체 실행 버튼
├── 테스트 카드 x 3-4개
│   ├── 테스트명
│   ├── [실행] 버튼
│   ├── 입력 데이터 (접기/펼치기)
│   ├── AI 응답 (스트리밍)
│   ├── 검증 결과
│   │   ├── ✅ 정확 / ❌ 불일치
│   │   └── 정확도: 95%
│   └── 소요 시간
└── 하단: 종합 결과
```

---

## 6. 구현 단계

### 1단계: Next.js 프로젝트 초기화 (15분)
```bash
npx create-next-app@latest ai-commerce-demo --typescript --tailwind --app
cd ai-commerce-demo
```

### 2단계: 데이터 준비 (30분)
- `data/products.json` 작성 (10-20개 상품)
- `public/images/products/` placeholder 이미지

### 3단계: 상품 페이지 구현 (45분)
- `app/page.tsx` - 상품 목록
- `app/products/[slug]/page.tsx` - 상품 상세
- JSON-LD, semantic HTML 적용

### 4단계: AI 테스트 페이지 (60분)
- `app/ai-test/page.tsx` - UI
- `app/api/ai-test/route.ts` - LLM 호출 로직
- 3-4개 테스트 케이스 구현

### 5단계: 검증 (15분)
- 페이지 동작 확인
- AI 테스트 실행
- 정확도 확인

**총 소요 시간**: 약 2.5시간

---

## 7. 환경 변수

```env
# .env.local
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-xxxxx

# 또는 로컬 LLM
# LLM_PROVIDER=local
# LLM_ENDPOINT=http://localhost:11434/v1/chat/completions
# LLM_MODEL=qwen2.5:7b
```

---

## 8. 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 접속
# 쇼핑몰:     http://localhost:3000
# AI 테스트:   http://localhost:3000/ai-test
```

---

## 9. 검증 방법

1. **상품 페이지 확인**
   - http://localhost:3000 (상품 목록)
   - http://localhost:3000/products/[slug] (상품 상세)

2. **JSON-LD 확인**
   - 페이지 소스 보기
   - `<script type="application/ld+json">` 확인

3. **AI 테스트 실행**
   - http://localhost:3000/ai-test
   - 각 테스트 실행 버튼 클릭
   - 정확도 90% 이상 확인

---

## 10. 성공 지표

1. `npm run dev` 한 번으로 전체 환경 실행
2. 10-20개 상품 데이터 정상 표시
3. AI 테스팅 3-4개 항목 전체 실행 가능, 종합 정확도 **90% 이상**
4. SSR HTML에서 JavaScript 없이 모든 상품 데이터 추출 가능
5. JSON-LD, semantic HTML, meta 태그 정상 작동
