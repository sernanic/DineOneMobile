import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { ModifierGroup } from '../types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface ModifierGroupsProps {
    modifierGroups: ModifierGroup[];
    selectedModifiers: Set<string>;
    setSelectedModifiers: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const ModifierGroups: React.FC<ModifierGroupsProps> = ({ modifierGroups, selectedModifiers, setSelectedModifiers }) => {
    const toggleModifier = (modifierId: string) => {
        setSelectedModifiers(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(modifierId)) {
                newSelected.delete(modifierId);
            } else {
                newSelected.add(modifierId);
            }
            return newSelected;
        });
    };

    return (
        <View style={styles.container}>
            {modifierGroups.map(group => (
                <View key={group.modifierGroupId} style={styles.groupContainer}>
                    <Text style={styles.groupTitle}>{group.name}</Text>
                    {group.modifiers.map(modifier => (
                        <TouchableOpacity 
                            key={modifier.modifierId} 
                            style={styles.modifierItem}
                            onPress={() => toggleModifier(modifier.modifierId)}
                        >
                            <Image source={{ uri: modifier.imageUrl }} style={styles.modifierImage} />
                            <View style={styles.modifierInfo}>
                                <Text style={styles.modifierName}>{modifier.name}</Text>
                                {modifier.price > 0 && (
                                    <Text style={styles.modifierPrice}>${modifier.price.toFixed(2)}</Text>
                                )}
                            </View>
                            <View style={styles.checkbox}>
                                {selectedModifiers.has(modifier.modifierId) && (
                                    <Ionicons name="checkmark" size={24} color={Colors.primary} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    groupContainer: {
        marginBottom: 20,
        gap: 10, 
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modifierItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#FFF',
        // shadowColor: 'rgba(6, 51, 54, 0.10)',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 1,
        // shadowRadius: 16,
        elevation: 5, // for Android shadow
        height: 80,
    },
    modifierImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    modifierInfo: {
        flex: 1,
    },
    modifierName: {
        fontSize: 16,
        fontWeight: '500',
    },
    modifierPrice: {
        fontSize: 14,
        color: '#888',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ModifierGroups;
