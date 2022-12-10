import { useState } from "react"
import { connect } from "react-redux"
import { useFormik } from "formik"
import HideCompleted from "../HideCompleted/HideCompleted"
import { addTodo, hideCompleted } from "../../store/slices/todos"
import styles from "./AddTodoForm.module.css"

function AddTodoForm({
  todoList,
  completedHidden,
  dispatchAddTodo,
  dispatchHideCompleted,
}) {
  const [isShowCross, setIsShowCross] = useState(false)

  const {
    handleSubmit,
    errors,
    values: { todoText },
    handleChange,
    setValues,
  } = useFormik({
    initialValues: {
      todoText: "",
    },

    onSubmit: ({ todoText }) => {
      if (todoText.trim().length > 0 && todoText.trim().length <= 54) {
        const payload = {
          todoText,
          completed: false,
          id: Date.now(),
        }
        dispatchAddTodo(payload)
        setValues({
          todoText: "",
        })
      }
    },

    validate: ({ todoText }) => {
      if (todoText.trim().length > 54) {
        return { todoText: "Task content can contain max 54 characters." }
      }
    },
  })
  const toggleIsShowCross = () => {
    setIsShowCross((prev) => {
      return !prev
    })
  }

  const handleCrossClick = () => {
    setValues({
      todoText: "",
    })
  }

  return (
    <div>
      {todoList.length ? (
        <HideCompleted
          completedHidden={completedHidden}
          hideCompleted={dispatchHideCompleted}
        />
      ) : null}

      <div className="text-md sm:text-lg">Task</div>
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <div className="col-span-12 xs:col-span-9">
          <div className="relative">
            <input
              placeholder="Write here"
              type="text"
              name="todoText"
              value={todoText}
              className={`${styles.input} ${
                errors.todoText ? styles.errorInput : ""
              }`}
              onChange={handleChange}
              onFocus={toggleIsShowCross}
              onBlur={toggleIsShowCross}
            />

            {isShowCross && (
              <div className={styles.crossWrapper}>
                <svg
                  onMouseDown={handleCrossClick}
                  className="hover:cursor-pointer"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7065 0.709971C13.3165 0.319971 12.6865 0.319971 12.2965 0.709971L7.40647 5.58997L2.51647 0.699971C2.12647 0.309971 1.49646 0.309971 1.10646 0.699971C0.716465 1.08997 0.716465 1.71997 1.10646 2.10997L5.99647 6.99997L1.10646 11.89C0.716465 12.28 0.716465 12.91 1.10646 13.3C1.49646 13.69 2.12647 13.69 2.51647 13.3L7.40647 8.40997L12.2965 13.3C12.6865 13.69 13.3165 13.69 13.7065 13.3C14.0965 12.91 14.0965 12.28 13.7065 11.89L8.81646 6.99997L13.7065 2.10997C14.0865 1.72997 14.0865 1.08997 13.7065 0.709971Z"
                    fill="#174348"
                  />
                </svg>
              </div>
            )}
          </div>
          {errors.todoText ? (
            <div className={styles.errorMesssge}>{errors.todoText}</div>
          ) : null}
        </div>
        <div className={styles.addButtonWrapper}>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  todoList: state.todos.todoList,
  completedHidden: state.todos.completedHidden,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (payload) => dispatch(addTodo(payload)),
  dispatchHideCompleted: () => dispatch(hideCompleted()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm)
