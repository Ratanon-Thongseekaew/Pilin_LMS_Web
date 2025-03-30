import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../../store/auth-store';
import { motion } from 'framer-motion';
import { useNavigate,  useSearchParams } from 'react-router';
import { checkoutStatus } from '../../../../api/order';
import createAlert from '../../../../utils/createAlert';

function CheckoutComplete() {
  const token = useAuthStore((state) => state.token);
  // Get session ID from query parameter
  const [searchParams] = useSearchParams();
  const session = searchParams.get('session_id');
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  
  console.log("Session ID from query params:", session);
  
  const navigate = useNavigate();
  
  const hdlNavigatetoUserCourse = () => {
    navigate("/user");
  };

  useEffect(() => {
    if (session) {
      fetchPayment();
    } else {
      console.error("No session ID found in URL");
      createAlert('error', 'Payment information not found');
      setLoading(false);
    }
  }, [session]);

  const fetchPayment = async() => {
    try {
      setLoading(true);
      console.log("Checking payment status for session:", session);
      const res = await checkoutStatus(token, session);
      console.log("Payment status response:", res);
      setStatus(res);
      createAlert('success', res.message);
      setLoading(false);
    } catch (error) {
      console.error("Error checking payment status:", error);
      createAlert('error', 'Failed to verify payment status');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md border border-gray-100"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">Your purchase was successful. We appreciate your support!</p>
        
        <button
          className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
          onClick={hdlNavigatetoUserCourse}
        >
          Go Back Home
        </button>
      </motion.div>
    </div>
  );
}

  export default CheckoutComplete;