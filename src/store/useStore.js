import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            // cart and wishlist
            cart: [],
            wishlist: [],
            addToCart: (product) =>
                set((state) => {
                    const exists = state.cart.find((item) => item.id === product.id);
                    if (exists) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? {
                                            ...item,
                                            ...product,
                                            quantity: (item.quantity || 1) + (product.quantity || 1),
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
                    const exists = state.wishlist.find((item) => item.id === product.id);
                    if (exists) return state;
                    return {
                        wishlist: [...state.wishlist, product],
                    };
                }),
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                })),
            removeFromWishlist: (id) =>
                set((state) => ({
                    wishlist: state.wishlist.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, amount) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id
                            ? {
                                    ...item,
                                    quantity: Math.max(1, item.quantity + amount),
                                }
                            : item
                    ),
                })),
            clearCart: () => set({ cart: [] }),
            clearWishlist: () => set({ wishlist: [] }),
            // user and auth
            user: null,
            loginUser: (userData) => set({ user: userData }),
            logoutUser: () => {
                localStorage.removeItem("shop-storage");
                set({ user: null });
            },
            // multi currency
            currency: 'USD',
            exchangeRates: {
                USD: 1,
                BDT: 135,
                EUR: 0.92,
                INR: 83
            },
            setCurrency: (newCurrency) => set({ currency: newCurrency }),
            // coupon and discount
            coupons: [
                { id: 1, code: 'EID20', discountPercentage: 20, isActive: true },
                { id: 2, code: 'NEW10', discountPercentage: 10, isActive: true },
                { id: 3, code: 'WINTER30', discountPercentage: 30, isActive: true }
            ],
            appliedCoupon: null, 
            applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
            removeCoupon: () => set({ appliedCoupon: null }),
            // user addresses and profile
            addresses: [],
            addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),
            removeAddress: (id) => set((state) => ({ addresses: state.addresses.filter(addr => addr.id !== id) })),
            // admin dash and custom product
            customProducts: [], 
            addCustomProduct: (product) => set((state) => ({ customProducts: [...state.customProducts, product] })),
            updateCustomProduct: (id, updatedProduct) => set((state) => ({
                customProducts: state.customProducts.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
            })),
            // soft delete
            softDeleteProduct: (id) => set((state) => ({
                customProducts: state.customProducts.map(p => p.id === id ? { ...p, isDeleted: true } : p)
            })),
            restoreProduct: (id) => set((state) => ({
                customProducts: state.customProducts.map(p => p.id === id ? { ...p, isDeleted: false } : p)
            })),
            permanentDeleteProduct: (id) => set((state) => ({
                customProducts: state.customProducts.filter(p => p.id !== id)
            })),
        }),
        {
            name: 'shop-storage',
        }
    )
);