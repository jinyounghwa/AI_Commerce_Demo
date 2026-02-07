import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import Link from "next/link";
import { CopilotActions } from "@/components/CopilotActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 샵 데모",
  description: "생성형 UI 실험적 커머스 플랫폼.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CopilotKit runtimeUrl="/api/copilotkit">
          <header className="py-8 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-tight flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="text-2xl font-bold tracking-tighter text-[#363636]">AI 샵 데모</span>
              </Link>
              <nav className="flex items-center gap-10">
                <Link href="/" className="text-sm font-medium text-[#4a4a4a] hover:text-[#4285f4] transition-colors">
                  제품
                </Link>
                <Link href="/ai-test" className="text-sm font-medium text-[#4a4a4a] hover:text-[#4285f4] transition-colors">
                  테스트
                </Link>
                <button className="btn-pill btn-primary text-sm">
                  장바구니
                </button>
              </nav>
            </div>
          </header>

          <CopilotSidebar
            defaultOpen={false}
            labels={{
              title: "AI 쇼핑 어시스턴트",
              initial: "오늘의 쇼핑 경험을 어떻게 도와드릴까요?",
            }}
            instructions="당신은 친절한 AI 쇼핑 전문가입니다. 사용자가 제품을 찾도록 돕고 AI 준비 기능에 대해 설명하세요. 가능한 경우 항상 제품 링크를 제공하세요."
          >
            <CopilotActions />
            <main className="flex-grow pt-10 pb-20">
              {children}
            </main>
          </CopilotSidebar>

          <footer className="py-20 border-t border-[#ededed] bg-[#f9f9f9]">
            <div className="container-tight grid md:grid-cols-2 gap-20">
              <div className="space-y-6">
                <div className="text-xl font-bold tracking-tighter text-[#363636]">AI 샵 데모</div>
                <p className="text-sm text-[#7a7a7a] leading-relaxed max-w-sm">
                  AI 에이전트와 구조화된 웹 데이터의 융합을 탐구하는 실험적 커머스 플랫폼입니다. 정밀성과 성능을 위해 제작되었습니다.
                </p>
              </div>
              <div className="flex justify-between md:justify-end gap-20">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#363636]">플랫폼</h4>
                  <ul className="space-y-2 text-sm text-[#7a7a7a]">
                    <li><Link href="/" className="hover:text-[#4285f4]">홈</Link></li>
                    <li><Link href="/ai-test" className="hover:text-[#4285f4]">AI 벤치마크</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#363636]">연결</h4>
                  <ul className="space-y-2 text-sm text-[#7a7a7a]">
                    <li className="hover:text-[#4285f4] cursor-pointer">GitHub</li>
                    <li className="hover:text-[#4285f4] cursor-pointer">Twitter</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container-tight mt-20 pt-10 border-t border-[#ededed] text-center text-xs text-[#7a7a7a] tracking-widest uppercase">
              &copy; 2026 AI COMMERCE LAB. ALL RIGHTS RESERVED.
            </div>
          </footer>
        </CopilotKit>
      </body>
    </html>
  );
}

