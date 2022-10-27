import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "feauters/todo/todo.slice";
export const store = configureStore({
    reducer: {
        todo: todoSlice,
    },
});
