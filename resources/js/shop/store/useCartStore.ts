import { create } from 'zustand';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: string;
    stock_quantity: number;
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product: Product;
}

interface CartState {
    items: CartItem[];
    fetchCart: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    fetchCart: async () => {
        try {
            const response = await axios.get('/api/cart');
            set({ items: response.data });
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    },
    addToCart: async (productId, quantity) => {
        try {
            await axios.post('/api/cart', { product_id: productId, quantity });
            // Refetch to sync state correctly (handling merges etc)
            get().fetchCart();
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    },
    updateQuantity: async (itemId, quantity) => {
        try {
            await axios.put(`/api/cart/${itemId}`, { quantity });
            set((state) => ({
                items: state.items.map(item => item.id === itemId ? { ...item, quantity } : item)
            }));
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    },
    removeFromCart: async (itemId) => {
        try {
            await axios.delete(`/api/cart/${itemId}`);
            set((state) => ({
                items: state.items.filter(item => item.id !== itemId)
            }));
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    }
}));
