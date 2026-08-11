import React, { useState, useEffect } from 'react';
import aiShelves from '../assets/ai-shelves.jpg';
import aiChair from '../assets/ai-chair.jpg';
import aiBridge from '../assets/ai-bridge.jpg';
import aiKitchen from '../assets/ai-kitchen.jpg';

export default function CustomizeView({ onNavigate, category, onSelectCategory }) {
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState('form'); // form | loading | results
  
  // Customizer option states
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [customNote, setCustomNote] = useState('');

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

  const STYLES = ['Modern Minimal', 'Indian Contemporary', 'Mid-Century', 'Bohemian', 'Scandi', 'Art Deco', 'Industrial', 'Coastal'];
  const ROOMS = ['Living Room', 'Bedroom', 'Dining Room', 'Study', 'Hallway', 'Kids Room'];
  const PALETTES = ['Warm Neutrals', 'Terracotta & Earth', 'Deep Emerald', 'Indigo & Navy', 'Soft Pastels', 'Monochrome', 'Jewel Tones'];
  const MOODS = ['Calm & Serene', 'Bold & Dramatic', 'Cosy & Warm', 'Bright & Airy', 'Romantic'];

  // Handle auto load of results phase simulation
  useEffect(() => {
    if (phase === 'loading') {
      const timer = setTimeout(() => {
        setPhase('results');
      }, 2800);
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

  const getChipStyle = (selected) => ({
    border: selected ? '1px solid var(--accent)' : '1px solid #D8D1C4',
    background: selected ? 'var(--accent)' : 'transparent',
    color: selected ? '#ffffff' : '#3A342B',
    cursor: 'pointer',
    padding: '11px 20px',
    fontFamily: 'var(--sans)',
    fontSize: '13.5px',
    letterSpacing: '0.3px',
    transition: 'all 0.15s ease'
  });

  return (
    <main style={{ padding: '40px 56px 90px', minHeight: '70vh' }} className="animate-fade">
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
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#8B8272', fontWeight: 500 }}>
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
          <div style={{ background: '#FCFAF6', padding: '60px 64px', border: '1px solid rgba(33,28,22,0.05)' }}>
            
            {/* STEP 1: Category */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '46px', lineHeight: 1, marginBottom: '8px' }}>
                  Choose a collection
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '38px' }}>
                  What are we designing today?
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '14px'
                }}>
                  {CATS.map((name, i) => {
                    const isSelected = category === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => onSelectCategory(name)}
                        style={{
                          position: 'relative',
                          border: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                          padding: 0,
                          cursor: 'pointer',
                          aspectRatio: '1/1.05',
                          background: '#BFB7AA',
                          backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 16px)',
                          overflow: 'hidden',
                          display: 'block',
                          outline: 'none'
                        }}
                        className="cat-card"
                      >
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${IMGS[i]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.4s ease'
                        }} className="cat-card-bg" />
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(20,16,12,0.6), transparent 55%)'
                        }} />
                        <span style={{
                          position: 'absolute',
                          left: '14px',
                          bottom: '12px',
                          fontFamily: 'var(--serif)',
                          fontSize: '18px',
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
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '46px', lineHeight: 1, marginBottom: '8px' }}>
                  Style direction
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '34px' }}>
                  Pick one or more aesthetics that resonate.
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

                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 500 }}>
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

            {/* STEP 3: Palette & Mood */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '46px', lineHeight: 1, marginBottom: '8px' }}>
                  Palette &amp; mood
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '34px' }}>
                  Set the emotional tone of the space.
                </p>
                
                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 500 }}>
                  COLOUR PALETTE *
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
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

                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '16px', fontWeight: 500 }}>
                  MOOD *
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

            {/* STEP 4: Personal Note & Summary */}
            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '46px', lineHeight: 1, marginBottom: '8px' }}>
                  Add a personal note
                </h2>
                <p style={{ fontSize: '14.5px', color: '#6B6458', marginBottom: '30px' }}>
                  Any references, materials or constraints to share?
                </p>
                
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Tell us your dream style — colours, textures, a room you love…"
                  style={{
                    width: '100%',
                    height: '150px',
                    resize: 'none',
                    border: '1px solid #DAD3C7',
                    background: '#ffffff',
                    padding: '20px',
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    color: '#211C16',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                  }}
                />

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '30px',
                  borderTop: '1px solid #E7E0D4',
                  paddingTop: '26px'
                }}>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>CATEGORY</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '20px' }}>{category || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>COLOURS</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '20px' }}>{selectedPalette || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>MOOD</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '20px' }}>{selectedMood || '—'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px'
          }}>
            <button 
              type="button" 
              onClick={handleBack}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#8B8272',
                fontWeight: 500
              }}
            >
              ←&nbsp; BACK
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              disabled={!canContinue()}
              style={{
                border: 'none',
                cursor: canContinue() ? 'pointer' : 'not-allowed',
                background: canContinue() ? 'var(--accent)' : '#D8D1C4',
                color: canContinue() ? '#ffffff' : '#A79E90',
                padding: '16px 34px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                fontWeight: 500,
                transition: 'background 0.15s ease'
              }}
              className="continue-btn"
            >
              {step === 4 ? 'GENERATE' : 'CONTINUE'} &nbsp;→
            </button>
          </div>
        </div>
      )}

      {/* 2. LOADING PHASE */}
      {phase === 'loading' && (
        <div style={{
          background: '#FCFAF6',
          padding: '130px 40px',
          textAlign: 'center',
          border: '1px solid rgba(33,28,22,0.05)'
        }}>
          <div className="animate-spin-slow" style={{
            width: '44px',
            height: '44px',
            border: '2px solid #E3DCD0',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            margin: '0 auto 30px'
          }} />
          <div style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: '30px',
            color: '#4A4339',
            marginBottom: '14px'
          }}>Crafting your vision…</div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#9B9284', fontWeight: 500 }}>
            THIS CAN TAKE UP TO 60 SECONDS.
          </div>
        </div>
      )}

      {/* 3. RESULTS PHASE */}
      {phase === 'results' && (
        <div style={{ background: '#FCFAF6', padding: '60px 64px', border: '1px solid rgba(33,28,22,0.05)' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '14px', fontWeight: 500 }}>
            CONCEPTS READY
          </div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '46px', lineHeight: 1, marginBottom: '36px' }}>
            Your concepts for <em style={{ fontStyle: 'italic' }}>{category}.</em>
          </h2>

          {/* AI generated concepts display */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              aspectRatio: '1/0.72',
              backgroundImage: `url(${aiShelves})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px',
              border: '1px solid rgba(33,28,22,0.1)'
            }}>
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                color: '#fff',
                background: 'rgba(0,0,0,0.5)',
                padding: '4px 8px',
                borderRadius: '2px'
              }}>AI concept 01</span>
            </div>
            <div style={{
              aspectRatio: '1/0.72',
              backgroundImage: `url(${aiChair})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px',
              border: '1px solid rgba(33,28,22,0.1)'
            }}>
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                color: '#fff',
                background: 'rgba(0,0,0,0.5)',
                padding: '4px 8px',
                borderRadius: '2px'
              }}>AI concept 02</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={() => onNavigate('visit')} 
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
                transition: 'background-color 0.2s ease'
              }}
              className="accent-btn"
            >
              REQUEST CONSULTATION
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#6B6458',
                fontWeight: 500
              }}
            >
              START OVER
            </button>
          </div>
        </div>
      )}

      <style>{`
        .cat-card:hover .cat-card-bg {
          transform: scale(1.04);
        }
        .continue-btn:hover:not(:disabled) {
          background-color: var(--accent-dark) !important;
        }
        .accent-btn:hover {
          background-color: var(--accent-dark) !important;
        }
      `}</style>
    </main>
  );
}
