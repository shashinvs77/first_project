'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Replace with actual imports if needed
//import { useRouter } from 'next/router';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'





const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const router = useRouter();
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Email submitted:', email);
    router.push('/partner/dashboard');
    //window.open('/partner/dashboard', '_blank'); 
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <p className="text-gray-600 mb-6">Enter your email below to create your account</p>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 w-full"
          placeholder="demo@gmail.com"
        />
      </div>
      
       <Button onClick={handleSubmit} className="w-full bg-orange-900 text-white py-2 rounded-md">
        Continue With Email
      </Button>

      <div className="my-6 text-center text-gray-600">Or continue with</div>
      
      {/* <Button className="w-full bg-gray-800 text-white py-2 rounded-md">
        Continue with Github
      </Button> */} 

       <p className="text-xs text-gray-500 mt-6">
        By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p> 
    </div>
  );
};

export default SignupForm;
