import React, { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
    const { items, fetchCart, updateQuantity, removeFromCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, []);

    const total = items.reduce((acc, item) => acc + (parseFloat(item.product.price) * item.quantity), 0);

    return (
        <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">${item.product.price}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                        >-</button>
                                        <span className="mx-3">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                        >+</button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 font-medium"
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                        <a href="/shop/checkout" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                            Checkout
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
