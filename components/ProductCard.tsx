import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="card-gen group flex flex-col h-full overflow-hidden relative"
      itemScope
      itemType="https://schema.org/Product"
      data-product-id={product.id}
    >
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 text-[0px]">
        {product.name}
      </Link>
      
      {/* Simple & Clean Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f9f9f9]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle Label */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-[#363636] border border-[#ededed] uppercase tracking-widest shadow-sm">
            {product.brand}
          </span>
        </div>
      </div>

      {/* Detailed but Minimal Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4 relative z-10 pointer-events-none">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#4285f4] uppercase tracking-widest">
            {product.category}
          </span>
          <h2 
            className="text-lg font-bold text-[#363636] leading-tight group-hover:text-[#4285f4] transition-colors" 
            itemProp="name"
          >
            {product.name}
          </h2>
        </div>

        <p className="text-[#7a7a7a] text-sm leading-relaxed line-clamp-2" itemProp="description">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#ededed]">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#363636]" itemProp="price">
                {product.price.toLocaleString()}
                <span className="text-xs font-medium ml-0.5 text-[#7a7a7a]">원</span>
              </span>
            </div>
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-[#7a7a7a] uppercase tracking-tighter">AI 최적화</span>
              </div>
              <button 
                className="p-2 text-[#7a7a7a] hover:text-[#363636] transition-colors bg-white rounded-full border border-transparent hover:border-[#ededed]"
                aria-label="장바구니 담기"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
        </div>
      </div>
    </article>
  );
}
