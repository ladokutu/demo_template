'use client';
import { useState } from 'react';
import { useVisible } from '@/src/hooks/useVisible';
import { SERVICES } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

export default function Contact() {
  const [ref, visible] = useVisible();
  const [form, setForm] = useState({ nama: '', email: '', perusahaan: '', layanan: '', budget: '', pesan: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = () => { console.log(form); setSent(true); };

  const inputStyle = {
    width: '100%', background: '#fff', border: `1.5px solid ${t.line}`, color: t.ink,
    padding: '13px 16px', fontSize: 14, borderRadius: 8, boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section ref={ref} id="kontak" style={{ background: '#fff', padding: '100px 2rem', borderTop: `1px solid ${t.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, alignItems: 'start' }} className="two-col">

          {/* Left */}
          <div style={visible ? fadeUp : hidden}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Hubungi Kami
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
              Mari <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Berkolaborasi</em>
            </h2>
            <p style={{ fontSize: 16, color: t.ink3, lineHeight: 1.8, marginBottom: 36 }}>
              Ceritakan kebutuhan proyek Anda. Tim kami siap memberikan solusi dan estimasi biaya secara gratis dalam 1×24 jam.
            </p>

            {[
              { icon: '📧', label: 'Email', val: 'support@ladokutu.info' },
              { icon: '📞', label: 'Telepon / WhatsApp', val: '+6285156577357' },
              { icon: '📍', label: 'Kantor', val: 'Pondok Kelapa, Jakarta Timur, Indonesia' },
              { icon: '🕐', label: 'Jam Kerja', val: 'Senin–Jumat, 09.00–16.00 WIB' },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, background: t.blueLight, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.ink4, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 15, color: t.ink2, fontWeight: 500 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div style={{ ...(visible ? fadeUpD(0.15) : hidden) }}>
            {sent ? (
              <div style={{ background: t.blueLight, border: `1.5px solid rgba(27,110,243,0.2)`, borderRadius: 20, padding: '56px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: t.ink, marginBottom: 12 }}>Pesan Terkirim!</h3>
                <p style={{ fontSize: 15, color: t.ink3, lineHeight: 1.7 }}>Terima kasih telah menghubungi iCreativeLabs.<br />Tim kami akan merespons dalam 1×24 jam kerja.</p>
              </div>
            ) : (
              <div style={{ background: t.bg2, border: `1.5px solid ${t.line}`, borderRadius: 20, padding: '40px 36px', boxShadow: t.shadowMd }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: t.ink, marginBottom: 28, letterSpacing: '-0.02em' }}>Ceritakan Proyek Anda</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="contact-form-row">
                  {[
                    { name: 'nama',       placeholder: 'Nama Anda', type: 'text' },
                    { name: 'email',      placeholder: 'Email Anda', type: 'email' },
                  ].map((f) => (
                    <input key={f.name} name={f.name} type={f.type} value={form[f.name]}
                      onChange={onChange} placeholder={f.placeholder}
                      style={inputStyle} className="form-input" suppressHydrationWarning />
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <input name="perusahaan" value={form.perusahaan} onChange={onChange}
                    placeholder="Nama Perusahaan" style={inputStyle} className="form-input" suppressHydrationWarning />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="contact-form-row">
                  <select name="layanan" value={form.layanan} onChange={onChange}
                    style={{ ...inputStyle, color: form.layanan ? t.ink : t.ink4 }} className="form-input" suppressHydrationWarning>
                    <option value="">Jenis Layanan</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                  <select name="budget" value={form.budget} onChange={onChange}
                    style={{ ...inputStyle, color: form.budget ? t.ink : t.ink4 }} className="form-input" suppressHydrationWarning>
                    <option value="">Estimasi Budget</option>
                    {['< Rp 50 juta', 'Rp 50–150 juta', 'Rp 150–500 juta', '> Rp 500 juta'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <textarea name="pesan" value={form.pesan} onChange={onChange}
                    placeholder="Deskripsi singkat proyek Anda..."
                    style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }} className="form-input" suppressHydrationWarning />
                </div>

                <button onClick={onSubmit} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px 28px', fontSize: 15 }}>
                  Kirim Pesan → 
                </button>

                <p style={{ fontSize: 12, color: t.ink4, textAlign: 'center', marginTop: 14 }}>
                  🔒 Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
