import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'


const OrderConfirmation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {checkout} = useSelector((state) => state.checkout)

    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart())
            localStorage.removeItem("cart")
        } else {
            navigate("/my-order")
        }
    }, [checkout, dispatch, navigate])
    const caculateEstimateDelivery = (createdAt) => {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate() + 10) //Them 10 ngay
        return orderDate.toLocaleDateString("vi-VN")
    }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-700">
            Cảm ơn vì đã mua hàng =3 !
        </h1>

        {checkout && (
            <div className="p-6 rounded-lg ">
                <div className="flex justify-between mb-20">
                    {/* Order Id vaf Date */}
                    <div>
                        <h2 className="text-xl font-semibold">Id đơn hàng: {checkout._id}</h2>
                        <p className="text-gray-500">Ngày: {new Date(checkout.createdAt).toLocaleDateString("vi-VN")}</p>
                    </div>
                    {/* Estimate Deliviery */}
                    <div>
                        <p className="text-emerald-700 text-sm"> 
                            Dự kiến giao hàng: {" "} {caculateEstimateDelivery(checkout.createdAt)}
                        </p>
                    </div>
                </div>
                {/* Order Items */}
                <div className="mb-20">
                    {checkout.checkoutItem.map((item) => (
                        <div 
                        key={item.productId} 
                        className="flex items-center mb-4 gap-4"
                        >
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className='size-16 object-cover rounded-md mb-4' 
                            />
                            <div>
                            <h4 className="text-md font-semibold">{item.name}</h4>
                            <p className="texr-sm text-gray-500">
                                {item.color} | {item.size} 
                            </p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-md">{item.price.toLocaleString("vi-VN")} VND</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Phương thức thanh toán</h4>
                        <p className="text-gray-600">Paypal</p>
                    </div>

                    {/* Dia chi giao hang */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Giao hàng</h4>
                        <p className="text-gray-600">
                            {checkout.shippingAddress.address}
                        </p>
                        <p className="text-gray-600">{checkout.shippingAddress.city}, {" "} {checkout.shippingAddress.district}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default OrderConfirmation