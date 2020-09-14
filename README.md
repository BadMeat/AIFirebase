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