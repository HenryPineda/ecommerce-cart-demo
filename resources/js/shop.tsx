import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ShopApp from './shop/ShopApp';

const container = document.getElementById('shop-app');
if (container) {
    const root = createRoot(container);
    root.render(<ShopApp />);
}
