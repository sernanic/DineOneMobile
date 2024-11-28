import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import Header from '@/components/home/header';

const dummyCards = [
  {
    id: 1,
    cardType: 'visa',
    lastFourDigits: '4242',
    expiryDate: '12/24',
    isDefault: true,
  },
  {
    id: 2,
    cardType: 'mastercard',
    lastFourDigits: '8888',
    expiryDate: '06/25',
    isDefault: false,
  }
];

const CardItem = ({ card, onSetDefault, onDelete }) => (
  <View style={styles.cardItem}>
    <View style={styles.cardHeader}>
      <Icon 
        name={card.cardType === 'visa' ? 'cc-visa' : 'cc-mastercard'} 
        type="font-awesome" 
        size={32} 
        color={card.cardType === 'visa' ? '#1A1F71' : '#EB001B'} 
      />
      {card.isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>Default</Text>
        </View>
      )}
    </View>

    <Text style={styles.cardNumber}>•••• •••• •••• {card.lastFourDigits}</Text>
    <Text style={styles.expiryDate}>Expires {card.expiryDate}</Text>

    <View style={styles.cardActions}>
      {!card.isDefault && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onSetDefault(card.id)}
        >
          <Icon name="star-outline" type="material" size={20} color="#666" />
          <Text style={styles.actionText}>Set as Default</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity 
        style={[styles.actionButton, styles.deleteButton]} 
        onPress={() => onDelete(card.id)}
      >
        <Icon name="delete-outline" type="material" size={20} color="#FF3B30" />
        <Text style={[styles.actionText, styles.deleteText]}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AddCardForm = ({ onClose }) => (
  <View style={styles.formContainer}>
    <Text style={styles.formTitle}>Add New Card</Text>
    
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        keyboardType="numeric"
        maxLength={19}
      />
    </View>

    <View style={styles.row}>
      <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
        <Text style={styles.inputLabel}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>
      <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
        <Text style={styles.inputLabel}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          keyboardType="numeric"
          maxLength={3}
          secureTextEntry
        />
      </View>
    </View>

    <View style={styles.formActions}>
      <Button
        title="Add Card"
        buttonStyle={styles.addButton}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Cancel"
        type="outline"
        buttonStyle={styles.cancelButton}
        containerStyle={styles.buttonContainer}
        onPress={onClose}
      />
    </View>
  </View>
);

const PaymentDetails = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState(dummyCards);

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <>
      <Header title="Payment Methods" />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.addCardButton}
          onPress={() => setShowAddCard(true)}
        >
          <Icon name="add-circle-outline" type="material" size={24} color="#000" />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>

        {showAddCard && <AddCardForm onClose={() => setShowAddCard(false)} />}

        <View style={styles.cardsList}>
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onSetDefault={handleSetDefault}
              onDelete={handleDeleteCard}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardsList: {
    marginTop: 8,
  },
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    marginLeft: 24,
  },
  deleteText: {
    color: '#FF3B30',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formActions: {
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default PaymentDetails; 