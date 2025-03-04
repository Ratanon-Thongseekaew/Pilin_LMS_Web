import React from 'react'
import Buttons from '../../../form/Buttons'

function Payment() {
  return (
<div>
    <div className='total-pay'>
    </div>
    <div className='payment-info bg-red-400'>
        <div className='flex flex-col'>
        <h1 className='text-4xl'>Payment</h1>
        <h1 className='text-4xl'>ช่องทางการชำระเงิน</h1>
        <p> กสิกร: 123-5456-789-1241</p>
        <p>Upload Your slip here</p>
        <input type='file'></input>
        <p>Please Wait for 24 hours for our admin to review your payslip</p>
        </div>
    </div>
    <div>
        <button className='btn btn-primary' type='submit'>Submit Your Order</button>
    </div>
</div>
  )
}

export default Payment