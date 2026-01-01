import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore } from '../store/useCartStore';

interface Product {
    id: number;
    name: string;
    price: string;
    stock_quantity: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const addToCart = useCartStore((state) => state.addToCart);
    const fetchCart = useCartStore((state) => state.fetchCart);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products', {
                params: { search: searchQuery }
            });
            setProducts(res.data);
        }

        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded shadow bg-white">
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>
                            <button
                                onClick={() => addToCart(product.id, 1)}
                                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
