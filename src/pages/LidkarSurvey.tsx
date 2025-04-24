import React from "react";
import "./FeedbackPage.css";

const LidkarSurvey: React.FC = () => {
    return (
        <div className="box">
            <h1 className="mrgn">Please give your valuable feedback</h1>
            <div className="iframe-wrapper">
                <iframe src=" https://pollmonk-survey.sunplussoftware.com:4102/feedback/?fid=Mg==&ftype=1"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="Lidkar Survey"
                ></iframe>
            </div>
        </div>
    )
}

export default LidkarSurvey;