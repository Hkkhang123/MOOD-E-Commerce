import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
 const dispatch = useDispatch()
 const {orderDetail, loading, error} = useSelector((state) => state.orders)

 useEffect(() => {
  console.log(id)
  dispatch(fetchOrderDetails(id))
 }, [dispatch, id])

 if(loading) {
  return <p>Đang tải...</p>
 }
 if(error) {
  return <p>Error: {error}</p>
 }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Chi tiết đơn hàng</h2>
      {!orderDetail ? (
        <p>Không có đơn hàng nào được tìm thấy</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                ID Đơn hàng: #{orderDetail._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetail.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetail.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetail.isPaid ? "Đã phê duyệt" : "Đang xử lý"}
              </span>

              <span
                className={`${
                  orderDetail.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetail.isDelivered ? "Đã giao hàng" : "Đang giao hàng"}
              </span>
            </div>
          </div>

          {/* Customer, payment, shipping in4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Thông tin thanh toán
              </h4>
              <p>Phương thức thanh toán: {orderDetail.paymentMethod}</p>
              <p>
                Trạng thái:{" "}
                {orderDetail.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">
                Thông tin giao hàng
              </h4>
              <p>Phương thức vận chuyển: {orderDetail.shippingMethod}</p>
              <p>
                Địa chỉ:{" "}
                {`${orderDetail.shippingAddress.district}, ${orderDetail.shippingAddress.city}`}
              </p>
            </div>
          </div>

          {/* DDSP */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Sản phẩm</h4>
            <table className="bg-gray-100">
              <thead>
                <tr>
                  <th className="py-2 px-4">Tên</th>
                  <th className="py-2 px-4">Giá</th>
                  <th className="py-2 px-4">Số lượng</th>
                  <th className="py-2 px-4">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.orderItems.map((item) => (
                  <tr 
                    key={item.productId}
                    className="border-t"
                    >
                      <td className="py-2 px-4 flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="size-12 object-cover rounded-lg mr-4"
                          />
                          <Link 
                            to={`/product/${item.productId}`} 
                            className="text-blue-500 hover:underline">
                              {item.name}
                            </Link>
                      </td>
                      <td className="py-2 px-4">
                        {item.price.toLocaleString("vi-VN")} VND
                      </td>
                      <td className="py-2 px-4">
                        {item.quantity} VND
                      </td>
                      <td className="py-2 px-4">
                        {item.quantity * item.price} VND
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nút quay lại link order */}

          <Link to="/my-order" className="text-blue-500 hover:underline">
                Quay lại đơn hàng của tôi
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
