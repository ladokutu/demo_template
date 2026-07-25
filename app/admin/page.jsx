'use client';
import { useState, useEffect, useCallback } from 'react';

function LoginPage({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user, password: pass }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('cms_auth', 'true');
        sessionStorage.setItem('cms_token', data.token);
        onLogin();
      } else {
        setError(data.error || 'Email atau password salah!');
        setPass('');
      }
    } catch (err) {
      setError('Gagal menghubungi server');
      setPass('');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '48px 36px 40px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #1B6EF3, #7C3AED)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(27,110,243,0.3)' }}>
              <span style={{ fontSize: 28 }}>🔐</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 6 }}>CMS Admin Panel</h1>
            <p style={{ fontSize: 14, color: '#6B7280' }}>Masuk untuk mengelola konten website</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email / Username</label>
              <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError(''); }} placeholder="support@ladokutu.info" required style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={pass} onChange={(e) => { setPass(e.target.value); setError(''); }} placeholder="••••••••" required style={{ width: '100%', padding: '12px 48px 12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>
            {error && <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, color: '#DC2626', fontSize: 13, fontWeight: 500, marginBottom: 20 }}>⚠️ {error}</div>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#94A3B8' : 'linear-gradient(135deg, #1B6EF3, #1458CC)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? '⏳ Memproses...' : 'Masuk →'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
            <a href="/" style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>← Kembali ke Website</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTIONS = [
  { key: 'page_sections', label: '📋 Page Sections', type: 'sections' },
  { key: 'services', label: '🖥️ Services', type: 'items' },
  { key: 'process_steps', label: '🔄 Process Steps', type: 'items' },
  { key: 'portfolio_items', label: '💼 Portfolio', type: 'items' },
  { key: 'stats', label: '📊 Stats', type: 'items' },
  { key: 'testimonials', label: '⭐ Testimonials', type: 'items' },
  { key: 'partners', label: '🤝 Partners', type: 'items' },
  { key: 'team_members', label: '👥 Team Members', type: 'items' },
  { key: 'company_values', label: '💡 Company Values', type: 'items' },
  { key: 'nav_links', label: '🔗 Nav Links', type: 'items' },
  { key: 'messages', label: '📬 Pesan Masuk', type: 'messages' },
  { key: 'admin_users', label: '🔑 Admin Users', type: 'admin' },
];

const FIELD_CONFIGS = {
  services: [
    { key: 'icon', label: 'Icon', type: 'text', placeholder: '🖥️' },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'features', label: 'Features (JSON array)', type: 'textarea', placeholder: '["Feature 1","Feature 2"]' },
    { key: 'color', label: 'Color', type: 'color', placeholder: '#1B6EF3' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  process_steps: [
    { key: 'step_num', label: 'Step #', type: 'text', placeholder: '01', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  portfolio_items: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'client', label: 'Client', type: 'text', required: true },
    { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Web App', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'image_url', label: 'Foto/Gambar', type: 'file', placeholder: 'Upload gambar atau masukkan URL' },
    { key: 'url_project', label: 'URL Project', type: 'url', placeholder: 'https://...' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  stats: [
    { key: 'number', label: 'Number', type: 'text', placeholder: '13+', required: true },
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'icon', label: 'Icon', type: 'text', placeholder: '🏆' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  testimonials: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'avatar', label: 'Avatar (initials)', type: 'text', placeholder: 'AK', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '5' },
    { key: 'text', label: 'Testimonial Text', type: 'textarea', required: true },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  partners: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'logo_url', label: 'Logo URL', type: 'text' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  team_members: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'avatar', label: 'Avatar (initials)', type: 'text', placeholder: 'RO', required: true },
    { key: 'color', label: 'Color', type: 'color', placeholder: '#1B6EF3' },
    { key: 'image_url', label: 'Foto/Gambar', type: 'file', placeholder: 'Upload gambar atau masukkan URL' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  company_values: [
    { key: 'icon', label: 'Icon', type: 'text', placeholder: '🎯' },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  nav_links: [
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'href', label: 'Href', type: 'text', placeholder: '#layanan', required: true },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
  admin_users: [
    { key: 'email', label: 'Email', type: 'text', placeholder: 'admin@example.com', required: true },
    { key: 'password', label: 'Password', type: 'text', placeholder: 'Min 6 karakter', required: true },
    { key: 'name', label: 'Nama', type: 'text', placeholder: 'Nama Admin', required: true },
  ],
};

const SECTION_FIELDS_CONFIG = [
  { key: 'section_key', label: 'Section Key', type: 'select', options: ['hero', 'services_header', 'how_we_work_header', 'portfolio_header', 'stats_header', 'testimonials_header', 'about_header'] },
  { key: 'badge_text', label: 'Badge Text', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'subtitle', label: 'Subtitle', type: 'text' },
  { key: 'extra_data', label: 'Extra Data (JSON)', type: 'textarea', placeholder: '{"key":"value"}' },
];

function FileUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <label style={styles.label}>{field.label}</label>
      {value && (
        <div style={{ marginBottom: 8, position: 'relative' }}>
          <img src={value} alt="Preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, border: '1px solid #E5E7EB' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <button type="button" onClick={() => onChange('')} style={{ position: 'absolute', top: 8, right: 8, background: '#DC2626', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 11, cursor: 'pointer' }}>✕ Hapus</button>
        </div>
      )}
      <label style={{ display: 'block', padding: '10px 14px', background: '#F9FAFB', border: '1.5px dashed #D1D5DB', borderRadius: 8, textAlign: 'center', cursor: 'pointer', fontSize: 13, color: '#6B7280' }}>
        {uploading ? '⏳ Uploading...' : '📁 Pilih File Gambar'}
        <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml" style={{ display: 'none' }} disabled={uploading} onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          setUploading(true);
          const fd = new FormData();
          fd.append('file', file);
          try {
            const token = sessionStorage.getItem('cms_token');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;
            const res = await fetch('/api/upload', { method: 'POST', headers, body: fd });
            const data = await res.json();
            if (data.success) onChange(data.url);
            else alert('Upload gagal: ' + (data.error || 'Unknown error'));
          } catch (err) { alert('Upload gagal'); }
          setUploading(false);
        }} />
      </label>
      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Atau masukkan URL manual:</p>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder || ''} style={{ ...styles.input, marginTop: 4 }} />
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('cms_auth');
    const token = sessionStorage.getItem('cms_token');
    if (auth === 'true' && token) setAuthenticated(true);
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;
  if (!authenticated) return <LoginPage onLogin={() => setAuthenticated(true)} />;
  return <AdminDashboard onLogout={() => { sessionStorage.removeItem('cms_auth'); sessionStorage.removeItem('cms_token'); setAuthenticated(false); }} />;
}

function AdminDashboard({ onLogout }) {
  const authFetch = async (url, options = {}) => {
    const token = sessionStorage.getItem('cms_token');
    const headers = { ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      sessionStorage.removeItem('cms_auth');
      sessionStorage.removeItem('cms_token');
      window.location.reload();
      throw new Error('Unauthorized');
    }
    return res;
  };

  const [activeSection, setActiveSection] = useState('page_sections');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [migrating, setMigrating] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      if (activeSection === 'admin_users') {
        const res = await authFetch('/api/admin-users');
        const data = await res.json();
        if (data.success) setItems(data.data);
      } else if (activeSection === 'messages') {
        const res = await authFetch('/api/messages');
        const data = await res.json();
        if (data.success) setItems(data.data);
      } else {
        const res = await authFetch(`/api/content/${activeSection}?all=true`);
        const data = await res.json();
        if (data.success) setItems(data.data);
      }
    } catch (err) { showMessage('Gagal memuat data', 'error'); }
    setLoading(false);
  }, [activeSection]);

  useEffect(() => {
    fetchItems();
    setEditingItem(null);
    setShowForm(false);
    setFormData({});
  }, [fetchItems]);

  const handleRunMigration = async () => {
    if (!window.confirm('Jalankan migration?')) return;
    setMigrating(true);
    try {
      const res = await authFetch('/api/migrate', { method: 'POST' });
      const data = await res.json();
      if (data.success) { showMessage('Schema migration berhasil!'); fetchItems(); }
      else showMessage('Migration gagal: ' + (data.error || ''), 'error');
    } catch (err) { showMessage('Gagal menjalankan migration', 'error'); }
    setMigrating(false);
  };

  const handleSeedData = async () => {
    if (!window.confirm('Isi data default?')) return;
    setSeeding(true);
    try {
      const res = await authFetch('/api/migrate?type=seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) { showMessage(data.message || 'Seed data berhasil!'); fetchItems(); }
      else showMessage('Seed gagal: ' + (data.error || ''), 'error');
    } catch (err) { showMessage('Gagal menjalankan seed data', 'error'); }
    setSeeding(false);
  };

  const handleSave = async () => {
    try {
      if (activeSection === 'admin_users') {
        const res = await authFetch('/api/admin-users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        const data = await res.json();
        if (data.success) { showMessage(data.message || 'Admin user berhasil ditambahkan!'); setShowForm(false); setEditingItem(null); setFormData({}); fetchItems(); }
        else showMessage('Gagal: ' + (data.error || ''), 'error');
        return;
      }
      let body = { ...formData };
      if (body.features && typeof body.features === 'string') { try { body.features = JSON.parse(body.features); } catch { showMessage('Format JSON features tidak valid', 'error'); return; } }
      if (body.extra_data && typeof body.extra_data === 'string') { try { body.extra_data = JSON.parse(body.extra_data); } catch { showMessage('Format JSON extra_data tidak valid', 'error'); return; } }
      if ('is_active' in body) body.is_active = body.is_active ? 1 : 0;

      let res;
      if (editingItem) {
        res = await authFetch(`/api/content/${activeSection}/${editingItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        res = await authFetch(`/api/content/${activeSection}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const data = await res.json();
      if (data.success) { showMessage(editingItem ? 'Berhasil diupdate!' : 'Berhasil ditambahkan!'); setShowForm(false); setEditingItem(null); setFormData({}); fetchItems(); }
      else showMessage('Gagal: ' + (data.error || ''), 'error');
    } catch (err) { showMessage('Gagal menyimpan data', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus?')) return;
    try {
      const res = activeSection === 'admin_users'
        ? await authFetch(`/api/admin-users/${id}`, { method: 'DELETE' })
        : await authFetch(`/api/content/${activeSection}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showMessage('Berhasil dihapus!'); fetchItems(); }
      else showMessage('Gagal menghapus', 'error');
    } catch (err) { showMessage('Gagal menghapus data', 'error'); }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const formValues = { ...item };
    if (Array.isArray(formValues.features)) formValues.features = JSON.stringify(formValues.features, null, 2);
    if (typeof formValues.extra_data === 'object' && formValues.extra_data !== null) formValues.extra_data = JSON.stringify(formValues.extra_data, null, 2);
    setFormData(formValues);
    setShowForm(true);
  };

  const handleAdd = () => { setEditingItem(null); setFormData({}); setShowForm(true); };

  const handleMarkRead = async (id) => {
    try {
      await authFetch(`/api/messages/${id}`, { method: 'PATCH' });
      showMessage('Pesan ditandai sudah dibaca');
      fetchItems();
    } catch { showMessage('Gagal update', 'error'); }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    try {
      const res = await authFetch(`/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showMessage('Pesan dihapus'); fetchItems(); }
      else showMessage('Gagal menghapus', 'error');
    } catch { showMessage('Gagal menghapus pesan', 'error'); }
  };

  const renderFormField = (field) => {
    const value = formData[field.key] ?? '';

    if (field.type === 'file') {
      return <FileUploadField key={field.key} field={field} value={value} onChange={(v) => setFormData({ ...formData, [field.key]: v })} />;
    }

    if (field.type === 'checkbox') {
      return (
        <label key={field.key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!value} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#1B6EF3' }} />
          <span style={{ fontSize: 14, color: '#374151' }}>{field.label}</span>
        </label>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.key}>
          <label style={styles.label}>{field.label}</label>
          <select value={value} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} style={styles.input}>
            <option value="">-- Pilih --</option>
            {field.options.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
          </select>
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.key}>
          <label style={styles.label}>{field.label}</label>
          <textarea value={value} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} placeholder={field.placeholder || ''} style={{ ...styles.input, minHeight: 80, resize: 'vertical' }} />
        </div>
      );
    }

    return (
      <div key={field.key}>
        <label style={styles.label}>{field.label}</label>
        <input type={field.type} value={value} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} placeholder={field.placeholder || ''} required={field.required} style={styles.input} />
      </div>
    );
  };

  const currentSection = SECTIONS.find((s) => s.key === activeSection);
  const fields = activeSection === 'page_sections' ? SECTION_FIELDS_CONFIG : (FIELD_CONFIGS[activeSection] || []);
  const canDelete = activeSection !== 'page_sections' && activeSection !== 'admin_users' && activeSection !== 'messages';
  const showAddButton = activeSection !== 'messages';

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.sidebarTitle}>🔧 CMS Admin</h1>
          <p style={styles.sidebarSubtitle}>Ladokutu Web</p>
        </div>
        <button onClick={handleRunMigration} disabled={migrating} style={{ ...styles.migrateBtn, opacity: migrating ? 0.6 : 1 }}>
          {migrating ? '⏳ Running...' : '🔧 Schema Migration'}
        </button>
        <button onClick={handleSeedData} disabled={seeding} style={{ ...styles.migrateBtn, background: '#059669', opacity: seeding ? 0.6 : 1, marginTop: 8 }}>
          {seeding ? '⏳ Running...' : '🌱 Seed Data'}
        </button>
        <nav style={styles.nav}>
          {SECTIONS.map((sec) => (
            <button key={sec.key} onClick={() => setActiveSection(sec.key)} style={{ ...styles.navItem, background: activeSection === sec.key ? '#1B6EF3' : 'transparent', color: activeSection === sec.key ? '#fff' : '#9CA3AF' }}>
              {sec.label}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <button onClick={onLogout} style={{ width: '100%', padding: '8px 12px', background: '#DC2626', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>🚪 Logout</button>
          <a href="/" style={styles.backLink}>← Kembali ke Website</a>
        </div>
      </aside>

      <main style={styles.main}>
        {message.text && (
          <div style={{ ...styles.toast, background: message.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: message.type === 'error' ? '#DC2626' : '#065F46', borderColor: message.type === 'error' ? '#FECACA' : '#A7F3D0' }}>
            {message.text}
          </div>
        )}
        <div style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>{currentSection?.label}</h2>
            <p style={styles.headerSubtitle}>{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          {showAddButton && <button onClick={handleAdd} style={styles.addBtn}>+ Tambah Baru</button>}
        </div>

        {showForm && (
          <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>{editingItem ? 'Edit Item' : 'Tambah Item Baru'}</h3>
                <button onClick={() => setShowForm(false)} style={styles.closeBtn}>✕</button>
              </div>
              <div style={styles.modalBody}>
                {fields.map((field) => renderFormField(field))}
              </div>
              <div style={styles.modalFooter}>
                <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>Batal</button>
                <button onClick={handleSave} style={styles.saveBtn}>{editingItem ? '💾 Update' : '💾 Simpan'}</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>📭</p>
            <p style={{ fontSize: 18, color: '#6B7280', marginBottom: 8 }}>{activeSection === 'messages' ? 'Belum ada pesan masuk' : 'Belum ada data'}</p>
            {activeSection !== 'messages' && <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 20 }}>Klik "Run Migration" lalu "Seed Data"</p>}
          </div>
        ) : activeSection === 'messages' ? (
          /* Messages Table */
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Nama</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Telepon</th>
                  <th style={styles.th}>Perusahaan</th>
                  <th style={styles.th}>Layanan</th>
                  <th style={styles.th}>Budget</th>
                  <th style={styles.th}>Pesan</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Waktu</th>
                  <th style={styles.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((msg) => (
                  <tr key={msg.id} style={{ ...styles.tr, background: msg.is_read ? 'transparent' : '#FEF9C3' }}>
                    <td style={styles.td}>{msg.id}</td>
                    <td style={{ ...styles.td, fontWeight: msg.is_read ? 400 : 700 }}>{msg.nama}</td>
                    <td style={styles.td}><a href={`mailto:${msg.email}`} style={{ color: '#1B6EF3', textDecoration: 'none' }}>{msg.email}</a></td>
                    <td style={styles.td}>{msg.telepon ? <a href={`https://wa.me/${msg.telepon.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>{msg.telepon}</a> : '-'}</td>
                    <td style={styles.td}>{msg.perusahaan || '-'}</td>
                    <td style={styles.td}>{msg.layanan || '-'}</td>
                    <td style={styles.td}>{msg.budget || '-'}</td>
                    <td style={{ ...styles.td, maxWidth: 280 }}>
                      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.pesan}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, background: msg.is_read ? '#D1FAE5' : '#FEF3C7', color: msg.is_read ? '#065F46' : '#92400E' }}>
                        {msg.is_read ? '✓ Dibaca' : '● Baru'}
                      </span>
                    </td>
                    <td style={{ ...styles.td, fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {msg.created_at ? new Date(msg.created_at).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {!msg.is_read && <button onClick={() => handleMarkRead(msg.id)} style={{ ...styles.editBtn, background: '#D1FAE5', color: '#065F46' }}>✓ Dibaca</button>}
                        <button onClick={() => handleDeleteMessage(msg.id)} style={styles.deleteBtn}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  {activeSection === 'page_sections' && <th style={styles.th}>Key</th>}
                  <th style={styles.th}>Konten Utama</th>
                  <th style={styles.th}>Detail</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>{item.id}</td>
                    {activeSection === 'page_sections' && <td style={styles.td}><span style={styles.badge}>{item.section_key}</span></td>}
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                        {item.icon && <span style={{ marginRight: 6 }}>{item.icon}</span>}
                        {item.title || item.name || item.badge_text || item.label || item.step_num || item.number || '-'}
                      </div>
                      {item.description && <div style={{ fontSize: 12, color: '#6B7280', maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</div>}
                      {item.text && <div style={{ fontSize: 12, color: '#6B7280', maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>&ldquo;{item.text.substring(0, 80)}...&rdquo;</div>}
                    </td>
                    <td style={styles.td}>
                      {item.role && <div style={{ fontSize: 12, color: '#6B7280' }}>{item.role}</div>}
                      {item.client && <div style={{ fontSize: 12, color: '#1B6EF3' }}>{item.client}</div>}
                      {item.tag && <span style={{ ...styles.badge, background: '#EEF2FF', color: '#4F46E5' }}>{item.tag}</span>}
                      {item.href && <div style={{ fontSize: 12, color: '#6B7280' }}>{item.href}</div>}
                      {item.image_url && <div style={{ marginTop: 4 }}><img src={item.image_url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #E5E7EB' }} /></div>}
                    </td>
                    <td style={styles.td}>
                      {item.is_active !== undefined && (
                        <span style={{ ...styles.statusBadge, background: item.is_active ? '#D1FAE5' : '#FEE2E2', color: item.is_active ? '#065F46' : '#991B1B' }}>
                          {item.is_active ? '✓ Active' : '✗ Inactive'}
                        </span>
                      )}
                      {item.sort_order !== undefined && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Order: {item.sort_order}</div>}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => handleEdit(item)} style={styles.editBtn}>✏️ Edit</button>
                        {canDelete && <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>🗑️</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', minHeight: '100vh', background: '#F3F4F6' },
  sidebar: { width: 260, background: '#111827', color: '#fff', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 },
  sidebarHeader: { padding: '24px 20px', borderBottom: '1px solid #374151' },
  sidebarTitle: { fontSize: 18, fontWeight: 800, marginBottom: 4 },
  sidebarSubtitle: { fontSize: 12, color: '#9CA3AF' },
  migrateBtn: { margin: '16px 20px', padding: '10px 16px', background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  nav: { flex: 1, padding: '8px 12px', overflowY: 'auto' },
  navItem: { display: 'block', width: '100%', padding: '10px 12px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginBottom: 2, transition: 'all 0.2s' },
  sidebarFooter: { padding: '16px 20px', borderTop: '1px solid #374151' },
  backLink: { color: '#9CA3AF', fontSize: 13, textDecoration: 'none' },
  main: { flex: 1, marginLeft: 260, padding: '24px 32px' },
  toast: { position: 'fixed', top: 20, right: 20, padding: '12px 20px', borderRadius: 8, border: '1px solid', fontSize: 14, fontWeight: 500, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, background: '#fff', padding: '20px 24px', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  headerTitle: { fontSize: 22, fontWeight: 800, color: '#111827' },
  headerSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  addBtn: { padding: '10px 20px', background: '#1B6EF3', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  loading: { textAlign: 'center', padding: 60, color: '#6B7280', fontSize: 16 },
  empty: { textAlign: 'center', padding: 80, background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  tableWrapper: { background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5E7EB', background: '#F9FAFB' },
  tr: { borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s' },
  td: { padding: '14px 16px', fontSize: 14, verticalAlign: 'top' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#F3F4F6', color: '#374151' },
  statusBadge: { display: 'inline-block', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600 },
  editBtn: { padding: '6px 12px', background: '#EEF2FF', color: '#4F46E5', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  deleteBtn: { padding: '6px 10px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 },
  modal: { background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E7EB' },
  modalTitle: { fontSize: 18, fontWeight: 700, color: '#111827' },
  closeBtn: { width: 32, height: 32, border: 'none', background: '#F3F4F6', borderRadius: 8, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalBody: { padding: '20px 24px', overflowY: 'auto', flex: 1 },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: '1px solid #E5E7EB' },
  cancelBtn: { padding: '10px 20px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' },
  saveBtn: { padding: '10px 20px', background: '#1B6EF3', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, marginTop: 14 },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
};