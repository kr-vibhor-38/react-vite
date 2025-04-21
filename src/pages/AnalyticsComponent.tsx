// import React from "react";
// import { Link } from "react-router-dom";
// import AnalyticsService from "../Service/AnalyticsService";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const AnalyticsComponent: React.FC = () => {
//     const {questions,loading,error} = AnalyticsService();

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h2>Analytics Component</h2>
//             {questions.map(question => (
//                 <div key={question.questionId}>
//                     <h3>{question.questionText}</h3>
//                     <ul>
//                         {question.responses.map((response,index)=>(
//                             <li key={index}>
//                                 {response.answer} - {response.votes} votes
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//             {questions.map(question=>(
//                 <div>
//                     <HighchartsReact highcharts={Highcharts} key={question.questionId} options={{
//                     chart: {
//                         type: 'bar'
//                     },
//                     credits:{enabled:false},
//                     title: {
//                         text: ` for ${question.questionText}`
//                     },
//                     xAxis: {
//                         categories: question.responses.map(response => response.answer)
//                     },
//                     yAxis: {
//                         title: {
//                             text: 'Votes'
//                         }
//                     },
//                     series: [{
//                         name: 'Votes',
//                         data: question.responses.map(response => response.votes)
//                     }]
//                     }}/>
//                     <HighchartsReact highcharts={Highcharts} key={question.questionId} options={{
//                     chart: {
//                         type: 'pie'
//                     },
//                     credits:{enabled:false},
//                     title: {
//                         text: ` for ${question.questionText}`
//                     },
//                     plotOptions: {
//                         pie: {
//                             allowPointSelect: true,
//                             cursor: 'pointer',
//                             dataLabels: {
//                                 enabled: true,
//                                 format: '<b>{point.name}</b>: {point.y} votes'
//                             }
//                         }
//                     },
//                     series: [{
//                         type: 'pie',
//                         name: 'Votes',
//                         data: question.responses.map(response => ({name: response.answer, y: response.votes}))
//                     }]
//                     }}/>
//                 </div>
//             ))}
//             <Link to="/">Home</Link>
//         </div>   
//     );
// };

// export default AnalyticsComponent;

import React from "react";
import { Link } from "react-router-dom";
import AnalyticsService from "../Service/AnalyticsService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./AnalyticsComponent.css"; // Import external CSS

const AnalyticsComponent: React.FC = () => {
    const { questions, loading, error } = AnalyticsService();

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="analytics-container">
            <h2 className="title">Analytics Component</h2>

            {questions.map((question) => (
                <div key={question.questionId} className="question-block">
                    <h3 className="question-text">{question.questionText}</h3>
                    <ul className="response-list">
                        {question.responses.map((response, index) => (
                            <li key={index} className="response-item">
                                {response.answer} - {response.votes} votes
                            </li>
                        ))}
                    </ul>

                    <div className="chart-container">
                        {/* Bar Chart (Left) */}
                        <div className="bar-chart">
                            <HighchartsReact 
                                highcharts={Highcharts} 
                                options={{
                                    chart: { type: "bar" },
                                    credits: { enabled: false },
                                    title: { text: `Votes for ${question.questionText}` },
                                    xAxis: { categories: question.responses.map(response => response.answer) },
                                    yAxis: { title: { text: "Votes" } },
                                    series: [{ name: "Votes", data: question.responses.map(response => response.votes) }]
                                }} 
                            />
                        </div>

                        {/* Pie Chart (Right) */}
                        <div className="pie-chart">
                            <HighchartsReact 
                                highcharts={Highcharts} 
                                options={{
                                    chart: { type: "pie" },
                                    credits: { enabled: false },
                                    title: { text: `Votes for ${question.questionText}` },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: "pointer",
                                            dataLabels: {
                                                enabled: true,
                                                format: "<b>{point.name}</b>: {point.y} votes"
                                            }
                                        }
                                    },
                                    series: [{
                                        type: "pie",
                                        name: "Votes",
                                        data: question.responses.map(response => ({ name: response.answer, y: response.votes }))
                                    }]
                                }} 
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Link to="/" className="home-link">Home</Link>
        </div>
    );
};

export default AnalyticsComponent;
