import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
      const data = await request.json();

      // Extract relevant fields from the request body
      const { 
          name, 
          duration, 
          price, 
          createdAt 
      } = data;

      // Create a new product in the database
      const newProduct = await prisma.product.create({
          data: {
              name,
              duration,
              price,
              createdAt
              //updatedAt // Assuming the creator is also the updater initially
          },
      });

      return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');

    try {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { id: id || undefined },
            {
              name: {
                contains: name || '',
                mode: 'insensitive',
              },
            },
          ],
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
