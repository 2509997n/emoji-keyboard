import RegisterForm from "./registerform";
import {useState} from "react";
import Lockscreen from "./lockscreen";
import Summary from "./summary";

const Container = (props)=> {
    const [password, setPassword] = useState();
    const [stage, setStage] = useState(0);
    const [attempt, setAttempt] = useState(0);
    const [attemptTime, setTime] = useState([])
    const [successes, setSuccesses] = useState(0);
    const [failures, setFailures] = useState(0);
    const [numAttempts, setNumAttempt] = useState(9);
    const [numbersOnly, setNumbersOnly]=useState(false)

    let now = Date.now();

    function nextStage(){
        setStage(stage+1);
    }
    function setMode(mode){
        setNumbersOnly(mode);
    }
    function resetAll(){
        setPassword("");
        setAttempt(0)
        setTime([])
        setSuccesses(0)
        setFailures(0)
        setStage(0)
    }
    function incrementAttempt(success){
        if(success){
            let t = Math.abs(Date.now() - now) / 1000
            let s = t % 60
            setSuccesses(successes+1)
            setTime(attemptTime + ("Attempt "+(attempt+1)+": "+s+"s "))
        }else{
            setFailures(failures+1)
        }
        if(attempt >= numAttempts){
            nextStage();
        }else{
            setAttempt(attempt+1)
        }
    }

    return(
        <>
            {stage===0? <RegisterForm nextStage={nextStage} setMode={setMode} setPassword={setPassword}/> : null}
            {stage===1? <Lockscreen attempt={attempt} password={password} numbersOnly={numbersOnly} iAttempt={incrementAttempt}/>:null}
            {stage===2? <Summary attempts={attempt} successes={successes} numbersOnly={numbersOnly}failures={failures} resetAll={resetAll} attemptTime={attemptTime}/>:null}
        </>
    )
}
export default Container;

