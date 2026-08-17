import React, { useState, useEffect } from 'react';
import aiShelves from '../assets/ai-shelves.jpg';
import aiChair from '../assets/ai-chair.jpg';
import aiBridge from '../assets/ai-bridge.jpg';
import aiKitchen from '../assets/ai-kitchen.jpg';
import { getStoredCategories, getStoredCategoryMeta, addBooking } from '../data/storage';

export default function CustomizeView({ onNavigate, category, onSelectCategory }) {
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState('form'); // form | loading | results
  const [categories, setCategories] = useState(getStoredCategories());
  const [categoryMeta, setCategoryMeta] = useState(getStoredCategoryMeta());

  // Customizer option states
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [customNote, setCustomNote] = useState('');

  // Booking Consultation Modal after results
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', email: '', city: 'Vadodara' });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getStoredCategories());
      setCategoryMeta(getStoredCategoryMeta());
    };
    window.addEventListener('aesthetics_data_updated', handleUpdate);
    return () => window.removeEventListener('aesthetics_data_updated', handleUpdate);
  }, []);

  const STYLES = ['Modern Minimal', 'Indian Contemporary', 'Mid-Century', 'Bohemian Luxe', 'Scandi Warm', 'Art Deco', 'Architectural Earth', 'Colonial Heritage'];
  const ROOMS = ['Living Room', 'Master Bedroom', 'Formal Dining', 'Study & Library', 'Foyer & Hallway', 'Balcony / Veranda'];
  const PALETTES = ['Terracotta & Ochre Earth', 'Indigo & Ink Navy', 'Warm Neutrals & Sand', 'Forest Moss & Sage', 'Mulberry Silk & Chalk', 'Charcoal Monochrome'];
  const MOODS = ['Calm & Serene', 'Bold & Dramatic', 'Warm & Grounded', 'Airy & Luminous', 'Opulent & Textural'];

  // Handle auto load of results phase simulation
  useEffect(() => {
    if (phase === 'loading') {
      const timer = setTimeout(() => {
        setPhase('results');
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const toggleStyle = (style) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(x => x !== style) : [...prev, style]
    );
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(prev => prev === room ? null : room);
  };

  const handleSelectPalette = (palette) => {
    setSelectedPalette(prev => prev === palette ? null : palette);
  };

  const handleSelectMood = (mood) => {
    setSelectedMood(prev => prev === mood ? null : mood);
  };

  const canContinue = () => {
    if (step === 1) return !!category;
    if (step === 2) return selectedStyles.length > 0;
    if (step === 3) return !!selectedPalette && !!selectedMood;
    return true;
  };

  const handleNext = () => {
    if (!canContinue()) return;
    if (step < 4) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setPhase('loading');
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
    }
  };

  const handleReset = () => {
    setStep(1);
    setPhase('form');
    onSelectCategory(null);
    setSelectedStyles([]);
    setSelectedRoom(null);
    setSelectedPalette(null);
    setSelectedMood(null);
    setCustomNote('');
  };

  const handleSubmitConsultation = (e) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) return;

    addBooking({
      name: consultForm.name,
      phone: consultForm.phone,
      email: consultForm.email,
      city: consultForm.city,
      serviceType: 'AI Custom Design Consultation',
      category: category || 'Custom Design',
      message: `AI Design Concept generated: Category: ${category} | Styles: ${selectedStyles.join(', ')} | Room: ${selectedRoom || 'Not specified'} | Palette: ${selectedPalette} | Mood: ${selectedMood} | Note: ${customNote || 'None'}`
    });

    setConsultSubmitted(true);
    setTimeout(() => {
      setShowConsultModal(false);
      setConsultSubmitted(false);
      setConsultForm({ name: '', phone: '', email: '', city: 'Vadodara' });
    }, 2500);
  };

  const getChipStyle = (selected) => ({
    border: selected ? '1px solid var(--accent)' : '1px solid #D8D1C4',
    background: selected ? 'var(--accent)' : 'transparent',
    color: selected ? '#ffffff' : '#3A342B',
    cursor: 'pointer',
    padding: '11px 20px',
    fontFamily: 'var(--sans)',
    fontSize: '13.5px',
    letterSpacing: '0.3px',
    fontWeight: selected ? 600 : 400,
    transition: 'all 0.15s ease'
  });

  return (
    <main className="sec-pad animate-fade" style={{ padding: '40px 56px 90px', minHeight: '70vh' }}>
      {/* 1. FORM PHASE */}
      {phase === 'form' && (
        <div>
          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '26px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#8B8272', fontWeight: 600 }}>
              STEP 0{step} / 04
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4].map(n => (
                <span
                  key={n}
                  style={{
                    width: n === step ? '26px' : '14px',
                    height: '2px',
                    background: n <= step ? 'var(--accent)' : '#D2CABC',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Form Content box */}
          <div className="wizard-box" style={{ background: '#FCFAF6', padding: '60px 64px', border: '1px solid rgba(33,28,22,0.06)' }}>

            {/* STEP 1: Category */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 46px)', lineHeight: 1.05, marginBottom: '8px' }}>
                  Choose a collection
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '38px' }}>
                  What are we designing for your space today?
                </p>
                <div className="wizard-cat-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px'
                }}>
                  {categories.map((name) => {
                    const isSelected = category === name;
                    const meta = categoryMeta[name] || {};
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => onSelectCategory(name)}
                        style={{
                          position: 'relative',
                          border: isSelected ? '2px solid var(--accent)' : '1px solid #D8D1C4',
                          padding: 0,
                          cursor: 'pointer',
                          aspectRatio: '1/0.8',
                          background: '#BFB7AA',
                          overflow: 'hidden',
                          display: 'block',
                          outline: 'none',
                          textAlign: 'left'
                        }}
                        className="cat-card"
                      >
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${meta.hero || 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=800&q=80'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.4s ease'
                        }} className="cat-card-bg" />
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(20,16,12,0.7), transparent 60%)'
                        }} />
                        <span style={{
                          position: 'absolute',
                          left: '16px',
                          bottom: '14px',
                          fontFamily: 'var(--serif)',
                          fontSize: '20px',
                          fontWeight: 500,
                          color: '#FBF9F5'
                        }}>{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Style Direction & Room */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 46px)', lineHeight: 1.05, marginBottom: '8px' }}>
                  Style direction
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '34px' }}>
                  Pick one or more aesthetics that resonate with your home.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
                  {STYLES.map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleStyle(style)}
                      style={getChipStyle(selectedStyles.includes(style))}
                    >
                      {style}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 600 }}>
                  ROOM (OPTIONAL)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {ROOMS.map(room => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => handleSelectRoom(room)}
                      style={getChipStyle(selectedRoom === room)}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Colour Palette & Mood */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 46px)', lineHeight: 1.05, marginBottom: '8px' }}>
                  Palette &amp; Atmosphere
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '34px' }}>
                  Select the colour family and light mood you want to evoke.
                </p>

                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 600 }}>
                  COLOUR PALETTE *
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
                  {PALETTES.map(palette => (
                    <button
                      key={palette}
                      type="button"
                      onClick={() => handleSelectPalette(palette)}
                      style={getChipStyle(selectedPalette === palette)}
                    >
                      {palette}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 600 }}>
                  DESIRED MOOD *
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {MOODS.map(mood => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => handleSelectMood(mood)}
                      style={getChipStyle(selectedMood === mood)}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Review & Generate */}
            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 46px)', lineHeight: 1.05, marginBottom: '8px' }}>
                  Ready to visualize
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '34px' }}>
                  Review your selections before we render your custom interior design concept.
                </p>

                <div className="wizard-summary-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  background: '#F5F1E8',
                  padding: '24px',
                  marginBottom: '32px'
                }}>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', color: '#8B8272', marginBottom: '6px', fontWeight: 600 }}>COLLECTION</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500 }}>{category}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', color: '#8B8272', marginBottom: '6px', fontWeight: 600 }}>STYLES</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500 }}>{selectedStyles.join(', ')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', color: '#8B8272', marginBottom: '6px', fontWeight: 600 }}>ROOM</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500 }}>{selectedRoom || 'Any'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', color: '#8B8272', marginBottom: '6px', fontWeight: 600 }}>PALETTE &amp; MOOD</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500 }}>{selectedPalette} · {selectedMood}</div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>
                    ADDITIONAL NOTES FOR OUR ATELIER (OPTIONAL)
                  </label>
                  <textarea
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g. Living room has east-facing morning light, interested in heavy linen bouclé…"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D8D1C4',
                      background: '#fff',
                      fontSize: '14px',
                      fontFamily: 'var(--sans)',
                      resize: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '44px',
              paddingTop: '24px',
              borderTop: '1px solid #ECE7DE'
            }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '2.5px',
                  color: '#6B6458',
                  fontWeight: 600
                }}
              >
                ← {step === 1 ? 'BACK HOME' : 'PREVIOUS STEP'}
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue()}
                style={{
                  border: 'none',
                  background: canContinue() ? 'var(--accent)' : '#C9C2B6',
                  color: '#fff',
                  cursor: canContinue() ? 'pointer' : 'not-allowed',
                  padding: '16px 36px',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  fontWeight: 600,
                  transition: 'background-color 0.2s ease'
                }}
                className="continue-btn"
              >
                {step === 4 ? '✦ GENERATE CONCEPTS' : 'CONTINUE →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. LOADING PHASE */}
      {phase === 'loading' && (
        <div className="wizard-loading-box" style={{
          background: '#FCFAF6',
          padding: '120px 40px',
          textAlign: 'center',
          border: '1px solid rgba(33,28,22,0.06)'
        }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: '44px',
            color: 'var(--accent)',
            animation: 'spin 3s linear infinite',
            display: 'inline-block',
            marginBottom: '20px'
          }}>✦</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, marginBottom: '12px' }}>
            Weaving your design concept…
          </h2>
          <p style={{ fontSize: '15px', color: '#6B6458' }}>
            Matching your mood and palette with our Vadodara loom archives.
          </p>
        </div>
      )}

      {/* 3. RESULTS PHASE */}
      {phase === 'results' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '10px', fontWeight: 600 }}>AI RENDERED CONCEPTS</div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 500, margin: 0 }}>
                Your {category} Vision
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowConsultModal(true)}
                style={{
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '14px 28px',
                  fontSize: '11px',
                  letterSpacing: '2.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                REQUEST CONSULTATION FOR THIS LOOK
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  border: '1px solid #3A342B',
                  background: 'none',
                  color: '#3A342B',
                  padding: '14px 20px',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                START OVER
              </button>
            </div>
          </div>

          <div className="wizard-results-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <div style={{
              aspectRatio: '1/0.75',
              backgroundImage: `url(${aiShelves})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              border: '1px solid rgba(33,28,22,0.1)'
            }}>
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: '#fff',
                background: 'rgba(0,0,0,0.65)',
                padding: '5px 10px',
                borderRadius: '2px'
              }}>Visual Concept 01 · {selectedPalette}</span>
            </div>

            <div style={{
              aspectRatio: '1/0.75',
              backgroundImage: `url(${aiChair})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              border: '1px solid rgba(33,28,22,0.1)'
            }}>
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: '#fff',
                background: 'rgba(0,0,0,0.65)',
                padding: '5px 10px',
                borderRadius: '2px'
              }}>Visual Concept 02 · {selectedMood}</span>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Booking Modal */}
      {showConsultModal && (
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
              onClick={() => setShowConsultModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#888' }}
            >
              ✕
            </button>

            {consultSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '42px', marginBottom: '14px' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', marginBottom: '10px' }}>Concept Saved &amp; Submitted</h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                  Thank you <strong>{consultForm.name}</strong>. Our design decorator will review your AI {category} moodboard and contact you at <strong>{consultForm.phone}</strong>.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 600 }}>
                  ATELIER CONSULTATION
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, margin: '0 0 18px' }}>
                  Bring this concept to life
                </h3>
                <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '0 0 24px', lineHeight: 1.6 }}>
                  Our team will match this digital concept with physical swatches from our Vadodara atelier and arrange a measurement consultation.
                </p>

                <form onSubmit={handleSubmitConsultation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                      placeholder="e.g. Sonal Desai"
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
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                        placeholder="+91 98..."
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>
                        CITY
                      </label>
                      <input
                        type="text"
                        value={consultForm.city}
                        onChange={(e) => setConsultForm({ ...consultForm, city: e.target.value })}
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
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
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
                    CONFIRM &amp; BOOK CONSULTATION
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cat-card:hover .cat-card-bg {
          transform: scale(1.06);
        }
        .continue-btn:hover:not(:disabled) {
          background-color: var(--accent-dark) !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 800px) {
          .wizard-box {
            padding: 36px 24px !important;
          }
          .wizard-cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .wizard-summary-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .wizard-results-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
