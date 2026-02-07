'use client';

import { useState } from 'react';
import { TestResult } from '@/lib/ai-test';

interface TestRunnerProps {
  testName: string;
  testTitle: string;
  testDescription: string;
}

export function TestRunner({ testName, testTitle, testDescription }: TestRunnerProps) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [showInput, setShowInput] = useState(false);

  const runTest = async () => {
    setRunning(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testName }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        testName,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="card-gen p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#363636]">{testTitle}</h3>
          <p className="text-sm text-[#7a7a7a] font-medium">{testDescription}</p>
        </div>

        <button
          onClick={runTest}
          disabled={running}
          className="btn-pill btn-primary text-xs whitespace-nowrap min-w-[120px]"
        >
          {running ? '실행 중...' : '벤치마크 실행'}
        </button>
      </div>

      {result && (
        <div className="space-y-6 mt-6 pt-6 border-t border-[#ededed]">
          {/* Status Bar */}
          <div className="flex items-center justify-between p-4 bg-[#f9f9f9] rounded-xl border border-[#ededed]">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${result.success ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <span className="font-bold text-sm tracking-tight text-[#363636]">
                {result.success ? '성공' : '실패'}
              </span>
            </div>
            {result.accuracy !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7a7a7a] uppercase tracking-widest">정확도</span>
                <span className="text-lg font-black text-[#363636]">
                  {(result.accuracy * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          {/* AI Response Preview */}
          {result.aiResponse && (
            <div className="space-y-4">
              <button
                onClick={() => setShowInput(!showInput)}
                className="text-[10px] font-bold text-[#4285f4] uppercase tracking-widest hover:underline"
              >
                {showInput ? '트레이스 숨기기' : '실행 트레이스 보기'}
              </button>
              {showInput && (
                <div className="bg-[#1e1e1e] p-5 rounded-xl border border-[#333] shadow-inner">
                  <pre className="text-[11px] font-mono text-emerald-400 overflow-auto max-h-80 leading-relaxed scrollbar-hide">
                    {result.aiResponse}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Detailed Field Analysis */}
          {result.details && result.details.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#363636]">필드 레벨 정밀도</h4>
              <div className="overflow-hidden border border-[#ededed] rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f9f9] border-b border-[#ededed]">
                    <tr>
                      <th className="px-4 py-3 font-bold text-[#363636]">속성</th>
                      <th className="px-4 py-3 font-bold text-[#363636]">Ground Truth</th>
                      <th className="px-4 py-3 font-bold text-[#363636]">모델 출력</th>
                      <th className="px-4 py-3 font-bold text-[#363636] text-center">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ededed]">
                    {result.details.map((detail, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[#4285f4]">{detail.field}</td>
                        <td className="px-4 py-3 text-[#7a7a7a]">{JSON.stringify(detail.expected)}</td>
                        <td className="px-4 py-3 text-[#363636] font-medium">{JSON.stringify(detail.aiValue)}</td>
                        <td className="px-4 py-3 text-center">
                          {detail.match ? (
                            <span className="text-emerald-500 font-bold">MATCH</span>
                          ) : (
                            <span className="text-rose-500 font-bold">MISMATCH</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
