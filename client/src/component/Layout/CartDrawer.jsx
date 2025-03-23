import { IoMdClose } from "react-icons/io";
import CartComponent from "../Cart/CartComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ CartOpen, toggleCart }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCart();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[35rem] h-full bg-white shadow-lg
        transform transition-transform duration-300 flex flex-col z-50 ${
          CartOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCart}>
          <IoMdClose className="size-6 text-gray-600" />
        </button>
      </div>
      {/* Cart Item  */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Giỏ hàng của bạn</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartComponent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Giỏ hàng của bạn đang trống</p>
        )}
        {/* Component */}
      </div>

      {/* Nút checkout */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 
                rounded-lg font-semibold hover:bg-gray-800"
            >
              Thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
