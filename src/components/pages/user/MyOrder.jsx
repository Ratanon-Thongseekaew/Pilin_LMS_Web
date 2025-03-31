import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../store/auth-store';

function MyOrder() {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useAuthStore((state)=>state.token)

    useEffect(()=>{
    },[])
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">#12345</td>
                <td className="py-3 px-4">2023-06-15</td>
                <td className="py-3 px-4">React Fundamentals Course</td>
                <td className="py-3 px-4">$49.99</td>
                <td className="py-3 px-4"><span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">#12346</td>
                <td className="py-3 px-4">2023-08-22</td>
                <td className="py-3 px-4">Advanced CSS Course</td>
                <td className="py-3 px-4">$39.99</td>
                <td className="py-3 px-4"><span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Completed</span></td>
              </tr>
              {/* Add more orders as needed */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default MyOrder