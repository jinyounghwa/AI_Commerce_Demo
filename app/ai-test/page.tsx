import { TestRunner } from '@/components/ai-test/TestRunner';
import Link from 'next/link';

export default function AITestPage() {
  return (
    <div className="container-tight space-y-32 py-20">
      {/* Abstract/Header */}
      <section className="text-center space-y-8">
        <div className="inline-block px-3 py-1 bg-white border border-[#ededed] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#4285f4]">
          Internal Benchmark v2.0
        </div>
        <h1 className="text-5xl font-bold tracking-tighter text-[#363636]">
          AI 가독성 벤치마크
        </h1>
        <p className="max-w-xl mx-auto text-[#7a7a7a] leading-relaxed font-medium">
          구조화된 시맨틱 데이터를 해석하고 다양한 데이터 소스에서 논리적 추론을 수행하는 모델의 능력을 검증합니다.
        </p>
      </section>

      {/* Methodology Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { id: "01", title: "HTML 추출", desc: "시맨틱 DOM 속성 파싱." },
          { id: "02", title: "JSON-LD 로직", desc: "Schema.org 엔티티 해석." },
          { id: "03", title: "데이터 집계", desc: "다중 자산 통계 계산." },
          { id: "04", title: "프롬프트 합성", desc: "논리적 추천 생성." },
        ].map(item => (
          <div key={item.id} className="space-y-3">
             <div className="text-xs font-bold text-[#4285f4] font-mono">{item.id}</div>
             <h3 className="font-bold text-[#363636]">{item.title}</h3>
             <p className="text-xs text-[#7a7a7a] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Benchmarks Section */}
      <section className="space-y-12">
        <div className="flex items-center justify-between border-b border-[#ededed] pb-6">
           <h2 className="text-2xl font-bold tracking-tighter">시스템 벤치마크</h2>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a7a]">네트워크 활성</span>
           </div>
        </div>
        
        <div className="space-y-6">
          <TestRunner
            testName="html-parsing"
            testTitle="벤치마크 01: DOM 시맨틱 분석"
            testDescription="SSR HTML 구조에서 고정밀 속성을 추출합니다."
          />
          <TestRunner
            testName="jsonld-parsing"
            testTitle="벤치마크 02: 스키마 엔티티 해결"
            testDescription="Schema.org LD+JSON 파싱의 정확성을 검증합니다."
          />
          <TestRunner
            testName="data-analysis"
            testTitle="벤치마크 03: 통계적 연산"
            testDescription="15개 이상의 제품 데이터셋에 대해 실시간 집계를 수행합니다."
          />
          <TestRunner
            testName="recommendation"
            testTitle="벤치마크 04: 인지 추론"
            testDescription="추출된 컨텍스트를 기반으로 추천 품질을 평가합니다."
          />
        </div>
      </section>

      {/* Success Metrics */}
      <section className="grid md:grid-cols-2 gap-12 bg-[#f9f9f9] border border-[#ededed] rounded-2xl p-12">
        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-[#363636]">정밀도 임계값</h3>
           <div className="text-4xl font-bold tracking-tighter">90% 정확도</div>
           <p className="text-sm text-[#7a7a7a] leading-relaxed">
             모든 추출된 데이터 필드는 검증 레이어를 통과하기 위해 원본 진실과 최소 90% 일치해야 합니다.
           </p>
        </div>
        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-[#363636]">추론 품질</h3>
           <div className="text-4xl font-bold tracking-tighter">75% 관련성</div>
           <p className="text-sm text-[#7a7a7a] leading-relaxed">
             생성적 응답은 제공된 컨텍스트에 대한 키워드 존재 여부와 논리적 일관성을 평가받습니다.
           </p>
        </div>
      </section>

      {/* Environment Config */}
      <section className="space-y-6 text-center">
         <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-[#ededed] rounded-lg">
            <span className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">런타임 제공자:</span>
            <span className="text-[10px] font-bold text-[#363636] font-mono">MOCK_LLM_PRO_v1</span>
         </div>
         <p className="text-xs text-[#7a7a7a] max-w-sm mx-auto">
           프로덕션 LLM으로 업그레이드하려면 환경 설정에서 <code className="bg-slate-100 px-1">LLM_PROVIDER=openai</code>를 구성하세요.
         </p>
      </section>

      <div className="text-center pt-20">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#7a7a7a] hover:text-[#363636] transition-colors">
          메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
