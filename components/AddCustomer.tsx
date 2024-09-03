import { useState } from 'react';

export default function CustomerForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loungeId, setLoungeId] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('{}');
  const [preferences, setPreferences] = useState('{}');
  const [createdBy, setCreatedBy] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customerData = {
      email,
      password,
      name,
      phone,
      loungeId,
      paymentInfo: JSON.parse(paymentInfo),
      preferences: JSON.parse(preferences),
      createdBy,
    };

    try {
      const response = await fetch('/api/customer/search_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        const newCustomer = await response.json();
        console.log('Customer created:', newCustomer);
        
        // Set success message
        setSuccessMessage('Customer created successfully!');

        // Optionally, reset the form fields
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setLoungeId('');
        setPaymentInfo('{}');
        setPreferences('{}');
        setCreatedBy('');
      } else {
        console.error('Failed to create customer');
        setErrorMessage('Failed to create customer. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="loungeId" className="block text-sm font-medium text-gray-700">
            Lounge ID
          </label>
          <input
            id="loungeId"
            type="text"
            value={loungeId}
            onChange={(e) => setLoungeId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="paymentInfo" className="block text-sm font-medium text-gray-700">
            Payment Info (JSON)
          </label>
          <textarea
            id="paymentInfo"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
            Preferences (JSON)
          </label>
          <textarea
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
            Created By
          </label>
          <input
            id="createdBy"
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Customer
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="mt-4 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
