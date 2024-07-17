
# MARKETPLACE-API
## Description
Proyek ini adalah backend untuk aplikasi marketplace, menggunakan Express.js dengan autentikasi JWT dan ES modules.

## Persyaratan 
Pastikan Anda telah menginstal Node.js dan npm di komputer Anda. Jika belum, Anda bisa mengunduhnya dari Node.js official website.

#### 1. Installation
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
DBHOST='localhost'
DBDATABASE='makertplace-api'
DBUSER='root'
DBPASSWORD=''
```

#### 4. Jalankan migration
```bash
npx sequelize-cli db:migrate
```

#### 5. 
