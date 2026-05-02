<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\User;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create a default author
        $author = User::firstOrCreate(
            ['email' => 'aski_content@alumodasinergi.com'],
            [
                'name' => 'ASKI Content',
                'password' => bcrypt('password'),
            ]
        );

        // Sample article data - Container & Logistics Theme
        $articles = [
            [
                'title' => 'Inovasi Smart Container Mengubah Industri Logistik Global',
                'excerpt' => 'Teknologi IoT dalam kontainer pintar revolusioner cara tracking dan monitoring pengiriman barang secara real-time.',
                'content' => 'Smart container dilengkapi sensor IoT yang memantau suhu, kelembaban, lokasi, dan kondisi barang selama perjalanan. Teknologi ini mengurangi kerugian akibat kerusakan barang dan meningkatkan efisiensi rantai pasokan global. Perusahaan shipping kini dapat memberikan update real-time kepada pelanggan tentang status pengiriman mereka.',
                'tags' => ['kontainer', 'logistik', 'IoT', 'teknologi'],
                'is_headline' => true,
            ],
            [
                'title' => 'Tren Green Shipping: Kontainer Ramah Lingkungan 2024',
                'excerpt' => 'Industri shipping beralih ke kontainer ramah lingkungan untuk mengurangi emisi karbon dan dampak lingkungan.',
                'content' => 'Kontainer ramah lingkungan menggunakan material daur ulang dan desain aerodinamis untuk mengurangi konsumsi bahan bakar. Banyak perusahaan shipping mengadopsi green shipping practices untuk memenuhi regulasi lingkungan yang semakin ketat di seluruh dunia.',
                'tags' => ['kontainer', 'lingkungan', 'green-shipping', 'sustainability'],
                'is_headline' => true,
            ],
            [
                'title' => 'Panduan Lengkap Memilih Jenis Kontainer untuk Bisnis',
                'excerpt' => 'Memahami berbagai jenis kontainer dan penggunaannya untuk kebutuhan bisnis yang optimal.',
                'content' => 'Dari dry container hingga reefer container, setiap jenis memiliki spesifikasi dan kegunaan berbeda. Artikel ini membahas cara memilih kontainer yang tepat untuk jenis barang, rute pengiriman, dan anggaran bisnis Anda.',
                'tags' => ['kontainer', 'bisnis', 'shipping', 'panduan'],
                'is_headline' => true,
            ],
            [
                'title' => 'Masa Depan Pelabuhan Otomatis di Indonesia',
                'excerpt' => 'Transformasi digital pelabuhan Indonesia dengan sistem otomasi untuk meningkatkan efisiensi bongkar muat kontainer.',
                'content' => 'Pelabuhan otomatis menggunakan robotic cranes, AI untuk manajemen traffic, dan sistem digital untuk proses dokumen. Indonesia sedang mengembangkan beberapa pelabuhan pintar untuk bersaing dengan pelabuhan terkemuka di Asia seperti Singapura dan Shanghai.',
                'tags' => ['pelabuhan', 'otomasi', 'kontainer', 'indonesia'],
                'is_headline' => true,
            ],
            [
                'title' => 'Startup Logistik Indonesia: Solusi Inovatif untuk Shipping Kontainer',
                'excerpt' => 'Eksplorasi startup-startup lokal yang menghadirkan terobosan dalam industri pengiriman kontainer.',
                'content' => 'Startup-logistik Indonesia mengembangkan platform digital booking kontainer, tracking real-time, dan marketplace untuk kapasitas pengiriman. Inovasi ini membantu UMKM mengakses layanan shipping yang lebih murah dan efisien.',
                'tags' => ['startup', 'logistik', 'kontainer', 'teknologi'],
                'is_headline' => true,
            ],
            [
                'title' => 'Tantangan Global Container Shortage: Solusi dan Peluang',
                'excerpt' => 'Krisis kelangkaan kontainer global menciptakan peluang bisnis baru dalam industri shipping.',
                'content' => 'Pandemi COVID-19 menyebabkan ketidakseimbangan distribusi kontainer global. Perusahaan shipping dan produsen kontainer berlomba-lomba meningkatkan kapasitas produksi dan mengoptimalkan rotasi kontainer yang ada.',
                'tags' => ['kontainer', 'shipping', 'krisis', 'bisnis'],
                'is_headline' => true,
            ],
            [
                'title' => 'Tips Maintenance Kontainer Bekas untuk Gudang',
                'excerpt' => 'Panduan merawat kontainer bekas agar tetap awet dan fungsional sebagai gudang penyimpanan.',
                'content' => 'Kontainer bekas populer sebagai solusi gudang mobile. Perawatan rutin seperti pengecatan anti-karat, perbaikan atap bocor, dan ventilasi yang baik akan memperpanjang usia kontainer hingga 15-20 tahun.',
                'tags' => ['kontainer', 'maintenance', 'gudang', 'tips'],
                'is_headline' => false,
            ],
            [
                'title' => 'Manfaat Menggunakan Reefer Container untuk Produk Segar',
                'excerpt' => 'Reefer container menjaga kualitas produk segar selama perjalanan jarak jauh.',
                'content' => 'Kontainer pendingin dengan suhu terkontrol sangat penting untuk pengiriman produk makanan, obat-obatan, dan produk segar lainnya. Teknologi modern memungkinkan monitoring suhu real-time melalui satelit.',
                'tags' => ['reefer-container', 'logistik', 'makanan', 'pendingin'],
                'is_headline' => false,
            ],
            [
                'title' => 'Cara Modifikasi Kontainer untuk Rumah Minimalis',
                'excerpt' => 'Tutorial mengubah kontainer bekas menjadi hunian modern dan fungsional.',
                'content' => 'Kontainer bekas dapat diubah menjadi rumah minimalis dengan biaya lebih rendah dari konstruksi konvensional. Modifikasi meliputi penambahan insulasi, jendela, dan sistem plumbing yang tepat.',
                'tags' => ['kontainer', 'rumah', 'arsitektur', 'modifikasi'],
                'is_headline' => false,
            ],
            [
                'title' => 'Strategi Optimasi Biaya Shipping Kontainer',
                'excerpt' => 'Teknik mengurangi biaya pengiriman kontainer tanpa mengorbankan kualitas layanan.',
                'content' => 'Biaya shipping dapat dioptimalkan melalui konsolidasi cargo, pemilihan rute yang efisien, dan negosiasi dengan shipping lines. Perusahaan dapat menghemat 20-30% dengan planning yang baik.',
                'tags' => ['shipping', 'biaya', 'optimasi', 'logistik'],
                'is_headline' => false,
            ],
            [
                'title' => 'Tutorial Custom Clearance untuk Importir Kontainer',
                'excerpt' => 'Panduan lengkap proses bea cukai untuk importir pemula yang menggunakan kontainer.',
                'content' => 'Proses custom clearance melibatkan dokumen lengkap, perhitungan bea masuk, dan inspeksi barang. Importir pemula perlu memahami regulasi dan prosedur untuk menghindari penundaan dan biaya tambahan.',
                'tags' => ['custom-clearance', 'import', 'bea-cukai', 'kontainer'],
                'is_headline' => false,
            ],
            [
                'title' => 'Cara Memilih Forwarder Terpercaya untuk Shipping Kontainer',
                'excerpt' => 'Kriteria memilih freight forwarder yang andal untuk kebutuhan pengiriman internasional.',
                'content' => 'Freight forwarder yang baik memiliki network global, pengalaman handling berbagai jenis cargo, dan sistem tracking yang transparan. Periksa reputasi dan review dari klien sebelum memilih partner.',
                'tags' => ['freight-forwarder', 'shipping', 'logistik', 'partner'],
                'is_headline' => false,
            ],
            [
                'title' => 'Investasi Kontainer: Peluang Pasif Income dari Shipping',
                'excerpt' => 'Kontainer sebagai aset investasi yang menghasilkan passive income dari sewa shipping.',
                'content' => 'Investasi kontainer menawarkan return 8-12% per tahun dari sewa ke perusahaan shipping. Risiko lebih rendah dibandingkan investasi lain karena demand shipping terus meningkat global.',
                'tags' => ['investasi', 'kontainer', 'passive-income', 'shipping'],
                'is_headline' => false,
            ],
            [
                'title' => 'Tren Container Housing di Indonesia 2024',
                'excerpt' => 'Prediksi popularitas rumah kontainer di Indonesia sebagai solusi hunian terjangkau.',
                'content' => 'Rumah kontainer semakin populer di Indonesia karena biaya konstruksi lebih rendah dan waktu pengerjaan lebih cepat. Banyak pengembang menawarkan rumah kontainer dengan desain modern dan fasilitas lengkap.',
                'tags' => ['container-housing', 'properti', 'tren-2024', 'indonesia'],
                'is_headline' => false,
            ],
            [
                'title' => 'Cara Memulai Bisnis Jual Beli Kontainer Bekas',
                'excerpt' => 'Tutorial memulai bisnis trading kontainer bekas dengan modal terbatas.',
                'content' => 'Bisnis kontainer bekas menawarkan margin 15-25% per unit. Mulai dengan membeli 1-2 unit, renovasi ringan, dan jual ke kontraktor atau perusahaan yang butuh gudang sementara.',
                'tags' => ['bisnis', 'kontainer', 'trading', 'modal-kecil'],
                'is_headline' => false,
            ],
            [
                'title' => 'Manfaat Container Office untuk Proyek Konstruksi',
                'excerpt' => 'Kantor kontainer portable sebagai solusi workspace fleksibel untuk proyek konstruksi.',
                'content' => 'Container office memudahkan mobilitas tim proyek dan menghemat biaya sewa kantor. Dapat dilengkapi AC, internet, dan fasilitas kantor lengkap untuk produktivitas maksimal.',
                'tags' => ['container-office', 'konstruksi', 'workspace', 'proyek'],
                'is_headline' => false,
            ],
            [
                'title' => 'Tips Fotografi Produk untuk Shipping Company',
                'excerpt' => 'Cara menghasilkan foto profesional untuk promosi layanan shipping dan logistik.',
                'content' => 'Fotografi produk shipping company harus menampilkan kontainer, kapal, dan fasilitas pelabuhan dengan angle yang menarik. Gunakan drone photography untuk aerial shots yang mengesankan.',
                'tags' => ['fotografi', 'shipping', 'marketing', 'promosi'],
                'is_headline' => false,
            ],
            [
                'title' => 'Diet Karbon untuk Industri Shipping: Strategi Net Zero',
                'excerpt' => 'Program pengurangan emisi karbon industri shipping menuju target net zero 2050.',
                'content' => 'Industri shipping bertanggung jawab atas 3% emisi global. Strategi net zero meliputi penggunaan bahan bakar alternatif, desain kapal efisien, dan carbon offset program.',
                'tags' => ['net-zero', 'shipping', 'emisi', 'lingkungan'],
                'is_headline' => false,
            ],
            [
                'title' => 'Cara Memulai Bisnis Freight Forwarding',
                'excerpt' => 'Panduan lengkap memulai bisnis freight forwarding dari lisensi hingga operasional.',
                'content' => 'Freight forwarding membutuhkan lisensi, network global, dan sistem IT yang handal. Mulai dengan fokus pada rute spesifik dan bangun reputasi untuk ekspansi bisnis.',
                'tags' => ['freight-forwarding', 'bisnis', 'logistik', 'startup'],
                'is_headline' => false,
            ],
            [
                'title' => 'Teknik Negosiasi Harga Sewa Kontainer',
                'excerpt' => 'Strategi negosiasi efektif untuk mendapatkan harga sewa kontainer terbaik.',
                'content' => 'Negosiasi sewa kontainer memerlukan pemahaman market rate, seasonality, dan volume. Teknik yang tepat dapat menghemat 10-20% dari harga standar shipping lines.',
                'tags' => ['negosiasi', 'sewa-kontainer', 'bisnis', 'tips'],
                'is_headline' => false,
            ],
        ];

        // Create articles with randomized data
        foreach ($articles as $index => $articleData) {
            Article::create([
                'title' => $articleData['title'],
                'slug' => Str::slug($articleData['title']),
                'content' => $articleData['content'],
                'excerpt' => $articleData['excerpt'],
                'featured_image' => 'articles/article-' . ($index + 1) . '.jpg',
                'status' => 'published',
                'published_at' => now()->subDays(rand(1, 60))->subHours(rand(1, 23))->subMinutes(rand(1, 59)),
                'author_id' => $author->id,
                'meta_title' => $articleData['title'],
                'meta_description' => $articleData['excerpt'],
                'meta_keywords' => implode(', ', $articleData['tags']),
                'views_count' => rand(50, 5000), // Random view count between 50-5000
                'tags' => $articleData['tags'],
                'position' => $index + 1,
                'is_headline' => $articleData['is_headline'],
                'views' => rand(100, 10000), // Random views for additional tracking
            ]);
        }

        $this->command->info('✅ 20 articles seeded successfully with 6 headlines and randomized view counts!');
    }
}
