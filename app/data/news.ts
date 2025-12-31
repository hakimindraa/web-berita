// Hardcoded news data for the portal

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  image: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Politik', slug: 'politik', color: 'politik', count: 24 },
  { id: '2', name: 'Ekonomi', slug: 'ekonomi', color: 'ekonomi', count: 18 },
  { id: '3', name: 'Teknologi', slug: 'teknologi', color: 'teknologi', count: 32 },
  { id: '4', name: 'Olahraga', slug: 'olahraga', color: 'olahraga', count: 15 },
  { id: '5', name: 'Hiburan', slug: 'hiburan', color: 'hiburan', count: 21 },
  { id: '6', name: 'Kesehatan', slug: 'kesehatan', color: 'kesehatan', count: 12 },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'pemerintah-umumkan-kebijakan-ekonomi-baru-2024',
    title: 'Pemerintah Umumkan Kebijakan Ekonomi Baru untuk Tahun 2024',
    excerpt: 'Menteri Keuangan memaparkan strategi baru untuk meningkatkan pertumbuhan ekonomi nasional dengan fokus pada sektor digital dan UMKM.',
    content: `
      <p>Jakarta - Pemerintah Indonesia melalui Kementerian Keuangan resmi mengumumkan serangkaian kebijakan ekonomi baru yang akan diterapkan mulai awal tahun 2024. Kebijakan ini difokuskan pada penguatan sektor digital dan pemberdayaan UMKM.</p>
      
      <p>"Kami optimis bahwa dengan kebijakan ini, pertumbuhan ekonomi Indonesia dapat mencapai target 5.5% pada tahun depan," ujar Menteri Keuangan dalam konferensi pers di Jakarta, Senin (23/12).</p>
      
      <h2>Fokus Utama Kebijakan</h2>
      <p>Beberapa poin utama dari kebijakan baru ini meliputi:</p>
      <ul>
        <li>Insentif pajak untuk startup teknologi</li>
        <li>Kemudahan akses kredit bagi UMKM</li>
        <li>Pengembangan infrastruktur digital di daerah terpencil</li>
        <li>Program pelatihan digital untuk tenaga kerja</li>
      </ul>
      
      <p>Para ekonom menyambut baik kebijakan ini meskipun ada beberapa catatan terkait implementasinya di lapangan.</p>
    `,
    category: categories[1],
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop',
    author: 'Ahmad Rizky',
    publishedAt: '2024-12-23T10:30:00Z',
    readTime: 5,
    views: 15420,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: '2',
    slug: 'teknologi-ai-indonesia-berkembang-pesat',
    title: 'Teknologi AI di Indonesia Berkembang Pesat, Startup Lokal Bermunculan',
    excerpt: 'Ekosistem artificial intelligence di Indonesia menunjukkan pertumbuhan signifikan dengan munculnya berbagai startup inovatif.',
    content: `
      <p>Industri teknologi kecerdasan buatan (AI) di Indonesia mengalami pertumbuhan yang sangat pesat dalam beberapa tahun terakhir. Berbagai startup lokal bermunculan dengan solusi inovatif untuk berbagai sektor industri.</p>
      
      <p>Menurut data dari Asosiasi AI Indonesia, jumlah startup berbasis AI meningkat 150% dibandingkan tahun sebelumnya.</p>
    `,
    category: categories[2],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    author: 'Dewi Sartika',
    publishedAt: '2024-12-23T09:15:00Z',
    readTime: 4,
    views: 12350,
    isTrending: true,
  },
  {
    id: '3',
    slug: 'timnas-indonesia-lolos-piala-asia',
    title: 'Timnas Indonesia Lolos ke Babak 16 Besar Piala Asia 2024',
    excerpt: 'Dengan kemenangan dramatis 2-1 atas Vietnam, Timnas Indonesia berhasil mengamankan tiket ke babak knockout.',
    content: `
      <p>Doha - Timnas Indonesia berhasil mencatatkan sejarah dengan lolos ke babak 16 besar Piala Asia 2024 setelah mengalahkan Vietnam dengan skor 2-1 dalam laga terakhir fase grup.</p>
      
      <p>Gol-gol Indonesia dicetak oleh dua pemain naturalisasi yang tampil gemilang sepanjang turnamen.</p>
    `,
    category: categories[3],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    author: 'Budi Santoso',
    publishedAt: '2024-12-23T08:00:00Z',
    readTime: 3,
    views: 25600,
    isTrending: true,
  },
  {
    id: '4',
    slug: 'pemilu-2024-persiapan-akhir',
    title: 'KPU Pastikan Persiapan Pemilu 2024 Sudah 95% Rampung',
    excerpt: 'Komisi Pemilihan Umum menyatakan kesiapan logistik dan infrastruktur untuk Pemilu 2024 hampir sempurna.',
    content: `
      <p>Jakarta - Komisi Pemilihan Umum (KPU) memastikan bahwa persiapan Pemilihan Umum 2024 telah mencapai 95% dan siap untuk diselenggarakan sesuai jadwal.</p>
    `,
    category: categories[0],
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=600&fit=crop',
    author: 'Siti Rahma',
    publishedAt: '2024-12-22T18:30:00Z',
    readTime: 4,
    views: 18900,
    isTrending: true,
  },
  {
    id: '5',
    slug: 'film-indonesia-menang-festival-internasional',
    title: 'Film Indonesia Raih Penghargaan di Festival Film Internasional Berlin',
    excerpt: 'Karya sineas muda Indonesia mendapat standing ovation dan membawa pulang penghargaan bergengsi.',
    content: `
      <p>Berlin - Film terbaru karya sutradara muda Indonesia berhasil meraih penghargaan Best Asian Film di Festival Film Internasional Berlin 2024.</p>
    `,
    category: categories[4],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    author: 'Rina Wulandari',
    publishedAt: '2024-12-22T15:00:00Z',
    readTime: 3,
    views: 8750,
  },
  {
    id: '6',
    slug: 'tips-kesehatan-mental-akhir-tahun',
    title: 'Tips Menjaga Kesehatan Mental di Penghujung Tahun',
    excerpt: 'Psikolog berbagi strategi praktis untuk mengelola stres dan kecemasan menjelang pergantian tahun.',
    content: `
      <p>Menjelang akhir tahun, banyak orang mengalami peningkatan stres dan kecemasan. Berikut tips dari para ahli untuk menjaga kesehatan mental Anda.</p>
    `,
    category: categories[5],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    author: 'Dr. Maya Putri',
    publishedAt: '2024-12-22T12:00:00Z',
    readTime: 6,
    views: 6200,
  },
  {
    id: '7',
    slug: 'rupiah-menguat-terhadap-dolar',
    title: 'Rupiah Menguat ke Level Rp15.200 per Dolar AS',
    excerpt: 'Nilai tukar rupiah mencatat penguatan signifikan didorong oleh sentimen positif pasar global.',
    content: `
      <p>Jakarta - Nilai tukar rupiah terhadap dolar Amerika Serikat menguat ke level Rp15.200 pada perdagangan Senin (23/12), didorong oleh sentimen positif dari pasar global.</p>
    `,
    category: categories[1],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    author: 'Hendro Wijaya',
    publishedAt: '2024-12-22T09:30:00Z',
    readTime: 3,
    views: 9400,
    isTrending: true,
  },
  {
    id: '8',
    slug: 'inovasi-smartphone-layar-lipat-terbaru',
    title: 'Produsen Lokal Luncurkan Smartphone Layar Lipat Pertama Buatan Indonesia',
    excerpt: 'Startup teknologi Indonesia berhasil mengembangkan smartphone layar lipat dengan harga terjangkau.',
    content: `
      <p>Jakarta - Sebuah startup teknologi asal Bandung berhasil meluncurkan smartphone layar lipat pertama yang sepenuhnya dikembangkan di Indonesia.</p>
    `,
    category: categories[2],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    author: 'Fajar Nugroho',
    publishedAt: '2024-12-21T14:00:00Z',
    readTime: 4,
    views: 11200,
  },
  {
    id: '9',
    slug: 'konser-musik-tahun-baru-2024',
    title: 'Deretan Konser Musik Meriahkan Malam Tahun Baru 2024',
    excerpt: 'Berbagai musisi papan atas siap menghibur masyarakat dalam perayaan malam pergantian tahun.',
    content: `
      <p>Jakarta - Malam pergantian tahun 2024 akan dimeriahkan oleh berbagai konser musik yang menampilkan artis-artis papan atas Indonesia.</p>
    `,
    category: categories[4],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    author: 'Anisa Putri',
    publishedAt: '2024-12-21T11:00:00Z',
    readTime: 3,
    views: 7800,
  },
  {
    id: '10',
    slug: 'liga-1-update-klasemen-terbaru',
    title: 'Persib Bandung Puncaki Klasemen Liga 1 Jelang Jeda Kompetisi',
    excerpt: 'Maung Bandung kokoh di puncak klasemen dengan keunggulan 5 poin dari pesaing terdekat.',
    content: `
      <p>Bandung - Persib Bandung berhasil mempertahankan posisi puncak klasemen Liga 1 2024/2025 jelang jeda kompetisi untuk Piala Asia.</p>
    `,
    category: categories[3],
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop',
    author: 'Rico Pratama',
    publishedAt: '2024-12-21T08:00:00Z',
    readTime: 3,
    views: 14500,
  },
];

// Helper functions
export const getFeaturedNews = () => newsArticles.filter(article => article.isFeatured);
export const getTrendingNews = () => newsArticles.filter(article => article.isTrending).sort((a, b) => b.views - a.views);
export const getLatestNews = (limit?: number) => {
  const sorted = [...newsArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};
export const getNewsByCategory = (categorySlug: string) => 
  newsArticles.filter(article => article.category.slug === categorySlug);
export const getNewsBySlug = (slug: string) => 
  newsArticles.find(article => article.slug === slug);
export const searchNews = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return newsArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery)
  );
};

// Format date helper
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 1) return 'Baru saja';
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Format views helper
export const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}jt`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}rb`;
  return views.toString();
};
