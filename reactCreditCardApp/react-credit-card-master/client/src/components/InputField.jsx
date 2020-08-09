import React from 'react';
import styled from 'styled-components';

const StyledInputField = styled.div`
  color: #343a40;

  label {
    display: inline;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ebecee;
    padding: 10px;
    margin: 10px 0;
  }

  input:focus {
    border-color: #64b5f6;
}
`;

const InputField = ({ label, type = "text", id, value, ...props }) => (
    <StyledInputField>
      {label && <label for={id}>{label}</label>}
      <input id={id} type={type} value={value} {...props} />
    </StyledInputField>
  );

  export default InputField;
