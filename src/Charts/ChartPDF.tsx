// src/ChartPDF.tsx
import React from 'react';
import { Document, Page, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20
  },
  image: {
    width: 600,
    height: 'auto'
  }
});

interface ChartPDFProps {
  chartImage: string;
}

const ChartPDF: React.FC<ChartPDFProps> = ({ chartImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={chartImage} style={styles.image} />
    </Page>
  </Document>
);

export default ChartPDF;
