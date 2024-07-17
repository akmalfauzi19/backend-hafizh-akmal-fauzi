
# MARKETPLACE-API
## Description
Proyek ini adalah backend untuk aplikasi marketplace, menggunakan Express.js dengan autentikasi JWT dan ES modules.

## Persyaratan 
Pastikan Anda telah menginstal Node.js dan npm di komputer Anda. Jika belum, Anda bisa mengunduhnya dari Node.js official website.
### Instalasi
#### 1. Clone repository
```bash
git clone https://github.com/username/backend-hafizh-akmal-fauzi.git
cd backend-hafizh-akmal-fauzi
```
#### 2. Instal dependensi

```bash
npm install
```

#### 3. Konfigurasi enviroment
Buat file `.env `di root directory proyek Anda dan tambahkan konfigurasi berikut:
```bash
PORT=8000
JWT_TOKEN_SECRET=ja5OmSYN1o
# Database
APP_ENV=local
DBHOST=localhost
DBDATABASE=makertplace-api
DBUSER=root
DBPASSWORD=
```
#### 4. Jalankan migration
`Note : sebelum menjalankan kode buat database terlebih dahulu` 
```bash
npx sequelize-cli db:migrate
```
setelah menjalankan kode tersebut maka akan muncul hasil seperti dibawah
![image](https://github.com/user-attachments/assets/e1fab662-7c9c-45b3-8376-805172d77fde)
![image](https://github.com/user-attachments/assets/308e797d-0dd4-41bd-b06d-f94cce0cb954)

#### 5. Jalankan aplikasi
```bash
npm start
```

### INSTLASI POSTMAN API

#### 1. Overview
Download file collection nya terlebih dahulu
[Marketplace.postman_collection.json](https://github.com/user-attachments/files/16270738/Marketplace.postman_collection.json)

#### 2. Importing  Collection
- Buka Postman.
- Klik tombol "Import" di sudut kiri atas.
- Pilih "Upload Files".
- Pilih file Marketplace.postman_collection.json yang Anda miliki.
- Klik "Open" untuk mengimpor koleksi tersebut.

#### 3. Setting Enviroment
- Klik ikon gear di sudut kanan atas Postman dan pilih "Manage Environments".
- Klik "Add" untuk membuat enviroment baru.
- Beri nama enviroment Anda, misalnya Marketplace.
- Tambahkan variabel berikut:
  - base_url: http://localhost:8000/api
  - access_token: token JWT Anda untuk autentikasi
  - Klik "Add" untuk menyimpan enviroment tersebut.
- Pilih enviroment Anda dari dropdown di sudut kanan atas.


