import AddTodoForm from "./components/AddTodoForm/AddTodoForm"
import TodoList from "./components/TodoList/TodoList"
import Popup from "./components/Popup/Popup"

function App() {
  return (
    <>
      <Popup />
      <div className="wrapperContainer">
        <AddTodoForm />
        <TodoList />
      </div>
    </>
  )
}

export default App
