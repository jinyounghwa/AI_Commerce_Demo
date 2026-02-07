import { Product } from '@/lib/products';
import { AIReadabilityScore } from './AIReadabilityScore';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, ShoppingBag, ArrowLeft, Layers, Cpu } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container-tight space-y-24 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7a7a7a] hover:text-[#363636] transition-colors">
        <ArrowLeft className="w-3 h-3" /> 메인으로 돌아가기
      </Link>

      <article
        className="grid lg:grid-cols-2 gap-20 items-start"
        itemScope
        itemType="https://schema.org/Product"
        data-product-id={product.id}
      >
        {/* Gallery: Minimal & Clean */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f9f9f9] border border-[#ededed]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#ededed] bg-[#f9f9f9]">
                <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info: High Hierarchy */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#4285f4] uppercase tracking-widest">{product.category}</span>
              <span className="text-[#ededed]">/</span>
              <span className="text-xs font-bold text-[#7a7a7a] uppercase tracking-widest" itemProp="brand">{product.brand}</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter text-[#363636]" itemProp="name">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 pt-2">
               <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm text-[#363636]">{product.rating}</span>
               </div>
               <span className="text-xs font-medium text-[#7a7a7a]">{product.reviewCount}개의 검증된 리뷰</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-4xl font-bold tracking-tighter text-[#363636]">
              {product.price.toLocaleString()}
              <span className="text-lg font-medium ml-1 text-[#7a7a7a]">원</span>
            </div>
            <p className="text-[#4a4a4a] leading-relaxed font-normal" itemProp="description">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="p-4 bg-[#f9f9f9] rounded-xl border border-[#ededed] flex gap-3">
                <Truck className="w-5 h-5 text-[#363636]" />
                <div className="space-y-1">
                   <div className="text-xs font-bold text-[#363636]">표준 물류 시스템</div>
                   <p className="text-[10px] text-[#7a7a7a]">전 세계 배송 가능.</p>
                </div>
             </div>
             <div className="p-4 bg-[#f9f9f9] rounded-xl border border-[#ededed] flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#363636]" />
                <div className="space-y-1">
                   <div className="text-xs font-bold text-[#363636]">정품 인증 프로토콜</div>
                   <p className="text-[10px] text-[#7a7a7a]">인증된 식별 해시.</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              disabled={!product.inStock}
              className="btn-pill btn-primary w-full py-4 text-base"
            >
              트랜잭션 시작
            </button>
            <div className="flex items-center justify-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-widest">즉시 추론 가능 상태</span>
            </div>
          </div>
        </div>
      </article>

      {/* AI Benchmarks Section */}
      <section className="space-y-12">
        <div className="space-y-4 text-center">
           <h2 className="text-3xl font-bold tracking-tighter text-[#363636]">자산 인텔리전스</h2>
           <p className="text-[#7a7a7a] font-medium">자율 에이전트 호환성을 위한 내부 메트릭.</p>
        </div>
        <AIReadabilityScore product={product} showDetails={true} />
      </section>

      {/* Developer Trace */}
      <section className="grid md:grid-cols-2 gap-10">
         <div className="card-gen bg-[#f9f9f9] p-10 space-y-6">
            <div className="flex items-center gap-3 text-[#363636]">
               <Layers className="w-5 h-5" />
               <h3 className="text-sm font-bold uppercase tracking-widest">시맨틱 스키마</h3>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 overflow-hidden">
               <pre className="text-[11px] font-mono text-emerald-400 overflow-auto scrollbar-hide">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  brand: product.brand,
  price: product.price,
  availability: product.inStock ? "InStock" : "OutOfStock"
}, null, 2)}
               </pre>
            </div>
         </div>

         <div className="card-gen bg-[#f9f9f9] p-10 space-y-6">
            <div className="flex items-center gap-3 text-[#363636]">
               <Cpu className="w-5 h-5" />
               <h3 className="text-sm font-bold uppercase tracking-widest">이산 데이터 속성</h3>
            </div>
            <div className="space-y-3">
               {[
                 { k: "asset_id", v: product.id },
                 { k: "currency_iso", v: product.currency },
                 { k: "inference_state", v: product.inStock ? "READY" : "OFFLINE" },
                 { k: "semantic_score", v: "1.0" },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center py-2 border-b border-[#ededed] last:border-0">
                    <span className="text-[10px] font-bold text-[#7a7a7a] font-mono">{item.k}</span>
                    <span className="text-[10px] font-bold text-[#363636] font-mono">{item.v}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
