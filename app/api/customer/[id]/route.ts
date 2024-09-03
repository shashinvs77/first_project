import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        //airport: true, 
      },
    });

    if (!customer) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return NextResponse.json({ error: 'Error fetching customer data' }, { status: 500 });
  }
}