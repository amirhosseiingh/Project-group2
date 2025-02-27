import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/Iproduct";

const productsReducer = createSlice({
  name: "products",
  initialState: [] as IProduct[],
  reducers: {
    setProducts: (state: IProduct[], action: PayloadAction<IProduct[]>) => {
      return action.payload;
    },
    addProduct: (state: IProduct[], action: PayloadAction<IProduct>) => {
      return [...state, action.payload];
    },
  },
});

export const { setProducts, addProduct } = productsReducer.actions;
export default productsReducer.reducer;
