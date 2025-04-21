import React, { useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as htmlToImage from 'html-to-image';
import ChartPDF from "./ChartPDF";


const options: Highcharts.Options = {
  chart: {
    type: "pie",
    plotBackgroundColor: undefined,
    plotBorderWidth: undefined,
    plotShadow: false,
  },
  credits:{enabled:false},
  title: {
    text: "Fruit Distribution",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format:
          '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                  '</span><br>' +
                  '<span style="opacity: 0.6">{point.percentage:.1f} ' +
                  '%</span>',
        connectorColor: "rgba(128,128,128,0.5)",
      },
    },
  },
  series: [
    {
      type: "pie",
      name: "Fruits",
      colorByPoint: true,
      data: [
        { name: "Apple", y: 40 },
        { name: "Banana", y: 30 },
        { name: "Cherry", y: 20 },
        { name: "Grapes", y: 10 },
      ],
    } as Highcharts.SeriesPieOptions,
  ],
};


const GradientPieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartImage, setChartImage] = useState<string | null>(null);

  const handleCapture = async () => {
    if (chartRef.current) {

      const originalWidth = chartRef.current.style.width;

      chartRef.current.style.width = '100%';

      // Wait a moment to let re-render happen
    await new Promise(resolve => setTimeout(resolve, 300));


      const dataUrl = await htmlToImage.toPng(chartRef.current);

      // Restore original width
    chartRef.current.style.width = originalWidth;
      setChartImage(dataUrl);
    }
  };

  return (
  <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h2>Highcharts Pie Chart</h2>
      <div style={{ margin:"0 auto", textAlign:"center"}} ref={chartRef}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      <button onClick={handleCapture} style={{ marginTop: 20 }}>
        Capture & Generate PDF
      </button>

      {chartImage && (
        <div style={{ marginTop: 20 }}>
          <PDFDownloadLink
            document={<ChartPDF chartImage={chartImage} />}
            fileName="pie-chart.pdf"
          >
            {({ loading }) =>
              loading ? 'Preparing PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>

  );
};

export default GradientPieChart;
