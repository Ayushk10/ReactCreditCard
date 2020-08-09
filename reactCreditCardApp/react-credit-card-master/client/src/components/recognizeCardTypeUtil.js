export const fetchCardType = () => {
    let timeout;
    return function executedFunction(number, dispatch) {
  
      // The callback function to be executed after 
      // the debounce time has elapsed
      const later = () => {
        // null timeout to indicate the debounce ended
        timeout = null;
        
        // Execute the callback
        const cardType = getCardType(number);
        dispatch({ key: "cardType", value: cardType });
      };
      // This will reset the waiting every function execution.
      // This is the step that prevents the function from
      // being executed because it will never reach the 
      // inside of the previous setTimeout  
      clearTimeout(timeout);
      
      // Restart the debounce waiting period.
      timeout = setTimeout(later, 100);
    };
  };

const getCardType = (cur_val) => {
   let cardName = null;
    // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
    // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also
   
    //JCB
    const jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
    // American Express
    const amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    // Diners Club
    const diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
    // Visa
    const visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    // MasterCard
    const mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    const maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
    //Discover
    const discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');
    ////6011, 622126-622925, 644-649, 65   
    // checks per each, as their could be multiple hits hence using 
    // debounce above for decreasing performance impact
    //fix: ordering matter in detection, otherwise can give false results in rare cases
    if (cur_val.match(jcb_regex)) {
        cardName = "JCB";
    } else if (cur_val.match(amex_regex)) {
        cardName = "AMEX";
    } else if (cur_val.match(diners_regex)) {
        cardName = "DINERS CLUB";
    } else if (cur_val.match(visa_regex)) {
        cardName = "VISA";
    } else if (cur_val.match(mastercard_regex)) {
        cardName = "MASTERCARD";
    } else if (cur_val.match(discover_regex)) {
        cardName = "DISCOVER";
    } else if (cur_val.match(maestro_regex)) {
      if (cur_val[0] == '5') { //started 5 must be mastercard
        cardName = "MASTERCARD";
      } else {
        cardName = "MAESTRO"; //maestro is all 60-69 which is not something else, thats why this condition in the end
      }
    }
    return cardName;
}

   