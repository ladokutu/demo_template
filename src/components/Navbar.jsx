'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/src/data';
import { t } from '@/src/styles/shared';

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
      borderBottom: scrolled ? `1px solid ${t.line}` : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: t.blue, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 16, fontFamily: 'Fraunces, serif' }}>iC</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: t.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>iCreativeLabs</div>
            <div style={{ fontSize: 9, color: t.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IT Consulting</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{ color: t.ink2, textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '8px 14px', borderRadius: 6 }} className="nav-link">
              {label}
            </a>
          ))}
          <a href="#kontak" className="btn-primary" style={{ marginLeft: 8, fontSize: 14, padding: '10px 22px' }}>
            Mulai Proyek
          </a>
        </div>

        {/* Burger */}
        <button
          style={{ display: 'none', background: 'none', border: `1.5px solid ${t.line}`, borderRadius: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.ink, fontSize: 18 }}
          className="nav-burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: '#fff', borderTop: `1px solid ${t.line}`, padding: '1rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{ color: t.ink2, textDecoration: 'none', fontSize: 16, padding: '12px 0', borderBottom: `1px solid ${t.line}` }} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#kontak" className="btn-primary" style={{ marginTop: 12, justifyContent: 'center' }} onClick={() => setOpen(false)}>
            Mulai Proyek
          </a>
        </div>
      )}
    </nav>
  );
}
