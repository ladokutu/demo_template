'use client';
import { useEffect, useState } from 'react';
import { STATS } from '@/src/data';
import { t } from '@/src/styles/shared';

const TYPED_WORDS = ['Software', 'Web App', 'Mobile App', 'API System', 'Dashboard'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx((i) => (i + 1) % TYPED_WORDS.length); setFade(true); }, 300);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background: `linear-gradient(135deg, ${t.bg} 0%, ${t.blueLight} 100%)`, paddingTop: 70, overflow: 'hidden', position: 'relative' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: `radial-gradient(circle, rgba(27,110,243,0.08) 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 300, height: 300, background: `radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 2rem 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">

        {/* Left */}
        <div style={{ animation: 'fadeUp 0.6s ease forwards' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueMid, border: `1px solid rgba(27,110,243,0.2)`, borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: t.blue, marginBottom: 28, letterSpacing: '0.02em' }}>
            <span style={{ width: 6, height: 6, background: t.green, borderRadius: '50%', display: 'inline-block' }} />
            7+ Tahun Melayani Klien Indonesia
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: t.ink, marginBottom: 8 }}>
            Kami Bangun{' '}
            <span style={{ display: 'inline-block', color: t.blue, fontFamily: 'Fraunces, serif', fontStyle: 'italic', opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease', minWidth: 200 }}>
              {TYPED_WORDS[wordIdx]}
            </span>
          </h1>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: t.ink, marginBottom: 24 }}>
            Yang Bisnis Anda Butuhkan
          </h1>

          <p style={{ fontSize: 18, color: t.ink3, lineHeight: 1.7, maxWidth: 500, marginBottom: 36 }}>
            Ladokutu Informasi adalah mitra teknologi terpercaya Anda — dari custom software, web & mobile app, hingga konsultasi IT strategis untuk mendorong pertumbuhan bisnis.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }} className="hero-btns">
            <a href="#kontak" className="btn-primary">
              Konsultasi Gratis
              <span style={{ fontSize: 16 }}>→</span>
            </a>
            <a href="#portofolio" className="btn-secondary">
              Lihat Portofolio
            </a>
          </div>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }} className="hero-stats">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: t.blue, letterSpacing: '-0.03em' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: t.ink3, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual card stack */}
        <div style={{ position: 'relative', height: 480, animation: 'fadeIn 0.8s ease 0.3s both' }} className="hero-visual">
          {/* Main card */}
          <div style={{ position: 'absolute', top: 40, left: '5%', right: '5%', background: '#fff', borderRadius: 20, padding: '32px', boxShadow: t.shadowLg, border: `1px solid ${t.line}` }} className="float">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, background: t.blueLight, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🖥️</div>
              <div>
                <div style={{ fontWeight: 700, color: t.ink, fontSize: 15 }}>Custom Software Dev</div>
                <div style={{ fontSize: 12, color: t.ink3 }}>Project sedang berjalan</div>
              </div>
              <div style={{ marginLeft: 'auto', background: '#DCFCE7', color: '#16A34A', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100 }}>AKTIF</div>
            </div>
            <div style={{ height: 6, background: t.bg3, borderRadius: 100, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: '72%', background: `linear-gradient(90deg, ${t.blue}, #7C3AED)`, borderRadius: 100 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.ink3 }}>
              <span>Progress: 72%</span><span>Deadline: 14 hari</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {['React', 'Node.js', 'PostgreSQL', 'AWS'].map((tech) => (
                <span key={tech} style={{ background: t.blueLight, color: t.blue, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Floating badge 1 */}
          <div style={{ position: 'absolute', bottom: 80, left: -10, background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: t.shadowMd, border: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 10 }} className="float-delay">
            <div style={{ width: 36, height: 36, background: '#FEF3C7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⭐</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: t.ink }}>5.0 Rating</div>
              <div style={{ fontSize: 11, color: t.ink3 }}>200+ klien puas</div>
            </div>
          </div>

          {/* Floating badge 2 */}
          <div style={{ position: 'absolute', bottom: 60, right: -10, background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: t.shadowMd, border: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#DCFCE7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚀</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: t.ink }}>On-Time Delivery</div>
              <div style={{ fontSize: 11, color: t.ink3 }}>Garansi tepat waktu</div>
            </div>
          </div>

          {/* Decorative ring */}
          <div style={{ position: 'absolute', top: 10, right: 10, width: 80, height: 80, border: `2px dashed rgba(27,110,243,0.2)`, borderRadius: '50%' }} className="spin-slow" />
        </div>

      </div>

      {/* Wave separator */}
      <svg viewBox="0 0 1440 60" style={{ display: 'block', width: '100%', marginBottom: -2 }} preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fff" />
      </svg>
    </section>
  );
}
