import {View,Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

export default TabBar = ({ state, descriptors, navigation }) =>{
    const primaryColor='#0891b2';
    const greyColor="#737373";
    return(
        <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        if(["_sitemap","+not-found","[section]","index","[section]/[sectionItem]","[section]/index"].includes(route.name))
        {
            return null;
        }
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <Text style={{ color: isFocused ? primaryColor : greyColor,fontSize:18 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    )
}

const styles = StyleSheet.create({
    tabbar:{
        position:"absolute",
        bottom:5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        marginHorizontal:20,
        paddingVertical:25,
        borderRadius:25,
        borderCurve:"continuous",
        shadowColor:"black",
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        shadowOpacity:0.1,
        width:'100%'
    },
    tabbarItem:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})