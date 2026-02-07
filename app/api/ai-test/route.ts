import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { callLLM, compareFields, TestResult } from '@/lib/ai-test';

export async function POST(request: NextRequest) {
  try {
    const { testName } = await request.json();
    const startTime = Date.now();

    let result: TestResult;

    switch (testName) {
      case 'html-parsing':
        result = await testHtmlParsing();
        break;
      case 'jsonld-parsing':
        result = await testJsonLdParsing();
        break;
      case 'data-analysis':
        result = await testDataAnalysis();
        break;
      case 'recommendation':
        result = await testRecommendation();
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown test name' },
          { status: 400 }
        );
    }

    result.executionTimeMs = Date.now() - startTime;

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Test Error:', error);
    return NextResponse.json(
      {
        testName: 'unknown',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Test 1: HTML Parsing
async function testHtmlParsing(): Promise<TestResult> {
  const product = getProductBySlug('macbook-pro-14')!;

  // Simulate SSR HTML (simplified)
  const html = `
    <article itemscope itemtype="https://schema.org/Product"
             data-product-id="${product.id}"
             data-price="${product.price}"
             data-currency="${product.currency}"
             data-in-stock="${product.inStock}"
             data-category="${product.category}"
             data-brand="${product.brand}">
      <h1 itemprop="name">${product.name}</h1>
      <p itemprop="description">${product.description}</p>
      <data itemprop="price" value="${product.price}">${product.price.toLocaleString()}원</data>
      <div>
        <span itemprop="ratingValue">${product.rating}</span>
        <span>리뷰 ${product.reviewCount}개</span>
      </div>
      <div>${product.inStock ? '재고 있음' : '품절'}</div>
    </article>
  `;

  const systemPrompt = `You are an HTML parser. Extract product information from the HTML and return it as JSON.
Return ONLY a JSON object with these exact fields: name, description, price, currency, brand, category, inStock, rating, reviewCount.
For inStock, return a boolean. For price, rating, reviewCount, return numbers.`;

  const userPrompt = `Extract product information from this HTML:\n\n${html}`;

  const aiResponse = await callLLM(systemPrompt, userPrompt, 'json');

  const extracted = JSON.parse(aiResponse);
  const { accuracy, details } = compareFields(extracted, product, [
    'name',
    'price',
    'currency',
    'brand',
    'category',
    'inStock',
    'rating',
    'reviewCount',
  ]);

  return {
    testName: 'html-parsing',
    success: accuracy >= 0.9,
    accuracy,
    aiResponse,
    expectedData: product,
    extractedData: extracted,
    details,
  };
}

// Test 2: JSON-LD Parsing
async function testJsonLdParsing(): Promise<TestResult> {
  const product = getProductBySlug('nike-air-max-90')!;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const systemPrompt = `You are a JSON-LD parser. Extract product information and return it as JSON.
Return ONLY a JSON object with these exact fields: name, description, price, currency, brand, inStock, rating, reviewCount.
For inStock, check if availability is InStock (return true) or OutOfStock (return false).
Extract the price and currency from the offers object.
Extract brand name from the brand object.
Extract rating and reviewCount from aggregateRating.`;

  const userPrompt = `Extract product information from this JSON-LD:\n\n${JSON.stringify(jsonLd, null, 2)}`;

  const aiResponse = await callLLM(systemPrompt, userPrompt, 'json');

  const extracted = JSON.parse(aiResponse);
  const { accuracy, details } = compareFields(extracted, product, [
    'name',
    'description',
    'price',
    'currency',
    'brand',
    'inStock',
    'rating',
    'reviewCount',
  ]);

  return {
    testName: 'jsonld-parsing',
    success: accuracy >= 0.9,
    accuracy,
    aiResponse,
    expectedData: product,
    extractedData: extracted,
    details,
  };
}

// Test 3: Data Analysis
async function testDataAnalysis(): Promise<TestResult> {
  const products = getAllProducts();

  const actualStats = {
    totalProducts: products.length,
    avgPrice: Math.round(
      products.reduce((sum, p) => sum + p.price, 0) / products.length
    ),
    maxPrice: Math.max(...products.map((p) => p.price)),
    minPrice: Math.min(...products.map((p) => p.price)),
    inStockCount: products.filter((p) => p.inStock).length,
    categoryCount: new Set(products.map((p) => p.category)).size,
  };

  const systemPrompt = `You are a data analyst. Analyze the product data and return statistics as JSON.
Return ONLY a JSON object with these exact fields: totalProducts, avgPrice, maxPrice, minPrice, inStockCount, categoryCount.
All values should be numbers. Round avgPrice to the nearest integer.`;

  const userPrompt = `Analyze this product data and provide statistics:\n\n${JSON.stringify(products, null, 2)}`;

  const aiResponse = await callLLM(systemPrompt, userPrompt, 'json');

  const extracted = JSON.parse(aiResponse);
  const { accuracy, details } = compareFields(extracted, actualStats, [
    'totalProducts',
    'avgPrice',
    'maxPrice',
    'minPrice',
    'inStockCount',
    'categoryCount',
  ]);

  return {
    testName: 'data-analysis',
    success: accuracy >= 0.9,
    accuracy,
    aiResponse,
    expectedData: actualStats,
    extractedData: extracted,
    details,
  };
}

// Test 4: Recommendation
async function testRecommendation(): Promise<TestResult> {
  const products = getAllProducts();

  const systemPrompt = `You are a product recommendation expert. Based on the product data, provide recommendations and insights.
Analyze the data and return your response as plain text. Include:
1. Top 3 most expensive products
2. Most popular category (by product count)
3. Average rating across all products
4. Recommendation for budget-conscious shoppers
5. Recommendation for premium shoppers`;

  const userPrompt = `Analyze this product data and provide recommendations:\n\n${JSON.stringify(products, null, 2)}`;

  const aiResponse = await callLLM(systemPrompt, userPrompt, 'text');

  // For recommendation test, we check if the response is reasonable (contains key information)
  const hasExpensiveProducts = aiResponse.includes('MacBook') || aiResponse.includes('Louis Vuitton');
  const hasCategory = aiResponse.toLowerCase().includes('category') || aiResponse.includes('카테고리');
  const hasRating = aiResponse.toLowerCase().includes('rating') || aiResponse.includes('평점');
  const hasRecommendation = aiResponse.toLowerCase().includes('recommend') || aiResponse.includes('추천');

  const qualityChecks = [
    hasExpensiveProducts,
    hasCategory,
    hasRating,
    hasRecommendation,
  ];
  const accuracy = qualityChecks.filter(Boolean).length / qualityChecks.length;

  return {
    testName: 'recommendation',
    success: accuracy >= 0.75,
    accuracy,
    aiResponse,
    details: [
      { field: 'mentions expensive products', expected: true, aiValue: hasExpensiveProducts, match: hasExpensiveProducts },
      { field: 'mentions categories', expected: true, aiValue: hasCategory, match: hasCategory },
      { field: 'mentions ratings', expected: true, aiValue: hasRating, match: hasRating },
      { field: 'provides recommendations', expected: true, aiValue: hasRecommendation, match: hasRecommendation },
    ],
  };
}
