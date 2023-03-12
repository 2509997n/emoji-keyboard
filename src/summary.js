import {useState } from 'react'

const Summary = (props)=>{
    return(
        <>
            <h2>Thanks for completing our prototype!</h2>
            <p>Heres your stats, please screenshot and send this page over.</p>
            <table>
                <tr>
                    <th>Attempts</th>
                    <td>{props.attempts}</td>
                </tr>
                <tr>
                    <th>Successful Logins</th>

                    <td>{props.successes}</td>
                </tr>
                <tr>
                    <th>Failed Logins</th>
                    <td>{props.failures}</td>
                </tr>
            </table>
            <p>If you want to reset, please click this button.</p>
            <button onClick={props.resetAll}>Reset</button>
        </>


    )
}

export default Summary;