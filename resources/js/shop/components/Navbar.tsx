import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
    const cartItems = useCartStore((state) => state.items);
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">My Shop</Link>
                <Link to="/cart" className="flex items-center gap-2">
                    <span>Cart</span>
                    {count > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {count}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
