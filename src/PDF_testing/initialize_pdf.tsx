import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Corrected styles using flexbox
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  lastCell: {
    borderRightWidth: 0,
  },
});

const MyDocument:React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text>Simple Flex-based Table</Text>
      <div>
      </div>
      <View style={styles.tableContainer}>
        {/* Header Row */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Age</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>Country</Text>
        </View>

        {/* Data Rows */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>John</Text>
          <Text style={styles.tableCell}>28</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>USA</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Maria</Text>
          <Text style={styles.tableCell}>32</Text>
          <Text style={[styles.tableCell, styles.lastCell]}>Spain</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
