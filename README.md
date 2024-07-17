
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
npm run db:migrate
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


### Langkah-langkah penggunaan api
#### Admin (Merchant) dan User (client) API Usage
#### 1. Authentication
- Register
  - Description: Registers akun admin / User.
  - Note : dibedakan berdasarkan typeAccount (admin,user)
  - Endpoint: POST /api/auth/register
  - Request Body:
  ```bash
  AKUN ADMIN
    {
      "name": "admin",
      "email": "admin@gmail.com",
      "typeAccount": "admin",
      "password": "123"
    }

  AKUN USER
    {
      "name": "user",
      "email": "user@gmail.com",
      "typeAccount": "user",
      "password": "123"
    }
  ```
- Login
  - Description: Login akun.
  - Endpoint: POST /api/auth/login
  - request body :
    ```bash
    sesuaikan akun yg ingin masuk.
    {
      "email": "admin@gmail.com",
      "password": "123"
    }
    ```
- Logout
  - Endpoint: POST /api/auth/logout
  
#### Product Management
- Create Product  
  - Endpoint: POST /api/product/create
  - Request body 
  ```bash
  {
  "name": "baju batik",
  "price": "10000",
  "stock": "10"
  }
  ```
- Edit Product
  - Endpoint: PATCH /api/product/edit/{productId}
  - Request Body:
  ```bash
  {
    "name": "celana",
    "stock": 2
  }
  ```
- Delete Product
  - Endpoint: DELETE /api/product/delete/{productId}
  - Description: Menghapus data barang berdasakan id produk.
- Get My Products
  - Endpoint: GET /api/product/my-product
  - Description : mengambil data produk hanya untuk role admin
#### Product Browsing
- Get All Products
  - Endpoint: GET /api/product
  - Description : mengambil semua data produk yang ada
#### Transaction Management
- Get My Transactions
  - Endpoint: GET /api/transaction/order
  - Description : mengambil data transaksi yang ada hanya bisa digunakan untuk admin yang memiliki produk
    
#### Order Management
- Create Order
  - Endpoint: POST /api/transaction/order
  - Description : melakukan order produk dan disini juga akan mengurangi stok dari setiap barang
  - Request Body:
  ```bash
  {
    "productId": 2,
    "quantity": 1
  }
  ```
## Contoh Alur Penggunaan

### Admin (Merchant):
- Register: Admin mendaftarkan akun baru.
- Login: Admin login ke sistem.
- Create Product: admin membuat produk baru.
- Edit Product: Admin mengedit produk yang sudah ada.
- Delete Product: Admin menghapus produk.
- Get My Products: Admin mengambil daftar produk mereka.
- Get My Transactions: dmin mengambil semua transaksi yang terkait dengan produk mereka.
- Logout: Admin keluar dari sistem.

## User (client):
- Register: Pengguna mendaftarkan akun baru.
- Login: Pengguna masuk ke sistem.
- Get All Products: Pengguna menjelajahi produk yang tersedia.
- Create Order: Pengguna melakukan pemesanan produk.
- Logout: Pengguna keluar dari sistem.


