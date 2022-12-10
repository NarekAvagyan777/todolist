import styles from "./HideCompleted.module.css"

export default function HideCompleted({ completedHidden, hideCompleted }) {
  const handleHideCompleted = () => {
    hideCompleted()
  }

  return (
    <div className={styles.hideCompletedWrapper}>
      <div className="col-span-9">
        <div className={styles.wrapper}>
          <input
            id="filterCompletedCheckbox"
            type="checkbox"
            checked={completedHidden}
            onChange={handleHideCompleted}
            className="mr-3"
          />

          <label className="font-semibold" htmlFor="filterCompletedCheckbox">
            Hide completed
          </label>
        </div>
      </div>
    </div>
  )
}
