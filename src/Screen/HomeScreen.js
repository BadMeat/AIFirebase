import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{ margin: 10 }}>
                <View style={{ marginVertical: 10 }}>
                    <Button title={"Form Baru"} onPress={() => this.props.navigation.navigate('Form')} />
                </View>
                <Button title={"List Data"} onPress={() => this.props.navigation.navigate('List')} />
            </View>
        )
    }
}
