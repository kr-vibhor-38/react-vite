import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";

const DonutChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    credits: { enabled: false },
    title: {
      text: "Donut Chart Example",
    },
    plotOptions: {
      pie: {
        innerSize: "70%", // Creates the donut effect
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f}%",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Votes",
        data: [
          { name: "Category A", y: 40 },
          { name: "Category B", y: 30 },
          { name: "Category C", y: 20 },
          { name: "Category D", y: 11 },
        ],
      },
    ],
  };

  return(
    <div className="">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Link to="/pie_w_grad" >gradient</Link>
    </div>
  ) ;
};

export default DonutChart;
