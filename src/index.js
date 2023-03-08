import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function MyForm() {
  
  const [inputs, setInputs] = useState({});
  // add a counter to monitor how many attempts
  // const [count, setCount] = useState(0);
  // const [calculation, setCalculation] = useState(0);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
    console.log("-- submit button clicked --");
    console.log();
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
        name="1stPwd" 
        value={inputs.password || ""} 
        onChange={handleChange}/>
      </label>
      <label>Confirm password:
        <input 
          type="password" 
          name="2ndPwd" 
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