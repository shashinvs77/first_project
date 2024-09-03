import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

interface SearchBarProps {
  onSearch: (customers: Customer[]) => void;
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
      const response = await axios.get('/api/customer/search_customer', {
        params: { name: query, email: query, phone: query },
      });

      const customers: Customer[] = response.data; // Assuming this is an array of customers

      if (customers && customers.length > 0) {
        onSearch(customers); // Pass the array of Customer objects
        router.push(`/admin/customers/${customers[0].id}`); // Redirect based on the first result
      } else {
        alert('No matching customer found.');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
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
        placeholder="Search Customer..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        
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
