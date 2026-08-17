import React, { useState, useEffect } from 'react';
import { getStoredCategories, getStoredCategoryMeta, getStoredProducts } from '../data/storage';

export default function CollectionsView({ onNavigate, onSelectCategory }) {
  const [categories, setCategories] = useState(getStoredCategories());
  const [categoryMeta, setCategoryMeta] = useState(getStoredCategoryMeta());
  const [products, setProducts] = useState(getStoredProducts());

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getStoredCategories());
      setCategoryMeta(getStoredCategoryMeta());
      setProducts(getStoredProducts());
    };
    window.addEventListener('aesthetics_data_updated', handleUpdate);
    return () => window.removeEventListener('aesthetics_data_updated', handleUpdate);
  }, []);

  const handleSelect = (name) => {
    onSelectCategory(name);
    onNavigate('category');
  };

  return (
    <main className="sec-pad animate-fade" style={{ padding: '74px 56px 110px' }}>
      <div style={{
        fontSize: '11px',
        letterSpacing: '3.5px',
        color: 'var(--accent)',
        marginBottom: '18px',
        fontWeight: 600
      }}>THE 9 COLLECTIONS</div>

      <h1 style={{
        fontFamily: 'var(--serif)',
        fontWeight: 500,
        fontSize: 'clamp(38px, 8vw, 76px)',
        lineHeight: 1,
        letterSpacing: '-1px',
        marginBottom: '20px'
      }}>
        Curated by <em style={{ fontStyle: 'italic' }}>material.</em>
      </h1>

      <p style={{
        fontSize: '16.5px',
        lineHeight: 1.75,
        color: '#5C554A',
        maxWidth: '540px',
        marginBottom: '56px'
      }}>
        Every piece is made to order in our Vadodara workshop. Select a collection to explore custom drapery, upholstery weaves, wallpapers, bespoke furniture, and sleep systems.
      </p>

      {/* Grid of 9 categories */}
      <div className="collections-cat-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {categories.map((name, i) => {
          const meta = categoryMeta[name] || {};
          const count = (products[name] || []).length;

          return (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(name)}
              style={{
                position: 'relative',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                aspectRatio: '1/1.15',
                background: '#BFB7AA',
                overflow: 'hidden',
                display: 'block',
                outline: 'none',
                textAlign: 'left'
              }}
              className="category-card"
            >
              <span style={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                backgroundImage: `url(${meta.hero || 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1200&q=80'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease'
              }} className="category-bg" />
              <span style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20,16,12,0.8) 0%, rgba(20,16,12,0.2) 50%, transparent 100%)'
              }} />
              <div style={{
                position: 'absolute',
                left: '24px',
                bottom: '24px',
                right: '24px'
              }}>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  color: '#E8C9AF',
                  marginBottom: '4px',
                  fontWeight: 600
                }}>
                  COLLECTION 0{i + 1}
                </div>
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '26px',
                  fontWeight: 500,
                  color: '#FBF9F5',
                  marginBottom: '6px'
                }}>
                  {name}
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '1px',
                  color: '#D5CFC5'
                }}>
                  {count > 0 ? `${count} Featured Designs` : `${meta.studioCount || 25}+ Atelier Swatches`} &nbsp;→
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .category-card:hover .category-bg {
          transform: scale(1.06);
        }
        .category-card:hover {
          filter: brightness(0.96);
        }
        @media (max-width: 900px) {
          .collections-cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 520px) {
          .collections-cat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
