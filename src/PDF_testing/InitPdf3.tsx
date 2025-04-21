
// import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
// import React from "react";

// const styles = StyleSheet.create({
//   page: { padding: 20 },
//   section: { marginBottom: 30 },
//   title: { fontSize: 18, marginBottom: 5 },
//   image: { width: 400, height: 300, marginVertical: 10 },
//   table: { display: "flex", flexDirection: "column", width: "auto" },
//   row: { flexDirection: "row" },
//   cell: { padding: 5, fontSize: 12, width: "50%" },
// });

//   type Props = {
//     info:any;
//   };

//   // Utility to chunk array
// const chunkArray = (arr: any[], size: number) => {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// };

//   // the Main Function
//  const FullPdfReport:React.FC<Props> = ({info}) => {

//   var no_of_respondents: number = 0;
//     var first_qid : number = info.data.survey_ques[0].id;

//     for(var i = 0; i < info.data.survey_res.length; i++) {
//         if(first_qid === Number(info.data.survey_res[i].survey_q_id)){
//             no_of_respondents += Number(info.data.survey_res[i].feedback_answer);
//             //console.log(Number(info.data.survey_res[i].survey_answer));
//         }
//     }
//     //const n=no_of_respondents;

//   const questions = info.data.survey_ques.filter((q: any) => q.answer_type === 1);
//   const questionChunks = chunkArray(questions, 2); // 2 questions per page


//   const relevantQuestions = info.data.survey_ques.filter((q:any) => q.answer_type === 4);
//     const relevantResponses = info.data.survey_res
//     .filter((res:any) => Number(res.feedback_answer) !== 0 && Number(res.survey_ques_type) === 4)
//     .sort((a:any, b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
// return(
//   <Document>
//     {questionChunks.map((chunk,pageIndex)=>(

//       <Page key={pageIndex} size="A4" style={styles.page}>
//         {pageIndex == 0 &&(
//           <View>
//               <Text style={styles.title}>Total number of respondents = {no_of_respondents}</Text>
//           </View>
//         )};
//       {chunk.map((q: any, index: number) => (
//         <View key={index} style={styles.section}>
//           <Text style={styles.title}>Q{index + 1 + pageIndex * 2}. {q.question}</Text>
//           <View style={styles.table}>
//             <View style={styles.row}>
//               <Text style={styles.cell}>Answer</Text>
//               <Text style={styles.cell}>Votes</Text>
//             </View>
//             {info.data.survey_res
//               .filter((res: any) => q.id === Number(res.survey_q_id))
//               .map((res: any, i: number) => (
//                 <View key={i} style={styles.row}>
//                   <Text style={styles.cell}>{res.survey_answer}</Text>
//                   <Text style={styles.cell}>{res.feedback_answer}</Text>
//                 </View>
//               ))}
//           </View>
//         </View>
//       ))}
//     </Page>
//     ))}
//     {/* {Feedback Section} */}
//     <Page size="A4" style={styles.page}>
//       {relevantQuestions
//       .map((q:any) => (
//         <View>
//           <Text style={styles.title}>{q.question}</Text>
//           <View style={styles.table}>
//             <View style={styles.row}>
//               <Text style={styles.cell}>#</Text>
//               <Text style={styles.cell}>Feedback</Text>
//               <Text style={styles.cell}>Submitted At</Text>
//             </View>
//             {relevantResponses
//               .map((res: any, i: number) => (
//                 <View key={i} style={styles.row}>
//                   <Text style={styles.cell}>{i+1}</Text>
//                   <Text style={styles.cell}>{res.feedback_answer}</Text>
//                   <Text style={styles.cell}>{new Date(res.created_at).toLocaleString()}</Text>
//                 </View>
//               ))}
//           </View>

//         </View>
//       ))}
//     </Page>

//   </Document>
// )};
// export default FullPdfReport;

// InitPdf3.tsx
// import { Document, Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
// import React from "react";

