import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      /* include: {
        //airport: true, 
      }, */
      // Include other related data if necessary
      // For example, if you have related models, you can include them here:
       //include: { relatedModel: true },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'Error fetching product data' }, { status: 500 });
  }
}
