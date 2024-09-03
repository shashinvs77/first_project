'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export type Product = {
  id: string;
  name: string;
  duration: number;  // Use duration in hours
  price: number;
  createdAt: string;
  updatedAt: string;
};

interface SearchBarProps {
  onSearch: (products: Product[]) => void;
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
      const response = await axios.get('/api/products/search', {
        params: { name: query }, // Search by product name
      });

      const products: Product[] = response.data; // Assuming this is an array of products

      if (products && products.length > 0) {
        onSearch(products); // Pass the array of Product objects
        router.push(`/admin/product/${products[0].id}`); // Redirect based on the first result
      } else {
        alert('No matching product found.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
        placeholder="Search Product..."
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
