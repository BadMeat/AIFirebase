import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import database from '@react-native-firebase/database';
import _ from 'lodash'

export default class ListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    goToUpdate = (item) => {
        this.props.navigation.navigate('Update', {
            item: item
        })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }} onPress={() => this.goToUpdate(item)}>
                <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <Text style={{ flex: 1 }}>Nama : {item.nama}</Text>
                    <Text style={{ flex: 1 }}>Alamat : {item.alamat}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    fetchData = () => {
        this.setState({
            isLoading: true
        })
        database().ref(`/Personal`).on(`value`, snapshoot => {
            const data = _.map(snapshoot.val(), (value, uid) => {
                return { ...value, uid }
            })
            this.setState({
                data,
                isLoading: false
            })
        })
    }

    renderUI = () => {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )
        }

        return (
            <FlatList
                style={{ marginBottom: 10 }}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(_, index) => index.toString()}
            />
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ebebeb', flex: 1 }}>
                {
                    this.renderUI()
                }
            </View>
        )
    }
}
