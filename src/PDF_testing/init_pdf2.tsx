// MyDocument.tsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

// Main page style
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    height: '100%',
  },
  responseWrapper: {
    height: '50%', // 50% of page height
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableSection: {
    height: '40%', // 40% of 50% => 20% of full page
    border: '1px solid #aaa',
    marginBottom: 5,
    padding: 5,
  },
  chartSection: {
    height: '60%', // 60% of 50% => 30% of full page
    border: '1px solid #aaa',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 4,
  },
});

const Response = ({ name, age, country }: any) => (
  <View style={styles.responseWrapper}>
    {/* Table (40% of response) */}
    <View style={styles.tableSection}>
      <Text>Response Table</Text>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Name</Text>
        <Text style={styles.tableCell}>Age</Text>
        <Text style={styles.tableCell}>Country</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{name}</Text>
        <Text style={styles.tableCell}>{age}</Text>
        <Text style={styles.tableCell}>{country}</Text>
      </View>
    </View>

    {/* Pie Chart Placeholder (60% of response) */}
    <View style={styles.chartSection}>
      <Text>[Pie Chart Placeholder]</Text>
    </View>
  </View>
);

const TheDocument:React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Response name="John" age="28" country="USA" />
      <Response name="Maria" age="32" country="Spain" />
    </Page>
  </Document>
);

export default TheDocument;
