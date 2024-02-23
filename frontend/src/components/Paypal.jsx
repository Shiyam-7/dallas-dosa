import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { login } from "../redux/slices/authSlice";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Paypal({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ad4rU0GE-6MqMWPL3hQQvq0xrK54LgWRtv0ERvr46uQqBhGj7ilxp92sVpudQjnSBAFqm-t77c7jIrgC",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  useEffect(() => {
    isPending ? "Loading..." : "";
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const paymentRequest = async (id) => {
    try {
      const res = await fetch("http://18.118.197.9:3000/api/orders/payment", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify({
          paymentId: id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.msg === "jwt expired") {
        try {
          console.log("2");
          const response = await axios.get(
            "http://18.118.197.9:3000/api/refresh-token",
            { withCredentials: true }
          );
          console.log(response);
          const userinfo = { ...response.data, user };
          dispatch(login(userinfo));
          console.log("3");
          const res = await fetch(
            "http://18.118.197.9:3000/api/orders/payment",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.accessToken}`,
              },
              credentials: "include",
              method: "PATCH",
              body: JSON.stringify({
                paymentId: id,
              }),
            }
          );
          const data = await res.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await paymentRequest(payment.id);
      console.log(orderId);
      dispatch(emptyCart());
      navigate("/track/" + orderId);
    } catch (error) {
      return error.message;
    }
  };

  const onError = (err) => {
    return err.message;
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
