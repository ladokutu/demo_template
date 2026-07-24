import { PARTNERS } from '@/src/data';
import { t } from '@/src/styles/shared';

export default function Partners({ items }) {
  const partnerList = items && items.length > 0 ? items : PARTNERS;
  const doubled = [...partnerList, ...partnerList];
  return (
    <section style={{ background: '#fff', padding: '32px 0', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: t.ink4, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Teknologi & Partner Kami</p>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', width: 'max-content' }} className="marquee-track">
          {doubled.map((partner, i) => {
            const p = typeof partner === 'string' ? { name: partner, logo_url: null } : partner;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', marginRight: 48, background: t.bg2, borderRadius: 8, border: `1px solid ${t.line}`, whiteSpace: 'nowrap', fontSize: 14, fontWeight: 600, color: t.ink3 }} className="partner-logo">
                {p.logo_url ? (
                  <img src={p.logo_url} alt={p.name} style={{ height: 24, maxWidth: 100, objectFit: 'contain' }} />
                ) : p.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
