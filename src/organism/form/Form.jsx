import React, { useState } from "react";
import FormInput from "../../molecules/formInput/FormInput";
import FormDateInputs from "../../molecules/formDate/FormDate";
import Button from "../../atoms/button/Button";
import CardDetails from "../../molecules/card/Card";

const Form = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvc, setCvc] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State for error messages
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardholderNameError, setCardholderNameError] = useState("");
  const [mmError, setMmError] = useState("");
  const [yyError, setYyError] = useState("");
  const [cvcError, setCvcError] = useState("");

  // Validation logic
  function handleSubmit(e) {
    e.preventDefault();
    // Perform validation and set error messages accordingly
    // If no errors, submit form and display success
    if (!cardNumber || !cardholderName || !mm || !yy || !cvc) {
      alert("Please fill out all fields correctly!");
    } else {
      setFormSubmitted(true);
    }
  }

  if (formSubmitted) {
    return (
      <div>
        <h1>THANK YOU!</h1>
        <p>We’ve added your card details</p>
      </div>
    );
  }

  return (
    <>
      <CardDetails cardNumber={cardNumber} cardholderName={cardholderName} mm={mm} yy={yy} cvc={cvc} />
      <form onSubmit={handleSubmit}>
        <FormInput
          id="cardholderName"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="e.g. Jane Appleseed"
          maxLength="25"
          errorMessage={cardholderNameError}
        />
        <FormInput
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="e.g. 1234 5678 9123 0000"
          maxLength="19"
          errorMessage={cardNumberError}
        />
        <FormDateInputs
          mm={mm}
          yy={yy}
          onMMChange={(e) => setMm(e.target.value)}
          onYYChange={(e) => setYy(e.target.value)}
          errorMM={mmError}
          errorYY={yyError}
        />
        <FormInput
          id="cvc"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="e.g. 123"
          maxLength="3"
          errorMessage={cvcError}
        />
        <Button type="submit">Confirm</Button>
      </form>
    </>
  );
};

export default Form;
