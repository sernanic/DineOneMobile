import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ModifierGroups from './ModifierGroups';


const Content = ({ item, modifierGroups, selectedModifiers, setSelectedModifiers }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <ModifierGroups 
                modifierGroups={modifierGroups} 
                selectedModifiers={selectedModifiers}
                setSelectedModifiers={setSelectedModifiers}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 20,
    },
});

export default Content;
