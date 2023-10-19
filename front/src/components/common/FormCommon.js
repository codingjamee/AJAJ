import { Form } from "react-bootstrap";

<<<<<<< HEAD
const FormCommon = (props) => {
  const {
    controlId,
    select = false,
    label = "",
    placeholder = "",
    type = "text",
    changeHandler,
    value,
    customClassName,
    optionValue = "",
    optionArr = [],
  } = props;

=======
const FormCommon = ({
  controlId,
  select = false,
  label = "",
  placeholder = "",
  type = "text",
  changeHandler,
  value,
  customClassName,
  optionValue = "",
  optionArr = [],
}) => {
>>>>>>> featureEducationFront
  return (
    <Form.Group controlId={controlId} className={customClassName}>
      {label && <Form.Label>{label}</Form.Label>}
      {!select && (
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(e) => changeHandler(e.target.value)}
          value={value}
        />
      )}
      {select && (
        <Form.Select
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
        >
          <option>{optionValue}</option>
<<<<<<< HEAD
          {optionArr.map((option) => (
=======
          {optionArr?.map((option) => (
>>>>>>> featureEducationFront
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  );
};

export default FormCommon;
