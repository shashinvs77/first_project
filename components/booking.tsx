

import { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [customerId, setCustomerId] = useState('');
  const [loungeId, setLoungeId] = useState('');
  const [numberOfPasses, setNumberOfPasses] = useState<number | ''>(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [formError, setFormError] = useState<string[] | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (typeof numberOfPasses === 'string') {
        setFormError(['Number of passes must be a number']);
        return;
      }

      // Combine date and time into a single DateTime string
      const dateTime = new Date(`${date}T${time}:00Z`).toISOString();

      const response = await axios.post('/api/booking', {
        customerId,
        loungeId,
        numberOfPasses,
        dateTime,
        time,
        status,
        qrCode,
      });

      setCustomerId('');
      setLoungeId('');
      setNumberOfPasses(1);
      setDate('');
      setTime('');
      setStatus('');
      setQrCode('');
      setFormSuccess('Booking created successfully!');
      setFormError(null);
    } catch (error: any) {
      console.error('Error creating booking:', error);

      if (error.response?.data?.error) {
        if (Array.isArray(error.response.data.error)) {
          const errorMessages = error.response.data.error.map((err: any) =>
            typeof err === 'object' && err.message ? err.message : String(err)
          );
          setFormError(errorMessages);
        } else if (typeof error.response.data.error === 'object' && error.response.data.error.message) {
          setFormError([error.response.data.error.message]);
        } else {
          setFormError([String(error.response.data.error)]);
        }
      } else {
        setFormError(['Failed to create booking']);
      }
      setFormSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-0">
        <h2 className="text-2xl font-bold mb-6 text-center">Lounge Booking</h2>
        {formError && (
          <div className="text-red-500 mb-4">
            {formError.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
        {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">Customer ID</label>
            <input
              type="text"
              id="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="loungeId" className="block text-sm font-medium text-gray-700">Lounge ID</label>
            <input
              type="text"
              id="loungeId"
              value={loungeId}
              onChange={(e) => setLoungeId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="numberOfPasses" className="block text-sm font-medium text-gray-700">No. Of Passes</label>
            <input
              type="number"
              id="numberOfPasses"
              value={numberOfPasses}
              onChange={(e) => setNumberOfPasses(Number(e.target.value))}
              min="1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="qrCode" className="block text-sm font-medium text-gray-700">QR Code</label>
            <input
              type="text"
              id="qrCode"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking; 


