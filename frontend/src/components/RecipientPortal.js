import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../contexts/react-auth0-spa";
import { PrimaryButton, SecondaryButton } from "../shared/ButtonComponents";

function RecipientPortal() {
  const { loading, isAuthenticated, loginWithRedirect, logout, user, text } = useAuth0();
  const [addedPhoneNumber, setAddedPhoneNumber] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    checkIfPhoneNumberAdded();
    checkIsVerified();
  }, []);

  const checkIfPhoneNumberAdded = async () => {
    console.log(user);

    const data = {
      email: user.email
    }

    fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getPhoneNumber', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      function (response) {
        // check if phone number is not 0
        console.log(response)
      }
    )
  }

  const checkIsVerified = async () => {
    const data = {
      email: user.email
    }

    fetch('https://care37-cors-anywhere.herokuapp.com/https://care37.herokuapp.com/getIsVerified', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      function (response) {
        // check if user is verified
        console.log(response)
      }
    )

  }

  function handlePhoneNumberChange(e) {
    const target = e.target;
    setPhoneNumber(target.value);
  }

  return (
    <div style={header}>
      {!addedPhoneNumber && (
        <div style={header}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h1 style={infoBeenAdded}>Please enter a phone number so we can call and verify you.</h1>
            <input style={phoneInput} type="text" onChange={(e) => handlePhoneNumberChange(e)} placeholder="Phone Number" name={"phoneNumber"} value={phoneNumber}></input>
        </div>
      )}

      {/*
      {isAuthenticated && (
          <div style={textHeader}>
            <h1 style={thankYou}>Thank you for signing up to be a recipient!</h1>
            <h4 style={infoBeenAdded}>Your information has been added to our database and you will 
                                      recieve an email when have been matched with a donor.</h4>
          <div style={last} >
            <SecondaryButton onClick={() => logout({})} text="Log out" />
          </div>
          </div>
          
        )
      }

        { !isAuthenticated &&
          (<Redirect  to="/" />)
      }
    */}
    </div>
  );

}

const phoneInput = {
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

const thankYou = {
  textAlign: "center",
  paddingBottom: "20px",
}

const infoBeenAdded = {
  textAlign: "center",
  marginLeft: "5%",
  marginRight: "5%",
}

const header = {
  marginTop: "5%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export default RecipientPortal;
