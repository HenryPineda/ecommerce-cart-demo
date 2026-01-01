import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCartStore } from '../store/useCartStore';

export default function Checkout() {
    const { items, fetchCart } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const total = items.reduce((acc, item) => acc + (parseFloat(item.product.price) * item.quantity), 0);

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post('/api/orders');
            alert(`Order placed successfully! Order ID: ${response.data.order_id}`);
            fetchCart(); // Clear local cart state
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty. Add items before checkout.</p>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                                <div>
                                    <span className="font-medium">{item.product.name}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                </div>
                                <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Place Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
