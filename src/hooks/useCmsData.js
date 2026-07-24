'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS, SERVICES, PROCESS_STEPS, PORTFOLIO_ITEMS, STATS, TESTIMONIALS, PARTNERS } from '@/src/data';

// Fallback data — always available instantly (no blank page)
const FALLBACK = {
  nav_links: NAV_LINKS,
  services: SERVICES,
  process_steps: PROCESS_STEPS,
  portfolio_items: PORTFOLIO_ITEMS,
  stats: STATS,
  testimonials: TESTIMONIALS,
  partners: PARTNERS,
};

export function useCmsData(section) {
  // Start with null so skeleton view is shown while fetching
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchData() {
      try {
        const res = await fetch(`/api/content/${section}`);
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json.success && json.data && json.data.length > 0) {
            const normalized = json.data.map((item) => normalizeItem(item, section));
            setData(normalized);
          } else {
            // Database kosong → gunakan fallback
            if (!cancelled) setData(FALLBACK[section] || []);
          }
        } else {
          // API error → gunakan fallback
          if (!cancelled) setData(FALLBACK[section] || []);
        }
      } catch {
        // DB not available → gunakan fallback
        if (!cancelled) setData(FALLBACK[section] || []);
      }
      if (!cancelled) setLoading(false);
    }

    fetchData();
    return () => { cancelled = true; };
  }, [section]);

  return { data, loading };
}

export function usePageSection(sectionKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch('/api/content/page_sections');
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json.success && json.data) {
            const found = json.data.find((s) => s.section_key === sectionKey);
            if (found) {
              setData(found);
            }
          }
        }
      } catch {
        // DB not available
      }
      if (!cancelled) setLoading(false);
    }

    fetchData();
    return () => { cancelled = true; };
  }, [sectionKey]);

  return { data, loading };
}

function normalizeItem(item, section) {
  const base = { ...item };

  switch (section) {
    case 'services':
      return {
        icon: base.icon,
        title: base.title,
        desc: base.description,
        features: Array.isArray(base.features) ? base.features : [],
        color: base.color,
      };
    case 'process_steps':
      return {
        num: base.step_num,
        title: base.title,
        desc: base.description,
      };
    case 'portfolio_items':
      return {
        title: base.title,
        client: base.client,
        tag: base.tag,
        desc: base.description,
        image_url: base.image_url || null,
        url_project: base.url_project || null,
      };
    case 'stats':
      return {
        num: base.number,
        label: base.label,
        icon: base.icon,
      };
    case 'testimonials':
      return {
        name: base.name,
        role: base.role,
        avatar: base.avatar,
        rating: base.rating,
        text: base.text,
      };
    case 'partners':
      return base.name;
    case 'nav_links':
      return { label: base.label, href: base.href };
    default:
      return base;
  }
}