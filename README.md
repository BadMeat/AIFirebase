## 1. Install

>**Source**
```
https://rnfirebase.io/
```

>**Install**
>
```
npm install --save @react-native-firebase/app
```

>**Buat Project di Firebase**
>
[Masuk - Akun Google](https://console.firebase.google.com/u/0/?hl=id)

```
1. Pilih tambah project
2. Masukan Nama Project
3. Next Next Next
4. Taraa project sudah siap
5. Masuk kesetting kemudian pilih palatform, misal android
6. Masukan nama paket android, bisa dilihat \android\app\src\main\AndroidManifest.xml lihat di package. contoh (com.aifirebase)
7. Masukan SHA1, bisa digenerate dengan keytool -exportcert -keystore ./android/app/debug.keystore -list -v, 
enter keystore password langsung saja enter, kemudian akan tergenerate sha1, kemudian masukan ke dalam project firebase tadi
8. download google-services.json, dan letakan di folder android/app/google-services.json dan next next sampai selesai
```
>**Setting gradle android untuk firebase**
>
**Masuk ke android/build.gradle**
```js
buildscript {
  dependencies {
    // ... other dependencies
    + classpath 'com.google.gms:google-services:4.3.3'
    // Add me --- /\
  }
}
```

```
tanda + itu yang tambahan, tetapi jangan ditulis + nya, cuma tanda saja
```

**Masuk ke android/app/build.gradle**
```
letakan apply plugin di baris paling bawah
```
```js
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

## 2. Real Time Database (Simpan)

> **Source**
>
[Realtime Database \| React Native Firebase](https://rnfirebase.io/database/usage)

> **Install**

```js
npm install @react-native-firebase/database
```

**Menuju ke project firebasenya lagi**
>
> [Masuk - Akun Google](https://console.firebase.google.com/)

```
1. Masuk ke menu realtime database
2. create database
3. Untuk percobaan gunakan start in test mode
4. taraa terbentuklah databasenya
```

**Masuk ke project react nativenya lagi**
>
> **Method Save**

```js
import database from '@react-native-firebase/database';

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
        }).catch(error => {
          console.log('error save', error)
        })
      }
    )
  }
```

**Render Button**

```js
renderButton = () => {
  if (this.state.isLoading) {
    return <ActivityIndicator size="large" color="red" />
  }
  return <Button title="Simpan" onPress={() => this.saveData()} />
}
```

**Render UI**

```js
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          value={this.state.nama}
          placeholder="Nama"
          onChangeText={(nama) => this.setState({ nama })}
        />
        <TextInput
          value={this.state.alamat}
          placeholder="Alamat"
          onChangeText={(alamat) => this.setState({ alamat })}
        />
        {
          this.renderButton()
        }
      </View>
    )
  }
```

**Keterangan**
```
Pertama buat dahulu textfield untuk save ke firebasenya, Kemudian buat method savenya
Dalam save tersebut akan membuat sebuah parent bernama Personal yang kemudian dibawahnya akan ada child uid
yang tergenerate secara otomatis oleh firebase dan dibawahnya baru field-field yg kita save, dalam kasus ini adalah
nama dan alamat
kemudian kita membuat variable isLoading untuk proses save ketika sedang berlangsung, menggantikan button supaya proses terlihat
dan tombol simpan tidak dieksekusi berkali kali
```

## 3. Real Time Database (Update)

>**Kode**
```js
import database from '@react-native-firebase/database';

await database().ref(`Personal/${uid}`).update({
    nama: this.state.nama,
    alamat: this.state.alamat
}).then(res => {
    ToastAndroid.show("Data berhasil diupdate", ToastAndroid.SHORT, ToastAndroid.CENTER)
}).catch(error => {
    console.log('error', error)
})
```

>**Keterangan**
>
```html
uid adalah id dari data yg disimpan
ToastAndroid hanya untuk android di ios tidak ada,
nama dan alamat adalah nama field yg akan diupdate di firebase
```

## 4. Real Time Database (Delete)

>**Kode**
```js
import database from '@react-native-firebase/database';

deleteData = async () => {
    await database().ref(`Personal/${uid}`).remove().then(res => {
        ToastAndroid.show("Data berhasil dihapus", ToastAndroid.SHORT, ToastAndroid.CENTER)
    }).catch(error => {
        ToastAndroid.show("Data gagal dihapus", ToastAndroid.SHORT, ToastAndroid.CENTER)
        console.log('gagal hapus', error)
    })
}
```

```
uid adalah id dari data di firebase / data yg akan dihapus
```

## 5. Real Time Database (Read)

>**Kode**
```js
import _ from 'lodash'

database().ref(`/Personal`).on(`value`, snapshoot => {
    const data = _.map(snapshoot.val(), (value, uid) => {
        return { ...value, uid }
    })
})
```

```
- karena data seperi diatas, field yg paling atas adalah uid, jadi kita buat dahulu menjadi array
[
  {
    uid: MFioA....,
    alamat: Hahha,
    nama: Gajaa
  },
  {
    uid: MFioD.....,
    alamat: kebumen,
    nama: arif
  }
]

Sehingga kita memakai _. (lodash) 
- /Personal adalah nama field yg akan dibaca /table

```


