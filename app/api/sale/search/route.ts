import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function POST(request: Request) {
  try {
      const data = await request.json();

      // Extract relevant fields from the request body
      const { 
          name, 
          location, 
          amenities, 
          operatingHours, 
          capacity, 
          customerRatings, 
          partnerId, 
          createdBy 
      } = data;

      // Create a new lounge in the database
      const newLounge = await prisma.lounge.create({
          data: {
              name,
              location,
              amenities,
              operatingHours,
              capacity,
              customerRatings,
              partnerId,
              createdBy,
              updatedBy: createdBy, // Assuming the creator is also the updater initially
          },
      });

      return NextResponse.json(newLounge, { status: 201 });
  } catch (error) {
      console.error('Error creating lounge:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    //const airportId = searchParams.get('airportId');
    //const terminal = searchParams.get('terminal');
  
    try {
      const lounges = await prisma.lounge.findMany({
        where: {
          OR: [
            { id: id || undefined },
            
            {
              name: {
                contains: name || '',
                mode: 'insensitive',
              },
            },
            //{ airportId: airportId || undefined },
            /* {
              terminal: {
                contains: terminal || '',
                mode: 'insensitive',
              },
            }, */
          ],
        },
      });
  
      return NextResponse.json(lounges);
    } catch (error) {
      console.error('Error fetching lounges:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}