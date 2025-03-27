import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { actionGetAllOrders, actionUpdateOrderStatus } from '../../../api/order';
import useAuthStore from '../../../store/auth-store';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  console.log("check order state",orders)
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [filterStatus, setFilterStatus] = useState('ALL');
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Call the API function
      const response = await actionGetAllOrders(token);
      
      // Check if response contains data and handle errors
      if (response && response.orders) {
        // Filter orders based on status if needed
        const filteredOrders = filterStatus === 'ALL' 
          ? response.orders 
          : response.orders.filter(order => order.status === filterStatus);
        
        setOrders(filteredOrders);
      } else if (response && response.error) {
        toast.error(`Error: ${response.error}`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Call the updated API function with correct parameters
      const response = await actionUpdateOrderStatus(orderId, newStatus, token);
      
      if (!response.success) {
        toast.error(response.error || 'Failed to update order status');
        return;
      }
      
      toast.success(response.message || `Order status updated to ${newStatus}`);
      
      // Update local state for detail view
      if (viewMode === 'detail' && selectedOrder.id === orderId) {
        setSelectedOrder(response.order);
      }
      
      // Refresh the orders list
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      {viewMode === 'list' ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <select
                className="border rounded px-3 py-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">All Orders</option>
                <option value="PENDING">Pending</option>
                <option value="SUCCESS">Success</option>
                <option value="FAILED">Failed</option>
              </select>
              <button
                onClick={fetchOrders}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Refresh
              </button>
            </div>
            <div className="text-gray-500">
              Total: {orders.length} orders
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left border-b">Order ID</th>
                    <th className="py-3 px-4 text-left border-b">User</th>
                    <th className="py-3 px-4 text-left border-b">Date</th>
                    <th className="py-3 px-4 text-left border-b">Total</th>
                    <th className="py-3 px-4 text-left border-b">Status</th>
                    <th className="py-3 px-4 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">
                        {order.users?.firstname} {order.users?.lastname}
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm')}
                      </td>
                      <td className="py-3 px-4">฿{(order.total).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          View
                        </button>
                        <div className="inline-block">
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="SUCCESS">Success</option>
                            <option value="FAILED">Failed</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleBackToList}
            className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            ← Back to orders
          </button>
          
          {selectedOrder && (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Order #{selectedOrder.id}</h2>
                  <p className="text-gray-500">
                    {format(new Date(selectedOrder.createdAt), 'dd MMMM yyyy, HH:mm')}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Status:</span>
                  <select
                    className="border rounded px-3 py-2"
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="SUCCESS">Success</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <p><span className="text-gray-500">Name:</span> {selectedOrder.users?.firstname} {selectedOrder.users?.lastname}</p>
                  <p><span className="text-gray-500">Email:</span> {selectedOrder.users?.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <p><span className="text-gray-500">Total Amount:</span> ฿{(selectedOrder.total).toFixed(2)}</p>
                  <p><span className="text-gray-500">Payment Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>

              {selectedOrder.paymentSlip && (
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Payment Slip</h3>
                  <img 
                    src={selectedOrder.paymentSlip} 
                    alt="Payment Slip" 
                    className="max-w-md border rounded"
                  />
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left border-b">Course</th>
                        <th className="py-2 px-4 text-left border-b">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItem?.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4">{item.course?.title}</td>
                          <td className="py-3 px-4">฿{(item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-medium">
                        <td className="py-3 px-4 text-right">Total:</td>
                        <td className="py-3 px-4">฿{(selectedOrder.total).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;