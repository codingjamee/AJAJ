import { Form, Row, Col } from "react-bootstrap";
import ButtonCommon from "./ButtonCommon";

const FormWrapper = (props) => {
  const { onSubmitHandler, children, isEditable, btnSet = [] } = props;

  return (
    <Form onSubmit={onSubmitHandler}>
      {children}
      {isEditable && (
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            {btnSet.map((btn) => (
              <ButtonCommon {...btn} key={btn.text} />
            ))}
          </Col>
        </Form.Group>
      )}
    </Form>
  );
};

export default FormWrapper;
