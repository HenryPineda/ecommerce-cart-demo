import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function ShopApp() {
    return (
        <BrowserRouter basename="/shop">
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
