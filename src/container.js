import RegisterForm from "./registerform";
import {useState} from "react";
import Lockscreen from "./lockscreen";
import Summary from "./summary";

const Container = (props)=> {
    const [password, setPassword] = useState();
    const [stage, setStage] = useState(0);
    const [attempt, setAttempt] = useState(0);
    const [successes, setSuccesses] = useState(0)
    const [failures, setFailures] = useState(0)
    const [numAttempts, setNumAttempt] = useState(4);

    function nextStage(){
        setStage(stage+1);
    }
    function resetAll(){
        setPassword("");
        setAttempt(0)
        setSuccesses(0)
        setFailures(0)
        setStage(0)
    }
    function incrementAttempt(success){
        if(success){
            setSuccesses(successes+1)
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
            {stage===0? <RegisterForm nextStage={nextStage} setPassword={setPassword}/> : null}
            {stage===1? <Lockscreen attempt={attempt} password={password} iAttempt={incrementAttempt}/>:null}
            {stage===2? <Summary attempts={attempt} successes={successes} failures={failures} resetAll={resetAll}/>:null}
        </>
    )
}
export default Container;

