
import React, { useState } from "react";
import "./ViewRating.css";
import LidkarService from "../Service/LidkarService";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import PdfPopupButton from "../PDF_testing/PdfPopupButton";



// Default colors safely extracted (avoiding undefined issues)
const baseColors: string[] = (Highcharts.getOptions().colors as string[]) || [];

// Apply radial gradient to Highcharts default colors
Highcharts.setOptions({
    colors: baseColors.map((color) => ({
        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
        stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.4).get("rgb") as string], // Ensuring it's always a string
        ],
    })),
});

const ViewRating: React.FC = () => {
    const { info, loading, error } = LidkarService();
    const INITIALLY = 3; //Set these as per requirement
    const STEP = 2;     // same
    const [visibleCount, setVisibleCount] = useState(INITIALLY); // Initially show 3 reviews

    
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!info || !info.data.survey_ans) return <p>No data available.</p>;


    const relevantQuestions = info.data.survey_ques.filter((q) => q.answer_type === 4);
    const relevantResponses = info.data.survey_res
        .filter((res) => Number(res.feedback_answer) !== 0 && Number(res.survey_ques_type) === 4)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Fixed sorting

    var no_of_respondents: number = 0;
    var first_qid: number = info.data.survey_ques[0].id;

    for (var i = 0; i < info.data.survey_res.length; i++) {
        if (first_qid === Number(info.data.survey_res[i].survey_q_id)) {
            no_of_respondents += Number(info.data.survey_res[i].feedback_answer);
            //console.log(Number(info.data.survey_res[i].survey_answer));
        }
    }
    const n = no_of_respondents;

    return (
        
            <div className="analytics-container">
                <h2 className="title">Analytics Component</h2>
                <div className="info-bar">
                    <div className="vote-count">
                        <h3>Total Number of Respondents: <span style={{ color: '#2bc23c' }}>{n}</span></h3>
                    </div>

                    <div className="btn-div">
                        <PdfPopupButton />
                    </div>
                </div>

                {info.data.survey_ques
                    .filter((q) => q.answer_type === 1)
                    .map((q, index) => (

                        <div key={q.id} className="question-block">
                            <h2 className="vote-title"><span style={{ color: '#2bc23c' }}>Q{index + 1}. </span>{q.question}</h2>
                            <div className="content-container">
                                {/* Vote Count (Left) */}

                                <div className="response-list">

                                    <table className="vote-table">
                                        <thead>
                                            <tr>
                                                <th>Answer</th>
                                                <th style={{ textAlign: 'center' }}>Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {info.data.survey_res
                                                .filter((res) => q.id === Number(res.survey_q_id))
                                                .map((res, index) => (
                                                    <tr key={index}>
                                                        <td>{res.survey_answer}</td>
                                                        <td style={{ textAlign: 'center' }}><b>{Number(res.feedback_answer)}</b></td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pie Chart (Right) */}
                                <div className="pie-chart" id={`chart-${q.id}`}>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={{
                                            chart: { type: "pie" },
                                            credits: { enabled: false },
                                            title: { text: `Answer Shares` },
                                            plotOptions: {
                                                pie: {
                                                    allowPointSelect: true,
                                                    cursor: "pointer",
                                                    dataLabels: {
                                                        enabled: true,
                                                        format: '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                                                            '</span><br>' +
                                                            '<span style="opacity: 0.6">{point.percentage:.1f} ' +
                                                            '%</span>'
                                                    }
                                                }
                                            },
                                            series: [{
                                                type: "pie",
                                                name: "Votes",
                                                data: info.data.survey_res
                                                    .filter((res) => q.id === Number(res.survey_q_id) && Number(res.feedback_answer) !== 0)
                                                    .map(res => (
                                                        { name: res.survey_answer, y: Number(res.feedback_answer) }
                                                    ))
                                            }]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                <div className="feedback-container">
                    {relevantQuestions
                        .map((q) => (
                            <div key={q.id} className="feedback-block">
                                <h2 className="feedback-title">{q.question}</h2>

                                <table className="feedback-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Feedback</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relevantResponses.slice(0, visibleCount)
                                            .map((res, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{res.feedback_answer}</td>
                                                    <td>{new Date(res.created_at).toLocaleString()}</td>
                                                    <td>{new Date(res.updated_at).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                                {/* Show "See Less" button when more than INITIALLY reviews are visible */}
                                {visibleCount > INITIALLY && (
                                    <button className="see-more-btn see-less-btn" onClick={() => setVisibleCount(prev => Math.max(INITIALLY, prev - STEP))}>
                                        <span style={{fontSize:"16px"}}>&#8722;</span> See Less
                                    </button>
                                )}

                                {/* Show "See More" button if there are more reviews to load */}
                                {visibleCount < relevantResponses.length && (
                                    <button className="see-more-btn see-more" onClick={() => setVisibleCount(visibleCount + STEP)}>
                                        <span style={{fontSize:"16px"}}>&#65291;</span> See More
                                    </button>
                                )}

                                {/* Shrink button when all reviews are displayed */}
                                { visibleCount > INITIALLY && (
                                    <button className="see-more-btn shrink-seeall shrink" onClick={() => setVisibleCount(INITIALLY)}>
                                        <span style={{fontSize:"16px"}}>&#128476;</span> Shrink
                                    </button>
                                )}

                                {/* See All button when not all reviews are visible */}
                                {visibleCount < relevantResponses.length && (
                                    <button className="see-more-btn shrink-seeall seeall" onClick={() => setVisibleCount(relevantResponses.length)}>
                                        <span style={{fontSize:"16px"}}>&#128463;</span> See All 
                                    </button>
                                )}
                            </div>
                        ))}

                </div>


            </div>

        
    );
};

export default ViewRating;