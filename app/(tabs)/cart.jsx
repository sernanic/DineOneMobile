import { View, Dimensions,FlatList,StyleSheet,TouchableOpacity,Text,Modal,TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '@/components/home/header';
import useCartStore from '@/store/cartStore';
import Colors from '@/constants/Colors';
import CartItem from '@/components/cart/CartItem';
import OrderTotalSummary from '@/components/cart/OrderTotalSUmmary';
import withAuth from '@/components/auth/withAuth';
import { WebView } from 'react-native-webview'
import { Platform } from 'react-native'

const Cart = () => {
    const { products } = useCartStore();
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    console.log(products);
    useEffect(() => {
        // Function to calculate the total price

        const calculateTotalPrice = (items) => {
            let total = 0;
            for (let key in items) {
                if (items.hasOwnProperty(key)) {
                    const item = items[key];
                    const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
                    total += itemTotal;
                }
            }
            return total.toFixed(2); // Return total as a string with 2 decimal places
        };

        // Update totalPrice state whenever products change
        setTotalPrice(calculateTotalPrice(products));
    }, [products]);

    const handleExit = () => {
        router.push('/');
    };

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const renderItem = ({ item }) => <CartItem item={item} />;
    const screenHeight = Dimensions.get('window').height;
    const listHeight = '57%'; // Adjust as needed
    const totalInfoHeight = screenHeight * 0.35;
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Header title="My Cart" handleExit={handleExit} />
            <View style={styles.mainContainer}>
                <FlatList
                    data={Object.values(products)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.itemId}
                    contentContainerStyle={styles.listContent}
                    ListFooterComponent={<View style={styles.listFooter} />}
                    scrollEnabled={true}
                />
                
                {/* Order Summary - Now positioned absolutely */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${totalPrice}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>$6.00</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total amount</Text>
                            <Text style={styles.totalValue}>${(parseFloat(totalPrice) + 6).toFixed(2)}</Text>
                        </View>
                        {/* Checkout Button */}
                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.checkoutButtonText}>Complete Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                visible={isCheckoutOpen}
                onRequestClose={() => setIsCheckoutOpen(false)}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { 
                        height: screenHeight * 0.8,
                        width: screenWidth * 0.9
                    }]}>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setIsCheckoutOpen(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                        <WebView
                            style={styles.webView}
                            scrollEnabled={false}
                            source={{ 
                                uri: Platform.select({
                                    ios: 'http://localhost:4000/api/client/10/payment/add',
                                    android: 'http://10.0.2.2:4000/api/client/10/payment/add' // Android emulator special IP
                                })
                            }}
                            onError={(syntheticEvent) => {
                                const { nativeEvent } = syntheticEvent;
                                console.warn('WebView error: ', nativeEvent);
                            }}
                            onHttpError={(syntheticEvent) => {
                                const { nativeEvent } = syntheticEvent;
                                console.warn('WebView HTTP error: ', nativeEvent);
                            }}
                            originWhitelist={['http://*', 'https://*']}
                            onMessage={(event) => {
                                const data = JSON.parse(event.nativeEvent.data);
                                if (data.type === 'PAYMENT_SUCCESS') {
                                  // Handle the token if needed
                                  console.log('Payment token:', data.token);
                                  // Close the modal
                                  setIsCheckoutOpen(false);
                                }
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainContainer: {
        flex: 1,
        position: 'relative',
        
    },
    listContent: {
        paddingHorizontal: 20,
    },
    listFooter: {
        height: 400, // Adjust this value based on your summary container height
    },
    promoContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        marginVertical: 20,
        padding: 4,
    },
    promoInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    promoButton: {
        padding: 12,
    },
    promoButtonText: {
        fontSize: 20,
        color: '#666',
    },
    summaryContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#9CA4AB',
    },
    summaryValue: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '600',
    },
    checkoutButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10, // Optional: adds rounded corners
    },
    closeButton: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    webView: {
        flex: 1,
    },
});

export default withAuth(Cart);