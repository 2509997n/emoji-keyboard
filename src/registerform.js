import { is } from '@babel/types';
import { useState, Fragment, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const RegisterForm = (props) => {

    // {} = json object
    const [inputs, setInputs] = useState({});
    const [validation, setValidation] = useState("");
    const [validationJson, setValidationJson] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValidationJson(values => ({...values, length: validateLength(value)}))
        setValidationJson(values=>({...values, number: validateNumber(value)}))
        setValidationJson(values=>({...values, special: validateChar(value)}))
        setValidationJson(values=>({...values, emoji: validateEmoji(value)}))
        setInputs(values => ({...values, [name]: value}))
    }

    const validateLength = (text) => {
        return text.length >= 8
    }

    const validateNumber = (text) => {
        return (/\d/.test(text))
    }
    const validateChar = (text) => {
        var specialRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialRegex.test(text);
    }
    const validateEmoji = (text) => {
        var emojiValidationRegex = /\p{Extended_Pictographic}/u;
        return emojiValidationRegex.test(text)
    }
    const handleSubmit = (event) => {
        var isValid = true;

        event.preventDefault();
        var errorMsg = "Your password does not meet the criteria above. Please try again to proceed.\n";
        // const splitText = () =>
        //     errorMsg.split("\n").map((value, index) => {
        //         return (
        //             <span key={index}>
        //                 {value}
        //                 <br />
        //             </span>
        //         );
        //     });

        // minimum 8 characters
        if (!validateLength(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain more than 8 characters\n";
        }
        // must contain at least 1 number
        if (!validateNumber(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain at least 1 number\n";
        }
        // must contain at least 1 special character
        if (!validateChar(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain at least 1 special character\n"
        }
        // Emoji regex validation
        // password contains an emoji
        if (!validateEmoji(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain at least 1 emoji\n";
        }
        // passwords match
        if (!(inputs.password===inputs.confirmPassword)) {
            // take to testing page
            isValid=false
            errorMsg = "* Cannot proceed - passwords must match. Please re-enter *";
        }

        if(isValid){
            // Submit and store
            props.setPassword(inputs.password);
            props.nextStage();

        }else{
            // splitText(errorMsg);
            setValidation(errorMsg);
        }
    }

    return (
        <>
            <h1>Set up your password</h1>
            <p>You must include:</p>

            {validationJson.length?
                <li style={{color: "green"}}>✓ Minimum of 8 characters</li> : <li style={{color: "red"}}>Minimum of 8 characters</li>}
            {validationJson.number?
                <li style={{color: "green"}}>✓ At least 1 number</li> : <li style={{color: "red"}}>At least 1 number</li>}
            {validationJson.special?
                <li style={{color: "green"}}>✓ At least 1 special character</li> : <li style={{color: "red"}}>At least 1 special character</li>}
            {validationJson.emoji?
                <li style={{color: "green"}}>✓ At least 1 emoji</li> : <li style={{color: "red"}}>At least 1 emoji</li>}

            <p></p>
            {validation.length>1? <p>{validation}</p> : null}
            <form className="App" onSubmit={handleSubmit}>
                <label>Enter your password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}/>
                </label>
                <label>Confirm password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword || ""}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Set Password"/>
            </form>
        </>
    )
}
export default RegisterForm;