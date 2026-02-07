"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { getAllProducts } from "@/lib/products";
import { useRouter } from "next/navigation";

export function CopilotActions() {
  const router = useRouter();
  const products = getAllProducts();

  // 제공된 상품 데이터를 AI가 읽을 수 있도록 설정
  useCopilotReadable({
    description: "List of all products available in the shop.",
    value: products,
  });

  // 상품 추천 액션
  useCopilotAction({
    name: "recommendProduct",
    description: "Recommend a specific product to the user.",
    parameters: [
      {
        name: "productId",
        type: "string",
        description: "ID of the product to recommend",
        required: true,
      },
      {
        name: "reason",
        type: "string",
        description: "Reason for recommendation",
        required: true,
      },
    ],
    render: (props) => {
      const product = products.find((p) => p.id === props.args.productId);
      if (!product) return <div className="p-4 text-xs font-bold text-rose-500">Asset not found.</div>;

      return (
        <div className="bg-white border border-[#ededed] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex gap-4">
             <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md border border-[#ededed]" />
             <div className="space-y-1">
               <div className="text-[10px] font-bold text-[#4285f4] uppercase tracking-widest">{product.brand}</div>
               <div className="font-bold text-[#363636] leading-tight">{product.name}</div>
               <div className="text-sm font-bold text-[#363636]">{product.price.toLocaleString()}원</div>
             </div>
          </div>
          <div className="text-[11px] text-[#7a7a7a] leading-relaxed border-l-2 border-[#ededed] pl-3 italic">
            "{props.args.reason}"
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => router.push(`/products/${product.slug}`)}
              className="flex-1 bg-white border border-[#ededed] text-[#363636] py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              자세히 보기
            </button>
            <button className="flex-1 bg-[#363636] text-white py-2 rounded-lg text-xs font-bold hover:bg-black transition-colors">
              실행
            </button>
          </div>
        </div>
      );
    },
    handler: async ({ productId }) => {
      console.log(`AI recommended product: ${productId}`);
    },
  });

  // 페이지 이동 액션
  useCopilotAction({
    name: "navigateTo",
    description: "Navigate to a specific page.",
    parameters: [
      {
        name: "page",
        type: "string",
        enum: ["home", "ai-test", "cart"],
        description: "Target page",
        required: true,
      },
    ],
    handler: async ({ page }) => {
      if (page === "home") router.push("/");
      else if (page === "ai-test") router.push("/ai-test");
      else if (page === "cart") router.push("/cart");
    },
  });

  return null;
}
