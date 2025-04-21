// // PdfComponent.tsx
// import React from 'react';
// import { pdf } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';
// //import MyDocument from './initialize_pdf';
// //import TheDocument from './init_pdf2';
// import FullPdfReport  from './InitPdf3';
// import LidkarService from '../Service/LidkarService';
// //import MyDocument from './MyDocument';

// const PdfComponent: React.FC = () => {

//   const { info, loading, error } = LidkarService();


//   // const handleDownload = async () => {
//   //   const blob = await pdf(<MyDocument />).toBlob();
//   //   saveAs(blob, 'table.pdf');
//   // };

//   // const download2 = async () => {
//   //   const blob = await pdf(<TheDocument />).toBlob();
//   //   saveAs(blob, 'table2.pdf');
//   // }

//   const downloadReport = async () => {
//     if (!info) return;
//     const blob = await pdf(<FullPdfReport info={info}/>).toBlob();
//     saveAs(blob, 'report.pdf')
//   }

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       {/* <button onClick={handleDownload}>Download PDF</button>
//       <button onClick={download2}>Download Table 2</button> */}
//       <button onClick={downloadReport}>Download Table 3</button> 
//     </div>
    
//   );
// };

// export default PdfComponent;

// PdfComponent.tsx
import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import LidkarService from "../Service/LidkarService";
import FullPdfReport from "./InitPdf3";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PdfComponent: React.FC = () => {
  const { info, loading, error } = LidkarService();
  const [chartImages, setChartImages] = useState<{ [key: number]: string }>({});
  const [isPreparing, setIsPreparing] = useState(true); // <- NEW

  const ChartRenderBlock = () => {
    if (!info) return null;

    const questions = info.data.survey_ques.filter((q: any) => q.answer_type === 1);

    return (
      <div style={{ position: "absolute", top: -9999, left: -9999 }}>
        {questions.map((q: any) => (
          // <div className="pie-chart" key={q.id} id={`chart-${q.id}`} style={{ width: 400, height: 500 }}>
            <div key={q.id} id={`chart-${q.id}`} style={{ width: 400, height: 400 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: { type: "pie" },
                credits: { enabled: false },
                title: { text: `Answer Shares` },
                plotOptions: {
                  pie: {
                    size:'120%',
                    cursor: "pointer",
                    dataLabels: {
                      enabled: true,
                      format:
                        '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                        '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
                    },
                  },
                },
                series: [
                  {
                    type: "pie",
                    name: "Votes",
                    data: info.data.survey_res
                      .filter(
                        (res: any) =>
                          q.id === Number(res.survey_q_id) &&
                          Number(res.feedback_answer) !== 0
                      )
                      .map((res: any) => ({
                        name: res.survey_answer,
                        y: Number(res.feedback_answer),
                      })),
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  // Generate chart images
  useEffect(() => {
    const generateBase64Images = async () => {
      if (!info) return;
      setIsPreparing(true); // <- show loading

      const temp: { [key: number]: string } = {};
      const questions = info.data.survey_ques.filter((q: any) => q.answer_type === 1);

      for (const q of questions) {
        const el = document.getElementById(`chart-${q.id}`);
        if (el) {
          const canvas = await html2canvas(el, { scale: 2 });
          temp[q.id] = canvas.toDataURL("image/png");
        }
      }

      setChartImages(temp);
      setIsPreparing(false); // <- done loading
    };

    setTimeout(generateBase64Images, 1000);
  }, [info]);

  const downloadReport = async () => {
    if (!info || Object.keys(chartImages).length === 0) return;
    const blob = await pdf(<FullPdfReport info={info} chartImages={chartImages} />).toBlob();
    saveAs(blob, "report.pdf");
  };

  if (loading) return <p>Loading survey data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <ChartRenderBlock />

      {isPreparing ? (
        <p>Please wait, preparing your PDF...</p>
      ) : (
        <button onClick={downloadReport} disabled={isPreparing} className="download-btn">
          &#129035; Download Report &#128464;
        </button>
      )}
    </div>
  );
};

export default PdfComponent;
