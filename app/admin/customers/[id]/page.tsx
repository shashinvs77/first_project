'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  SearchBar from '@/components/search_customer';
import AddCustomer from '@/components/AddCustomer';
//import BookingComponent from '@/components/booking';

export type Customer = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  loungeId: string;
  paymentInfo: Record<string, any>; // Adjust this according to the structure of paymentInfo if needed
  preferences: Record<string, any>; // Adjust this according to the structure of preferences if needed
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy?: string;
};

const ItemPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customer/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>No customer data found.</div>;
  }

  const handleCustomerSearch = (customers: Customer[]) => {
    console.log('Search result:', customers);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Search For Customers</h1>
          <div>
            <SearchBar onSearch={handleCustomerSearch}/>
            <h1>Name: {customer.name}</h1>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Lounge ID: {customer.loungeId}</p>
            <p>Payment Info: {JSON.stringify(customer.paymentInfo)}</p>
            <p>Preferences: {JSON.stringify(customer.preferences)}</p>
            <p>Created On: {customer.createdOn}</p>
            <p>Updated On: {customer.updatedOn}</p>
            <p>Created By: {customer.createdBy}</p>
            <p>Updated By: {customer.updatedBy}</p>
          </div>

          {/* <div>
            <BookingComponent />
          </div> */}

          <h1 className="text-3xl font-bold text-center mb-4">Add New Customer</h1>
          <div>
            <AddCustomer />
          </div>

        </div>
      </div>
    </>
  );
};

export default ItemPage;
