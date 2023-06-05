### How to Contribute

Untuk melakukan kontribusi ikuti langkah berikut:

1. Buat branch baru sesuai dengan nama masing-masing.

```console
// Penamaan branch
Contoh: kevin

// Membuat branch
git branch namaBranch (contoh: git branch kevin)

// Pindah ke branch
git checkout namaBranch (contoh: git checkout kevin)

// Hapus branch
git branch -d namaBranch (contoh: git branch -d kevin)
```

2. Buat kodingan untuk fitur yang sudah dibagikan.
3. Pastikan kodingan tidak ada **error** dan tidak mempengaruhi kodingan lain secara **fatal**.
4. Menambahkan file dari working directory ke staging index

```console
git add .

// Menambahkan file tertentu
git add index.blade.php
```

5. Mengecek status dari repository

```console
git status
```

6. Commit file
   Pastikan pesan commit yang dikirim sesuai dengan fitur yang dibuat:

- feat: Menambahkan fitur, halaman, dan komponen baru.
- fix: Menyelesaikan dan menghilangkan bug atau error.
- style: Menambahkan custom style pada file css atau tailwind.config.js.
- test: Semua hal yang berkaitan dengan testing.
- docs: Semua hal yang berkaitan dengan dokumentasi.
- chore: Semua hal yang berkaitan dengan maintenance.

```console
git commit -m "pesan commit"

// Commit sesuai kategori
git commit -m "feat: add competition page"
git commit -m "fix: fix hide modal when button is pressed"
git commit -m "style: add new background pattern"
```

7. Push file ke repository. Jangan langsung push ke main, push ke branch sesuai yang kalian kerjakan.

```console
git push -u origin kevin
```

8. Lakukan pull request untuk di review dan di merge ke development branch. Development branch akan di merge ke main branch jika project sudah final.s

### Getting Started

Ikuti langkah di bawah ini untuk menjalankan project di local

###1. Clone Repository

```bash
git clone (https://github.com/Greenpeace-FE28-BE10/back-end.git)
```

###2. Install Dependencies

```bash
npm install
```

###3. Start the Application

```bash
npm start
```
