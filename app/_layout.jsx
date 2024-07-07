import {View,Text} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

export default _layout = () =>{
    return(
        <Tabs tabBar={props=><TabBar {...props}/>}>
            <Tabs.Screen name="index" options={{headerShown: false,title:"home"}}/>
            <Tabs.Screen name="menu" options={{headerShown: false,title:"menu"}}/>
            <Tabs.Screen name="orders" options={{headerShown: false,title:"orders"}}/>
            <Tabs.Screen name="rewards" options={{headerShown: false,title:"rewards"}}/>
            <Tabs.Screen name="[section]" options={{headerShown: false,title:"section"}}/>
        </Tabs>
        
    )
}