// const styles = StyleSheet.create({
//   page: { padding: 20 },
//   section: { marginBottom: 30 },
//   title: { fontSize: 18, marginBottom: 5 },
//   table: { display: "flex", flexDirection: "column", width: "100%" },
//   row: { flexDirection: "row" },
//   cell: { padding: 5, fontSize: 12, width: "50%" },
//   layoutRow: { flexDirection: "row", justifyContent: "space-between" },
//   tableBox: { width: "48%" },
//   chartBox: { width: "48%" },
// });

// type Props = {
//   info: any;
//   chartImages: { [questionId: number]: string };
// };

// const chunkArray = (arr: any[], size: number) => {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// };

// const FullPdfReport: React.FC<Props> = ({ info, chartImages }) => {
//   const first_qid = info.data.survey_ques[0].id;
//   const totalRespondents = info.data.survey_res.filter((r: any) => Number(r.survey_q_id) === first_qid)
//     .reduce((sum: number, r: any) => sum + Number(r.feedback_answer), 0);

//   const questions = info.data.survey_ques.filter((q: any) => q.answer_type === 1);
//   const questionChunks = chunkArray(questions, 2);

//   const relevantQuestions = info.data.survey_ques.filter((q: any) => q.answer_type === 4);
//   const relevantResponses = info.data.survey_res
//     .filter((res: any) => Number(res.feedback_answer) !== 0 && Number(res.survey_ques_type) === 4)
//     .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

//   return (
//     <Document>
//       {questionChunks.map((chunk, pageIndex) => (
//         <Page key={pageIndex} size="A4" style={styles.page}>
//           {pageIndex === 0 && (
//             <Text style={styles.title}>Total number of respondents = {totalRespondents}</Text>
//           )}
//           {chunk.map((q: any, index: number) => (
//             <View key={index} style={styles.section}>
//               <Text style={styles.title}>
//                 Q{index + 1 + pageIndex * 2}. {q.question}
//               </Text>
//               <View style={styles.layoutRow}>
//                 <View style={styles.tableBox}>
//                   <View style={styles.table}>
//                     <View style={styles.row}>
//                       <Text style={styles.cell}>Answer</Text>
//                       <Text style={styles.cell}>Votes</Text>
//                     </View>
//                     {info.data.survey_res
//                       .filter((res: any) => q.id === Number(res.survey_q_id))
//                       .map((res: any, i: number) => (
//                         <View key={i} style={styles.row}>
//                           <Text style={styles.cell}>{res.survey_answer}</Text>
//                           <Text style={styles.cell}>{res.feedback_answer}</Text>
//                         </View>
//                       ))}
//                   </View>
//                 </View>
//                 <View style={styles.chartBox}>
//                   {chartImages[q.id] && (
//                     <Image src={chartImages[q.id]} style={{ width: "100%", height: "auto" }} />
//                   )}
//                 </View>
//               </View>
//             </View>
//           ))}
//         </Page>
//       ))}

//       <Page size="A4" style={styles.page}>
//         {relevantQuestions.map((q: any) => (
//           <View key={q.id}>
//             <Text style={styles.title}>{q.question}</Text>
//             <View style={styles.table}>
//               <View style={styles.row}>
//                 <Text style={styles.cell}>#</Text>
//                 <Text style={styles.cell}>Feedback</Text>
//                 <Text style={styles.cell}>Submitted At</Text>
//               </View>
//               {relevantResponses.map((res: any, i: number) => (
//                 <View key={i} style={styles.row}>
//                   <Text style={styles.cell}>{i + 1}</Text>
//                   <Text style={styles.cell}>{res.feedback_answer}</Text>
//                   <Text style={styles.cell}>{new Date(res.created_at).toLocaleString()}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         ))}
//       </Page>
//     </Document>
//   );
// };

// export default FullPdfReport;

