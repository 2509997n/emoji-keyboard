import { is } from '@babel/types';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const RegisterForm = (props) =>{

    // {} = json object
    const [inputs, setInputs] = useState({});
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("");
    // add a counter to monitor how many attempts
    // const [count, setCount] = useState(0);
    // const [calculation, setCalculation] = useState(0);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        var isValid = true;
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        event.preventDefault();
        var errorMsg = "";
        // minimum 8 characters
        if (inputs.password.length < 8) {
            isValid = false;
            errorMsg += "Password must be more than 8 characters \n";
        }
        // must contain at least 1 number
        if (!/\d/.test(inputs.password)) {
            isValid = false;
            errorMsg += "Password must contain at least 1 number";
        }
        // must contain at least 1 special character
        if (!format.test(inputs.password)) {
            isValid = false;
            errorMsg += "Password must contain at least 1 special character"
        }
        // Emoji regex validation
        var emojiValidationRegex = /\p{Extended_Pictographic}/u;
        // password contains an emoji
        if (!emojiValidationRegex.test(inputs.password)) {
            isValid = false;
            errorMsg += "Password must contain at least 1 emoji";
        }
        // passwords match
        if (!(inputs.password===inputs.confirmPassword)) {
            // take to testing page
            isValid=false
            errorMsg += "Password fields must match!"
        }

        if(isValid){
            // Submit and store
            props.setPassword(inputs.password);
            props.nextStage();

        }else{
            setValidation(errorMsg);
        }
    }

    // set the calculation to use the counter
    // useEffect(() => {
    //   setCalculation(() => count);
    // }, [count]);

    return (
        <>
            <h1>Set up your password</h1>
            <p>You must include:</p>
            <li>Minimum of 8 characters</li>
            <li>At least 1 number</li>
            <li>At least 1 special character</li>
            <li>At least 1 emoji</li>
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