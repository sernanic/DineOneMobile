import { View, Dimensions,FlatList,StyleSheet,TouchableOpacity,Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '@/components/home/header';
import useCartStore from '@/store/cartStore';
import Colors from '@/constants/Colors';
import CartItem from '@/components/cart/CartItem';
import OrderTotalSummary from '@/components/cart/OrderTotalSUmmary';
import withAuth from '@/components/auth/withAuth';
const Cart = () => {
    const { products } = useCartStore();
    const [totalPrice, setTotalPrice] = useState(0);

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

    const renderItem = ({ item }) => <CartItem item={item} />;
    const screenHeight = Dimensions.get('window').height;
    const listHeight = '60%'; // Adjust as needed
    const totalInfoHeight = screenHeight * 0.35;

    return (
        <View style={styles.container}>
            <Header title="Cart" handleExit={handleExit} />
            <View style={[styles.listContainer, { height: listHeight }]}>
                <FlatList
                    data={Object.values(products)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
                <View style={styles.blurEffect} />
            </View>
            <View style={{ height: totalInfoHeight, backgroundColor: 'white' }}>
                <OrderTotalSummary
                    subtotal={totalPrice} // Pass the updated totalPrice
                    taxesAndFees={10.00} // TODO: change this to dynamic info
                    deliveryFee={5.00} // TODO: change this to dynamic info
                />
                <View style={{ backgroundColor: Colors.primary, width: '100%',height:100,flex:1,padding:10 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        position: 'relative',
    },
    listContent: {
        paddingBottom: 20, // Add some padding at the bottom for the blur effect
    },
    blurEffect: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity as needed
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 16,
        fontWeight: '600', // Set font weight to 700 (bold)
    },
});

export default withAuth(Cart);