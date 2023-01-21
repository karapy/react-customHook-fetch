import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuanity: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuanity ++;
            if (!existItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
                
            } else {
                //
                existItem.quantity ++;
                existItem.totalPrice = existItem.totalPrice + newItem.price;

            }
            
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuanity --;
            if (existingItem.quantity === 1) {
                //
                state.items = state.items.filter(item => item.id !== id);
            } else {
                //
                existingItem.quantity --;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;