import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Extract relevant fields from the request body
    const { 
      email, 
      password, 
      name, 
      phone, 
      loungeId, 
      paymentInfo, 
      preferences, 
      createdBy 
    } = data;

    // Create a new customer in the database
    const newCustomer = await prisma.customer.create({
      data: {
        email,
        password,
        name,
        phone,
        loungeId,
        paymentInfo: paymentInfo || {}, // Default to empty JSON if not provided
        preferences: preferences || {}, // Default to empty JSON if not provided
        createdBy,
        updatedBy: createdBy, // Assuming the creator is also the updater initially
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { id: id || undefined },
          {
            email: {
              contains: email || '',
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: name || '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
