import { useState } from "react";
import "./App.css";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumberCheck, setCardNumberCheck] = useState(false);
  const [cardholderNameCheck, setCardholderNameCheck] = useState(false);
  const [mmCheck, setMmCheck] = useState(false);
  const [yyCheck, setYyCheck] = useState(false);
  const [cvcCheck, setCvcCheck] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const error = "fill the form!";

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = "none";
  }

  function cardNumberChange(e) {
    let input = e.target.value.replace(/\s+/g, "").slice(0, 16);
    const formattedInput = input.replace(/(.{4})(?=.)/g, "$1 ");
    setCardNumber(formattedInput);

    const regexCharacter = /^\d+$/;
    const regexLength = /^.{16}$/;

    if (!regexCharacter.test(input)) {
      showError("cardNumberError1", "Wrong format, numbers only");
    } else {
      hideError("cardNumberError1");
    }

    if (!regexLength.test(input)) {
      showError("cardNumberError2", "Must be 16 characters");
    } else {
      hideError("cardNumberError2");
    }

    setCardNumberCheck(regexCharacter.test(input) && regexLength.test(input));
  }

  function cardholderNameChange(e) {
    const name = e.target.value;
    setCardholderName(name);
    const regexName = /^[A-Za-z]+([-' ]?[A-Za-z]+)*$/;

    if (!regexName.test(name)) {
      showError("nameError", "Wrong format, letters only");
    } else {
      hideError("nameError");
    }

    setCardholderNameCheck(regexName.test(name));
  }

  function mmChange(e) {
    const month = e.target.value;
    setMm(month);

    const regexCharacter = /^\d+$/;
    const regexSize = /^(?:[1-9]|1[0-2])$/;

    if (!regexCharacter.test(month)) {
      showError("MmError1", "Wrong format, numbers only");
    } else {
      hideError("MmError1");
    }

    if (!regexSize.test(month)) {
      showError("MmError3", "Wrong format, 1-12");
    } else {
      hideError("MmError3");
    }

    setMmCheck(regexCharacter.test(month) && regexSize.test(month));
  }

  function yyChange(e) {
    const year = e.target.value;
    setYy(year);

    const regexCharacter = /^\d+$/;

    if (!regexCharacter.test(year)) {
      showError("MmError1", "Wrong format, numbers only");
    } else {
      hideError("MmError1");
    }

    setYyCheck(regexCharacter.test(year));
  }

  function cvcChange(e) {
    const cvc = e.target.value;
    setCvc(cvc);

    const regexCharacter = /^\d+$/;

    if (!regexCharacter.test(cvc)) {
      showError("cvcError1", "Wrong format, numbers only");
    } else {
      hideError("cvcError1");
    }

    setCvcCheck(regexCharacter.test(cvc));
  }

  function resetForm() {
    setCardNumber("");
    setCardholderName("");
    setMm("");
    setYy("");
    setCvc("");
    setCardNumberCheck(false);
    setCardholderNameCheck(false);
    setMmCheck(false);
    setYyCheck(false);
    setCvcCheck(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      cardNumberCheck &&
      cardholderNameCheck &&
      mmCheck &&
      yyCheck &&
      cvcCheck
    ) {
      setFormSubmitted(true);
      resetForm();
    } else {
      alert(error);
    }
  }

  return (
    <>
      <div className="cards">
        <div className="card_front">
          <div className="cardnumber">
            {cardNumber || "0000 0000 0000 0000"}
          </div>
          <div className="nameanddate">
            <div className="name">{cardholderName || "JANE APPLESEED"}</div>
            <div className="date">
              {mm || "00"} / {yy || "00"}
            </div>
          </div>
        </div>
        <div className="card_back">
          <div className="cvc">{cvc || "000"}</div>
        </div>
      </div>
      {!formSubmitted ? (
        <>
          <form id="form" onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                id="cardholderName"
                onChange={cardholderNameChange}
                value={cardholderName}
                placeholder="e.g. Jane Appleseed"
                maxLength="25"
                className={`largest ${!cardholderNameCheck ? "error-outline" : ""}`}
              />
              <p id="nameError" className="error"></p>
            </div>
            <div className="item">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                onChange={cardNumberChange}
                value={cardNumber}
                placeholder="e.g. 1234 5678 9123 0000"
                className={`largest ${!cardNumberCheck ? "error-outline" : ""}`}
              />
              <p
                id="cardNumberError1"
                 className="error"
              ></p>
              <p
                id="cardNumberError2"
                className="error"
              ></p>
            </div>
            <div className="child">
              <div className="item">
                <label htmlFor="date">Exp. Date (MM/YY)</label>
                <div className="dates">
                  <input
                    id="mm"
                    onChange={mmChange}
                    value={mm}
                    placeholder="MM"
                    maxLength="2"
                    className={`smallest ${!mmCheck ? "error-outline" : ""}`}
                  />
                  <input
                    id="yy"
                    onChange={yyChange}
                    value={yy}
                    placeholder="YY"
                    maxLength="2"
                    className={`smallest ${!yyCheck ? "error-outline" : ""}`}
                  />
                </div>
                <p id="MmError1" className="error"></p>
                <p id="MmError3" className="error"></p>
              </div>
              <div className="item">
                <label htmlFor="cvc">CVC</label>
                <input
                  id="cvc"
                  onChange={cvcChange}
                  value={cvc}
                  placeholder="e.g. 123"
                  maxLength="3"
                  className={`mid ${!cvcCheck ? "error-outline" : ""}`}
                />
                <p id="cvcError1" className="error"></p>
              </div>
            </div>
            <button type="submit">Confirm</button>
          </form>
        </>
      ) : (
        <div id="thanks" className="thanks">
          <div className="content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <circle cx="40" cy="40" r="40" fill="url(#paint0_linear_0_318)" />
              <path
                d="M28 39.9199L36.0801 48L52.0801 32"
                stroke="white"
                strokeWidth="3"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_0_318"
                  x1="-23.0143"
                  y1="11.5071"
                  x2="1.03143e-06"
                  y2="91.5071"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6348FE" />
                  <stop offset="1" stopColor="#610595" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text">
              <h1>THANK YOU!</h1>
              <p>We've added your card details</p>
            </div>
          </div>
          <button onClick={() => setFormSubmitted(false)}>Continue</button>
        </div>
      )}
    </>
  );
}

export default App;
