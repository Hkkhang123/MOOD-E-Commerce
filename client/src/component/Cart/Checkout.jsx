import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    district: "",
    phone: "",
  });

  const handleCreateCheckout = async(e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const response = await dispatch(
        createCheckout({
          checkoutItem: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (response.payload && response.payload._id) {
        setCheckoutId(response.payload._id);
      }
    }
    
  };

  useEffect(() => {
    if (!cart || cart.products.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "Đã thanh toán",
          paymentDetail: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
        await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
        navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Giỏ hàng của bạn trống</p>;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Thanh toán</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Thông tin liên lạc</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Thông tin giao hàng</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-gray-700">Họ</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.firstName}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="">
              <label className="block text-gray-700">Tên</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.lastName}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              value={shippingAddress.address}
              required
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-gray-700">Thành phố</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.city}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="">
              <label className="block text-gray-700">Mã bưu điện</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={shippingAddress.postalCode}
                required
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Quận/Huyện</label>
            <input
              type="text"
              value={shippingAddress.district}
              required
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  district: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              value={shippingAddress.phone}
              required
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Tiếp tục thanh toán
              </button>
            ) : (
              <div className="">
                <h3 className="">Thanh toán với Paypal</h3>
                <PaypalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) =>
                    alert("Thanh toán thất bại. Vui lòng thử lại")
                  }
                />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Đơn hàng</h3>
        <div className="">
          {cart.products.map((item, index) => (
            <div key={index} className="flex items-start justify-between py-2 ">
              <div className="flex items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{item.name}</h3>
                  <p className="text-gray-500">Kích cỡ: {item.size}</p>
                  <p className="text-gray-500">Màu sắc: {item.color}</p>
                </div>
              </div>
              <p className="text-xl">
                {item.price?.toLocaleString("vi-VN")} VND
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Tổng tiền</p>
          <p className="">{cart.totalPrice?.toLocaleString("vi-VN")}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Phí vận chuyển</p>
          <p>Miễn phí</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Tổng tiền</p>
          <p>{cart.totalPrice?.toLocaleString("vi-VN")}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
