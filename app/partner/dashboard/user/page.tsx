'use client'
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/clients';
import { users } from '@/constants/data';
import SearchBar from '@/components/searchbar';

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


const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
];

const handleSearch = (lounges: Lounge[]) => {
  console.log('Search result:', lounges);
};

export default function page() {
  return (
    <PageContainer>
      
      <div>
      <SearchBar onSearch={handleSearch}/>
      </div>

      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
         <UserClient data={users} /> 
      </div>
      
      {/* <div>
      <SearchBar onSearch={handleSearch}/>
      </div> */}

    </PageContainer>
  );
}