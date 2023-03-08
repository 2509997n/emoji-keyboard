import { is } from '@babel/types';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function MyForm() {
  
  // {} = json object
  const [inputs, setInputs] = useState({});
  const [password, setPassword] = useState("");
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
    console.log("-- submit button clicked --");
    // minimum 8 characters
    if (inputs.password.length < 8) {
      isValid = false;
      alert("Password must be more than 8 characters");
    }
    // must contain at least 1 number
    if (!/\d/.test(inputs.password)) {
      isValid = false;
      alert("Password must contain at least 1 number");
    }
    // must contain at least 1 special character
    if (!format.test(inputs.password)) {
      isValid = false;
      alert("Password must contain at least 1 special character")
    }
    // password contains an emoji
    if (!/\p{Emoji}/u.test(inputs.password)) {
      isValid = false;
      alert("Password must contain at least 1 emoji")
    }
    // passwords match
    if (inputs.password===inputs.confirmPassword) {
      // take to testing page
      setPassword(inputs.password);
      console.log("-- " + password);
    }
    else {
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
          onChange={handleChange}/>
        </label>
        <input type="submit" />
        {/* // when the button is clicked, increment the counter by 1
          <button onClick={() => setCount((c) => c + 1)}>Enter</button>
        <p>Attempts: {calculation}</p> */}
    </form>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);