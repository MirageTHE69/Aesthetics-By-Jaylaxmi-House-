import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { findStoredProduct, getStoredProductsByCategory, addBooking } from '../data/storage';

export default function ProductDetailView({ productId, onNavigate, onSelectCategory, onSelectProduct }) {
  const [product, setProduct] = useState(findStoredProduct(productId));
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  // Booking / Sample Request Modal
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Vadodara',
    message: ''
  });

  useEffect(() => {
    const p = findStoredProduct(productId);
    setProduct(p);
    setActiveImage(0);
    setActiveColor(0);
    setBookingSuccess(false);
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

  const related = getStoredProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 3);

  const handleSelectRelated = (id) => {
    onSelectProduct(id);
    onNavigate('product');
  };

  const handleDesignWithAI = () => {
    onSelectCategory(product.category);
    onNavigate('customize');
  };

  const handleSubmitSampleBooking = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    addBooking({
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      serviceType: 'Product Sample / Consultation',
      category: product.category,
      productName: product.name,
      message: `Requested for ${product.name} (₹${product.price} ${product.unit}). Shade: ${product.colors && product.colors[activeColor] ? product.colors[activeColor].name : 'Default'}. Notes: ${form.message}`
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setShowSampleModal(false);
      setBookingSuccess(false);
      setForm({ name: '', phone: '', email: '', city: 'Vadodara', message: '' });
    }, 2500);
  };

  const whatsappMessage = encodeURIComponent(`Hello Aesthetics, I am interested in ${product.name} (${product.category}) priced at ₹${product.price} ${product.unit}. Can you please share more swatches and schedule a consultation?`);

  return (
    <main className="animate-fade">
      {/* Breadcrumb */}
      <div className="sec-pad" style={{ padding: '32px 56px 0', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => onNavigate('collections')} style={crumbStyle}>COLLECTIONS</button>
        <span style={{ color: '#C7BEB0', fontSize: '11px' }}>/</span>
        <button
          type="button"
          onClick={() => { onSelectCategory(product.category); onNavigate('category'); }}
          style={crumbStyle}
        >{product.category.toUpperCase()}</button>
        <span style={{ color: '#C7BEB0', fontSize: '11px' }}>/</span>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#3A342B', fontWeight: 600 }}>{product.name.toUpperCase()}</span>
      </div>

      {/* Main product section */}
      <section className="sec-pad product-main" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '64px',
        padding: '36px 56px 90px',
        alignItems: 'start'
      }}>
        {/* Gallery */}
        <div key={productId} style={{ animation: 'aes-fade 0.4s ease both' }}>
          <div className="product-main-img" style={{ aspectRatio: '4/3.6', overflow: 'hidden', background: '#BFB7AA', marginBottom: '14px', position: 'relative' }}>
            <img
              src={product.images && product.images[activeImage] ? product.images[activeImage] : 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(33,28,22,0.85)',
                color: '#fff',
                fontSize: '10px',
                letterSpacing: '2px',
                padding: '5px 12px',
                fontWeight: 600
              }}>
                {product.badge.toUpperCase()}
              </span>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className="product-thumb"
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

        {/* Info Column */}
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '14px', fontWeight: 600 }}>
            {product.category.toUpperCase()} {product.curtainType ? `· ${product.curtainType.toUpperCase()}` : ''}
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 48px)', lineHeight: 1.05, marginBottom: '18px' }}>
            {product.name}
          </h1>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '20px', color: '#211C16', marginBottom: '24px', fontWeight: 600 }}>
            ₹{Number(product.price).toLocaleString('en-IN')} <span style={{ color: '#8B8272', fontSize: '13px', fontWeight: 400 }}>{product.unit}</span>
          </div>
          <p style={{ fontSize: '15.5px', lineHeight: 1.85, color: '#5C554A', maxWidth: '480px', marginBottom: '34px' }}>
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '34px' }}>
              <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 600 }}>
                COLOURWAY — {(product.colors[activeColor] || product.colors[0]).name.toUpperCase()}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveColor(i)}
                    title={c.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: activeColor === i ? '2px solid var(--text)' : '1px solid rgba(33,28,22,0.15)',
                      cursor: 'pointer',
                      transform: activeColor === i ? 'scale(1.15)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="product-specs" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px 24px',
              borderTop: '1px solid #E7E0D4',
              paddingTop: '26px',
              marginBottom: '36px'
            }}>
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#8B8272', marginBottom: '6px', fontWeight: 600 }}>{label.toUpperCase()}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#211C16', lineHeight: 1.3 }}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowSampleModal(true)}
              style={{ border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', padding: '17px 32px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 600, transition: 'background-color 0.2s ease' }}
              className="accent-btn"
            >
              REQUEST SAMPLE / VISIT
            </button>
            <a
              href={`https://wa.me/919913132736?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              style={{
                border: '1px solid #25D366',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                padding: '16px 24px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '2px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              💬 WHATSAPP SALES
            </a>
            <button
              type="button"
              onClick={handleDesignWithAI}
              style={{ border: '1px solid #3A342B', background: 'none', color: '#3A342B', cursor: 'pointer', padding: '16px 28px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '2.5px', fontWeight: 500 }}
              className="outline-btn"
            >
              ✦ DESIGN WITH AI
            </button>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="sec-pad" style={{ padding: '0 56px 110px', borderTop: '1px solid rgba(33,28,22,0.08)' }}>
          <div style={{ padding: '64px 0 40px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '16px', fontWeight: 600 }}>MORE FROM {product.category.toUpperCase()}</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(26px, 5vw, 38px)', lineHeight: 1.05 }}>
              You may also <em style={{ fontStyle: 'italic' }}>like.</em>
            </h2>
          </div>
          <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${related.length}, 1fr)`, gap: '32px 24px' }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} onSelect={handleSelectRelated} />
            ))}
          </div>
        </section>
      )}

      {/* Sample / Consultation Booking Modal */}
      {showSampleModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '540px',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setShowSampleModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#888' }}
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', marginBottom: '10px' }}>Inquiry Received</h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                  Thank you, <strong>{form.name}</strong>. Our Vadodara design consultant will call you at <strong>{form.phone}</strong> regarding <em>{product.name}</em> swatches and measurements.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 600 }}>
                  STUDIO CONSULTATION &amp; SWATCHES
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, margin: '0 0 18px' }}>
                  Request Sample for {product.name}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '0 0 24px', lineHeight: 1.6 }}>
                  Leave your details and our senior decorator will contact you with free fabric swatches or arrange a site measurement visit.
                </p>

                <form onSubmit={handleSubmitSampleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Anand Patel"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98..."
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                        CITY / LOCALITY
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Vadodara, Alkapuri..."
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                      EMAIL (OPTIONAL)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@domain.com"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                      SPECIAL REQUIREMENTS / WINDOW DIMENSIONS
                    </label>
                    <textarea
                      rows="3"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Room type, drop length, preferred visit time..."
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      padding: '14px',
                      fontSize: '11px',
                      letterSpacing: '2.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: '8px'
                    }}
                  >
                    SUBMIT INQUIRY
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .accent-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        .outline-btn:hover {
          background: #3A342B !important;
          color: #fff !important;
        }
        @media (max-width: 800px) {
          .product-main {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-top: 24px !important;
          }
          .product-main-img {
            aspect-ratio: 4/3.4 !important;
          }
          .product-thumb {
            width: 68px !important;
            height: 68px !important;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px 16px !important;
          }
        }
        @media (max-width: 460px) {
          .product-specs {
            grid-template-columns: 1fr !important;
          }
          .related-grid {
            grid-template-columns: 1fr !important;
          }
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
