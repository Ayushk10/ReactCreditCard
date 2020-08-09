import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  font-family: "Space Mono", monospace;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  height: 200px;
  width: 320px;
  flex: 0 0 auto;
  padding: 0 1em;
  position: absolute;
  .card {
    position: relative;
    height: 100%;
    border-radius: 8px;
    box-shadow: 1px 1px #aaa3a3;
    background: linear-gradient(45deg,#8B0000,#666666,#800000);
    color: #fff;

    .cardType {
      position: absolute;
      top: 15px;
      right: 18px;
      margin:0;
      padding: 0;
    }

    .cardNumber {
      position: relative;
      top: 75px;
      display: flex;
      justify-content: space-between;
      font-size: 1.2em;
      word-spacing: 4px;
      letter-spacing: 2px;
      padding: 0 1em;
    }

    .cardInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      letter-spacing: 1px;
      line-height: 18px;
      text-transform: uppercase;
      position: relative;
      top: 110px;
      padding: 0 1em;

      span {
        font-size: 11px;
      }

      p {
        margin-top: 8px;
        font-size: 16px;
      }

      .cardExpiry {
        text-align: right;
      }
    }
    .blackTape {
        height: 20px;
        background-color: #000;
        width: 100%;
        position: absolute;
        top: 20%;
    }
    .cvvField {
        float: right;
        margin: 37% 4%;
    }
    .whiteTape {
        height: 20px;
        background-color: #fff;
        width: 100%;
        padding: 10px;
        position: absolute;
        top: 70%;
    }
    .cvvNumber {
        float: right;
        color: #000;
        margin: 0 20px;
    }
  }
`;

const getDisplayCardNumber =(numberInput)=> {
    const placeholder = "****************";
    const newPlaceholder = placeholder.substr(numberInput.length);
  
    return numberInput.concat("", newPlaceholder).match(/.{1,4}/g);
};

const CreditCard = ({
    cardInfo: { name, number, expiryMonth, expiryYear, cvv, cardType,isCvvField }
  }) => {
    let cardNumber = getDisplayCardNumber(number);
    let cardName = name < 1 ? "Name" : name;
    let expiry =
      expiryMonth < 1 && expiryYear < 1
        ? "00/00"
        : `${expiryMonth}/${expiryYear}`;
  
    return (
      <StyledCard>
        <div className="card">
        {!isCvvField ?
        <div>
        <p className="cardType">{cardType}</p>
          <div className="cardNumber">
            <span className="numberSection">{cardNumber[0]}</span>
            <span className="numberSection">{cardNumber[1]}</span>
            <span className="numberSection">{cardNumber[2]}</span>
            <span className="numberSection">{cardNumber[3]}</span>
            {cardNumber[4] && (
              <span className="numberSection">{cardNumber[4]}</span>
            )}
          </div>
          <div className="cardInfo">
            <div className="cardName">
              <span>Card Holder</span>
              <p>{cardName}</p>
            </div>
            <div className="cardExpiry">
              <span>Expires</span>
              <p>{expiry}</p>
            </div>
          </div> 
          </div>: <div>
              <div className="blackTape"></div>
             <p className="cvvField">cvv</p>
             <div className="whiteTape"><p className="cvvNumber">{cvv}</p></div>
          </div>
          }
        </div>
      </StyledCard>
    );
  };

export default CreditCard;
