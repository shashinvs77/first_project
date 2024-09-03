'use client'
//import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
//import { UserClient } from '@/components/tables/user-tables/clients';
//import { users } from '@/constants/data';
import SearchBar from '@/components/searchbar';
import SearchCustomer from '@/components/search_customer';
import SearchProduct from '@/components/search_product';

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

  export type Product = {
    id: string;
    name: string;
    duration: number;  // Use duration in hours
    price: number;
    createdAt: string;
    updatedAt: string;
    // Add other fields if necessary
  };

/* 
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
]; */

const handleSearch = (lounges: Lounge[]) => {
  console.log('Search result:', lounges);
};

const handleCustomerSearch = (customers: Customer[]) => {
    console.log('Customer search result:', customers);
  };

  const handleProductSearch = (products: Product[]) => {
    console.log('Search result:', products);
  };  

export default function page() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-center mb-4">Search For Lounge</h1>
      <div>
      <SearchBar onSearch={handleSearch}/>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-4">Search For Customer</h1>
      <div>
      <SearchCustomer onSearch={handleCustomerSearch}/>
      </div>
     
      <h1 className="text-3xl font-bold text-center mb-4">Search For Product</h1>
      <div>
      <SearchProduct onSearch={handleProductSearch} />
      </div>
      

      {/* <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
         <UserClient data={users} /> 
      </div> */}
      
      {/* <div>
      <SearchBar onSearch={handleSearch}/>
      </div> */}

    </PageContainer>
  );
}