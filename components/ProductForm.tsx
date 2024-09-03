import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ProductFormProps = {
  onSave: (product: { id: string; name: string; duration: number; price: number }) => void;
  product: { id: string; name: string; duration: number; price: number } | null;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSave, product }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDuration(product.duration);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && duration && price) {
      onSave({ id: product?.id || '', name, duration, price });
      setName('');
      setDuration(0);
      setPrice(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <Input
        //label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. 3 hr lounge access"
        required
      />
      <Input
        //label="Duration (hours)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        required
      />
      <Input
        //label="Price ($)"
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        required
      />
      <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
    </form>
  );
};

export default ProductForm;
