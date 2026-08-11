import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { findProduct, getProductsByCategory } from '../data/products';

export default function ProductDetailView({ productId, onNavigate, onSelectCategory, onSelectProduct }) {
  const product = findProduct(productId);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  useEffect(() => {
    setActiveImage(0);
    setActiveColor(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  if (!product) {
    return (
      <main style={{ padding: '110px 56px', textAlign: 'center' }} className="animate-fade">
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '40px', marginBottom: '20px' }}>Piece not found.</h1>
        <button
          type="button"
          onClick={() => onNavigate('collections')}
          style={{ border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', padding: '16px 32px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500 }}
        >
          ← BACK TO COLLECTIONS
        </button>
      </main>
    );
  }

  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 3);

  const handleSelectRelated = (id) => {
    onSelectProduct(id);
    onNavigate('product');
  };

  const handleDesignWithAI = () => {
    onSelectCategory(product.category);
    onNavigate('customize');
  };

  return (
    <main className="animate-fade">
      {/* Breadcrumb */}
      <div style={{ padding: '32px 56px 0', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => onNavigate('collections')} style={crumbStyle}>COLLECTIONS</button>
        <span style={{ color: '#C7BEB0', fontSize: '11px' }}>/</span>
        <button
          type="button"
          onClick={() => { onSelectCategory(product.category); onNavigate('category'); }}
          style={crumbStyle}
        >{product.category.toUpperCase()}</button>
        <span style={{ color: '#C7BEB0', fontSize: '11px' }}>/</span>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#3A342B', fontWeight: 500 }}>{product.name.toUpperCase()}</span>
      </div>

      {/* Main product section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '64px',
        padding: '36px 56px 90px',
        alignItems: 'start'
      }}>
        {/* Gallery */}
        <div key={productId} style={{ animation: 'aes-fade 0.4s ease both' }}>
          <div style={{ aspectRatio: '4/3.6', overflow: 'hidden', background: '#BFB7AA', marginBottom: '14px' }}>
            <img
              src={product.images[activeImage]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '84px',
                    height: '84px',
                    padding: 0,
                    border: activeImage === i ? '2px solid var(--accent)' : '2px solid transparent',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    opacity: activeImage === i ? 1 : 0.6,
                    transition: 'opacity 0.2s ease'
                  }}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '16px', fontWeight: 500 }}>
            {product.category.toUpperCase()}
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '48px', lineHeight: 1.02, marginBottom: '18px' }}>
            {product.name}
          </h1>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '17px', color: '#3A342B', marginBottom: '28px' }}>
            ₹{product.price.toLocaleString('en-IN')} <span style={{ color: '#8B8272', fontSize: '13px' }}>{product.unit}</span>
          </div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.85, color: '#5C554A', maxWidth: '460px', marginBottom: '34px' }}>
            {product.description}
          </p>

          {/* Colors */}
          <div style={{ marginBottom: '34px' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>
              COLOURWAY — {product.colors[activeColor].name.toUpperCase()}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActiveColor(i)}
                  title={c.name}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: activeColor === i ? '2px solid var(--text)' : '1px solid rgba(33,28,22,0.15)',
                    cursor: 'pointer',
                    transform: activeColor === i ? 'scale(1.12)' : 'none',
                    transition: 'transform 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '18px 24px',
            borderTop: '1px solid #E7E0D4',
            paddingTop: '26px',
            marginBottom: '36px'
          }}>
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#8B8272', marginBottom: '7px', fontWeight: 500 }}>{label.toUpperCase()}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#211C16', lineHeight: 1.3 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              style={{ border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', padding: '17px 32px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500, transition: 'background-color 0.2s ease' }}
              className="accent-btn"
            >
              REQUEST A SAMPLE
            </button>
            <button
              type="button"
              onClick={handleDesignWithAI}
              style={{ border: '1px solid #3A342B', background: 'none', color: '#3A342B', cursor: 'pointer', padding: '16px 32px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500, transition: 'all 0.2s ease' }}
              className="outline-btn"
            >
              ✦ CUSTOMIZE WITH AI
            </button>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: '0 56px 110px', borderTop: '1px solid rgba(33,28,22,0.08)' }}>
          <div style={{ padding: '64px 0 40px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '16px', fontWeight: 500 }}>MORE FROM {product.category.toUpperCase()}</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '38px', lineHeight: 1 }}>
              You may also <em style={{ fontStyle: 'italic' }}>like.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${related.length}, 1fr)`, gap: '32px 24px' }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} onSelect={handleSelectRelated} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .accent-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        .outline-btn:hover {
          background: #3A342B !important;
          color: #fff !important;
        }
      `}</style>
    </main>
  );
}

const crumbStyle = {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  fontFamily: 'var(--sans)',
  fontSize: '11px',
  letterSpacing: '2px',
  color: '#8B8272',
  fontWeight: 500
};
