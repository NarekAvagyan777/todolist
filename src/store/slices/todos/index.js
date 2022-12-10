import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  todoList: JSON.parse(localStorage.getItem("todos")) || [],
  completedHidden: false,
  isPopupOpen: false,
  removingTodoId: null,
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todoList = [action.payload, ...state.todoList]
      localStorage.setItem("todos", JSON.stringify(state.todoList))
    },
    changeCompleted(state, action) {
      state.todoList = state.todoList.map((el) => {
        if (el.id === action.payload) {
          el.completed = !el.completed
        }
        return el
      })
      localStorage.setItem("todos", JSON.stringify(state.todoList))
    },
    hideCompleted(state) {
      state.completedHidden = !state.completedHidden
    },
    removeTodo(state, action) {
      state.todoList = state.todoList.filter((el) => el.id !== action.payload)
      localStorage.setItem("todos", JSON.stringify(state.todoList))
    },
    setIsPopupOpen(state) {
      state.isPopupOpen = !state.isPopupOpen
    },
    setRemovingTodoId(state, action) {
      state.removingTodoId = action.payload
    },
  },
})

export const {
  addTodo,
  changeCompleted,
  hideCompleted,
  removeTodo,
  setIsPopupOpen,
  setRemovingTodoId,
} = todosSlice.actions

export default todosSlice.reducer
