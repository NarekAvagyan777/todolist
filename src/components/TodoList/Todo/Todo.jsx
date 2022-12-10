import { connect } from "react-redux"
import {
  changeCompleted,
  setIsPopupOpen,
  setRemovingTodoId,
} from "../../../store/slices/todos"
import styles from "./Todo.module.css"

function Todo({
  text,
  id,
  completed,
  dispatchChangeCompleted,
  dispatchSetIsPopupOpen,
  dispatchSetRemovingTodoId,
}) {
  function removeHandler() {
    dispatchSetIsPopupOpen()
    dispatchSetRemovingTodoId(id)
  }

  return (
    <div className={styles.todoWrapper}>
      <div className="flex">
        <div className="ml-2 mr-6 xs:mr-8">
          <input
            onChange={() => dispatchChangeCompleted(id)}
            checked={completed}
            type="checkbox"
          />
        </div>

        <div className="break-all">
          <span className={`${completed ? "text-[#ACACAC]" : ""}`}>{text}</span>
        </div>
      </div>

      <div>
        <div className={styles.removeButtonWrapper}>
          <button onClick={removeHandler} className={styles.removeButton}>
            <svg
              className="cursor-pointer"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3002 1.06962C12.9102 0.68273 12.2802 0.68273 11.8902 1.06962L7.00022 5.91065L2.11022 1.0597C1.72022 0.67281 1.09021 0.67281 0.700215 1.0597C0.310215 1.44658 0.310215 2.07155 0.700215 2.45844L5.59022 7.30939L0.700215 12.1603C0.310215 12.5472 0.310215 13.1722 0.700215 13.5591C1.09021 13.946 1.72022 13.946 2.11022 13.5591L7.00022 8.70813L11.8902 13.5591C12.2802 13.946 12.9102 13.946 13.3002 13.5591C13.6902 13.1722 13.6902 12.5472 13.3002 12.1603L8.41021 7.30939L13.3002 2.45844C13.6802 2.08147 13.6802 1.44658 13.3002 1.06962Z"
                fill="#174348"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeCompleted: (id) => dispatch(changeCompleted(id)),
  dispatchSetIsPopupOpen: () => dispatch(setIsPopupOpen()),
  dispatchSetRemovingTodoId: (id) => dispatch(setRemovingTodoId(id)),
})

export default connect(null, mapDispatchToProps)(Todo)
