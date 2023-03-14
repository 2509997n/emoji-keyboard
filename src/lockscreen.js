import {useState} from 'react'
import EmojiPicker from "emoji-picker-react";

const Lockscreen = (props)=>{
    const [passwordAttempt, setPasswordAttempt]=useState("")

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setPasswordAttempt(value);
    }
    const onEmojiClick = (event, emojiObject) => {
        var totalVal = passwordAttempt + event.emoji;
        setPasswordAttempt( totalVal);
    };

    function handleSubmit(e){
        e.preventDefault();
        if(passwordAttempt===props.password){
            props.iAttempt(true);
        }else{
            props.iAttempt(false);
        }
        setPasswordAttempt("")
    }
    return(
        <>
            <p>{props.numbersOnly}</p>
        <p>Unlock Attempt #{props.attempt+1}</p>
            <form onSubmit={handleSubmit}>
                {props.numbersOnly? <>
                        <input type={"password"} name="passwordAttempt" pattern="[0-9]*" value={passwordAttempt} onChange={handleChange}/>
                    </>:
                    <>
                        <p>PASSWORD</p>
                        <input type={"password"} name="passwordAttempt" value={passwordAttempt} onChange={handleChange}/>
                        <EmojiPicker
                            onEmojiClick={onEmojiClick} suggestedEmojisMode="recent"/>

                    </>}

                <input type="submit" value="Unlock" onSubmit={handleSubmit}/>
            </form>
        </>
    )
}

export default Lockscreen;