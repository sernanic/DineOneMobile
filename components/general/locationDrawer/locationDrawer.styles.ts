import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#F5F5F5',
  },
  drawerContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  selectedLocation: {
    backgroundColor: '#F0F0F0',
  },
  locationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
  },
  selectedMerchantContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMerchantContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedMerchantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  selectedMerchantPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  selectedMerchantInfo: {
    flex: 1,
    marginLeft: 16,
  },
  selectedMerchantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  selectedMerchantAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectedMerchantDistance: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },
});
