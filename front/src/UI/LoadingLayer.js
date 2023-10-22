import styles from "./LoadingLayer.module.css";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/loading";
import ButtonCommon from "../components/common/ButtonCommon";
import LoadingIndicator from "./LoadingIndicator";
const LoadingLayer = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.backdrop}>
        <div className="error-modal__actions">
          <p>{props.children}</p>
          <LoadingIndicator />
          <ButtonCommon
            onClickHandler={() => dispatch(loadingActions.close())}
            variant="outline-light"
            text="Close"
          />
          <h1 className={styles.loadingLayer}>{props.message}</h1>
        </div>
      </div>
    </>
  );
};

export default LoadingLayer;
