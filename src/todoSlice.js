import React from "react";
import { createSlice, isPending } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({...action.payload,status:"pending"});
    },
    deleteTodo: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    editTodo: (state, action) => {
      const { index, updatedTodo } = action.payload;
      state[index] = updatedTodo;
    },
    sortTodos: (state) => {
      const sortedTodos = state.slice().sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") return -1;
        if (a.priority === "medium" && b.priority === "low") return -1;
        if (a.priority === "low" && b.priority !== "low") return 1;
        if (a.priority === "medium" && b.priority === "high") return 1;
        if (a.priority === "low" && b.priority === "medium") return 1;
        return 0;
      });
      return sortedTodos;
    },
    
    toggleTodoStatus:(state,action)=>{
      const index=action.payload;
      const todo=state[index]
      todo.status = todo.status === "pending" ? "completed" : "pending";
    }
  },
});
export const {addTodo,deleteTodo,editTodo,sortTodos,toggleTodoStatus}=todoSlice.actions;
export default todoSlice.reducer;
