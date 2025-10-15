import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/wa/send
 * body: { to: E.164 string, text?: string, type?: 'text'|'document', documentUrl?: string, documentName?: string }
 */
export async function POST(req: Request) {
  const { to, text, type='text', documentUrl, documentName='document.pdf' } = await req.json();
  const token = process.env.META_TOKEN;
  const phoneId = process.env.META_WA_PHONE_ID;

  if (!token || !phoneId) {
    return NextResponse.json({ error: 'META_TOKEN or META_WA_PHONE_ID missing' }, { status: 400 });
  }
  if (!to) return NextResponse.json({ error: 'to is required' }, { status: 400 });

  const endpoint = `https://graph.facebook.com/v21.0/${phoneId}/messages`;
  let payload: any = { messaging_product: 'whatsapp', to };

  if (type === 'text') {
    if (!text) return NextResponse.json({ error: 'text is required for type=text' }, { status: 400 });
    payload.type = 'text';
    payload.text = { body: text };
  } else if (type === 'document') {
    if (!documentUrl) return NextResponse.json({ error: 'documentUrl is required for type=document' }, { status: 400 });
    payload.type = 'document';
    payload.document = { link: documentUrl, filename: documentName };
  } else {
    return NextResponse.json({ error: 'unsupported type' }, { status: 400 });
  }

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(r => r.json()).catch((e)=>({ error: String(e) }));

  return NextResponse.json(resp);
}
