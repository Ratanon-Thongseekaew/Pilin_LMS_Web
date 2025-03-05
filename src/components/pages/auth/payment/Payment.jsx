import React, { useEffect, useState } from 'react'
import { actionUploadPaymentSlip } from '../../../../api/order'
import useAuthStore from '../../../../store/auth-store'
import { useForm } from 'react-hook-form'




function Payment() {
  const token = useAuthStore((state)=>state.token)
  const userId = useAuthStore((state)=>state.user.id)
  const [orderId, setOrderId] = useState(null)
  const [isUploading,setIsUploading] = useState(false)
  const [uploadSuccess,setUploadSuccess] = useState(false)

  const {register,handleSubmit, formState:{errors}} = useForm()

  useEffect(()=>{
    const storedOrderId =localStorage.getItem('currentOrderId')
    if(storedOrderId){
      setOrderId(storedOrderId)
    }
  },[])
  
  const onSubmit = async(data)=>{
    //prevent upload without oId
    if(!orderId){
      return;
    }
    try {
    setIsUploading(true) // show loading  & disable buttoon
    const file = data.paymentSlip[0]
    const res = await actionUploadPaymentSlip(token, userId, orderId, file)
    console.log("Upload success:", res.data);
    setUploadSuccess(true);
    localStorage.removeItem('currentOrderId');
    } catch (error) {
      console.error("Upload failed:", error);

    }finally{
      setIsUploading(false);
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Payment Slip</h2>
    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">กสิกร:123-456-789</h2>
    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">นายรฐนนท์ ทองสีแก้ว</h2>
    
    {orderId ? (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <p className="text-blue-800 font-medium">Order ID: <span className="font-bold">{orderId}</span></p>
      </div>
    ) : (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <p className="text-red-600">No order information found. Please go back to your cart and try again.</p>
      </div>
    )}
    
    {uploadSuccess ? (
      <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
        <p className="text-green-700 font-medium">Payment slip uploaded successfully! We'll process your payment soon.</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="payment-slip" className="block text-sm font-medium text-gray-700">
            Payment Slip Image
          </label>
          <div className="mt-1">
            <input
              id="payment-slip"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              //use sprend to get all register property
              {...register("paymentSlip", {
                required: "Please select a payment slip image"
              })}
            />
          </div>
          {errors.paymentSlip && (
            <p className="mt-2 text-sm text-red-600">{errors.paymentSlip.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isUploading || !orderId}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isUploading || !orderId 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload Payment Slip"
          )}
        </button>
      </form>
    )}
  </div>
  )
}

export default Payment