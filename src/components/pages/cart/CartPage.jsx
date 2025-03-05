import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../store/auth-store'
import { actionDeleteCartItem, actionGetCartItem } from '../../../api/cart'
import { Trash2 } from 'lucide-react'
import useCourseStore from '../../../store/course-store'
import { useNavigate } from 'react-router'
import { actionCreateOrder } from '../../../api/order'





function CartPage() {
  const token = useAuthStore((state)=>state.token)
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const hdlNagivatetoPaymentandCreateOrder = async ()=>{
    try {
      const response = await actionCreateOrder(token);
      localStorage.setItem("currentOrderId",response.data.result.id)
      console.log("localStorage Check:", localStorage.getItem("currentOrderId"))
      console.log("Order created successfully:", response.data);
      navigate("../payment");
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  }
  console.log("show cart item eiei",cartItems)
  useEffect(()=>{
  const showCartItem = async ()=>{
    try {
      const res = await actionGetCartItem(token)
      console.log("show Cart Item Check:",res.data.cartItem)
      setCartItems(res.data.cartItem)
    } catch (error) {
      console.error("Error fetching cartitem", error);
    }
  }


showCartItem()
  },[token])
  const deleteCartItem = async () => {
    try {
      const res = await actionDeleteCartItem(token)
      console.log("Successfully delete to Cart:",res.data)
    } catch (error) {
      console.error("Faild to delete to Cart:", error);
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Cart</h1>
    
    {cartItems.length === 0 ? (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    ) : (
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.course.title}</h3>
              <p className="text-sm text-gray-500">Course ID: {item.course.id || 'N/A'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold text-blue-600">${item.course.price}</h3>
              <button className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors">
                <Trash2 onClick={deleteCartItem} className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    
    {cartItems.length > 0 && (
      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Subtotal:</span>
          <span>฿{cartItems.reduce((total, item) => total + Number(item.course.price || 0), 0).toFixed(2)}</span>
        </div>
        <button onClick={hdlNagivatetoPaymentandCreateOrder} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    )}
  </div>
  )

}

export default CartPage