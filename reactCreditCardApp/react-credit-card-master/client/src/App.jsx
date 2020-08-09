import React, {useReducer} from 'react';
import styled from 'styled-components';

import CreditCardForm from './components/CreditCardForm';
import CreditCardComponent from './components/CreditCard';

const StyledApp = styled.main`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 3em;
justify-content: space-around;
background-color: #ADD8E6;

  & > div:not(:last-child) {
    margin-bottom: 2em;
  }
`

const App = () => {
  const initialState = {
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardType: "",
    isCvvField: false,
    error: "",
  };

  const inputReducer = (state, action) => {
    return { ...state, [action.key]: action.value };
  };

  const [cardInfo, dispatch] = useReducer(
    inputReducer,
    initialState
  );

  return (
    <StyledApp>
      <CreditCardComponent cardInfo={cardInfo} />
      <CreditCardForm cardInfo={cardInfo} dispatch={dispatch} />
    </StyledApp>
  );
};

export default App;