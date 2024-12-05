import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import useFeatures from '../../hooks/useFeatures';

/**
 * Features Component
 * Displays a horizontal scrollable list of feature cards with images and descriptions
 * Fetches data from the features API endpoint using the useFeatures hook
 */
const Features = () => {
    const { features, isLoading, error } = useFeatures();

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Show error message if data fetch fails
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading features</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            {features.map((feature) => (
                <View key={feature.id} style={styles.featureCard}>
                    {/* Render feature image or placeholder if no image URL */}
                    {feature.imageURL ? (
                        <Image 
                            source={{ uri: feature.imageURL }} 
                            style={styles.featureImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                    {/* Feature text content */}
                    <View style={styles.textContainer}>
                        <Text style={styles.featureName}>{feature.name}</Text>
                        <Text style={styles.featureDescription} numberOfLines={2}>
                            {feature.description}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // Container styles
    container: {
        flexGrow: 0,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    
    // Loading and error states
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    
    // Feature card styles
    featureCard: {
        width: 280,
        height: 200,
        marginRight: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        // Card shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    // Image styles
    featureImage: {
        width: '100%',
        height: 120,
    },
    placeholderImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#f0f0f0',
    },
    
    // Text content styles
    textContainer: {
        padding: 10,
    },
    featureName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    featureDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default Features;
