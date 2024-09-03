'use client'
//import React, { useState } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


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

/* const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // Implement search functionality here
  }; */

  interface SearchBarProps {
    onSearch: (lounges: Lounge[]) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };
  
    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      setLoading(true);
      try {
        const response = await axios.get('/api/sale/search', {
          params: { name: query, terminal: query, airport: query },
        });
  
        const lounges: Lounge[] = response.data; // Assuming this is an array of lounges
  
        if (lounges && lounges.length > 0) {
          onSearch(lounges); // Pass the array of Lounge objects
          router.push(`/admin/sales/${lounges[0].id}`); // Redirect based on the first result
        } else {
          alert('No matching lounge found.');
        }
      } catch (error) {
        console.error('Error fetching lounges:', error);
      } finally {
        setLoading(false);
      }
    };


  return (
    
     <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto my-8">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Lounge....."
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        //onClick={handleSearch}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {'Search'}
      </button>

    

    <div className="px-4 w-10 flex items-center">
       <button
        //onClick={handleSearch}
        type="submit"
        className="w-24 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        {'Add'} 
      </button>  

    </div>
    </form>
    
  );
};

export default SearchBar;
