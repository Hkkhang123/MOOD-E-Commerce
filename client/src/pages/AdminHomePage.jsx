import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts, fetchAllOrder } from "../redux/slices/adminSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.admin);
  const {
    orders,
    totalOrder,
    totalSale,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrder())
   
    ;
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {productsLoading || orderLoading ? (
        <p>Đang tải...</p>
      ) : productsError ? (
        <p className="text-red-500">Lỗi xuất sản phẩm: {productsError}</p>
      ) : orderError ? (
        <p className="text-red-500">Lỗi xuất đơn hàng: {orderError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Doanh thu</h2>
            <p className="text-2xl">{totalSale.toLocaleString("vi-VN")} VND</p>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Tổng đơn hàng</h2>
            <p className="text-2xl">{totalOrder}</p>
            <Link to="/admin/order" className="text-blue-500 hover:underline">
              Quản lý đơn hàng
            </Link>
          </div>

          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Tổng số sản phẩm</h2>
            <p className="text-2xl">{products.length}</p>
            <Link to="/admin/product" className="text-blue-500 hover:underline">
              Quản lý sản phẩm
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Đơn hàng gần đây</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">ID đơn hàng</th>
                <th className="py-3 px-4">Tài khoản</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">
                      {order.totalPrice.toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Không có đơn hàng gần đây
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
