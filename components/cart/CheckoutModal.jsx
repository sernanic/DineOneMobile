import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const CheckoutModal = ({ isVisible, onClose, onMessage }) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const baseUrl = Platform.select({
    ios: 'http://localhost:4000',
    android: 'http://10.0.2.2:4000'
  });

  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContainer, { 
        height: screenHeight * 0.8,
        width: screenWidth * 0.9
      }]}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <WebView
          style={styles.webView}
          scrollEnabled={false}
          source={{ uri: `${baseUrl}/api/client/10/payment/add` }}
          onError={(syntheticEvent) => {
            console.warn('WebView error: ', syntheticEvent.nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            console.warn('WebView HTTP error: ', syntheticEvent.nativeEvent);
          }}
          originWhitelist={['http://*', 'https://*']}
          onMessage={onMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
  },
});

export default CheckoutModal; 