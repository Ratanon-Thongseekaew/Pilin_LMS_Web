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
