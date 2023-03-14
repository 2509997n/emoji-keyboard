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
    const [numbersOnly, setNumbersOnly] = useState(false);

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
    const setMode = (mode)=>{
        if(mode==="number"){
            setNumbersOnly(true)
            props.setMode("number")
        }else{
            setNumbersOnly(false);
            props.setMode("emoji")
        }
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
        var totalVal = value + event.emoji;
        setValidationJson(values=>({...values, emoji: validateEmoji(totalVal)}))
        setValidationJson(values => ({...values, length: validateLength(totalVal)}))
        setInputs(values => ({...values, [selected]: totalVal}))
      };

    const handleSubmit = (event) => {
        var isValid = true;

        event.preventDefault();
        var errorMsg = "Your password does not meet the criteria above. Please try again to proceed.\n";


        // minimum 6 characters
        if (!validateLength(inputs.password)) {
            isValid = false;
            // errorMsg += "Must contain more than 6 characters\n";
        }
        // Emoji regex validation
        // password contains an emoji
        if (!validateEmoji(inputs.password) && numbersOnly===false) {
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
            <br/>
            <br/>

            <h1>Set up your password</h1>
            <button onClick={()=>setMode("number")}>Select Number Mode</button>
            <button onClick={()=>setMode("emoji")}>Select Emoji Mode</button>

            <p>You must include:</p>

            {validationJson.length?
                <li style={{color: "green"}}>✓ Minimum of 6 characters</li> : <li style={{color: "red"}}>Minimum of 6 characters</li>}
            {numbersOnly===false? <>
                {validationJson.emoji?
                    <li style={{color: "green"}}>✓ At least 1 emoji</li> : <li style={{color: "red"}}>At least 1 emoji</li>}

            </>:<>

            </>}
            {numbersOnly===false? <>
                <li style={{color: "orange"}}>Can include numbers</li>
                <li style={{color: "orange"}}>Can include special character</li>
            </>: <>
                <li style={{color: "orange"}}>Must include numbers</li>
            </>}



            <p></p>
            {validation.length>1? <p>{validation}</p> : null}
            <form className="App" onSubmit={handleSubmit}>

                    {numbersOnly? <>
                            <label>Enter your password:
                            <input
                                type="password"
                                name="password"
                                pattern="[0-9]*"
                                value={inputs.password || ""}
                                onChange={handleChange}
                                onClick={()=>selectBox("password")}/>
                            </label>
                            <label>Confirm password:
                                <input
                                    type="password"
                                    pattern="[0-9]*"
                                    name="confirmPassword"
                                    value={inputs.confirmPassword || ""}
                                    onChange={handleChange}
                                    onClick={()=>selectBox("confirmPassword")}
                                />
                            </label>
                        </> :

                        <>
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
                                onEmojiClick={onEmojiClick} suggestedEmojisMode=""/>
                        </>}

                <input type="submit" value="Set Password"/>
            </form>
        </>
    )
}
export default RegisterForm;