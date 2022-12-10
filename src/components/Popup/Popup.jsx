import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { removeTodo, setIsPopupOpen } from "../../store/slices/todos"
import styles from "./Popup.module.css"

function Popup({
  isPopupOpen,
  removingTodoId,
  dispatchSetIsPopupOpen,
  dispatchRemoveTodo,
}) {
  const handleYesClick = () => {
    dispatchSetIsPopupOpen()
    dispatchRemoveTodo(removingTodoId)
  }

  const handleNoClick = () => {
    dispatchSetIsPopupOpen()
  }

  const popupRef = useRef(null)

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [isPopupOpen])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        dispatchSetIsPopupOpen()
      }
    }

    document.body.addEventListener("mousedown", handleOutsideClick)

    return () =>
      document.body.removeEventListener("mousedown", handleOutsideClick)
  }, [isPopupOpen])

  if (!isPopupOpen) return null

  return (
    <div className={styles.popupWrapper}>
      <div ref={popupRef} className={styles.popup}>
        <div className="text-[#008594] text-center mb-5">
          Are you sure you want to delete?
        </div>
        <div className="flex justify-center">
          <button className="mr-8" onClick={handleYesClick}>
            Yes
          </button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isPopupOpen: state.todos.isPopupOpen,
  removingTodoId: state.todos.removingTodoId,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetIsPopupOpen: () => dispatch(setIsPopupOpen()),
  dispatchRemoveTodo: (id) => dispatch(removeTodo(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
