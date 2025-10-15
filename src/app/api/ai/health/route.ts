
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(req: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const models = {
    'gemini-pro': 'gemini-pro',
    'vision': 'gemini-pro-vision',
    'text-embedding': 'text-embedding-004',
  };

  const results: { [key: string]: string } = {};

  for (const modelName in models) {
    try {
      const model = genAI.getGenerativeModel({ model: models[modelName as keyof typeof models] });
      // Perform a simple check, like counting tokens in a short string
      if (modelName === 'text-embedding') {
        await model.embedContent("health check");
      } else {
        const result = await model.generateContent("health check");
        // Ensure there is a response
        if (!result.response) {
            throw new Error('No response from model');
        }
      }
      results[modelName] = '✅';
    } catch (error: unknown) {
        console.error(`Error with model ${modelName}:`, error);
        if (error instanceof Error) {
            results[modelName] = `❌ Error: ${error.message}`;
        } else {
            results[modelName] = '❌ Unknown Error';
        }
    }
  }

  return NextResponse.json(results);
}
