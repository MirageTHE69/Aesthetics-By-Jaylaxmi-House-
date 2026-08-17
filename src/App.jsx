import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CollectionsView from './components/CollectionsView';
import CategoryView from './components/CategoryView';
import ProductDetailView from './components/ProductDetailView';
import CustomizeView from './components/CustomizeView';
import FabricView from './components/FabricView';
import AtelierView from './components/AtelierView';
import VisitView from './components/VisitView';
import AdminView from './components/AdminView';

const ACCENTS = {
  Terracotta: ['#B4592F', '#9E4A24'],
  Ochre: ['#B4832E', '#9A6D1F'],
  'Madder Rose': ['#A24A4C', '#883A3C'],
  Indigo: ['#41567F', '#33456A']
};

const DEEPS = {
  Forest: '#33443A',
  Charcoal: '#2B2A27',
  'Ink Navy': '#25303F',
  Aubergine: '#3A2E38'
};

const SERIFS = {
  Cormorant: "'Cormorant Garamond', serif",
  Playfair: "'Playfair Display', serif",
  'EB Garamond': "'EB Garamond', serif"
};

export default function App() {
  const [view, setView] = useState('home');
  const [category, setCategory] = useState(null);
  const [productId, setProductId] = useState(null);

  // Deep-linking from query parameters and hashes
  useEffect(() => {
    const handleUrlCheck = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const catParam = params.get('category');
      const productParam = params.get('product');
      const hash = window.location.hash;

      if (viewParam && ['home', 'collections', 'category', 'product', 'customize', 'fabric', 'atelier', 'visit', 'admin'].includes(viewParam)) {
        setView(viewParam);
      } else if (hash === '#admin') {
        setView('admin');
      }

      if (catParam) {
        setCategory(catParam);
      }
      if (productParam) {
        setProductId(productParam);
      }
    };

    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    window.addEventListener('hashchange', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, []);

  // Keyboard shortcut (Ctrl + Shift + A or Cmd + Shift + A) to toggle Admin Panel secretly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setView(prev => prev === 'admin' ? 'home' : 'admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live Theme Controls
  const [accent, setAccent] = useState('Terracotta');
  const [deepTone, setDeepTone] = useState('Forest');
  const [serif, setSerif] = useState('Cormorant');
  const [showThemePanel, setShowThemePanel] = useState(false);

  // Apply theme parameters to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const [accentColor, accentDarkColor] = ACCENTS[accent] || ACCENTS.Terracotta;
    const deepColor = DEEPS[deepTone] || DEEPS.Forest;
    const serifFont = SERIFS[serif] || SERIFS.Cormorant;

    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--accent-dark', accentDarkColor);
    root.style.setProperty('--deep', deepColor);
    root.style.setProperty('--serif', serifFont);
  }, [accent, deepTone, serif]);

  const handleNavigate = (targetView) => {
    setView(targetView);
    // Update URL parameter cleanly without full reload
    const url = new URL(window.location);
    if (targetView === 'home') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', targetView);
    }
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectCategory = (catName) => {
    setCategory(catName);
  };

  const handleSelectProduct = (id) => {
    setProductId(id);
  };

  // Dedicated full-screen Admin View
  if (view === 'admin') {
    return <AdminView onNavigate={handleNavigate} />;
  }

  return (
    <div style={{
      fontFamily: 'var(--sans)',
      color: 'var(--text)',
      background: 'var(--bg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Header currentView={view} onNavigate={handleNavigate} />
      
      <div style={{ flex: 1 }}>
        {view === 'home' && (
          <HomeView onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
        )}
        {view === 'collections' && (
          <CollectionsView onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
        )}
        {view === 'category' && (
          <CategoryView
            category={category}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {view === 'product' && (
          <ProductDetailView
            productId={productId}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {view === 'customize' && (
          <CustomizeView 
            onNavigate={handleNavigate} 
            category={category} 
            onSelectCategory={handleSelectCategory} 
          />
        )}
        {view === 'fabric' && (
          <FabricView onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
        )}
        {view === 'atelier' && <AtelierView />}
        {view === 'visit' && <VisitView />}
      </div>

      <Footer onNavigate={handleNavigate} />

      {/* Floating Theme Customizer */}
      <div className="theme-widget" style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        fontFamily: 'var(--sans)'
      }}>
        <button
          type="button"
          onClick={() => setShowThemePanel(prev => !prev)}
          style={{
            background: 'var(--text)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            fontSize: '18px',
            transition: 'transform 0.3s ease'
          }}
          className="theme-toggle-btn"
          title="Atelier Customizer"
        >
          🎨
        </button>

        {showThemePanel && (
          <div className="theme-panel" style={{
            position: 'absolute',
            bottom: '60px',
            right: 0,
            background: '#ffffff',
            border: '1px solid rgba(33,28,22,0.1)',
            borderRadius: '8px',
            padding: '24px',
            width: '280px',
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            animation: 'aes-fade 0.3s ease'
          }}>
            <h4 style={{
              fontFamily: 'var(--serif)',
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: '16px',
              borderBottom: '1px solid #ECE7DE',
              paddingBottom: '8px'
            }}>Atelier Customizer</h4>

            {/* Accent Selection */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>ACCENT COLOUR</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.keys(ACCENTS).map(name => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setAccent(name)}
                    style={{
                      border: accent === name ? '1px solid var(--text)' : '1px solid #ECE7DE',
                      background: ACCENTS[name][0],
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transform: accent === name ? 'scale(1.15)' : 'none',
                      transition: 'transform 0.2s ease',
                      position: 'relative'
                    }}
                    title={name}
                  >
                    {accent === name && (
                      <span style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '10px'
                      }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Deep Tone Selection */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>DEEP TONE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.keys(DEEPS).map(name => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setDeepTone(name)}
                    style={{
                      border: deepTone === name ? '1px solid var(--text)' : '1px solid #ECE7DE',
                      background: DEEPS[name],
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transform: deepTone === name ? 'scale(1.15)' : 'none',
                      transition: 'transform 0.2s ease',
                      position: 'relative'
                    }}
                    title={name}
                  >
                    {deepTone === name && (
                      <span style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '10px'
                      }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family Selection */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#8B8272', marginBottom: '8px', fontWeight: 500 }}>SERIF FONT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.keys(SERIFS).map(name => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSerif(name)}
                    style={{
                      border: '1px solid #ECE7DE',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      background: serif === name ? 'var(--accent)' : 'transparent',
                      color: serif === name ? '#fff' : 'var(--text)',
                      fontSize: '13px',
                      fontFamily: SERIFS[name],
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {name} Font
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .theme-toggle-btn:hover {
          transform: scale(1.1) rotate(15deg);
        }
        @media (max-width: 560px) {
          .theme-widget {
            bottom: 16px !important;
            right: 16px !important;
          }
          .theme-widget .theme-toggle-btn {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </div>
  );
}
