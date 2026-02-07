import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="space-y-32">
      {/* Hero Section: Clean & Academic */}
      <section className="container-tight pt-20 pb-10 text-center space-y-8">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-[#363636]">
          생성형 UI<br />
          <span className="text-[#7a7a7a]">커머스 플랫폼</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-[#7a7a7a] leading-relaxed font-medium">
          모든 요소가 AI의 이해와 인간의 정확한 판단을 위해 최적화된, 
          연구 중심의 차세대 커머스 경험을 제공합니다.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/ai-test" className="btn-pill btn-primary text-sm px-8">
            벤치마크 실행
          </Link>
          <a href="#products" className="btn-pill btn-secondary text-sm px-8">
            인벤토리 보기
          </a>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="container-tight grid md:grid-cols-3 gap-12 border-y border-[#ededed] py-16">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold tracking-tighter text-[#363636]">100%</div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#7a7a7a]">스키마 정확도</p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold tracking-tighter text-[#363636]">15+</div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#7a7a7a]">구조화된 자산</p>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold tracking-tighter text-[#363636]">0.1s</div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#7a7a7a]">추론 시간</p>
        </div>
      </section>

      {/* Main Product Grid */}
      <section id="products" className="container-tight space-y-16">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">컬렉션 개요</h2>
          <p className="text-[#7a7a7a] font-medium">고정밀 디지털 및 물리적 자산 인벤토리를 살펴보세요.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Readiness Section */}
      <section className="bg-[#f9f9f9] py-32 border-y border-[#ededed]">
        <div className="container-tight flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
             <div className="inline-block px-3 py-1 bg-white border border-[#ededed] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#4285f4]">
               AI 통합
             </div>
             <h2 className="text-4xl font-bold tracking-tighter leading-tight">
               자율 에이전트 시대를 위해<br />설계되었습니다.
             </h2>
             <p className="text-[#7a7a7a] leading-relaxed font-normal">
               전통적인 이커머스는 사람의 눈을 위해 만들어졌습니다. 
               우리의 플랫폼은 사람의 선택과 AI의 실행을 위해 만들어졌습니다. 
               모든 컴포넌트는 선호하는 LLM 런타임에 직접 고충실도 구조화 데이터를 전달합니다.
             </p>
             <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                   <div className="font-bold text-[#363636]">LD+JSON</div>
                   <p className="text-sm text-[#7a7a7a]">검색 준비된 시맨틱 데이터.</p>
                </div>
                <div className="space-y-2">
                   <div className="font-bold text-[#363636]">데이터 태그</div>
                   <p className="text-sm text-[#7a7a7a]">실시간 DOM 속성값.</p>
                </div>
             </div>
          </div>
          <div className="flex-1 w-full aspect-video bg-white rounded-2xl border border-[#ededed] shadow-2xl p-8 flex flex-col justify-center">
             <div className="space-y-4 font-mono text-xs text-[#7a7a7a]">
                <div className="flex gap-4">
                  <span className="text-[#4285f4]">{"{"}</span>
                </div>
                <div className="pl-4 flex gap-4">
                  <span className="text-emerald-600">"type"</span>: <span className="text-indigo-600">"Product"</span>,
                </div>
                <div className="pl-4 flex gap-4">
                  <span className="text-emerald-600">"availability"</span>: <span className="text-indigo-600">"InStock"</span>,
                </div>
                <div className="pl-4 flex gap-4">
                  <span className="text-emerald-600">"readability"</span>: <span className="text-indigo-600">1.0</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4285f4]">{"}"}</span>
                </div>
             </div>
             <div className="mt-8 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a7a]">활성 데이터 스트림</span>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-tight pb-32 text-center space-y-10">
        <h2 className="text-3xl font-bold tracking-tighter">AI 이해도를 벤치마킹할 준비가 되셨나요?</h2>
        <Link href="/ai-test" className="btn-pill btn-primary px-12 py-4">
          테스트 스위트 열기
        </Link>
      </section>
    </div>
  );
}
