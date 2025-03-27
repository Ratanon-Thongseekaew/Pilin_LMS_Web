import { create } from "zustand";

const useCartStore = create((set)=>({
cartItems:[],
setCartItems: (items) => set({ cartItems: items }),
    removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
    })),
}));

export default useCartStore;
