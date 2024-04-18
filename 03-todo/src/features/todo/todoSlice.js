import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello world", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, text: action.payload.text };
        return todo;
      });
    },
    toggleCompleted: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload)
          return { ...todo, completed: !todo.completed };
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
