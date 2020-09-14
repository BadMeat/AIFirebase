import React, { Component } from 'react'
import { Text, View, Button, TextInput, ActivityIndicator, Alert, ToastAndroid, Keyboard } from 'react-native'
import database from '@react-native-firebase/database';

export default class UpdateScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nama: '',
            alamat: '',
            isLoading: false
        }
    }

    deleteData = async () => {
        const { uid } = this.props.route.params.item
        await database().ref(`Personal/${uid}`).remove().then(res => {
            ToastAndroid.show("Data berhasil dihapus", ToastAndroid.SHORT, ToastAndroid.CENTER)
        }).catch(error => {
            ToastAndroid.show("Data gagal dihapus", ToastAndroid.SHORT, ToastAndroid.CENTER)
            console.log('gagal hapus', error)
        })
        this.props.navigation.pop()
    }

    updateData = async () => {
        const { uid } = this.props.route.params.item
        this.setState({
            isLoading: true
        })
        Keyboard.dismiss()
        await database().ref(`Personal/${uid}`).update({
            nama: this.state.nama,
            alamat: this.state.alamat
        }).then(res => {
            ToastAndroid.show("Data berhasil diupdate", ToastAndroid.SHORT, ToastAndroid.CENTER)
        }).catch(error => {
            console.log('error', error)
        })
        this.setState({
            isLoading: false
        })
    }

    renderButton = () => {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="blue" />
            )
        }
        return (
            <View>
                <Button title={"Simpan"} onPress={() => this.updateData()} />
                <View style={{ marginTop: 10 }}>
                    <Button title={"Hapus"} onPress={() => this.deleteData()} />
                </View>
            </View>
        )
    }

    // Ini dipanggil sekali ketika screen baru mulai
    componentDidMount() {
        const { nama, alamat } = this.props.route.params.item
        this.setState({
            nama: nama,
            alamat: alamat
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
                <View style={{ margin: 10, backgroundColor: 'white', padding: 10 }}>
                    <Text>Nama</Text>
                    <TextInput
                        style={{ backgroundColor: '#ebebeb', marginVertical: 10 }}
                        placeholder={"Nama"}
                        value={this.state.nama}
                        onChangeText={(nama) => this.setState({ nama })}
                    />
                    <Text>Alamat</Text>
                    <TextInput
                        style={{ backgroundColor: '#ebebeb', marginVertical: 10 }}
                        placeholder={"Alamat"}
                        value={this.state.alamat}
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
