// pages/api/booking.ts
 

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path if needed
import { z } from 'zod';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

// Define the schema for the request body using Zod
/* const BookingSchema = z.object({
   customerId: z.string().uuid('Invalid customer ID'), // Ensure it's a valid UUID
  loungeId: z.string().uuid('Invalid lounge ID'), // Ensure it's a valid UUID 
  //customerId: z.string(),
  //loungeId: z.string(),
  numberOfPasses: z.number().int().positive('Number of passes must be number'),
  date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  //time: z.string().nonempty('Time is required').regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  time: z.string().min(1, 'Time is required').regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
}); */

const BookingSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  loungeId: z.string().uuid('Invalid lounge ID'),
  numberOfPasses: z.number().min(1, 'At least one pass is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required').regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  status: z.string().min(1, 'Status is required'),
  qrCode: z.string().min(1, 'QR Code is required'),
  createdOn: z.string().min(1, 'Created on date is required'),
  updatedOn: z.string().min(1, 'Updated on date is required'),
  createdBy: z.string().min(1, 'Created by is required'),
  updatedBy: z.string().min(1, 'Updated by is required'),
});

export default BookingSchema;

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = BookingSchema.parse(body);
    
    const dateTime = new Date(`${parsedBody.date}T${parsedBody.time}:00.000Z`);
    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        customerId: parsedBody.customerId,
        loungeId: parsedBody.loungeId,
        dateTime: dateTime,
        //time: parsedBody.time,
        numberOfPasses: parsedBody.numberOfPasses,
        status: parsedBody.status,
        qrCode: parsedBody.qrCode,
        createdOn: new Date(parsedBody.createdOn), // Assuming this is a DateTime field in your Prisma schema
        updatedOn: new Date(parsedBody.updatedOn), // Assuming this is a DateTime field in your Prisma schema
        createdBy: parsedBody.createdBy,
        updatedBy: parsedBody.updatedBy,
      },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      console.error('Error creating booking:', error);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.error();
  }
}
