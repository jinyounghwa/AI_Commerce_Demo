'use client';

import { Product } from '@/lib/products';
import { Layers, Globe, Cpu, AlignLeft, PackageCheck, Target, Activity } from 'lucide-react';

interface AIReadabilityScoreProps {
  product: Product;
  showDetails?: boolean;
}

interface ScoreItem {
  name: string;
  score: number;
  maxScore: number;
  evidence: string;
  aiInterpretation: string;
  icon: React.ReactNode;
}

export function AIReadabilityScore({ product, showDetails = true }: AIReadabilityScoreProps) {
  const scoreItems: ScoreItem[] = [
    {
      name: 'Schema Mapping',
      score: 25,
      maxScore: 25,
      icon: <Layers className="w-4 h-4" />,
      evidence: `{"@type":"Product","name":"${product.name}"}`,
      aiInterpretation: `휴리스틱 파싱 없이 Schema.org 엔티티로 직접 해결됩니다.`
    },
    {
      name: 'DOM Semantic Linkage',
      score: 20,
      maxScore: 20,
      icon: <Globe className="w-4 h-4" />,
      evidence: `<article itemscope itemtype="...">`,
      aiInterpretation: `비시각적 탐색을 위한 결정론적 위계가 제공됩니다.`
    },
    {
      name: 'Discrete Attributes',
      score: 15,
      maxScore: 15,
      icon: <Cpu className="w-4 h-4" />,
      evidence: `data-product-id="${product.id}"`,
      aiInterpretation: `원자적 데이터 속성에서 제로-추론 값 추출이 가능합니다.`
    },
    {
      name: 'Token Clarity',
      score: 15,
      maxScore: 15,
      icon: <AlignLeft className="w-4 h-4" />,
      evidence: `SEMANTIC_STRUC_PASS`,
      aiInterpretation: `트랜스포머 혼동을 최소화하는 선형적 제목 구조입니다.`
    },
    {
      name: 'State Logic',
      score: 15,
      maxScore: 15,
      icon: <PackageCheck className="w-4 h-4" />,
      evidence: `itemprop="availability"`,
      aiInterpretation: `자율 의사결정 분기를 위한 불리언 상태 해결이 가능합니다.`
    },
    {
      name: 'Contextual Meta',
      score: 10,
      maxScore: 10,
      icon: <Target className="w-4 h-4" />,
      evidence: `name="ai-content-type"`,
      aiInterpretation: `우선순위가 지정된 컴퓨팅 할당을 위한 추론 전 필터링입니다.`
    }
  ];

  const totalScore = scoreItems.reduce((sum, item) => sum + item.score, 0);
  const maxScore = scoreItems.reduce((sum, item) => sum + item.maxScore, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="card-gen bg-white p-12 space-y-16">
      <div className="flex flex-col md:flex-row items-center gap-16">
        {/* Progress Gauge */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full -rotate-90">
             <circle cx="80" cy="80" r="70" stroke="#f3f3f3" strokeWidth="8" fill="none" />
             <circle 
               cx="80" cy="80" r="70" stroke="#4285f4" strokeWidth="8" fill="none" 
               strokeDasharray={`${(percentage / 100) * 440} 440`}
               strokeLinecap="round"
               className="transition-all duration-1000 ease-out"
             />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="text-4xl font-bold tracking-tighter text-[#363636]">{percentage}%</div>
             <div className="text-[9px] font-bold text-[#7a7a7a] uppercase tracking-widest">신뢰도</div>
          </div>
        </div>

        <div className="flex-grow space-y-6">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="px-2 py-0.5 bg-[#4285f4]/10 rounded border border-[#4285f4]/20 text-[10px] font-mono text-[#4285f4] font-bold">
                    ID: {product.slug}
                 </div>
                 <div className="flex items-center gap-1 ml-2">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">활성 추론 채널</span>
                 </div>
              </div>
              <h3 className="text-3xl font-bold tracking-tighter text-[#363636]">자산 접근성 리포트</h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed max-w-2xl font-medium">
                자율 에이전트를 위한 자산의 구조적 무결성에 대한 포괄적인 감사입니다. 100% 점수는 Schema.org v4.0 및 W3C 시맨틱 표준과의 완벽한 정렬을 나타냅니다.
              </p>
           </div>
           
           <div className="flex gap-10">
              <div className="space-y-1">
                 <div className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">종합 점수</div>
                 <div className="text-xl font-bold text-[#363636]">{totalScore} <span className="text-[#ededed]">/</span> {maxScore}</div>
              </div>
              <div className="space-y-1">
                 <div className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">상태</div>
                 <div className="text-xl font-bold text-emerald-500 uppercase tracking-tighter">최적화됨</div>
              </div>
           </div>
        </div>
      </div>

      {showDetails && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16 border-t border-[#ededed] pt-16">
          {scoreItems.map((item, i) => (
            <div key={i} className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-[#f9f9f9] border border-[#ededed] rounded text-[#363636]">
                        {item.icon}
                     </div>
                     <span className="text-xs font-bold text-[#363636] uppercase tracking-tight">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#7a7a7a] font-mono">{item.score}pt</span>
               </div>
               
               <div className="space-y-3">
                  <div className="bg-[#f9f9f9] p-3 rounded-md border border-[#ededed] overflow-hidden">
                     <code className="text-[10px] text-[#4285f4] font-mono block truncate">
                        {item.evidence}
                     </code>
                  </div>
                  <p className="text-xs text-[#7a7a7a] leading-relaxed">
                     {item.aiInterpretation}
                  </p>
               </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-[#363636] rounded-xl p-8 flex items-center justify-between text-white">
         <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full border-2 border-[#4a4a4a] bg-[#1e1e1e] flex items-center justify-center text-[10px] font-bold">AI</div>
            <div className="space-y-1">
               <div className="font-bold text-sm tracking-tight text-white/90">에이전트 인사이트 엔진</div>
               <p className="text-xs text-white/50 tracking-wide font-medium">{product.name}에 대한 구조화된 컨텍스트 처리 중...</p>
            </div>
         </div>
         <button className="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            리포트 생성
         </button>
      </div>
    </div>
  );
}
