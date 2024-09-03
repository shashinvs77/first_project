'use client'
import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/button';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const prisma = new PrismaClient();

type Product = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

const ProductMaster: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await prisma.product.findMany();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Cleanup Prisma client on unmount
   /*  return () => {
      prisma.$disconnect();
    }; */
  }, []);

  const handleSave = async (product: Product) => {
    try {
      if (selectedProduct) {
        await prisma.product.update({
          where: { id: product.id },
          data: product,
        });
      } else {
        await prisma.product.create({
          data: product,
        });
      }
      setSelectedProduct(null);

      const updatedProducts = await prisma.product.findMany();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Product Master</h2>
      <ProductForm onSave={handleSave} product={selectedProduct} />
      <ProductList products={products} onEdit={handleEdit} />
    </div>
  );
};

export default ProductMaster;
