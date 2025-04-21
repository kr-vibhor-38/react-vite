import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart: React.FC = () => {
  const options: Highcharts.Options = {
    title: {
      text: "My First Highcharts Chart",
    },
    credits:{enabled: false},
    series: [
      {
        type: "line",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
