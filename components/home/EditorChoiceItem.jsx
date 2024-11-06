import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EditorChoiceItem = ({ title, image }) => (
  <TouchableOpacity style={styles.editorChoiceItem}>
    <Image source={image} style={styles.editorChoiceImage} />
    <Text style={styles.editorChoiceTitle}>{title}</Text>
    <View style={styles.arrowContainer}>
      <AntDesign name="arrowright" size={20} color="white" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  editorChoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editorChoiceImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  editorChoiceTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#042628',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditorChoiceItem; 