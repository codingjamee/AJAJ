import { Form, Image, Card } from "react-bootstrap";

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
  return (
    <Form.Group
      controlId={controlId}
      className={customClassName}
      style={{ margin: "10px" }}
    >
      {label && <Form.Label>{label}</Form.Label>}
      {!select && type !== "file" && (
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
          {optionArr?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>
      )}
      {type === "file" && (
        <>
          <Card style={{ margin: "10px" }}>
            <Image
              style={{
                width: "100%",
                height: "8rem",
                margin: "0 auto",
              }}
              src={value}
            />
          </Card>
          <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={(e) => changeHandler(e)}
          />
        </>
      )}
    </Form.Group>
  );
};

export default FormCommon;
