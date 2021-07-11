import React from "react";
import { Form } from "react-bootstrap";

const SelectButton = (props) => {
  const {
    label,
    name,
    isMovieHours,
    handleChange,
    stateFormHours,
    stateFormMinutes,
  } = props;

  const minutesOption = () => {
    const option = [];
    for (var i = 0; i < 60; i++) {
      let value;
      if (i < 10) {
        value = `0${i}`;
        option.push(
          <option key={i} value={value}>
            {value}
          </option>
        );
      } else {
        value = `${i}`;
        option.push(
          <option key={i} value={value}>
            {value}
          </option>
        );
      }
    }
    return option;
  };

  const renderOption = () => {
    if (isMovieHours) {
      return (
        <>
          <option value="00">0</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
        </>
      );
    } else {
      return <>{minutesOption()}</>;
    }
  };

  return (
    <Form.Group controlId={name} className="d-flex flex-column">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        custom
        className="p-2"
        value={name === "movieHours" ? stateFormHours : stateFormMinutes}
        onChange={(e) => handleChange(e)}
      >
        <>{renderOption()}</>
      </Form.Control>
    </Form.Group>
  );
};

export default SelectButton;
