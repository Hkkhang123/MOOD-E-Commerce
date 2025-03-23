import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../redux/slices/cartSlice";

const CartComponent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= ``) {
      dispatch(
        updateCartQuantity({
          productId,
          quantity: newQuantity,
          userId,
          guestId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
  };
  return (
    <div>
      {cart.products.map((product, item) => (
        <div
          className="flex items-start justify-between py-4 border-b"
          key={item}
        >
          <div className="flex items-start">
            <img
              className="w-20 h-24 object-cover rounded mr-4"
              src={product.image}
              alt={product.name}
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Kích cỡ: {product.size} | Màu sắc: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border-none rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border-none rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-medium">
              {product.price.toLocaleString("vi-VN")} VND
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="size-6 mt-2 hover:text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
