import React, { Component } from 'react'
import { Text, View, TextInput, Button, ActivityIndicator, Keyboard } from 'react-native'
import database from '@react-native-firebase/database';

export default class FormScreen extends Component {

    constructor(props) {
        super(props)
        // Ini variable yang diset
        this.state = {
            nama: '',
            alamat: '',
            isLoading: false
        }
    }

    // Untuk simpan data
    saveData = () => {
        this.setState({ isLoading: true },
            async () => {
                const ref = database().ref('/Personal')
                ref.push({
                    nama: this.state.nama,
                    alamat: this.state.alamat
                }).then((data) => {
                    this.setState({
                        nama: '',
                        alamat: '',
                        isLoading: false
                    })
                    Keyboard.dismiss()
                }).catch(error => {
                    console.log('error save', error)
                })
            }
        )
    }

    renderButton = () => {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="red" />
            )
        }
        return (
            <Button
                title="Simpan"
                onPress={() => this.saveData()}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
                <View style={{ backgroundColor: 'white', margin: 10, padding: 10 }}>
                    <TextInput
                        value={this.state.nama}
                        placeholder="Nama"
                        style={{ backgroundColor: '#ebebeb' }}
                        onChangeText={(nama) => this.setState({ nama })}
                    />
                    <TextInput
                        value={this.state.alamat}
                        placeholder="Alamat"
                        style={{ backgroundColor: '#ebebeb', marginVertical: 10 }}
                        onChangeText={(alamat) => this.setState({ alamat })}
                    />
                    {
                        this.renderButton()
                    }
                </View>
            </View>
        )
    }
}
