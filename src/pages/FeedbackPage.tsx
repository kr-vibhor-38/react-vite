import React from "react";
import './FeedbackPage.css'

const FeedBackPage: React.FC=()=>{
    return (
        <div className="box">
            <h1>FeedBack Page</h1>
            <div className="iframe-wrapper">
                <iframe src="https://pollmonk-survey.sunplussoftware.com:4102/feedback/?fid=Nw==&ftype=1" 
            width="100%" 
            height="100%"
            style={{border: "none"}}
            title="Feedback Page"
            ></iframe>
            </div>
        </div>
    );
};

export default FeedBackPage;