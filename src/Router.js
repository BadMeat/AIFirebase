import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screen/HomeScreen';
import ListScreen from './Screen/ListScreen';
import FormScreen from './Screen/FormScreen';
import UpdateScreen from './Screen/UpdateScreen';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: "Home" }} />
                <Stack.Screen name="Form" component={FormScreen} options={{ headerTitle: "Tambah Data" }} />
                <Stack.Screen name="List" component={ListScreen} options={{ headerTitle: "List Data" }} />
                <Stack.Screen name="Update" component={UpdateScreen} options={{ headerTitle: "Update Data" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router