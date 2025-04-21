// ChartRenderer.tsx
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  chartOptionsMap: { [questionId: number]: any };
};

const ChartRenderer: React.FC<Props> = ({ chartOptionsMap }) => {
  return (
    <div style={{ position: "absolute", top: -9999, left: -9999 }}>
      {Object.entries(chartOptionsMap).map(([qid, options]) => (
        <div key={qid} id={`chart-${qid}`} style={{ width: 400, height: 400 }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      ))}
    </div>
  );
};

export default ChartRenderer;
