import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getStoredCategories, getStoredCategoryMeta, getStoredProductsByCategory } from '../data/storage';
import { CATEGORY_TAXONOMY } from '../data/products';

export default function CategoryView({ category, onNavigate, onSelectCategory, onSelectProduct }) {
  const [categories, setCategories] = useState(getStoredCategories());
  const [categoryMeta, setCategoryMeta] = useState(getStoredCategoryMeta());
  const [activeSubtype, setActiveSubtype] = useState('All');
  const [activeFabric, setActiveFabric] = useState('All');

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getStoredCategories());
      setCategoryMeta(getStoredCategoryMeta());
    };
    window.addEventListener('aesthetics_data_updated', handleUpdate);
    return () => window.removeEventListener('aesthetics_data_updated', handleUpdate);
  }, []);

  const activeCategory = categories.includes(category) ? category : categories[0] || 'Curtains';
  const meta = categoryMeta[activeCategory] || {
    eyebrow: 'BESPOKE INTERIOR COLLECTION',
    heading: 'Crafted with intention.',
    description: 'Bespoke furnishings tailored in Vadodara.',
    hero: 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80',
    studioCount: 25
  };

  const allProducts = getStoredProductsByCategory(activeCategory);
  const taxonomy = CATEGORY_TAXONOMY[activeCategory] || { types: [], fabrics: [] };

  // Filter products by selected subtype and fabric type
  const filteredProducts = allProducts.filter(p => {
    const matchesSubtype = activeSubtype === 'All' || p.curtainType === activeSubtype || (p.specs && Object.values(p.specs).some(v => v.includes(activeSubtype)));
    const matchesFabric = activeFabric === 'All' || p.fabricType === activeFabric || (p.specs && p.specs.Fabric && p.specs.Fabric.includes(activeFabric)) || (p.specs && p.specs.Composition && p.specs.Composition.includes(activeFabric));
    return matchesSubtype && matchesFabric;
  });

  const handleSwitchCategory = (name) => {
    onSelectCategory(name);
    setActiveSubtype('All');
    setActiveFabric('All');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectProduct = (productId) => {
    onSelectProduct(productId);
    onNavigate('product');
  };

  const handleDesignWithAI = () => {
    onSelectCategory(activeCategory);
    onNavigate('customize');
  };

  return (
    <main className="animate-fade">
      {/* Breadcrumb */}
      <div className="sec-pad" style={{ padding: '32px 56px 0' }}>
        <button
          type="button"
          onClick={() => onNavigate('collections')}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#8B8272',
            fontWeight: 500
          }}
        >
          ← ALL 9 COLLECTIONS
        </button>
      </div>

      {/* Category tab switcher */}
      <div className="sec-pad cat-tabs" style={{
        padding: '22px 56px 0',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {categories.map(name => {
          const active = name === activeCategory;
          return (
            <button
              key={name}
              type="button"
              onClick={() => handleSwitchCategory(name)}
              style={{
                border: active ? '1px solid var(--accent)' : '1px solid #DAD3C7',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#fff' : '#3A342B',
                cursor: 'pointer',
                padding: '9px 16px',
                fontFamily: 'var(--sans)',
                fontSize: '11.5px',
                letterSpacing: '0.5px',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s ease'
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Hero / Intro */}
      <section className="sec-pad category-hero" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '64px',
        padding: '48px 56px 64px'
      }} key={activeCategory}>
        <div style={{ animation: 'aes-fade 0.5s ease both' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3.5px',
            color: 'var(--accent)',
            marginBottom: '18px',
            fontWeight: 600
          }}>{meta.eyebrow}</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 7vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            marginBottom: '18px'
          }}>{activeCategory}</h1>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#5C554A',
            maxWidth: '460px',
            marginBottom: '20px'
          }}>{meta.description}</p>
          <p style={{
            fontSize: '12.5px',
            letterSpacing: '0.5px',
            color: '#8B8272'
          }}>
            {allProducts.length} featured online designs · {meta.studioCount || 25}+ curated swatches in our Vadodara studio
          </p>
        </div>
        <div className="category-hero-img" style={{
          aspectRatio: '4/3.4',
          background: `#DED7CB url(${meta.hero}) center/cover no-repeat`,
          animation: 'aes-fade 0.6s ease 0.1s both',
          boxShadow: '0 16px 40px rgba(33,28,22,0.08)'
        }}></div>
      </section>

      {/* Subtype & Fabric Type Filter Pills */}
      {(taxonomy.types.length > 0 || taxonomy.fabrics.length > 0) && (
        <section className="sec-pad" style={{ padding: '0 56px 36px' }}>
          <div style={{
            background: '#FAF7F2',
            border: '1px solid #ECE7DE',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Types Row */}
            {taxonomy.types.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10.5px', letterSpacing: '2px', color: '#888', fontWeight: 600, minWidth: '80px' }}>
                  TYPE:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSubtype('All')}
                  style={{
                    border: 'none',
                    background: activeSubtype === 'All' ? '#211C16' : '#ECE7DE',
                    color: activeSubtype === 'All' ? '#fff' : '#453E33',
                    padding: '6px 14px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontWeight: activeSubtype === 'All' ? 600 : 400
                  }}
                >
                  All Types
                </button>
                {taxonomy.types.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveSubtype(t)}
                    style={{
                      border: 'none',
                      background: activeSubtype === t ? 'var(--accent)' : '#ECE7DE',
                      color: activeSubtype === t ? '#fff' : '#453E33',
                      padding: '6px 14px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      fontWeight: activeSubtype === t ? 600 : 400
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Fabrics Row */}
            {taxonomy.fabrics.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10.5px', letterSpacing: '2px', color: '#888', fontWeight: 600, minWidth: '80px' }}>
                  FABRIC:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveFabric('All')}
                  style={{
                    border: 'none',
                    background: activeFabric === 'All' ? '#211C16' : '#ECE7DE',
                    color: activeFabric === 'All' ? '#fff' : '#453E33',
                    padding: '6px 14px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontWeight: activeFabric === 'All' ? 600 : 400
                  }}
                >
                  All Materials
                </button>
                {taxonomy.fabrics.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFabric(f)}
                    style={{
                      border: 'none',
                      background: activeFabric === f ? 'var(--accent)' : '#ECE7DE',
                      color: activeFabric === f ? '#fff' : '#453E33',
                      padding: '6px 14px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      fontWeight: activeFabric === f ? 600 : 400
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product grid */}
      <section className="sec-pad" style={{ padding: '0 56px 90px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{
            background: '#FAF7F2',
            padding: '60px 24px',
            textAlign: 'center',
            border: '1px solid #ECE7DE'
          }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '8px' }}>
              No pieces match your selected filter.
            </h3>
            <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>
              We have extensive custom swatches and rolls in our Vadodara atelier.
            </p>
            <button
              type="button"
              onClick={() => { setActiveSubtype('All'); setActiveFabric('All'); }}
              style={{
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '11px',
                letterSpacing: '2px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="category-product-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px 24px'
          }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelect={handleSelectProduct} />
            ))}
          </div>
        )}
      </section>

      {/* AI CTA band */}
      <section className="sec-pad" style={{
        background: 'var(--deep)',
        color: '#EFEBE3',
        padding: '64px 56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        flexWrap: 'wrap',
        transition: 'background-color 0.5s ease'
      }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#C98A5E', marginBottom: '14px', fontWeight: 500 }}>NOT SURE WHICH TO PICK?</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(24px, 5vw, 34px)', lineHeight: 1.15, margin: 0 }}>
            See {activeCategory.toLowerCase()} <em style={{ fontStyle: 'italic' }}>in your own room.</em>
          </h2>
        </div>
        <button
          type="button"
          onClick={handleDesignWithAI}
          style={{
            border: 'none',
            background: 'var(--accent)',
            color: '#fff',
            cursor: 'pointer',
            padding: '17px 34px',
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '3px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transition: 'background-color 0.2s ease'
          }}
          className="accent-btn"
        >
          ✦ CUSTOMIZE WITH AI
        </button>
      </section>

      <style>{`
        .accent-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        @media (max-width: 800px) {
          .category-hero {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-top: 36px !important;
            padding-bottom: 48px !important;
          }
          .category-hero-img {
            aspect-ratio: 4/3 !important;
          }
          .category-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px 16px !important;
          }
          .cat-tabs button {
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
        }
        @media (max-width: 420px) {
          .category-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
