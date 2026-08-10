import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            cart: [],
            wishlist: [],
            user: null,

            loginUser: (userData) => set({ user: userData }),
            logoutUser: () => set({ user: null }),

            addToCart: (product) =>
                set((state) => {
                    const exists = state.cart.find(
                        (item) => item.id === product.id
                    );
                    if (exists) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? {
                                        ...item,
                                        ...product,
                                        quantity: product.quantity || 1,
                                    }
                                : item
                            ),
                        };
                    }
                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...product,
                                quantity: product.quantity || 1,
                            },
                        ],
                    };
                }),
            addToWishlist: (product) =>
                set((state) => {
                    const exists = state.wishlist.find(
                        (item) => item.id === product.id
                    );
                    if (exists) return state;
                    return {
                        wishlist: [
                            ...state.wishlist,
                            product,
                        ],
                    };
                }),
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => item.id !== id
                    ),
                })),
            removeFromWishlist: (id) =>
                set((state) => ({
                    wishlist: state.wishlist.filter(
                        (item) => item.id !== id
                    ),
                })),
            updateQuantity: (id, amount) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                quantity: Math.max(
                                    1,
                                    item.quantity + amount
                                ),
                            }
                        : item
                    ),
                })),
            clearCart: () =>
                set({
                    cart: [],
                }),
            clearWishlist: () =>
                set({
                    wishlist: [],
                }),
        }),
        {
            name: 'shop-storage',
        }
    )
);