// InitPdf3.tsx
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: "/fonts/OpenSans-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/OpenSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "OpenSans",
    position: "relative",
  },
  pageNumber: {
    position: "absolute",
    top: 10,
    left: "55%",
    transform: "translateX(-50%)",
    fontSize: 8,
    fontFamily: "OpenSans",
  },
  dateTime: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 8,
    fontFamily: "OpenSans",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  questionBlock: {
    border: "1pt solid #999",
    borderRadius: 6,
    padding: 5,
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
  },
  layoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableBox: {
    width: "40%",
    paddingRight: 10,
    justifyContent: "center"
  },
  chartBox: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderBottom: "1pt solid #ccc",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1pt solid #eee",
  },
  Feedback_cell: {
    flex: 1,
    padding: 5,
    fontSize: 10
  },
  answer_cell: {
    flex: 1,
    padding: 5,
    fontSize: 10
  },
  vote_count: {
    padding: 5,
    width: "55px",
    fontSize: 11,
  },
  serial_no: {
    padding: 5,
    width: "35px"
  },
  timestamp: {
    padding: 5,
    width: "90px",
    fontSize: 10,
  },
  boldCell: {
    fontWeight: "bold",
  },
  chartImage: {
    height: 300,
    objectFit: "contain",
  },
});

type Props = {
  info: any;
  chartImages: { [questionId: number]: string };
};

const chunkArray = (arr: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const FullPdfReport: React.FC<Props> = ({ info, chartImages }) => {

  const now: Date = new Date();

  const formattedDate: string = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime: string = now.toLocaleTimeString();

  const currentDateTime: string = `${formattedDate} @ ${formattedTime}`;

  const first_qid = info.data.survey_ques[0].id;
  const totalRespondents = info.data.survey_res.filter(
    (r: any) => Number(r.survey_q_id) === first_qid
  ).reduce((sum: number, r: any) => sum + Number(r.feedback_answer), 0);

  const questions = info.data.survey_ques.filter((q: any) => q.answer_type === 1);
  const questionChunks = chunkArray(questions, 2);

  const feedbackQuestions = info.data.survey_ques.filter((q: any) => q.answer_type === 4);
  const feedbackResponses = info.data.survey_res
    .filter((res: any) => Number(res.feedback_answer) !== 0 && Number(res.survey_ques_type) === 4)
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <Document>
      {questionChunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>

          {/* Page Number */}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
            fixed
          />

          {pageIndex === 0 && ( // only on first page
            <Text style={styles.title}>
              Total number of respondents = {totalRespondents}
            </Text>
          )}

          {chunk.map((q: any, index: number) => {
            const answers = info.data.survey_res.filter(
              (res: any) => q.id === Number(res.survey_q_id)
            );

            return (
              <View key={index} style={styles.questionBlock}>
                <Text style={styles.questionTitle}>
                  Q{index + 1 + pageIndex * 2}. {q.question}
                </Text>
                <View style={styles.layoutRow}>
                  <View style={styles.tableBox}>
                    <View style={styles.tableHeader}>
                      <Text style={[styles.answer_cell, styles.boldCell]}>Answer</Text>
                      <Text style={[styles.vote_count, styles.boldCell]}>Votes</Text>
                    </View>
                    {answers.map((res: any, i: number) => (
                      <View key={i} style={styles.row}>
                        <Text style={styles.answer_cell}>{res.survey_answer}</Text>
                        <Text style={styles.vote_count}>{res.feedback_answer}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.chartBox}>
                    {chartImages[q.id] && (
                      <Image
                        src={chartImages[q.id]}
                        style={styles.chartImage}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          {/* Current Date and Time */}
          <Text style={styles.dateTime}>{currentDateTime}</Text>

        </Page>
      ))}

      {/* Feedback Section */}
      <Page size="A4" style={styles.page}>

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />

        {feedbackQuestions.map((q: any) => (
          <View key={q.id}>
            <Text style={styles.title}>{q.question}</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.serial_no, styles.boldCell]}>#</Text>
              <Text style={[styles.Feedback_cell, styles.boldCell]}>Feedback</Text>
              <Text style={[styles.timestamp, styles.boldCell]}>Submitted At</Text>
            </View>
            {feedbackResponses.map((res: any, i: number) => (
              <View key={i} style={styles.row}>
                <Text style={styles.serial_no}>{i + 1}</Text>
                <Text style={styles.Feedback_cell}>{res.feedback_answer}</Text>
                <Text style={styles.timestamp}>
                  {new Date(res.created_at).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* Current Date and Time */}
        <Text style={styles.dateTime} fixed>{currentDateTime}</Text>

      </Page>
    </Document>
  );
};

export default FullPdfReport;
