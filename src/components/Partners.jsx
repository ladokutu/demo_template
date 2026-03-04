import { PARTNERS } from '@/src/data';
import { t } from '@/src/styles/shared';

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS];
  return (
    <section style={{ background: '#fff', padding: '32px 0', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: t.ink4, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Teknologi & Partner Kami</p>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 48, width: 'max-content' }} className="marquee-track">
          {doubled.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', background: t.bg2, borderRadius: 8, border: `1px solid ${t.line}`, whiteSpace: 'nowrap', fontSize: 14, fontWeight: 600, color: t.ink3 }} className="partner-logo">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
