import {useState} from 'react'

const Lockscreen = (props)=>{
    const [passwordAttempt, setPasswordAttempt]=useState("")

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setPasswordAttempt(value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(passwordAttempt===props.password){
            alert("Unlocked!")
            props.iAttempt(true);
        }else{
            alert("Incorrect password")
            props.iAttempt(false);
        }
        setPasswordAttempt("")
    }
    return(
        <>
        <p>Unlock Attempt #{props.attempt+1}</p>
            <form onSubmit={handleSubmit}>
                <input type={"password"} name="passwordAttempt" value={passwordAttempt} onChange={handleChange}/>
                <input type="submit" value="Unlock" onSubmit={handleSubmit}/>
            </form>
        </>
    )
}

export default Lockscreen;