import React from 'react';

export default function ProductCard({ product, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      style={{
        position: 'relative',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        background: 'none',
        display: 'block',
        textAlign: 'left',
        outline: 'none'
      }}
      className="product-card"
    >
      <div style={{
        aspectRatio: '1/1.12',
        overflow: 'hidden',
        background: '#BFB7AA',
        marginBottom: '18px'
      }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="product-card-img"
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        {product.colors.map(c => (
          <span
            key={c.name}
            title={c.name}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: c.hex,
              border: '1px solid rgba(33,28,22,0.15)'
            }}
          />
        ))}
      </div>
      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: '21px',
        fontWeight: 500,
        color: '#211C16',
        marginBottom: '6px',
        lineHeight: 1.2
      }}>{product.name}</h3>
      <div style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: '13px',
        color: '#6B6458'
      }}>
        ₹{product.price.toLocaleString('en-IN')} <span style={{ color: '#A79E90' }}>{product.unit}</span>
      </div>

      <style>{`
        .product-card:hover .product-card-img {
          transform: scale(1.045);
        }
      `}</style>
    </button>
  );
}
