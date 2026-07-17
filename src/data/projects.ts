import type { Project } from '../types'

export const projects: Project[] = [
  {
    name: 'Aplikasi Toko Bangunan Online',
    problem: 'Dibikin karena toko bangunan kecil susah ngelacak stok manual. Targetnya biar pemilik cukup buka hp buat cek barang.',
    tags: ['Flutter','Dart','Postman'],
    filter: 'flutter',
    link: 'https://github.com/aviszola/TugasPostman-AvisZolaRK_05-XIR7',
    icon: 'fa-store',
    image: null,
  },
  {
    name: 'Monsef: Tracking Money Analysis',
    problem: 'Banyak orang (termasuk saya) susah ngontrol pengeluaran. Project ini nyoba bikin solusi pake AI biar tracking jadi otomatis.',
    tags: ['Flutter','Database'],
    filter: 'ai',
    link: 'https://github.com/ElZidane123/monsefApp',
    icon: 'fa-robot',
    image: null,
  },
  {
    name: 'Aplikasi Absen Digital Perusahaan Tambang',
    problem: 'Absen manual di perusahaan tambang gak efisien — data gampang hilang, rawan manipulasi. Project ini nyoba digitalisasi absen pake Flutter.',
    tags: ['Flutter','Firebase','UI/UX'],
    filter: 'flutter',
    link: 'https://github.com/aviszola/OTW_UKL-Avis-',
    icon: 'fa-shield-alt',
    image: null,
  },
  {
    name: 'Eazy Chise — Digital Franchise UMKM',
    problem: 'Franchise UMKM butuh platform terpusat. Admin bisa kelola mitra, cabang, dan distribusi info dari satu dashboard.',
    tags: ['HTML','CSS','JS'],
    filter: 'web',
    link: 'https://github.com/elzidane/eazychise',
    demo: 'https://eazychise.vercel.app',
    icon: 'fa-code',
    image: null,
  },
]
