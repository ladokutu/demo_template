import pool from './db.js';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const migrations = [
  // 1. Services table
  `CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(10) DEFAULT '🖥️',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    features JSON NOT NULL,
    color VARCHAR(20) DEFAULT '#1B6EF3',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 2. Process steps table
  `CREATE TABLE IF NOT EXISTS process_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    step_num VARCHAR(5) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 3. Portfolio items table
  `CREATE TABLE IF NOT EXISTS portfolio_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) DEFAULT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 4. Stats table
  `CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(20) NOT NULL,
    label VARCHAR(255) NOT NULL,
    icon VARCHAR(10) DEFAULT '🏆',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 5. Testimonials table
  `CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) NOT NULL,
    rating INT DEFAULT 5,
    text TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 6. Partners table
  `CREATE TABLE IF NOT EXISTS partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500) DEFAULT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 7. Team members table
  `CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) NOT NULL,
    color VARCHAR(20) DEFAULT '#1B6EF3',
    image_url VARCHAR(500) DEFAULT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  // Add image_url column if it doesn't exist (for existing databases)
  // Wrapped in procedure to silently ignore "duplicate column" errors
  `ALTER TABLE team_members ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT NULL AFTER color`,
  `ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS url_project VARCHAR(500) DEFAULT NULL AFTER image_url`,

  // 8. Company values table
  `CREATE TABLE IF NOT EXISTS company_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(10) DEFAULT '🎯',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 9. Nav links table
  `CREATE TABLE IF NOT EXISTS nav_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 10. Page sections (hero, about, stats header, etc.)
  `CREATE TABLE IF NOT EXISTS page_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) DEFAULT NULL,
    subtitle TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL,
    badge_text VARCHAR(255) DEFAULT NULL,
    extra_data JSON DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 11. Admin users table
  `CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) DEFAULT 'Admin',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  // 12. Messages / contact form submissions table
  `CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    perusahaan VARCHAR(255) DEFAULT NULL,
    layanan VARCHAR(255) DEFAULT NULL,
    budget VARCHAR(100) DEFAULT NULL,
    pesan TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
];

