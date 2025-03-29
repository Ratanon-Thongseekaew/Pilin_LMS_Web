import { create } from "zustand";

const useCartStore = create((set,get)=>({
    //all state
cartItems:[],
isLoading: false,
error:null
setCartItems: (items) => set({ cartItems: items }),
    removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
    })),
}));

export default useCartStore;
