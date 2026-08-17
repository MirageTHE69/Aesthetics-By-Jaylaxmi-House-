import React, { useState, useEffect } from 'react';
import {
  getStoredCategories,
  getStoredCategoryMeta,
  getStoredProducts,
  saveProduct,
  deleteProduct,
  saveCategory,
  deleteCategory,
  getStoredBookings,
  addBooking,
  updateBookingStatus,
  deleteBooking,
  getStoredBrands,
  getStoredClients,
  getStoredContact,
  exportFullDataJSON,
  importFullDataJSON,
  resetToFactoryDefaults
} from '../data/storage';
import { CATEGORY_TAXONOMY } from '../data/products';

export default function AdminView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('bookings'); // bookings | products | categories | brands | settings
  const [categories, setCategories] = useState([]);
  const [categoryMeta, setCategoryMeta] = useState({});
  const [products, setProducts] = useState({});
  const [bookings, setBookings] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clients, setClients] = useState([]);
  const [contact, setContact] = useState({});

  // Filters & Search
  const [bookingFilter, setBookingFilter] = useState('All');
  const [bookingSearch, setBookingSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [editingProduct, setEditingProduct] = useState(null); // null | product object
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // null | category name
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states for product
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    category: 'Curtains',
    curtainType: '',
    fabricType: '',
    price: 3500,
    unit: 'per metre',
    badge: '',
    description: '',
    images: [''],
    colors: [{ name: '', hex: '#B4592F' }],
    specs: {}
  });

  // Form states for category
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    eyebrow: '',
    heading: '',
    description: '',
    hero: '',
    studioCount: 25,
    subtypes: ''
  });

  // Form state for manual booking
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Vadodara',
    serviceType: 'Consultation & Site Visit',
    category: 'Curtains',
    productName: '',
    message: ''
  });

  const refreshData = () => {
    setCategories(getStoredCategories());
    setCategoryMeta(getStoredCategoryMeta());
    setProducts(getStoredProducts());
    setBookings(getStoredBookings());
    setBrands(getStoredBrands());
    setClients(getStoredClients());
    setContact(getStoredContact());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('aesthetics_data_updated', handleUpdate);
    return () => window.removeEventListener('aesthetics_data_updated', handleUpdate);
  }, []);

  const flashMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // ----------------- PRODUCT HANDLERS -----------------

  const handleOpenAddProduct = () => {
    const defaultCat = categories[0] || 'Curtains';
    setIsNewProduct(true);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: '',
      category: defaultCat,
      curtainType: '',
      fabricType: '',
      price: 3500,
      unit: 'per metre',
      badge: 'New Addition',
      description: '',
      images: ['https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80'],
      colors: [{ name: 'Warm Terracotta', hex: '#B4592F' }, { name: 'Chalk White', hex: '#EFE9DD' }],
      specs: { Composition: '100% Slub Cotton', Care: 'Dry clean only' }
    });
    setEditingProduct({});
  };

  const handleOpenEditProduct = (prod, cat) => {
    setIsNewProduct(false);
    setProductForm({
      ...prod,
      category: cat,
      images: prod.images && prod.images.length ? [...prod.images] : [''],
      colors: prod.colors && prod.colors.length ? [...prod.colors] : [{ name: '', hex: '#B4592F' }],
      specs: { ...prod.specs }
    });
    setEditingProduct(prod);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category) return;

    // Clean up empty images/colors
    const cleanedImages = productForm.images.filter(img => img && img.trim());
    const cleanedColors = productForm.colors.filter(c => c.name && c.name.trim());

    const payload = {
      ...productForm,
      price: Number(productForm.price) || 0,
      images: cleanedImages.length ? cleanedImages : ['https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80'],
      colors: cleanedColors.length ? cleanedColors : [{ name: 'Default', hex: '#B4592F' }]
    };

    saveProduct(productForm.category, payload);
    setEditingProduct(null);
    flashMessage(`Product "${payload.name}" saved successfully.`);
    refreshData();
  };

  const handleDeleteProduct = (prodId, prodName) => {
    if (window.confirm(`Are you sure you want to delete "${prodName}"?`)) {
      deleteProduct(prodId);
      flashMessage(`Product "${prodName}" deleted.`);
      refreshData();
    }
  };

  // ----------------- CATEGORY HANDLERS -----------------

  const handleOpenAddCategory = () => {
    setIsNewCategory(true);
    setCategoryForm({
      name: '',
      eyebrow: 'BESPOKE INTERIOR COLLECTION',
      heading: 'Crafted with intention.',
      description: 'Exclusive furnishings engineered to order in our Vadodara studio.',
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      studioCount: 30,
      subtypes: 'Type A, Type B, Type C'
    });
    setEditingCategory('new');
  };

  const handleOpenEditCategory = (catName) => {
    const meta = categoryMeta[catName] || {};
    setIsNewCategory(false);
    setCategoryForm({
      name: catName,
      eyebrow: meta.eyebrow || '',
      heading: meta.heading || '',
      description: meta.description || '',
      hero: meta.hero || '',
      studioCount: meta.studioCount || 25,
      subtypes: (meta.subtypes || []).join(', ')
    });
    setEditingCategory(catName);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    const subArr = categoryForm.subtypes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    saveCategory(categoryForm.name, {
      eyebrow: categoryForm.eyebrow,
      heading: categoryForm.heading,
      description: categoryForm.description,
      hero: categoryForm.hero || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      studioCount: Number(categoryForm.studioCount) || 20,
      subtypes: subArr
    });

    setEditingCategory(null);
    flashMessage(`Category "${categoryForm.name}" updated successfully.`);
    refreshData();
  };

  const handleDeleteCategory = (catName) => {
    if (window.confirm(`Are you sure you want to delete the "${catName}" category and all its products?`)) {
      deleteCategory(catName);
      flashMessage(`Category "${catName}" deleted.`);
      refreshData();
    }
  };

  // ----------------- BOOKING HANDLERS -----------------

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    refreshData();
  };

  const handleDeleteBookingItem = (id) => {
    if (window.confirm('Delete this booking inquiry record?')) {
      deleteBooking(id);
      flashMessage('Booking record deleted.');
      refreshData();
    }
  };

  const handleSaveManualBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) return;
    addBooking(bookingForm);
    setShowNewBookingModal(false);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      city: 'Vadodara',
      serviceType: 'Consultation & Site Visit',
      category: 'Curtains',
      productName: '',
      message: ''
    });
    flashMessage('Booking created successfully.');
    refreshData();
  };

  const exportBookingsCSV = () => {
    const rows = [
      ['ID', 'Date', 'Customer Name', 'Phone', 'Email', 'City', 'Service Type', 'Category', 'Product', 'Message', 'Status']
    ];
    bookings.forEach(b => {
      rows.push([
        b.id,
        new Date(b.createdAt).toLocaleDateString('en-IN'),
        `"${b.name || ''}"`,
        `"${b.phone || ''}"`,
        `"${b.email || ''}"`,
        `"${b.city || ''}"`,
        `"${b.serviceType || ''}"`,
        `"${b.category || ''}"`,
        `"${b.productName || ''}"`,
        `"${(b.message || '').replace(/"/g, '""')}"`,
        b.status || 'Pending'
      ]);
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aesthetics_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------- BACKUP / RESTORE HANDLERS -----------------

  const handleExportJSON = () => {
    const json = exportFullDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aesthetics_Catalog_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importFullDataJSON(event.target.result);
      if (res.success) {
        flashMessage('Catalog data successfully imported!');
        refreshData();
      } else {
        alert('Failed to import JSON: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('WARNING: This will reset all products, categories, and settings back to factory initial data. Proceed?')) {
      resetToFactoryDefaults();
      flashMessage('Reset to factory defaults complete.');
      refreshData();
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === 'All' || b.status === bookingFilter;
    const query = bookingSearch.toLowerCase();
    const matchesSearch = !query ||
      (b.name && b.name.toLowerCase().includes(query)) ||
      (b.phone && b.phone.toLowerCase().includes(query)) ||
      (b.email && b.email.toLowerCase().includes(query)) ||
      (b.category && b.category.toLowerCase().includes(query)) ||
      (b.productName && b.productName.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  // Flattened & Filtered Products
  let allProductList = [];
  Object.keys(products).forEach(cat => {
    (products[cat] || []).forEach(p => {
      allProductList.push({ ...p, category: cat });
    });
  });

  const filteredProducts = allProductList.filter(p => {
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const query = productSearch.toLowerCase();
    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      (p.badge && p.badge.toLowerCase().includes(query)) ||
      (p.curtainType && p.curtainType.toLowerCase().includes(query)) ||
      (p.fabricType && p.fabricType.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  // Dynamic Subtypes for product modal based on category
  const availableTaxonomy = CATEGORY_TAXONOMY[productForm.category] || { types: [], fabrics: [] };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F5F0',
      color: '#211C16',
      fontFamily: 'var(--sans)',
      paddingBottom: '80px'
    }}>
      {/* Top Admin Navigation Header */}
      <header style={{
        background: '#1F1B16',
        color: '#F5F1E8',
        padding: '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', letterSpacing: '0.5px' }}>
              Aesthetics <span style={{ fontSize: '14px', color: '#C98A5E', fontFamily: 'var(--sans)', letterSpacing: '2px', fontWeight: 500 }}>ADMIN PORTAL</span>
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#9E978C' }}>BY JAYLAXMI HOUSE · VADODARA</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            style={{
              background: 'transparent',
              border: '1px solid #756D60',
              color: '#F5F1E8',
              padding: '8px 18px',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
          >
            ← BACK TO WEBSITE
          </button>
        </div>
      </header>

      {/* Status notification banner */}
      {statusMessage && (
        <div style={{
          background: '#2B4A34',
          color: '#E8F5E9',
          padding: '12px 40px',
          fontSize: '13px',
          letterSpacing: '0.5px',
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>✓ {statusMessage}</span>
          <button onClick={() => setStatusMessage('')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Main Admin Body */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '36px 32px' }}>
        
        {/* Navigation Tabs & Quick Metrics */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          borderBottom: '1px solid #DFD9CF',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              style={{
                border: 'none',
                background: activeTab === 'bookings' ? '#211C16' : '#ECE7DE',
                color: activeTab === 'bookings' ? '#FFFFFF' : '#4A4339',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📅 INQUIRIES &amp; BOOKINGS
              <span style={{
                background: activeTab === 'bookings' ? 'var(--accent)' : '#D0C8BB',
                color: '#fff',
                padding: '2px 7px',
                borderRadius: '10px',
                fontSize: '11px'
              }}>{bookings.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              style={{
                border: 'none',
                background: activeTab === 'products' ? '#211C16' : '#ECE7DE',
                color: activeTab === 'products' ? '#FFFFFF' : '#4A4339',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🛋️ PRODUCTS CATALOG
              <span style={{
                background: activeTab === 'products' ? 'var(--accent)' : '#D0C8BB',
                color: '#fff',
                padding: '2px 7px',
                borderRadius: '10px',
                fontSize: '11px'
              }}>{allProductList.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              style={{
                border: 'none',
                background: activeTab === 'categories' ? '#211C16' : '#ECE7DE',
                color: activeTab === 'categories' ? '#FFFFFF' : '#4A4339',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              📁 CATEGORIES ({categories.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('brands')}
              style={{
                border: 'none',
                background: activeTab === 'brands' ? '#211C16' : '#ECE7DE',
                color: activeTab === 'brands' ? '#FFFFFF' : '#4A4339',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🏢 BRANDS &amp; CLIENTS
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              style={{
                border: 'none',
                background: activeTab === 'settings' ? '#211C16' : '#ECE7DE',
                color: activeTab === 'settings' ? '#FFFFFF' : '#4A4339',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ⚙️ BACKUP &amp; SETTINGS
            </button>
          </div>

          <div style={{ fontSize: '12px', color: '#7E766B', fontFamily: 'ui-monospace, monospace' }}>
            Store: <strong>Vadodara Atelier</strong> · Mode: <strong>Live Real-time</strong>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: INQUIRIES & SERVICE BOOKINGS TABLE
           ========================================================================= */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, margin: 0 }}>
                  Customer Inquiries &amp; Service Bookings
                </h2>
                <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '6px 0 0' }}>
                  Manage site consultation visits, product sample requests, and custom AI design inquiries.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={exportBookingsCSV}
                  style={{
                    background: '#ECE7DE',
                    border: '1px solid #D2CABC',
                    color: '#211C16',
                    padding: '10px 18px',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  📥 EXPORT TO CSV / EXCEL
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(true)}
                  style={{
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 20px',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  + ADD MANUAL INQUIRY
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              padding: '18px 24px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#888', fontWeight: 600 }}>STATUS:</span>
                {['All', 'Pending', 'In Touch', 'Confirmed', 'Completed'].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setBookingFilter(st)}
                    style={{
                      border: 'none',
                      background: bookingFilter === st ? 'var(--accent)' : '#F2ECE1',
                      color: bookingFilter === st ? '#fff' : '#453E33',
                      padding: '6px 14px',
                      fontSize: '11.5px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: bookingFilter === st ? 600 : 400
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search by customer name, phone, email, category..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                style={{
                  padding: '9px 16px',
                  width: '320px',
                  maxWidth: '100%',
                  border: '1px solid #DAD3C7',
                  background: '#FCFAF7',
                  fontSize: '13px',
                  fontFamily: 'var(--sans)'
                }}
              />
            </div>

            {/* Table Container */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              overflowX: 'auto',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '13.5px'
              }}>
                <thead>
                  <tr style={{
                    background: '#F5F1E8',
                    borderBottom: '2px solid #E0D8CA',
                    color: '#655E52',
                    fontSize: '10.5px',
                    letterSpacing: '1.5px'
                  }}>
                    <th style={{ padding: '16px 20px' }}>ID &amp; DATE</th>
                    <th style={{ padding: '16px 20px' }}>CUSTOMER</th>
                    <th style={{ padding: '16px 20px' }}>CONTACT</th>
                    <th style={{ padding: '16px 20px' }}>SERVICE / PRODUCT</th>
                    <th style={{ padding: '16px 20px' }}>NOTES / MESSAGE</th>
                    <th style={{ padding: '16px 20px' }}>STATUS</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '48px', textAlign: 'center', color: '#888' }}>
                        No booking inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const isPending = b.status === 'Pending';
                      const isConfirmed = b.status === 'Confirmed';
                      const isInTouch = b.status === 'In Touch';
                      const isCompleted = b.status === 'Completed';

                      let badgeBg = '#EFE9DD';
                      let badgeColor = '#4E463A';
                      if (isPending) { badgeBg = '#FFF3CD'; badgeColor = '#856404'; }
                      if (isConfirmed) { badgeBg = '#D1E7DD'; badgeColor = '#0F5132'; }
                      if (isInTouch) { badgeBg = '#CFF4FC'; badgeColor = '#055160'; }
                      if (isCompleted) { badgeBg = '#E2E3E5'; badgeColor = '#41464B'; }

                      return (
                        <tr key={b.id} style={{
                          borderBottom: '1px solid #ECE7DE',
                          transition: 'background 0.15s ease'
                        }}>
                          <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                            <div style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: 'var(--accent)' }}>{b.id}</div>
                            <div style={{ fontSize: '11px', color: '#8E8679', marginTop: '4px' }}>
                              {new Date(b.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 600, color: '#211C16' }}>{b.name}</div>
                            <div style={{ fontSize: '11.5px', color: '#7E766B', marginTop: '2px' }}>{b.city || 'Vadodara'}</div>
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                            <div>
                              <a href={`tel:${b.phone}`} style={{ color: '#211C16', textDecoration: 'none', fontWeight: 500 }}>
                                📞 {b.phone}
                              </a>
                            </div>
                            {b.email && (
                              <div style={{ fontSize: '11.5px', color: '#6A6357', marginTop: '3px' }}>
                                <a href={`mailto:${b.email}`} style={{ color: '#6A6357' }}>✉️ {b.email}</a>
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 500 }}>{b.serviceType}</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--accent)', marginTop: '2px' }}>
                              {b.category} {b.productName ? `· ${b.productName}` : ''}
                            </div>
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top', maxWidth: '280px' }}>
                            <p style={{
                              margin: 0,
                              fontSize: '12.5px',
                              lineHeight: 1.5,
                              color: '#554E44',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {b.message || 'No additional note specified.'}
                            </p>
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                            <select
                              value={b.status || 'Pending'}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              style={{
                                background: badgeBg,
                                color: badgeColor,
                                border: '1px solid rgba(0,0,0,0.1)',
                                padding: '6px 10px',
                                fontSize: '11.5px',
                                fontWeight: 600,
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Touch">In Touch</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>

                          <td style={{ padding: '16px 20px', verticalAlign: 'top', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => setViewingBooking(b)}
                                title="View Full Details"
                                style={{
                                  background: '#F0ECE3',
                                  border: 'none',
                                  padding: '6px 10px',
                                  cursor: 'pointer',
                                  fontSize: '11px',
                                  fontWeight: 500
                                }}
                              >
                                View
                              </button>
                              <a
                                href={`https://wa.me/${(b.phone || '').replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  background: '#25D366',
                                  color: '#fff',
                                  textDecoration: 'none',
                                  padding: '6px 10px',
                                  fontSize: '11px',
                                  fontWeight: 500,
                                  display: 'inline-block'
                                }}
                              >
                                WA
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteBookingItem(b.id)}
                                title="Delete Record"
                                style={{
                                  background: '#FFEAEA',
                                  color: '#C00',
                                  border: 'none',
                                  padding: '6px 10px',
                                  cursor: 'pointer',
                                  fontSize: '11px'
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: PRODUCTS CATALOG MANAGEMENT
           ========================================================================= */}
        {activeTab === 'products' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, margin: 0 }}>
                  Product Catalog Engine
                </h2>
                <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '6px 0 0' }}>
                  Add, update, or remove bespoke products, swatches, images, prices, specs, and badges.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px 24px',
                  fontSize: '11.5px',
                  letterSpacing: '2.5px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                + ADD NEW PRODUCT PIECE
              </button>
            </div>

            {/* Filter Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              padding: '18px 24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#888', fontWeight: 600 }}>CATEGORY:</span>
                <button
                  type="button"
                  onClick={() => setProductCategoryFilter('All')}
                  style={{
                    border: 'none',
                    background: productCategoryFilter === 'All' ? 'var(--accent)' : '#F2ECE1',
                    color: productCategoryFilter === 'All' ? '#fff' : '#453E33',
                    padding: '6px 12px',
                    fontSize: '11px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: productCategoryFilter === 'All' ? 600 : 400
                  }}
                >
                  All ({allProductList.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProductCategoryFilter(cat)}
                    style={{
                      border: 'none',
                      background: productCategoryFilter === cat ? 'var(--accent)' : '#F2ECE1',
                      color: productCategoryFilter === cat ? '#fff' : '#453E33',
                      padding: '6px 12px',
                      fontSize: '11px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: productCategoryFilter === cat ? 600 : 400
                    }}
                  >
                    {cat} ({(products[cat] || []).length})
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search product by title, fabric, badge..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{
                  padding: '9px 16px',
                  width: '320px',
                  maxWidth: '100%',
                  border: '1px solid #DAD3C7',
                  background: '#FCFAF7',
                  fontSize: '13px',
                  fontFamily: 'var(--sans)'
                }}
              />
            </div>

            {/* Product Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2DCD1',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ position: 'relative', height: '220px', background: '#D2CABC' }}>
                    <img
                      src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=600&q=80'}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {p.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(33,28,22,0.85)',
                        color: '#fff',
                        fontSize: '9.5px',
                        letterSpacing: '1.5px',
                        padding: '4px 10px',
                        borderRadius: '2px',
                        fontWeight: 600
                      }}>
                        {p.badge.toUpperCase()}
                      </span>
                    )}
                    <span style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(255,255,255,0.92)',
                      color: '#211C16',
                      fontSize: '10px',
                      letterSpacing: '1px',
                      padding: '4px 8px',
                      fontWeight: 600
                    }}>
                      {p.category}
                    </span>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, margin: 0 }}>
                        {p.name}
                      </h3>
                      <div style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: 'var(--accent)' }}>
                        ₹{Number(p.price).toLocaleString('en-IN')} <span style={{ fontSize: '11px', color: '#888' }}>{p.unit}</span>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '12.5px',
                      lineHeight: 1.6,
                      color: '#655E52',
                      margin: '0 0 16px',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {p.description}
                    </p>

                    {(p.curtainType || p.fabricType) && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {p.curtainType && (
                          <span style={{ background: '#F5F1E8', color: '#554E44', fontSize: '10px', padding: '3px 8px', borderRadius: '3px' }}>
                            Type: {p.curtainType}
                          </span>
                        )}
                        {p.fabricType && (
                          <span style={{ background: '#F5F1E8', color: '#554E44', fontSize: '10px', padding: '3px 8px', borderRadius: '3px' }}>
                            Fabric: {p.fabricType}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Color Swatch Dots */}
                    {p.colors && p.colors.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '18px' }}>
                        <span style={{ fontSize: '10px', color: '#999', letterSpacing: '1px' }}>SHADES:</span>
                        {p.colors.map((c, i) => (
                          <span
                            key={i}
                            title={c.name}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              background: c.hex || '#B4592F',
                              border: '1px solid rgba(0,0,0,0.2)'
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      borderTop: '1px solid #ECE7DE',
                      paddingTop: '14px',
                      marginTop: 'auto'
                    }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(p, p.category)}
                        style={{
                          flex: 1,
                          background: '#211C16',
                          color: '#fff',
                          border: 'none',
                          padding: '8px',
                          fontSize: '11px',
                          letterSpacing: '1.5px',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        EDIT DETAILS
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        style={{
                          background: '#FFEAEA',
                          color: '#C00',
                          border: 'none',
                          padding: '8px 14px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: CATEGORIES MANAGEMENT
           ========================================================================= */}
        {activeTab === 'categories' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, margin: 0 }}>
                  Product Collections &amp; Taxonomy
                </h2>
                <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '6px 0 0' }}>
                  Configure your 9 core product departments, hero showcase imagery, and subtype tags.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddCategory}
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px 24px',
                  fontSize: '11.5px',
                  letterSpacing: '2.5px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                + ADD NEW CATEGORY
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {categories.map(cat => {
                const meta = categoryMeta[cat] || {};
                const count = (products[cat] || []).length;

                return (
                  <div key={cat} style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2DCD1',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{
                      height: '180px',
                      background: `#BFB7AA url(${meta.hero || 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=800&q=80'}) center/cover no-repeat`,
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)'
                      }} />
                      <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#fff' }}>
                        <div style={{ fontSize: '9.5px', letterSpacing: '2px', color: '#E8C9AF', fontWeight: 600 }}>
                          {meta.eyebrow || 'COLLECTION'}
                        </div>
                        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, margin: '4px 0 0' }}>
                          {cat}
                        </h3>
                      </div>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontStyle: 'italic', color: '#2C271F', margin: '0 0 8px' }}>
                        "{meta.heading || 'Crafted with intention.'}"
                      </h4>
                      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#655E52', margin: '0 0 16px', flex: 1 }}>
                        {meta.description || 'No description entered.'}
                      </p>

                      <div style={{
                        background: '#F8F6F2',
                        padding: '12px 16px',
                        border: '1px solid #ECE7DE',
                        marginBottom: '20px',
                        fontSize: '12px',
                        color: '#554E44'
                      }}>
                        <div><strong>Active Online Products:</strong> {count} items</div>
                        <div style={{ marginTop: '4px' }}><strong>Atelier Swatches:</strong> {meta.studioCount || 25}+</div>
                        {meta.subtypes && meta.subtypes.length > 0 && (
                          <div style={{ marginTop: '4px' }}>
                            <strong>Subtypes:</strong> {meta.subtypes.join(', ')}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditCategory(cat)}
                          style={{
                            flex: 1,
                            background: '#211C16',
                            color: '#fff',
                            border: 'none',
                            padding: '10px',
                            fontSize: '11px',
                            letterSpacing: '1.5px',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          EDIT CATEGORY CONTENT
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat)}
                          style={{
                            background: '#FFEAEA',
                            color: '#C00',
                            border: 'none',
                            padding: '10px 14px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: BRANDS & CLIENTS DIRECTORY
           ========================================================================= */}
        {activeTab === 'brands' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, margin: 0 }}>
                Brands We Carry &amp; Trusted Commercial Clients
              </h2>
              <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '6px 0 0' }}>
                All 32 official brand partnerships and 14 prestigious institutions that trust Aesthetics.
              </p>
            </div>

            {/* Section A: Brands We Carry */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              padding: '28px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                    Brands We Carry ({brands.length})
                  </h3>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Official fabric houses, blind systems, mattresses, and luxury wallpapers</div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '14px'
              }}>
                {brands.map((b, i) => (
                  <div key={i} style={{
                    border: '1px solid #ECE7DE',
                    background: '#FAF8F4',
                    padding: '14px 18px',
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontWeight: 600, color: '#211C16', fontSize: '14.5px' }}>{b.name}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--accent)', marginTop: '2px' }}>{b.category}</div>
                    {b.tag && (
                      <span style={{
                        display: 'inline-block',
                        background: '#ECE7DE',
                        color: '#5E5649',
                        fontSize: '9.5px',
                        letterSpacing: '1px',
                        padding: '2px 6px',
                        marginTop: '6px',
                        borderRadius: '2px'
                      }}>
                        {b.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Trusted Clients */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              padding: '28px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, margin: 0 }}>
                  Brands That Have Trusted Us ({clients.length})
                </h3>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Prestigious corporate, healthcare, hospitality, and educational institutions</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '14px'
              }}>
                {clients.map((c, i) => (
                  <div key={i} style={{
                    border: '1px solid #ECE7DE',
                    background: '#FAF8F4',
                    padding: '16px 20px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{c.icon || '🏛️'}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#211C16', fontSize: '15px' }}>{c.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#6A6357', marginTop: '2px' }}>{c.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: BACKUP & SETTINGS
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, margin: 0 }}>
                Data Management &amp; System Backup
              </h2>
              <p style={{ fontSize: '13.5px', color: '#6A6357', margin: '6px 0 0' }}>
                Safely backup your entire catalog, customer inquiries, and category taxonomy as a JSON file or restore from a previous backup.
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2DCD1',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, margin: '0 0 8px' }}>
                  1. Export Catalog Backup
                </h3>
                <p style={{ fontSize: '13.5px', color: '#666', margin: '0 0 16px' }}>
                  Download all active products, categories, specs, color swatches, and booking inquiries as a timestamped JSON file.
                </p>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  style={{
                    background: '#211C16',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    fontSize: '11.5px',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  📥 DOWNLOAD COMPLETE BACKUP (.JSON)
                </button>
              </div>

              <div style={{ borderTop: '1px solid #ECE7DE', paddingTop: '28px' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, margin: '0 0 8px' }}>
                  2. Import / Restore Catalog
                </h3>
                <p style={{ fontSize: '13.5px', color: '#666', margin: '0 0 16px' }}>
                  Upload a previously saved JSON backup to replace the current catalog and inquiries.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  style={{ fontSize: '13px' }}
                />
              </div>

              <div style={{ borderTop: '1px solid #ECE7DE', paddingTop: '28px' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#C00', margin: '0 0 8px' }}>
                  3. Danger Zone: Factory Reset
                </h3>
                <p style={{ fontSize: '13.5px', color: '#666', margin: '0 0 16px' }}>
                  Restore the website catalog back to default pre-loaded products and sample categories.
                </p>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  style={{
                    background: '#FFEAEA',
                    color: '#C00',
                    border: '1px solid #FFA8A8',
                    padding: '12px 24px',
                    fontSize: '11.5px',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  ⚠️ RESET TO FACTORY DEFAULTS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL: PRODUCT ADD / EDIT
         ========================================================================= */}
      {editingProduct && (
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
            maxWidth: '760px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, margin: 0 }}>
                {isNewProduct ? 'Add New Product Piece' : `Edit "${productForm.name}"`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: Title & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    PRODUCT TITLE *
                  </span>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Kharif Slub Sheer"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    DEPARTMENT / CATEGORY *
                  </span>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value, curtainType: '', fabricType: '' })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Row 2: Type / Subtype & Fabric Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    PRODUCT SUBTYPE / TYPE
                  </span>
                  {availableTaxonomy.types && availableTaxonomy.types.length > 0 ? (
                    <select
                      value={productForm.curtainType || ''}
                      onChange={(e) => setProductForm({ ...productForm, curtainType: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="">-- Select Type --</option>
                      {availableTaxonomy.types.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={productForm.curtainType || ''}
                      onChange={(e) => setProductForm({ ...productForm, curtainType: e.target.value })}
                      placeholder="e.g. Sheer Curtains"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                    />
                  )}
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    FABRIC / MATERIAL TYPE
                  </span>
                  {availableTaxonomy.fabrics && availableTaxonomy.fabrics.length > 0 ? (
                    <select
                      value={productForm.fabricType || ''}
                      onChange={(e) => setProductForm({ ...productForm, fabricType: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="">-- Select Fabric Type --</option>
                      {availableTaxonomy.fabrics.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={productForm.fabricType || ''}
                      onChange={(e) => setProductForm({ ...productForm, fabricType: e.target.value })}
                      placeholder="e.g. Cotton, Linen, Polyester"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                    />
                  )}
                </label>
              </div>

              {/* Row 3: Price, Unit & Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    PRICE (₹) *
                  </span>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    PRICE UNIT
                  </span>
                  <select
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="per metre">per metre</option>
                    <option value="per sq.ft">per sq.ft</option>
                    <option value="per roll">per roll</option>
                    <option value="per set">per set</option>
                    <option value="per unit">per unit</option>
                    <option value="each">each</option>
                  </select>
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    HIGHLIGHT BADGE
                  </span>
                  <input
                    type="text"
                    value={productForm.badge || ''}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g. Best Seller, Handloom"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>
              </div>

              {/* Row 4: Description */}
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  EDITORIAL DESCRIPTION *
                </span>
                <textarea
                  required
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Describe the weave, tactile feel, light absorption, and recommended spaces…"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', resize: 'vertical' }}
                />
              </label>

              {/* Row 5: Image URLs */}
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  HIGH-RES IMAGE URLS
                </span>
                {productForm.images.map((imgUrl, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="url"
                      value={imgUrl}
                      onChange={(e) => {
                        const newImgs = [...productForm.images];
                        newImgs[idx] = e.target.value;
                        setProductForm({ ...productForm, images: newImgs });
                      }}
                      placeholder="https://images.unsplash.com/..."
                      style={{ flex: 1, padding: '8px 12px', border: '1px solid #CCC', fontSize: '13px' }}
                    />
                    {productForm.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newImgs = productForm.images.filter((_, i) => i !== idx);
                          setProductForm({ ...productForm, images: newImgs });
                        }}
                        style={{ background: '#FFEAEA', color: '#C00', border: 'none', padding: '0 12px', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductForm({ ...productForm, images: [...productForm.images, ''] })}
                  style={{ background: '#F0ECE3', border: 'none', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}
                >
                  + Add Another Image URL
                </button>
              </div>

              {/* Row 6: Color Swatches */}
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  AVAILABLE COLORWAYS / SHADES
                </span>
                {productForm.colors.map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      type="color"
                      value={c.hex || '#B4592F'}
                      onChange={(e) => {
                        const newCols = [...productForm.colors];
                        newCols[idx] = { ...newCols[idx], hex: e.target.value };
                        setProductForm({ ...productForm, colors: newCols });
                      }}
                      style={{ width: '38px', height: '34px', border: 'none', cursor: 'pointer', padding: 0 }}
                    />
                    <input
                      type="text"
                      placeholder="Color Name (e.g. Kharif Sand)"
                      value={c.name}
                      onChange={(e) => {
                        const newCols = [...productForm.colors];
                        newCols[idx] = { ...newCols[idx], name: e.target.value };
                        setProductForm({ ...productForm, colors: newCols });
                      }}
                      style={{ flex: 1, padding: '8px 12px', border: '1px solid #CCC', fontSize: '13px' }}
                    />
                    {productForm.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newCols = productForm.colors.filter((_, i) => i !== idx);
                          setProductForm({ ...productForm, colors: newCols });
                        }}
                        style={{ background: '#FFEAEA', color: '#C00', border: 'none', padding: '8px 12px', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductForm({ ...productForm, colors: [...productForm.colors, { name: '', hex: '#EFE9DD' }] })}
                  style={{ background: '#F0ECE3', border: 'none', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}
                >
                  + Add Color Swatch
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #ECE7DE', paddingTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{ background: '#ECE7DE', border: 'none', padding: '12px 24px', fontSize: '11.5px', letterSpacing: '2px', cursor: 'pointer', fontWeight: 600 }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '11.5px', letterSpacing: '2px', cursor: 'pointer', fontWeight: 600 }}
                >
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CATEGORY ADD / EDIT
         ========================================================================= */}
      {editingCategory && (
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
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, margin: 0 }}>
                {isNewCategory ? 'Add New Product Department' : `Edit Category "${categoryForm.name}"`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  CATEGORY NAME *
                </span>
                <input
                  type="text"
                  required
                  disabled={!isNewCategory}
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Wall Coverings"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  HEADER EYEBROW
                </span>
                <input
                  type="text"
                  value={categoryForm.eyebrow}
                  onChange={(e) => setCategoryForm({ ...categoryForm, eyebrow: e.target.value })}
                  placeholder="e.g. MADE-TO-MEASURE DRAPERY"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  PAGE HEADING
                </span>
                <input
                  type="text"
                  value={categoryForm.heading}
                  onChange={(e) => setCategoryForm({ ...categoryForm, heading: e.target.value })}
                  placeholder="e.g. Light, framed by hand."
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  DESCRIPTION
                </span>
                <textarea
                  rows="3"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px', resize: 'vertical' }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  HERO SHOWCASE IMAGE URL
                </span>
                <input
                  type="url"
                  value={categoryForm.hero}
                  onChange={(e) => setCategoryForm({ ...categoryForm, hero: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    ATELIER SWATCH COUNT
                  </span>
                  <input
                    type="number"
                    value={categoryForm.studioCount}
                    onChange={(e) => setCategoryForm({ ...categoryForm, studioCount: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    SUBTYPES (COMMA SEPARATED)
                  </span>
                  <input
                    type="text"
                    value={categoryForm.subtypes}
                    onChange={(e) => setCategoryForm({ ...categoryForm, subtypes: e.target.value })}
                    placeholder="Sheer Curtains, Dimout, Blackout..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #ECE7DE', paddingTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  style={{ background: '#ECE7DE', border: 'none', padding: '12px 24px', fontSize: '11.5px', letterSpacing: '2px', cursor: 'pointer', fontWeight: 600 }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '11.5px', letterSpacing: '2px', cursor: 'pointer', fontWeight: 600 }}
                >
                  SAVE CATEGORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VIEW BOOKING FULL DETAILS
         ========================================================================= */}
      {viewingBooking && (
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
            maxWidth: '560px',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ECE7DE', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--accent)', fontWeight: 600 }}>{viewingBooking.id}</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 500, margin: '4px 0 0' }}>
                  Booking Inquiry Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', marginBottom: '28px' }}>
              <div><strong>Customer Name:</strong> {viewingBooking.name}</div>
              <div><strong>Phone Number:</strong> <a href={`tel:${viewingBooking.phone}`} style={{ color: 'var(--accent)' }}>{viewingBooking.phone}</a></div>
              <div><strong>Email:</strong> {viewingBooking.email || 'Not provided'}</div>
              <div><strong>City / Location:</strong> {viewingBooking.city || 'Vadodara'}</div>
              <div><strong>Service Type:</strong> {viewingBooking.serviceType}</div>
              <div><strong>Department / Category:</strong> {viewingBooking.category} {viewingBooking.productName ? `· ${viewingBooking.productName}` : ''}</div>
              <div><strong>Date Received:</strong> {new Date(viewingBooking.createdAt).toLocaleString('en-IN')}</div>
              <div>
                <strong>Current Status:</strong>{' '}
                <select
                  value={viewingBooking.status}
                  onChange={(e) => {
                    handleStatusChange(viewingBooking.id, e.target.value);
                    setViewingBooking({ ...viewingBooking, status: e.target.value });
                  }}
                  style={{ padding: '4px 8px', fontSize: '13px' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Touch">In Touch</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ background: '#FAF8F4', padding: '16px', border: '1px solid #ECE7DE', borderRadius: '4px' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: '#7E766B', fontSize: '11.5px', letterSpacing: '1px' }}>CUSTOMER NOTES:</strong>
                <p style={{ margin: 0, lineHeight: 1.6, color: '#3A342B' }}>
                  {viewingBooking.message || 'No specific space dimensions or message provided.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <a
                href={`https://wa.me/${(viewingBooking.phone || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '1.5px'
                }}
              >
                OPEN WHATSAPP CHAT
              </a>
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                style={{ background: '#211C16', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', letterSpacing: '1.5px' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD MANUAL INQUIRY / BOOKING
         ========================================================================= */}
      {showNewBookingModal && (
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
            maxWidth: '560px',
            padding: '36px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, margin: 0 }}>
                Record In-Studio / Phone Consultation
              </h3>
              <button
                type="button"
                onClick={() => setShowNewBookingModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveManualBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    CUSTOMER NAME *
                  </span>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    PHONE NUMBER *
                  </span>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    EMAIL ADDRESS
                  </span>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    CITY
                  </span>
                  <input
                    type="text"
                    value={bookingForm.city}
                    onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    SERVICE TYPE
                  </span>
                  <select
                    value={bookingForm.serviceType}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                  >
                    <option value="Consultation & Site Visit">Consultation & Site Visit</option>
                    <option value="Custom Project / Trade Partnership">Custom Project / Trade Partnership</option>
                    <option value="Product Inquiry & Sample">Product Inquiry & Sample</option>
                    <option value="AI Custom Design Consultation">AI Custom Design Consultation</option>
                  </select>
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    CATEGORY
                  </span>
                  <select
                    value={bookingForm.category}
                    onChange={(e) => setBookingForm({ ...bookingForm, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px', background: '#fff' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  MESSAGE / SPACE SPECIFICATIONS
                </span>
                <textarea
                  rows="3"
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  placeholder="Notes from customer discussion..."
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #CCC', fontSize: '14px' }}
                />
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(false)}
                  style={{ background: '#ECE7DE', border: 'none', padding: '10px 20px', fontSize: '11.5px', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: 600 }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '10px 24px', fontSize: '11.5px', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: 600 }}
                >
                  CREATE INQUIRY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
