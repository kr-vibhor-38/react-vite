
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

    const [pageSize, setPageSize] = useState(10);
    const [startIndex, setStartIndex] = useState(0);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!info || !info.data.survey_ans) return <p>No data available.</p>;

    // Filter relevant data
    const relevantQuestions = info.data.survey_ques.filter(q => q.answer_type === 4);
    const relevantResponses = info.data.survey_res
        .filter(res => Number(res.feedback_answer) !== 0 && Number(res.survey_ques_type) === 4)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Pagination
    const total = relevantResponses.length;
    const endIndex = Math.min(startIndex + pageSize, total);
    const currentPageData = relevantResponses.slice(startIndex, endIndex);

    const goToFirst = () => setStartIndex(0);
    const goToLast = () => setStartIndex(Math.max(0, total - pageSize));
    const goToNext = () => setStartIndex(prev => Math.min(prev + pageSize, total - pageSize));
    const goToPrev = () => setStartIndex(prev => Math.max(0, prev - pageSize));

    const handleJump = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10) - 1;
        if (!isNaN(val) && val >= 0 && val < total) {
            setStartIndex(val);
        }
    };

    // Respondent count calculation
    const first_qid = info.data.survey_ques[0]?.id;
    const no_of_respondents = info.data.survey_res.reduce((acc: any, res: any) => {
        return Number(res.survey_q_id) === first_qid
            ? acc + Number(res.feedback_answer)
            : acc;
    }, 0);
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
                                        <th style={{width:"112px"}}>Created At</th>
                                        <th style={{width:"112px"}}>Updated At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map((res, index) => (
                                        <tr key={startIndex + index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{res.feedback_answer}</td>
                                            <td>{new Date(res.created_at).toLocaleString()}</td>
                                            <td>{new Date(res.updated_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="pagination-controls">
                                <span className="page-number-indicator">
                                    {startIndex + 1} - {endIndex} / {total}
                                </span>
                                <button onClick={goToFirst} disabled={startIndex === 0}>⏮ First</button>
                                <button onClick={goToPrev} disabled={startIndex === 0}>&#x25C0; Previous</button>
                                <button onClick={goToNext} disabled={endIndex >= total}>Next &#x25B6;</button>
                                <button onClick={goToLast} disabled={endIndex >= total}>Last ⏭</button>
                                

                                {/* Step Size Selector */}
                                <div className="control-section">
                                    <label className="">Table Size:</label>
                                    <select
                                        id="pageSize"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                                    >
                                        <option value={2}>2</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                </div>

                                {/* Jump to Index */}
                                <div className="control-section">
                                    <label className="op-name">Seek :</label>
                                    <input
                                        id="jumpIndex"
                                        type="number"
                                        min="1"
                                        max={total}
                                        onChange={handleJump}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ViewRating;