import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const lounge = await prisma.lounge.findUnique({
      where: { id },
      include: {
        //airport: true, 
      },
    });

    if (!lounge) {
      return NextResponse.json({ message: 'Lounge not found' }, { status: 404 });
    }

    return NextResponse.json(lounge);
  } catch (error) {
    console.error('Error fetching lounge data:', error);
    return NextResponse.json({ error: 'Error fetching lounge data' }, { status: 500 });
  }
}