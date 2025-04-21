import React from "react";
import { Link } from "react-router-dom";
 import "./FeedbackPage.css";

 const LidkarSurvey: React.FC=()=>{
    return(
        <div className="box">
            <h1 className="mrgn">Please give your valuable feedback</h1>
            <iframe src=" https://pollmonk-survey.sunplussoftware.com:4102/feedback/?fid=MjI=&ftype=1" width="100%" height="100%"
            style={{border: "none"}}
            title="Lidkar Survey"
            ></iframe>
            <Link to="/">Back to Home</Link>
        </div>
    )
 }

 export default LidkarSurvey;