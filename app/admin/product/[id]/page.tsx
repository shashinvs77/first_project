'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '@/components/search_product';
import AddProduct from '@/components/AddProduct';
//import BookingComponent from '@/components/booking'; // Adjust or remove if not relevant for products

export type Product = {
  id: string;
  name: string;
  duration: number;  // Use duration in hours
  price: number;
  createdAt: string;
  updatedAt: string;
  // Add other fields if necessary
};

const ItemPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product data found.</div>;
  }

  const handleProductSearch = (products: Product[]) => {
    console.log('Search result:', products);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Search For Products</h1>
          <div>
            <SearchBar onSearch={handleProductSearch} />
            <h1>{product.name}</h1>
            <p>Duration: {product.duration} hours</p>
            <p>Price: ${product.price}</p>
            <p>Created On: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>Updated On: {new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>

         {/*  <div>
            <BookingComponent />
          </div> */}
          <h1 className="text-3xl font-bold text-center mb-4">Add New Product</h1>
          <div>
            <AddProduct />
          </div>

        </div>
      </div>
    </>
  );
};

export default ItemPage;

