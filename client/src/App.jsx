import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./component/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import ProductDetail from "./component/Product/ProductDetail";
import Checkout from "./component/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import MyOrder from "./pages/MyOrder";
import AdminLayout from "./component/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./component/Admin/UserManagement";
import ProductManagement from "./component/Admin/ProductManagement";
import EditProduct from "./component/Admin/EditProduct";
import OrderManagement from "./component/Admin/OrderManagement";
import ProtectedRoute from "./component/Common/ProtectedRoute";

import { Provider } from "react-redux";
import store from "./redux/store";
import NewProduct from "./component/Admin/NewProduct";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="/my-order" element={<MyOrder />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="user" element={<UserManagement />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="product/:id/edit" element={<EditProduct />} />
            <Route path="product/new" element={<NewProduct />} />
            <Route path="order" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
