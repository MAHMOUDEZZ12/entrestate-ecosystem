import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { uploadBufferAsPdfAndGetSignedUrl } from '@/src/lib/server/storage';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { html = '<h1>Empty</h1>', uid = 'demo-user', jobId = 'adhoc', filename = 'report' } = await req.json();

  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ printBackground: true, format: 'A4' });
  await browser.close();

  const storagePath = `users/${uid}/jobs/${jobId}/${filename}.pdf`;
  const pdfUrl = await uploadBufferAsPdfAndGetSignedUrl(Buffer.from(pdf), storagePath);
  return NextResponse.json({ pdfUrl, storagePath });
}
