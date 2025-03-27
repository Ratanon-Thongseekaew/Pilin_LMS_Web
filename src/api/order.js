import axios from "axios";

export const actionCreateOrder = async (token, userId) => {
  try {
    const result = await axios.post(
      `http://localhost:8989/order`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const actionUploadPaymentSlip = async (
  token,
  userId,
  orderId,
  slipfile
) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("orderId", orderId);
    formData.append("paymentSlip", slipfile); 
    const result = await axios.post(
      `http://localhost:8989/order/${orderId}/payment`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const actionGetOrder = async(token)=>{
  try {
    const result = await axios.get(`http://localhost:8989/order/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    return {error: error.message || "Failed to fetch orders"}
  }
}

export const actionGetAllOrders = async(token)=>{
try {
  const result = await axios.get(`http://localhost:8989/order/user/allorder`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result;
} catch (error) {
  return {error: error.message || "Failed to fetch orders"}
}
}

export const actionUpdateOrderStatus = async (orderId, status, token) =>{
try {
  const result = await axios.put(`http://localhost:8989/order/${orderId}/status`,{status}, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
)
  return result;
} catch (error) {
  return {error: error.message || "Failed to update status"}
}
}