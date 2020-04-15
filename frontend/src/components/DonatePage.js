import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton, SecondaryButton, TertiartyButton } from '../shared/ButtonComponents.js';
import { ButtonToolbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import CreditCardInput from 'react-credit-card-input';

function DonatePage() {

  // state for the donation amount
  const [donateAmount, setDonateAmount] = useState(0);
  // state for when the user clicks the next button (may be unecessary but im lazy)
  const [nextToPaymentPressed, setNextToPaymentPressed] = useState(false);
  // state for wether to display a message that the user did not select a donation amount
  const [displayPickAmountMessage, setDisplayAmountMessage] = useState(false);
  // state for an amount the user wants to give to us
  const [supportUsAmount, setSupportUsAmount] = useState(0);
  // state for donateNow clicked
  const [donateNowClicked, setDonateNowClicked] = useState(false);
  // payment info
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [country, setCountry] = useState("");
  // const [address1, setAddress1] = useState("");
  // const [address2, setAddress2] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  const [cardNumber, setCardNumber] = useState();
  const [exp, setExp] = useState("");
  const [cvc, setCVC] = useState("");

  const formDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: ""
  }
  const [formValues, setFormValues] = useState(formDefaultValues);
  const {firstName, lastName, email, country, address1, address2, city, state} = formValues
  const formDefaultErrors = {
    firstName: [],
    lastName: [],
    email: [],
    country: [],
    address1: [],
    address2: [],
    city: [],
    state: [], 
  }
  const [formErrors, setFormErrors] = useState(formDefaultErrors)

  // handles when the user select a donation amount
  function handleAmountClick(amount) {
    // set to false, so it does not auto nav when the use selects the new amount (trust me, i think we need it)
    setNextToPaymentPressed(false);
    setDonateAmount(amount);
    // they selected a new amount, so remove the error message
    setDisplayAmountMessage(false);
  }

  // handles when next: to payment info is clicked
  function handleNextClick() {
    setNextToPaymentPressed(true);
    // check if the user selected an amount, and sets the display message accordingly
    setDisplayAmountMessage(donateAmount == 0);
  }

  // handles when the user changes the amount they want to give to us
  function handleSupportUsAmountChange(event, maskedvalue, floatvalue) {
    setSupportUsAmount(floatvalue);
  }

  // handles back to step 1
  function handleBackClick() {
    setNextToPaymentPressed(false);
    setDonateAmount(0);
  }

  function handleCardNumberChange(cardNum) {
    setCardNumber(cardNum);
  }

  function handleCardExpiryChange(exp) {
    setExp(exp);
  }

  function handleCardCVCChange(cvc) {
    setCVC(cvc);
  }

  function handleDonateClick() {
    setDonateNowClicked(true);
    console.log(cardNumber);
  }

  function handleChange(e, validators) {
    const target = e.target 
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    console.log(formValues)
    handleValidations(target, validators)
  }
  function handleValidations(target, validators) {
    validators.forEach(validation => {
      const result = validation(target.value)
      const errors = formErrors[target.name]
      if (result.valid) {
        if(errors.includes(result.message)) {
          setFormErrors(prevState => ({
            ...prevState,
            [target.name]: errors.filter(error => error != result.message)
          }))
        }
      } else {
        if(!errors.includes(result.message)) {
          setFormErrors(prevState => ({
            ...prevState,
            [target.name]: [...errors, result.message]
          }))
        }
      }
    })
  }
  function noBlanks(value) {
    return {
      valid: value.replace(/\s+/,"") > 0,
      message: "Value cannot be blank" 
    }
  }

  const donateHeader = {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    height: "100vh",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "15%",
    alignItems: "flex-start"
  }

  const bigText = {
    width: "551px",
    height: "142px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "48px",
    lineHeight: "70px",
  }

  const step = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "21px",
    color: "#828282",
  }

  const enterDonation = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "40px",
    paddingBottom: "20px",
  }

  const supportSiteText = {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px",
    paddingBottom: "10px",
  }

  const whyTheseAmountsText = {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px",
    paddingBottom: "10px",
    textDecoration: "underline",
  }

  const amountButton = {
    margin: "10px",
    width: "80px",
    height: "45px",
    background: "#F9F9F9",
    borderRadius: "41px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#000000",
    color: "#000000",
    fontSize: "18px",
    lineHeight: "21px",
    fontWeight: "bold",
    fontFamily: "Roboto",
  }

  const support = {
    color: "#828282",
    fontFamily: "sans-serif"
  }

  const supportForm = {
    paddingBottom: "40px",
  }

  const buttonToolbar = {
    paddingBottom: "20px",
  }

  const supportInput = {
    width: "60px",
    height: "30px",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
  }

  const numOfMealsNumber = {
    color: "#1136FC",
    textDecoration: "underline",
    background: "transparent",
  }

  const pickAnAmountMessage = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#EB5757",
  }

  const invoice = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 100px 0px 100px",
    flex: "1",
  }

  const invoiceText = {
    fontFamily: "Abril Tilting",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "27px",
    color: "#828282",
  }

  const invoiceSum = {
    fontFamily: "Abril Tilting",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "27px",
    color: "#000000",
  }

  const protectInfoHeader = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "uppercase",
    color: "#000000",
  }

  const protectInfoBody = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#4F4F4F",
    paddingTop: "10px"
  }

  const invoiceRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
  }

  const cardDetails = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "0px 100px 0px 50px"
  }

  const allInvoiceRows = {
    marginTop: "10%",
    marginBottom: "15%",
  }

  const paymentInfoSections = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  }

  const paymentFieldInput = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    fontColor: "#B0B0B0",
    height: "40px",
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#828282",
    marginBottom: "2%",
    textIndent: "5px",
  }

  const paymentInfoContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }

  const creditCardInput = {
    background: "transparent",
    borderColor: "#828282",
    borderStyle: "solid",
    borderWidth: "1px",
    height: "40px",
  }

  const creditCardField = {
    height: "65px",
    background: "transparent",
  }

  const donateTitleContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const nameContainer = {
    display: "flex",
    justifyContent: "space-between",
    width: "73%",
  }

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
  }

  // this is step one of the donation process
  if ((!nextToPaymentPressed || donateAmount == 0)) {
    return (<div style={donateHeader}>
      {/* if the user selected an amount give them the meals estimate */}
      {(donateAmount == 0) ? (
        <h1 style={bigText}>You are making the world better.</h1>
      ) : (
          <h1 style={bigText}>You are donating <br /> around <mark style={numOfMealsNumber}>
            {donateAmount / 12.5}</mark> meals</h1>
        )}
      <div>
        <h1 style={step}>STEP 1</h1>
        <h1 style={enterDonation}>Enter donation amount</h1>
        <ButtonToolbar style={buttonToolbar}>
          <Button onClick={() => handleAmountClick(25)} style={amountButton}>$25</Button>
          <Button onClick={() => handleAmountClick(50)} style={amountButton}>$50</Button>
          <Button onClick={() => handleAmountClick(100)} style={amountButton}>$100</Button>
          <Button onClick={() => handleAmountClick(200)} style={amountButton}>$200</Button>
        </ButtonToolbar>
        {/* error message if they next without selecting a donation amount */}
        {displayPickAmountMessage && <h1 style={pickAnAmountMessage} >Please select a donation amount</h1>}
        <OverlayTrigger
          placement={'top'}
          overlay={
            <Tooltip>
              These are the amounts that DoorDash allows for giftcards.
            </Tooltip>
          }
        >
          <h1 style={whyTheseAmountsText}>Why these amounts?</h1>
        </OverlayTrigger>
        {/*<h1 style={supportSiteText}>Would you like to help support this site?</h1>
        <div style={supportForm}>
          <CurrencyInput onChangeEvent={handleSupportUsAmountChange} style={supportInput} prefix="$" value={supportUsAmount} />
        </div>*/}
        <PrimaryButton onClick={() => handleNextClick(true)} text="Next: Payment information" />
      </div>
    </div>
    )
  } else if (!donateNowClicked) {
    return (
      // this is the second step,1G user enters payment info
      <div style={{ ...donateHeader }}>
        <div style={invoice}>
          <h1 style={bigText}>Your support <br />means a lot.</h1>
          <div style={allInvoiceRows}>
            <div style={invoiceRow}>
              <h1 style={invoiceText}>Donation</h1>
              <h1 style={invoiceText}>${donateAmount}</h1>
            </div>
            {/*<div style={invoiceRow}>
              <h1 style={invoiceText}>Your support &#128150;</h1>
              <h1 style={invoiceText}>${supportUsAmount}</h1>
            </div>*/}
            <hr style={{ backgroundColor: "black" }} />
            <div style={invoiceRow}>
              <h1 style={invoiceSum}>Total Amount</h1>
              <h1 style={invoiceSum}>${supportUsAmount + donateAmount}</h1>
            </div>
          </div>
          <div>
            <h1 style={protectInfoHeader}>protecting your information</h1>
            <h1 style={protectInfoBody}>We never store your credit card information and your payment details are sent over a secure connection.</h1>
          </div>
        </div>
        <div style={cardDetails}>
          <h1 style={step}>STEP 2</h1>
          <h1 style={enterDonation}>Enter payment details</h1>
          <div style={paymentInfoContainer}>
            <h1 style={paymentInfoSections}>Your information</h1>
            <div style={nameContainer}>
              <input type="text" onChange={(e) => handleChange(e, [noBlanks])} style={paymentFieldInput} placeholder="First Name" name = {"firstName"} value={firstName}></input>
              <input type="text" onChange={(e) => handleChange(e, [noBlanks])} style={paymentFieldInput} placeholder="Last Name" name = {"lastName"} value={lastName}></input>
            </div>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="Email address" name={"email"} value={email}></input>
            <h1 style={paymentInfoSections}>Address</h1>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="Country" name={"country"}  value={country}></input>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="Address 1" name={"address1"} value={address1}></input>
            <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="Address 2" name={"address2"}  value={address2}></input>
            <div style={nameContainer}>
              <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="City" name={"city"} value={city}></input>
              <input style={paymentFieldInput} type="text" onChange={(e) => handleChange(e, [noBlanks])} placeholder="State" name={"state"}  value={state}></input>
            </div>
          </div>
          <h1 style={paymentInfoSections}>Payment information</h1>
          <CreditCardInput fieldStyle={creditCardField} inputStyle={creditCardInput}
            cardNumberInputProps={{ value: cardNumber, onChange: () => handleCardNumberChange() }}
            cardExpiryInputProps={{ value: exp, onChange: () => handleCardExpiryChange() }}
            cardCVCInputProps={{ value: cvc, onChange: () => handleCardCVCChange() }}
          />
          <div style={buttonContainer}>
            <SecondaryButton onClick={() => handleBackClick()} text="Back" />
            <PrimaryButton text="Donate now" onClick={() => handleDonateClick()}/>
          </div>
          <h1 style={protectInfoBody}>By continuing, you are agreeing with CARE 37 terms and praivacy policy.</h1>
        </div>
      </div>
    )
  } else if (donateNowClicked) {
    return (
      <h1 style={{marginTop: "10%",}}>Thank you for making the world better.</h1>
    )
  }
}

export default DonatePage;
