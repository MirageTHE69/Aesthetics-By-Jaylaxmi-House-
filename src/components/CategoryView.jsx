import React from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES, CATEGORY_META, getProductsByCategory } from '../data/products';

export default function CategoryView({ category, onNavigate, onSelectCategory, onSelectProduct }) {
  const activeCategory = CATEGORIES.includes(category) ? category : CATEGORIES[0];
  const meta = CATEGORY_META[activeCategory];
  const products = getProductsByCategory(activeCategory);

  const handleSwitchCategory = (name) => {
    onSelectCategory(name);
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
          ← ALL COLLECTIONS
        </button>
      </div>

      {/* Category tab switcher */}
      <div className="sec-pad cat-tabs" style={{
        padding: '22px 56px 0',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {CATEGORIES.map(name => {
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
                transition: 'all 0.15s ease'
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Hero / intro */}
      <section className="sec-pad category-hero" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '64px',
        padding: '54px 56px 80px'
      }} key={activeCategory}>
        <div style={{ animation: 'aes-fade 0.5s ease both' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3.5px',
            color: 'var(--accent)',
            marginBottom: '20px',
            fontWeight: 500
          }}>{meta.eyebrow}</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 7vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            marginBottom: '22px'
          }}>{activeCategory}</h1>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#5C554A',
            maxWidth: '440px',
            marginBottom: '20px'
          }}>{meta.description}</p>
          <p style={{
            fontSize: '12.5px',
            letterSpacing: '0.5px',
            color: '#8B8272'
          }}>{products.length} featured pieces online · {meta.studioCount}+ additional swatches in our Vadodara atelier</p>
        </div>
        <div className="category-hero-img" style={{
          aspectRatio: '4/3.4',
          background: `#DED7CB url(${meta.hero}) center/cover no-repeat`,
          animation: 'aes-fade 0.6s ease 0.1s both'
        }}></div>
      </section>

      {/* Product grid */}
      <section className="sec-pad" style={{ padding: '0 56px 90px' }}>
        <div className="category-product-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px 24px'
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onSelect={handleSelectProduct} />
          ))}
        </div>
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
            padding-top: 40px !important;
            padding-bottom: 56px !important;
          }
          .category-hero-img {
            aspect-ratio: 4/3 !important;
          }
          .category-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px 16px !important;
          }
          .cat-tabs button {
            padding: 8px 13px !important;
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
