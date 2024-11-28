import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import Header from '@/components/home/header';

const dummyOrders = [
  {
    id: 1,
    restaurantName: "Downtown Bistro",
    orderNumber: "#ORD-2023-001",
    date: "Nov 28, 2023",
    time: "7:30 PM",
    status: "Delivered",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 }
    ],
    total: 23.98,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
  },
  {
    id: 2,
    restaurantName: "Riverside Restaurant",
    orderNumber: "#ORD-2023-002",
    date: "Nov 27, 2023",
    time: "1:15 PM",
    status: "Processing",
    items: [
      { name: "Grilled Salmon", quantity: 2, price: 24.99 },
      { name: "Fresh Juice", quantity: 2, price: 4.99 }
    ],
    total: 59.96,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500"
  },
];

const OrderCard = ({ order }) => (
  <TouchableOpacity style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <View>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <Text style={styles.restaurantName}>{order.restaurantName}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        { 
          backgroundColor: order.status === 'Delivered' ? '#E8F5E9' : '#FFF3E0'
        }
      ]}>
        <Text style={[
          styles.statusText,
          { 
            color: order.status === 'Delivered' ? '#2E7D32' : '#E65100'
          }
        ]}>{order.status}</Text>
      </View>
    </View>

    <View style={styles.orderContent}>
      <Image
        source={{ uri: order.image }}
        style={styles.orderImage}
      />
      <View style={styles.orderDetails}>
        {order.items.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item.quantity}x {item.name}
          </Text>
        ))}
      </View>
    </View>

    <View style={styles.orderFooter}>
      <View style={styles.dateTimeContainer}>
        <Icon name="event" type="material" size={16} color="#666" />
        <Text style={styles.dateTimeText}>{order.date}</Text>
        <Icon name="schedule" type="material" size={16} color="#666" style={styles.timeIcon} />
        <Text style={styles.dateTimeText}>{order.time}</Text>
      </View>
      <Text style={styles.totalText}>${order.total.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      <Header title="My Orders" />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {['all', 'active', 'completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView 
          style={styles.ordersList}
          showsVerticalScrollIndicator={false}
        >
          {dummyOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  restaurantName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  timeIcon: {
    marginLeft: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default Orders;