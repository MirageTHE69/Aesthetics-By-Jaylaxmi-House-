import React from 'react';

export default function CollectionsView({ onNavigate, onSelectCategory }) {
  const CATS = [
    'Curtains',
    'Upholstery Fabrics',
    'Wallpapers',
    'Blinds',
    'Wooden Flooring',
    'Home Linen',
    'Mattresses',
    'Rugs & Carpets'
  ];

  const IMGS = [
    'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80',
    'https://images.unsplash.com/photo-1544691560-fc2053d97726?w=1600&q=80',
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=1600&q=80',
    'https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=600&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80',
    'https://images.unsplash.com/photo-1619459075136-2b53c6153d4f?w=1600&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1600&q=80',
    'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1200&q=80'
  ];

  const handleSelect = (name) => {
    onSelectCategory(name);
    onNavigate('category');
  };

  return (
    <main style={{ padding: '74px 56px 110px' }} className="animate-fade">
      <div style={{
        fontSize: '11px',
        letterSpacing: '3.5px',
        color: 'var(--accent)',
        marginBottom: '18px',
        fontWeight: 500
      }}>THE COLLECTIONS</div>
      
      <h1 style={{
        fontFamily: 'var(--serif)',
        fontWeight: 500,
        fontSize: '76px',
        lineHeight: 0.98,
        letterSpacing: '-1px',
        marginBottom: '20px'
      }}>
        Curated by <em style={{ fontStyle: 'italic' }}>material.</em>
      </h1>
      
      <p style={{
        fontSize: '16px',
        lineHeight: 1.75,
        color: '#5C554A',
        maxWidth: '460px',
        marginBottom: '56px'
      }}>
        Every piece is made to order in our Vadodara workshop. Select a collection to begin — or design something entirely your own with our AI assistant.
      </p>

      {/* Grid of categories */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        {CATS.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => handleSelect(name)}
            style={{
              position: 'relative',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              aspectRatio: '1/1.22',
              background: '#BFB7AA',
              overflow: 'hidden',
              display: 'block',
              outline: 'none'
            }}
            className="category-card"
          >
            <span style={{
              position: 'absolute',
              inset: 0,
              display: 'block',
              backgroundImage: `url(${IMGS[i]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.45s ease'
            }} className="category-bg" />
            <span style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(20,16,12,0.6), transparent 55%)'
            }} />
            <span style={{
              position: 'absolute',
              left: '16px',
              bottom: '16px',
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              fontWeight: 500,
              color: '#FBF9F5'
            }}>{name}</span>
          </button>
        ))}
      </div>

      <style>{`
        .category-card:hover .category-bg {
          transform: scale(1.04);
        }
        .category-card:hover {
          filter: brightness(0.95);
        }
      `}</style>
    </main>
  );
}
