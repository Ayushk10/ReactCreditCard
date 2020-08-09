import React from 'react';
import styled from 'styled-components';

import InputField from './InputField';
import { fetchCardType } from './recognizeCardTypeUtil';

const StyledCardForm = styled.div`
  flex: 1 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 400px;
  overflow: hidden;
  padding: 1em 2em;
  box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.5);
  margin-top: 7%;
  padding-top: 12%;

  h2 {
    color: #343a40;
    margin: 0;
    padding-top: .25em;
    border-bottom: 1px solid #aeaeae;
    padding-bottom: .75em;
  }
  
  ul {
    list-style: none;
    padding: 0;
  
    li:not(:last-child) {
      margin-bottom: 15px;
    }

    .inlineField {
      display: inline-block;
      width: 30%;
      margin-right: 20px;
    }
    li:last-child {
      margin: 0;
    }
  }
  .submitBtn {
    background: #147bd1;
    color: #fff;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  .errorMsg {
   margin: 10px 0;
   color: #d0021b;
  }
`;

const CreditCardForm = ({
    cardInfo: { name, number, expiryMonth, expiryYear, cvv, cardType, error },
    dispatch
  }) => 
  {
    const re = /^[0-9\b]+$/;
    const LetterReg = /^[a-z][a-z\s]*$/;

    const handleNameChange =(e)=>{
      // if value is not blank, then test the regex
      if ((e.target.value === ''|| LetterReg.test(e.target.value))) {
        dispatch({ key: "name", value: e.target.value })
      }
      
    };
  const handleCardNumber =(e)=>{
    const fetchCard = fetchCardType();
    if (e.target.value === '' || re.test(e.target.value)) {
      fetchCard(e.target.value, dispatch);
      dispatch({ key: "number", value: e.target.value });
    }
  };
  const handleMonth =(e)=>{
    if (e.target.value === '' || re.test(e.target.value)) {
      dispatch({ key: "expiryMonth", value: e.target.value })
    }
  };
  const handleYear =(e)=>{
    if (e.target.value === '' || re.test(e.target.value)) {
      dispatch({ key: "expiryYear", value: e.target.value })
    }
  };
  const handleCVV =(e)=>{
    // if value is not blank, then test the regex
    if (e.target.value === '' || re.test(e.target.value)) {
      dispatch({ key: "cvv", value: e.target.value })
    }
  };
  const onCvvBlur=()=> {
    setTimeout(() => {
      dispatch({ key: "isCvvField", value: false})
    }, 0);
}
const onCvvFocus =()=> {
  dispatch({ key: "isCvvField", value: true})
}
const validateForm =(e)=>{
  dispatch({ key: "error", value: ""});
  e.preventDefault();
  if(expiryMonth>12||expiryMonth<1){
    dispatch({ key: "error", value: "please enter correct month"});
  }
  else if(expiryYear<2020){
    dispatch({ key: "error", value: "your card has expired"});
  }
  else if(cardType.length<1){
    dispatch({ key: "error", value: "oops! card type not recognized"});
  }
}
  return <StyledCardForm>
      <form onSubmit={validateForm}>
        <ul>
        <li>
            <InputField
              label="Card Number"
              id="number"
              type="text"
              value={number}
              onChange={handleCardNumber}
              placeholder="**** **** **** ****"
              minLength="12"
              maxLength="19"
              required="required"
            />
          </li>
          <li>
            <InputField
              label="Card Holder Name"
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              minLength="2"
              maxLength="23"
              required="required"
            />
          </li>  
          <li className="inlineField">
            <InputField
              label="Expiry Month"
              id="expiryMonth"
              type="text"
              value={expiryMonth}
              onChange={handleMonth}
              placeholder="MM"
              minLength="2"
              maxLength="2"
              required="required"
            />
          </li>
          <li className="inlineField">
            <InputField
              label="Expiry Year"
              id="expiryYear"
              type="text"
              value={expiryYear}
              onChange={handleYear}
              placeholder="YYYY"
              minLength="4"
              maxLength="4"
              required="required"
            />
          </li>
          <li className="inlineField">
            <InputField
              label="CVV"
              id="cvv"
              type="text"
              value={cvv}
              onChange={handleCVV}
              minLength="3"
              maxLength="4"
              onFocus={onCvvFocus}
              onBlur={onCvvBlur}
              required="required"
            />
          </li>
        </ul>
        {error && <p className="errorMsg">{error}</p>}
        <button className="submitBtn">Submit</button>
      </form>
    </StyledCardForm>
  };

export default CreditCardForm;
