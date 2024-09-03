'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '@/components/searchbar';
//import BookingComponent  from '@/components/booking';
import LoungeForm from '@/components/LoungeForm';


export type Lounge = {
  id: string;
  name: string;
  location: string;
  amenities: string[];
  operatingHours: any; // You might want to define a more specific type depending on the structure of `operatingHours`.
  capacity: number;
  customerRatings: number[];
  partnerId: string;
  partner?: {
    id: string;
    name: string;
    // Add other fields that you might need from the LoungePartner model
  };
  bookings?: {
    // Define the type for bookings if needed
  }[];
  reports?: {
    // Define the type for reports if needed
  }[];
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy?: string;
};

const ItemPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [lounge, setLounge] = useState<Lounge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLounge = async () => {
      try {
        const response = await axios.get(`/api/sale/${id}`);
        setLounge(response.data);
      } catch (error) {
        console.error('Error fetching lounge data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLounge();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!lounge) {
    return <div>No lounge data found.</div>;
  }

  const handleSearch = (lounges: Lounge[]) => {
    console.log('Search result:', lounges);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Search For Lounges</h1>
          <div>
            <SearchBar onSearch={handleSearch}/>
            <h1>{lounge.name}</h1>
            <p>Location: {lounge.location}</p>
            <p>Amenities: {lounge.amenities.join(', ')}</p>
            <p>Operating Hours: {JSON.stringify(lounge.operatingHours)}</p>
            <p>Capacity: {lounge.capacity}</p>
            <p>Customer Ratings: {lounge.customerRatings.join(', ')}</p>
            <p>Partner ID: {lounge.partnerId}</p>
            <p>Created On: {lounge.createdOn}</p>
            <p>Updated On: {lounge.updatedOn}</p>
            <p>Created By: {lounge.createdBy}</p>
            <p>Updated By: {lounge.updatedBy}</p>
          </div>
          
          <div className="space-y-2">
        
         {/* <UserClient data={users} /> */} 
      </div>
      <h1 className="text-3xl font-bold text-center mb-4">Add New Lounge</h1>
          <div>
          <LoungeForm />
          </div>
          {/* <div>
            <BookingComponent />
          </div> */}

        </div>
      </div>
    </>
  );
};

export default ItemPage;
