import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderTotalSummary = ({ subtotal = 0, taxesAndFees = 0, deliveryFee = 0 }) => {
    const numericSubtotal = parseFloat(subtotal) || 0;
    const numericTaxesAndFees = parseFloat(taxesAndFees) || 0;
    const numericDeliveryFee = parseFloat(deliveryFee) || 0;

    // Calculate total
    const total = (numericSubtotal + numericTaxesAndFees + numericDeliveryFee).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.amount}>${numericSubtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Taxes & Fees</Text>
        <Text style={styles.amount}>${taxesAndFees.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.amount}>${deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'white',
    borderRadius: 8,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderTotalSummary;