import { NextRequest, NextResponse } from 'next/server';
import figlet from 'figlet';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json(
      { error: 'Text parameter is required' },
      { status: 400 }
    );
  }

  try {
    const banner = await new Promise<string>((resolve, reject) => {
      figlet(text, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data || '');
        }
      });
    });

    return NextResponse.json({ banner });
  } catch (error) {
    console.error('Figlet error:', error);
    return NextResponse.json(
      { error: 'Failed to generate banner' },
      { status: 500 }
    );
  }
}