// Seed data
const seeds = [
  // Services
  `INSERT IGNORE INTO services (id, icon, title, description, features, color, sort_order) VALUES
    (1, '🖥️', 'Custom Software Development', 'Kami membangun solusi perangkat lunak yang sepenuhnya disesuaikan dengan kebutuhan spesifik bisnis Anda.', '["Analisis kebutuhan mendalam","Arsitektur yang skalabel","Testing & QA ketat"]', '#1B6EF3', 1),
    (2, '🌐', 'Web Development', 'Pengembangan website & web application modern yang cepat, responsif, dan user-friendly.', '["Frontend & Backend","CMS & E-commerce","Progressive Web App"]', '#7C3AED', 2),
    (3, '📱', 'Mobile App Development', 'Aplikasi mobile native dan cross-platform untuk iOS & Android yang intuitif dan berperforma tinggi.', '["iOS & Android Native","React Native / Flutter","UI/UX yang engaging"]', '#0891B2', 3),
    (4, '☁️', 'Cloud & DevOps', 'Infrastruktur cloud yang andal, skalabel, dan aman untuk mendukung pertumbuhan bisnis Anda.', '["AWS, GCP, Azure","CI/CD Pipeline","Monitoring & Security"]', '#059669', 4),
    (5, '🔗', 'System Integration', 'Integrasi berbagai sistem dan platform bisnis untuk alur kerja yang lebih efisien dan terotomasi.', '["API Development","ERP & CRM Integration","Third-party Services"]', '#DC2626', 5),
    (6, '📊', 'IT Consulting', 'Konsultasi strategis untuk membantu bisnis Anda membuat keputusan teknologi yang tepat dan terukur.', '["IT Roadmap","Technology Audit","Digital Transformation"]', '#D97706', 6)
    ON DUPLICATE KEY UPDATE title=title`,

  // Process Steps
  `INSERT IGNORE INTO process_steps (id, step_num, title, description, sort_order) VALUES
    (1, '01', 'Discovery & Analisis', 'Kami menggali kebutuhan bisnis Anda secara mendalam melalui diskusi dan dokumentasi yang komprehensif.', 1),
    (2, '02', 'Desain & Perencanaan', 'Tim kami merancang solusi terbaik, arsitektur sistem, dan roadmap pengembangan yang jelas.', 2),
    (3, '03', 'Development & Testing', 'Pengembangan dilakukan secara agile dengan testing ketat di setiap iterasi untuk kualitas terjamin.', 3),
    (4, '04', 'Deployment & Support', 'Peluncuran sistem yang terencana dan dukungan purna jual yang responsif untuk ketenangan pikiran Anda.', 4)
    ON DUPLICATE KEY UPDATE title=title`,

  // Portfolio Items
  `INSERT IGNORE INTO portfolio_items (id, title, client, tag, description, sort_order) VALUES
    (1, 'E-Commerce Platform', 'Retail Group Nasional', 'Web App', 'Platform e-commerce B2B dengan fitur manajemen stok real-time dan integrasi payment gateway.', 1),
    (2, 'HRIS & Payroll System', 'Perusahaan Manufaktur', 'Custom Software', 'Sistem HR terintegrasi untuk 2000+ karyawan dengan otomasi payroll dan attendance tracking.', 2),
    (3, 'Telemedicine App', 'Klinik Digital Indonesia', 'Mobile App', 'Aplikasi konsultasi dokter online dengan fitur video call, resep digital, dan rekam medis.', 3),
    (4, 'Logistik Dashboard', 'Perusahaan Logistik', 'Dashboard', 'Sistem monitoring armada real-time dengan tracking GPS dan manajemen pengiriman terpusat.', 4),
    (5, 'LMS Platform', 'Institusi Pendidikan', 'Web App', 'Platform e-learning dengan fitur live class, quiz interaktif, dan sertifikasi otomatis.', 5),
    (6, 'Fintech Lending App', 'Startup Fintech', 'Mobile App', 'Aplikasi pinjaman digital dengan credit scoring otomatis dan proses KYC yang seamless.', 6)
    ON DUPLICATE KEY UPDATE title=title`,

  // Stats
  `INSERT IGNORE INTO stats (id, number, label, icon, sort_order) VALUES
    (1, '13+', 'Tahun Pengalaman', '🏆', 1),
    (2, '200+', 'Proyek Selesai', '✅', 2),
    (3, '98%', 'Klien Puas', '⭐', 3),
    (4, '50+', 'Tenaga Ahli', '👥', 4)
    ON DUPLICATE KEY UPDATE number=number`,

  // Testimonials
  `INSERT IGNORE INTO testimonials (id, name, role, avatar, rating, text, sort_order) VALUES
    (1, 'Andi Kurniawan', 'CEO, TokoBaju.id', 'AK', 5, 'Ladokutu Informasi membangun platform e-commerce kami dari nol. Hasilnya luar biasa — performa tinggi, desain elegan, dan selesai tepat waktu. Tim mereka sangat profesional dan komunikatif.', 1),
    (2, 'Siti Rahayu', 'Direktur IT, RS Harapan', 'SR', 5, 'Sistem rekam medis digital yang mereka kembangkan sangat membantu operasional rumah sakit kami. Antarmukanya intuitif dan integrasi dengan sistem lama berjalan mulus.', 2),
    (3, 'Denny Prasetyo', 'CTO, LogisTech Indonesia', 'DP', 5, 'Dashboard logistik yang dibangun Ladokutu Informasi meningkatkan efisiensi operasional kami hingga 40%. Kode bersih, dokumentasi lengkap, dan support purna jual sangat responsif.', 3)
    ON DUPLICATE KEY UPDATE name=name`,

  // Partners
  `INSERT IGNORE INTO partners (id, name, sort_order) VALUES
    (1, 'AWS', 1), (2, 'Google Cloud', 2), (3, 'Microsoft Azure', 3), (4, 'Meta', 4),
    (5, 'Stripe', 5), (6, 'Twilio', 6), (7, 'Firebase', 7), (8, 'MongoDB', 8)
    ON DUPLICATE KEY UPDATE name=name`,

  // Team Members
  `INSERT IGNORE INTO team_members (id, name, role, avatar, color, sort_order) VALUES
    (1, 'Rikko', 'CEO & Founder', 'RO', '#1B6EF3', 1),
    (2, 'Iqbal Mikhafasa', 'CMO', 'IM', '#7C3AED', 2),
    (3, 'Junaidi Ramli', 'Technical Support', 'JR', '#059669', 3),
    (4, 'Djon', 'Lead Frontend Dev', 'SM', '#D97706', 4)
    ON DUPLICATE KEY UPDATE name=name`,

  // Company Values
  `INSERT IGNORE INTO company_values (id, icon, title, description, sort_order) VALUES
    (1, '🎯', 'Client-First', 'Kepuasan dan keberhasilan klien adalah prioritas utama kami dalam setiap keputusan.', 1),
    (2, '⚡', 'Delivery On-Time', 'Kami berkomitmen menyelesaikan setiap proyek tepat waktu tanpa mengorbankan kualitas.', 2),
    (3, '🔍', 'Transparansi', 'Komunikasi terbuka dan laporan progres rutin agar Anda selalu tahu perkembangan proyek.', 3),
    (4, '🚀', 'Inovasi', 'Kami terus belajar dan mengadopsi teknologi terkini untuk solusi yang relevan dan modern.', 4)
    ON DUPLICATE KEY UPDATE title=title`,

  // Nav Links
  `INSERT IGNORE INTO nav_links (id, label, href, sort_order) VALUES
    (1, 'Layanan', '#layanan', 1),
    (2, 'Cara Kerja', '#cara-kerja', 2),
    (3, 'Portofolio', '#portofolio', 3),
    (4, 'Tentang', '#tentang', 4),
    (5, 'Kontak', '#kontak', 5)
    ON DUPLICATE KEY UPDATE label=label`,

  // Admin Users (default: email support@ladokutu.info, password admin123456)
  `INSERT IGNORE INTO admin_users (email, password_hash, name) VALUES
    ('support@ladokutu.info', '${hashPassword('admin123456')}', 'Admin Ladokutu')`,

  // Page Sections
  `INSERT IGNORE INTO page_sections (section_key, title, subtitle, description, badge_text, extra_data) VALUES
    ('hero', 'Kami Bangun Yang Bisnis Anda Butuhkan', NULL, 'Ladokutu Informasi adalah mitra teknologi terpercaya Anda — dari custom software, web & mobile app, hingga konsultasi IT strategis untuk mendorong pertumbuhan bisnis.', '7+ Tahun Melayani Klien Indonesia', '{"typed_words":["Software","Web App","Mobile App","API System","Dashboard"],"cta_primary":"Konsultasi Gratis","cta_secondary":"Lihat Portofolio","cta_primary_link":"#kontak","cta_secondary_link":"#portofolio"}'),
    ('services_header', 'Solusi Teknologi Lengkap', NULL, 'Dari konsep hingga deployment, kami menyediakan layanan IT end-to-end yang disesuaikan dengan kebutuhan dan skala bisnis Anda.', 'Layanan Kami', NULL),
    ('how_we_work_header', 'Proses yang Transparan & Terstruktur', NULL, 'Kami mengikuti metodologi agile yang terbukti, memastikan setiap proyek berjalan on-track, on-budget, dan sesuai ekspektasi Anda.', 'Cara Kerja Kami', NULL),
    ('portfolio_header', 'Karya yang Kami Banggakan', NULL, NULL, 'Portofolio', NULL),
    ('stats_header', 'Angka yang Bicara Sendiri', '7 tahun kepercayaan klien Indonesia', NULL, NULL, NULL),
    ('testimonials_header', 'Apa Kata Klien Kami', NULL, NULL, 'Testimoni', NULL),
    ('about_header', 'Siapa Ladokutu Informasi?', NULL, 'Kami adalah tim konsultan IT & software developer berpengalaman yang berdedikasi membantu bisnis Indonesia tumbuh melalui teknologi.', 'Tentang Kami', '{"founded_year":"2017","founded_location":"Pondok Kelapa, Jakarta Timur","founded_story":"Ladokutu Informasi lahir dari passion sekelompok developer muda Jakarta Timur yang ingin membuat teknologi lebih accessible bagi bisnis lokal. Berawal dari 3 orang di sebuah co-working space, kini kami telah berkembang menjadi tim 50+ profesional.","history_text":"Selama 7+ tahun, kami telah menyelesaikan lebih dari 200 proyek untuk klien dari berbagai industri — mulai dari startup tahap awal hingga perusahaan nasional dengan ribuan pengguna.","expertise_text":"Keahlian kami mencakup custom software development, web & mobile application, cloud infrastructure, dan IT consulting strategis — semua dikerjakan oleh tim in-house yang berpengalaman dan bersertifikat.","badges":["ISO 9001 Certified","AWS Partner","Google Cloud Partner"]}')
    ON DUPLICATE KEY UPDATE title=title`,
];

