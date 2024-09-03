import React from 'react';
import { Button } from '@/components/ui/button';

type Product = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

type ProductListProps = {
  products: Product[];
  onEdit: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Duration (hrs)</th>
          <th className="px-4 py-2">Price ($)</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.duration}</td>
            <td className="border px-4 py-2">{product.price}</td>
            <td className="border px-4 py-2">
              <Button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 text-white"
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
