// components/LoungeForm.tsx
/* 
'use client';

import { useState } from 'react';

export default function LoungeForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    amenities: '',
    operatingHours: '',
    capacity: 0,
    customerRatings: '',
    partnerId: '',
    createdBy: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert amenities from a comma-separated string to an array of strings
    const amenitiesArray = formData.amenities.split(',').map(amenity => amenity.trim());

    // Prepare data for submission
    const submissionData = {
      ...formData,
      amenities: amenitiesArray,
      customerRatings: formData.customerRatings ? formData.customerRatings.split(',').map(Number) : [],
    };


    try {
      const response = await fetch('/api/sale/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lounge created successfully:', data);
        // Optionally, reset the form or show a success message here
        setFormData({
            name: '',
            location: '',
            amenities: '',
            operatingHours: '',
            capacity: 0,
            customerRatings: '',
            partnerId: '',
            createdBy: '',
        });
      } else {
        console.error('Error creating lounge:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amenities</label>
        <textarea
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
        <input
          type="text"
          name="operatingHours"
          value={formData.operatingHours}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Ratings</label>
        <input
          type="text"
          name="customerRatings"
          value={formData.customerRatings}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Partner ID</label>
        <input
          type="text"
          name="partnerId"
          value={formData.partnerId}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Created By</label>
        <input
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
} */

  import { useState } from 'react';

const LoungeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    amenities: '',
    operatingHours: '',
    capacity: 0,
    customerRatings: '',
    partnerId: '',
    createdBy: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/sale/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amenities: formData.amenities.split(',').map(item => item.trim()), 
          operatingHours: JSON.parse(formData.operatingHours), // Convert JSON string to object
          customerRatings: formData.customerRatings.split(',').map(rating => parseFloat(rating)), // Convert to array of floats
          capacity: formData.capacity, 
        }),
      });

      if (response.ok) {
        setMessage('Lounge created successfully!');
        setFormData({
          name: '',
          location: '',
          amenities: '',
          operatingHours: '',
          capacity: 0,
          customerRatings: '',
          partnerId: '',
          createdBy: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Error creating lounge.');
      console.error('Error creating lounge:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Lounge</h2>
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amenities (comma-separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Operating Hours (JSON format)</label>
          <textarea
            name="operatingHours"
            value={formData.operatingHours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Capacity</label>
          <input
            type= "number"
            name="capacity"
            value={formData.capacity}
            onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Ratings (comma-separated floats)</label>
          <input
            type="text"
            name="customerRatings"
            value={formData.customerRatings}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Partner ID</label>
          <input
            type="text"
            name="partnerId"
            value={formData.partnerId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Created By</label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Lounge
        </button>
      </form>
    </div>
  );
};

export default LoungeForm;

