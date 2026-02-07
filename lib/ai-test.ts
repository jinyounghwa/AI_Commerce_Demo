import OpenAI from 'openai';

export interface TestResult {
  testName: string;
  success: boolean;
  accuracy?: number;
  aiResponse?: string;
  expectedData?: any;
  extractedData?: any;
  details?: FieldComparison[];
  executionTimeMs?: number;
  error?: string;
}

export interface FieldComparison {
  field: string;
  expected: any;
  aiValue: any;
  match: boolean;
}

export async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  responseFormat: 'text' | 'json' = 'text'
): Promise<string> {
  const provider = process.env.LLM_PROVIDER || 'openai';

  if (provider === 'openai') {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: responseFormat === 'json' ? { type: 'json_object' } : undefined,
    });

    return response.choices[0].message.content || '';
  } else if (provider === 'mock') {
    // Mock AI for demo purposes
    // Returns accurate data based on actual product data to simulate "perfect" AI parsing
    
    if (responseFormat === 'json') {
      // Test 3: Data Analysis - MUST BE FIRST because the prompt contains all products
      if (userPrompt.includes('Analyze this product data') || (userPrompt.includes('product data') && userPrompt.includes('statistics'))) {
        return JSON.stringify({
          totalProducts: 15,
          avgPrice: 620453,
          maxPrice: 2390000,
          minPrice: 19900,
          inStockCount: 13,
          categoryCount: 5
        });
      }
      
      // Test 1: HTML Parsing (MacBook Pro 14)
      if (userPrompt.includes('MacBook Pro 14')) {
        return JSON.stringify({
          name: "MacBook Pro 14인치 M3",
          description: "강력한 성능의 M3 칩을 탑재한 14인치 MacBook Pro. 전문가를 위한 최고의 노트북.",
          price: 2390000,
          currency: "KRW",
          brand: "Apple",
          category: "전자기기",
          inStock: true,
          rating: 4.8,
          reviewCount: 342
        });
      }
      
      // Test 2: JSON-LD (Nike Air Max 90)
      if (userPrompt.includes('Nike Air Max 90')) {
        return JSON.stringify({
          name: "Nike Air Max 90",
          description: "클래식한 디자인의 러닝화. 편안함과 스타일을 동시에.",
          price: 129000,
          currency: "KRW",
          brand: "Nike",
          inStock: true,
          rating: 4.5,
          reviewCount: 1234
        });
      }
    }
    
    if (responseFormat === 'text') {
      return `[AI 분석 결과]
1. 가장 비싼 상품 TOP 3: MacBook Pro 14인치 M3 (2,390,000원), Louis Vuitton 스피디 백 (2,180,000원), Galaxy S24 Ultra (1,598,000원)
2. 가장 인기 있는 카테고리: 의류, 생활용품 (각 4개 상품)
3. 전체 상품 평균 평점: 약 4.63점
4. 가성비 상품 추천: IKEA 데스크 램프 (19,900원) 또는 유니클로 히트텍 (29,900원)을 추천합니다.
5. 프리미엄 고객 추천: 최고급 사양의 MacBook Pro 14인치 또는 명품 브랜드 Louis Vuitton 스피디 백을 추천합니다.`;
    }

    return "Mock AI response";
  } else {
    // Local LLM support
    const endpoint = process.env.LLM_ENDPOINT || 'http://localhost:11434/v1/chat/completions';
    const model = process.env.LLM_MODEL || 'qwen2.5:7b';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}

export function compareFields(
  aiResult: Record<string, any>,
  expected: Record<string, any>,
  fields: string[]
): { accuracy: number; details: FieldComparison[] } {
  const details = fields.map((field) => {
    const expectedValue = expected[field];
    const aiValue = aiResult[field];
    const match = isMatch(aiValue, expectedValue);

    return {
      field,
      expected: expectedValue,
      aiValue,
      match,
    };
  });

  const matchedFields = details.filter((d) => d.match).length;
  const accuracy = matchedFields / fields.length;

  return { accuracy, details };
}

function isMatch(aiValue: any, expectedValue: any): boolean {
  if (aiValue === expectedValue) return true;

  // Handle number comparisons with some tolerance
  if (typeof expectedValue === 'number' && typeof aiValue === 'number') {
    return Math.abs(aiValue - expectedValue) < 0.01;
  }

  // Handle string comparisons (case-insensitive)
  if (typeof expectedValue === 'string' && typeof aiValue === 'string') {
    return expectedValue.toLowerCase() === aiValue.toLowerCase();
  }

  // Handle boolean
  if (typeof expectedValue === 'boolean' && typeof aiValue === 'boolean') {
    return expectedValue === aiValue;
  }

  // Handle arrays
  if (Array.isArray(expectedValue) && Array.isArray(aiValue)) {
    return JSON.stringify(expectedValue) === JSON.stringify(aiValue);
  }

  return false;
}
