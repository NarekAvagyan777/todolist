import { connect } from "react-redux"
import Todo from "./Todo/Todo"
import styles from "./TodoList.module.css"

function TodoList({ todoList, completedHidden }) {
  return (
    <div className="mt-24 xs:mt-28">
      {todoList.length ? (
        <div className="mb-40">
          {todoList.map((el) => {
            if (completedHidden && el.completed === true) {
              return null
            } else {
              return (
                <Todo
                  text={el.todoText}
                  completed={el.completed}
                  id={el.id}
                  key={el.id}
                />
              )
            }
          })}
        </div>
      ) : (
        <div className={styles.blankPage}>
          <div>Your life is a blank page. You write on it.</div>
          <div>So start by adding your tasks here.</div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  todoList: state.todos.todoList,
  completedHidden: state.todos.completedHidden,
})

export default connect(mapStateToProps, null)(TodoList)
