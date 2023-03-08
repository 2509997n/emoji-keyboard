import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your password:
      <input 
        type="text" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Confirm password:
        <input 
          type="text" 
          name="confirmPassword" 
          value={inputs.confirmPassword || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);