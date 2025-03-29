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

export const actionGetOrder = async (token) => {
  try {
    const result = await axios.get(
      `http://localhost:8989/order/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    return { error: error.message || "Failed to fetch orders" };
  }
};

export const actionGetAllOrders = async (token) => {
  try {
    const result = await axios.get(
      `http://localhost:8989/order/user/allorder`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    return { error: error.message || "Failed to fetch orders" };
  }
};

export const actionUpdateOrderStatus = async (orderId, status, token) => {
  try {
    const result = await axios.put(
      `http://localhost:8989/order/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return { error: error.message || "Failed to update status" };
  }
};

export const checkOut = async (token, id) => {
  try {
    if (!id) {
      throw new Error("Order ID is required");
    }
    console.log(`Making checkout request for order ID: ${id}`);
    console.log(`Full URL: http://localhost:8989/order/checkout/${id}`);
    console.log(`Token length: ${token?.length || 0}`);
    const response = await axios.post(
      `http://localhost:8989/order/checkout/${id}`,
      {}, // Empty body since ID is in URL
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("Checkout response success:", response.data);
    return response;
  } catch (error) {
    console.error('Checkout API error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    if (error.response?.data) {
      throw new Error(`Checkout failed: ${JSON.stringify(error.response.data)}`);
    }else{
      throw error;
    }
  }
};

export const checkoutStatus = async (token, session) => {
  try {
    const result = await axios.get(
      `http://localhost:8989/checkout-status${session}`,
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
