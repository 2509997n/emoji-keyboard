import { is } from '@babel/types';
import { useState, Fragment, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import EmojiPicker from 'emoji-picker-react';
import './index.css';

const RegisterForm = (props) => {

    // {} = json object
    const [inputs, setInputs] = useState({});
    const [validation, setValidation] = useState("");
    const [validationJson, setValidationJson] = useState({});
    const [selected, setSelected] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValidationJson(values => ({...values, length: validateLength(value)}))
        setValidationJson(values=>({...values, emoji: validateEmoji(value)}))
        setInputs(values => ({...values, [name]: value}))
    }

    const selectBox = (name) => {
        setSelected(name)
    }

    const validateLength = (text) => {
        return text.length >= 6
    }
    const validateEmoji = (text) => {
        var emojiValidationRegex = /\p{Extended_Pictographic}/u;
        return emojiValidationRegex.test(text)
    }

    const onEmojiClick = (event, emojiObject) => {
        var value=''
        if(inputs[selected] !== undefined){
            value=inputs[selected]
        }
        setInputs(values => ({...values, [selected]: value + (event.emoji)}))
      };

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

        // minimum 6 characters
        if (!validateLength(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain more than 6 characters\n";
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
                <li style={{color: "green"}}>✓ Minimum of 6 characters</li> : <li style={{color: "red"}}>Minimum of 6 characters</li>}
            {validationJson.emoji?
                <li style={{color: "green"}}>✓ At least 1 emoji</li> : <li style={{color: "red"}}>At least 1 emoji</li>}

            <li style={{color: "orange"}}>Can include numbers</li>
            <li style={{color: "orange"}}>Can include special character</li>

            <p></p>
            {validation.length>1? <p>{validation}</p> : null}
            <form className="App" onSubmit={handleSubmit}>
                <label>Enter your password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        onClick={()=>selectBox("password")}/>
                </label>
                <label>Confirm password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword || ""}
                        onChange={handleChange}
                        onClick={()=>selectBox("confirmPassword")}
                    />
                </label>
                <EmojiPicker
                    onEmojiClick={onEmojiClick}/>
                <input type="submit" value="Set Password"/>
                <p>{inputs.password}</p>
            </form>
        </>
    )
}
export default RegisterForm;