// Schema-only migration: creates tables and adds missing columns (NO data changes)
export async function runMigration() {
  const connection = await pool.getConnection();
  try {
    console.log('Starting schema migration...');
    
    for (const sql of migrations) {
      try {
        await connection.query(sql);
        console.log('Migration executed:', sql.substring(0, 60) + '...');
      } catch (e) {
        if (sql.trim().startsWith('ALTER TABLE')) {
          console.log('Skipping ALTER TABLE (column may already exist):', e.message);
        } else {
          throw e;
        }
      }
    }
    
    // Dynamically check and add columns that may be missing
    const columnsToAdd = [
      { table: 'team_members', column: 'image_url', def: "VARCHAR(500) DEFAULT NULL AFTER color" },
      { table: 'portfolio_items', column: 'url_project', def: "VARCHAR(500) DEFAULT NULL AFTER image_url" },
    ];
    
    for (const { table, column, def } of columnsToAdd) {
      try {
        const [cols] = await connection.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [column]);
        if (cols.length === 0) {
          await connection.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`);
          console.log(`Added ${column} column to ${table}`);
        } else {
          console.log(`${column} column already exists in ${table}`);
        }
      } catch (e) {
        console.log(`Could not check/add ${column} column:`, e.message);
      }
    }
    
    console.log('Schema migration completed successfully!');
    return { success: true, message: 'Schema migration completed. Tables created and missing columns added.' };
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Seed data: only inserts if tables are empty (safe to re-run)
export async function runSeedData() {
  const connection = await pool.getConnection();
  try {
    console.log('Starting seed data...');
    let insertedCount = 0;
    
    for (const sql of seeds) {
      try {
        const [result] = await connection.query(sql);
        if (result.affectedRows > 0) {
          insertedCount += result.affectedRows;
          console.log('Seed inserted:', sql.substring(0, 60) + '...');
        } else {
          console.log('Seed skipped (data exists):', sql.substring(0, 60) + '...');
        }
      } catch (e) {
        console.log('Seed error (may already exist):', e.message);
      }
    }
    
    console.log(`Seed data completed. ${insertedCount} rows inserted.`);
    return { success: true, message: `Seed data completed. ${insertedCount} rows inserted.` };
  } catch (error) {
    console.error('Seed data failed:', error);
    throw error;
  } finally {
    connection.release();
  }
}
