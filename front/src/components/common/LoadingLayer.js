import styles from "./ErrorModal.module.css";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading";
import ButtonCommon from "./ButtonCommon";
const ErrorModal = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.backdrop}>
        <h1 className={styles.errorModal}>{props.message}</h1>
        <div className="error-modal__actions">
          <p>{props.children}</p>
          <ButtonCommon
            onClickHandler={() => dispatch(loadingActions.close())}
            variant="outline-light"
            text="Close"
          />
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
