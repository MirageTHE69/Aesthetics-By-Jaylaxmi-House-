import {
  CATEGORIES as DEFAULT_CATEGORIES,
  CATEGORY_META as DEFAULT_CATEGORY_META,
  PRODUCTS as DEFAULT_PRODUCTS,
  BRANDS_WE_CARRY,
  TRUSTED_CLIENTS,
  CONTACT_DETAILS
} from './products';

const STORAGE_KEYS = {
  PRODUCTS: 'aesthetics_products_v2',
  CATEGORIES: 'aesthetics_categories_v2',
  CATEGORY_META: 'aesthetics_category_meta_v2',
  BOOKINGS: 'aesthetics_bookings_v2',
  BRANDS: 'aesthetics_brands_v2',
  CLIENTS: 'aesthetics_clients_v2',
  CONTACT: 'aesthetics_contact_v2'
};

// Broadcast channel / Custom event for intra-tab instant reactivity
export const notifyDataChanged = () => {
  window.dispatchEvent(new CustomEvent('aesthetics_data_updated'));
};

// Initializer with fallback to rich defaults
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORY_META)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORY_META, JSON.stringify(DEFAULT_CATEGORY_META));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BRANDS)) {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(BRANDS_WE_CARRY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(TRUSTED_CLIENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(CONTACT_DETAILS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    // Seed initial sample bookings for immediate admin viewing
    const initialBookings = [
      {
        id: 'BK-1001',
        createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        name: 'Arjun Mehta',
        email: 'arjun.mehta@example.com',
        phone: '+91 98250 12345',
        city: 'Vadodara (Alkapuri)',
        serviceType: 'Consultation & Site Visit',
        category: 'Curtains',
        productName: 'Kharif Slub Sheer',
        message: 'Looking for living room sheer drapes (drop 10.5 ft) and blackout lining for master bedroom.',
        status: 'In Touch'
      },
      {
        id: 'BK-1002',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        name: 'Priya Sharma & Architects',
        email: 'priya@studioarch.in',
        phone: '+91 98980 98765',
        city: 'Ahmedabad / Vadodara',
        serviceType: 'Custom Project / Trade Partnership',
        category: 'Upholstery Fabrics',
        productName: 'Mitti Handloom Bouclé',
        message: 'Boutique hotel project with Marriott group. Requesting 8 swatch sets for lounge seating.',
        status: 'Pending'
      },
      {
        id: 'BK-1003',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        name: 'Dr. Rajesh Patel',
        email: 'rajesh.patel@gkhosp.org',
        phone: '+91 99099 54321',
        city: 'Vadodara',
        serviceType: 'Product Inquiry & Sample',
        category: 'Wall Coverings',
        productName: 'Asian Paints Nilaya Sabyasachi Feature Wall',
        message: 'Need consultation for executive suite wallpapers and acoustic fabric panelling.',
        status: 'Confirmed'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialBookings));
  }
}

// Ensure storage initialized on module import
try {
  initStorage();
} catch (e) {
  console.warn('LocalStorage unavailable during module init:', e);
}

// ----------------- PRODUCT SERVICES -----------------

export function getStoredCategories() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function getStoredCategoryMeta() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORY_META);
    return data ? JSON.parse(data) : DEFAULT_CATEGORY_META;
  } catch {
    return DEFAULT_CATEGORY_META;
  }
}

export function getStoredProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function getStoredProductsByCategory(categoryName) {
  const all = getStoredProducts();
  return all[categoryName] || [];
}

export function findStoredProduct(productId) {
  const all = getStoredProducts();
  const categories = getStoredCategories();
  for (const cat of categories) {
    const list = all[cat] || [];
    const found = list.find(p => p.id === productId);
    if (found) return { ...found, category: cat };
  }
  return null;
}

export function saveProduct(category, productData) {
  const all = getStoredProducts();
  if (!all[category]) {
    all[category] = [];
  }

  const existingIndex = all[category].findIndex(p => p.id === productData.id);
  if (existingIndex >= 0) {
    all[category][existingIndex] = { ...productData };
  } else {
    // Generate unique ID if none provided
    const newId = productData.id || `${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    all[category].unshift({ ...productData, id: newId });
  }

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(all));
  notifyDataChanged();
  return productData;
}

export function deleteProduct(productId) {
  const all = getStoredProducts();
  let modified = false;

  for (const cat of Object.keys(all)) {
    const initialLen = all[cat].length;
    all[cat] = all[cat].filter(p => p.id !== productId);
    if (all[cat].length !== initialLen) {
      modified = true;
    }
  }

  if (modified) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(all));
    notifyDataChanged();
  }
  return modified;
}

// ----------------- CATEGORY SERVICES -----------------

export function saveCategory(categoryName, metaData) {
  const categories = getStoredCategories();
  const meta = getStoredCategoryMeta();

  if (!categories.includes(categoryName)) {
    categories.push(categoryName);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  meta[categoryName] = {
    ...meta[categoryName],
    ...metaData
  };
  localStorage.setItem(STORAGE_KEYS.CATEGORY_META, JSON.stringify(meta));

  const allProducts = getStoredProducts();
  if (!allProducts[categoryName]) {
    allProducts[categoryName] = [];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(allProducts));
  }

  notifyDataChanged();
}

export function deleteCategory(categoryName) {
  let categories = getStoredCategories();
  categories = categories.filter(c => c !== categoryName);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));

  const meta = getStoredCategoryMeta();
  delete meta[categoryName];
  localStorage.setItem(STORAGE_KEYS.CATEGORY_META, JSON.stringify(meta));

  const allProducts = getStoredProducts();
  delete allProducts[categoryName];
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(allProducts));

  notifyDataChanged();
}

// ----------------- BOOKING / INQUIRY SERVICES -----------------

export function getStoredBookings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addBooking(bookingData) {
  const bookings = getStoredBookings();
  const newBooking = {
    id: `BK-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    ...bookingData
  };
  bookings.unshift(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  notifyDataChanged();
  return newBooking;
}

export function updateBookingStatus(bookingId, newStatus) {
  const bookings = getStoredBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index >= 0) {
    bookings[index].status = newStatus;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    notifyDataChanged();
    return true;
  }
  return false;
}

export function deleteBooking(bookingId) {
  let bookings = getStoredBookings();
  bookings = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  notifyDataChanged();
}

// ----------------- BRANDS & CLIENTS SERVICES -----------------

export function getStoredBrands() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BRANDS);
    return data ? JSON.parse(data) : BRANDS_WE_CARRY;
  } catch {
    return BRANDS_WE_CARRY;
  }
}

export function getStoredClients() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return data ? JSON.parse(data) : TRUSTED_CLIENTS;
  } catch {
    return TRUSTED_CLIENTS;
  }
}

export function getStoredContact() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return data ? JSON.parse(data) : CONTACT_DETAILS;
  } catch {
    return CONTACT_DETAILS;
  }
}

// ----------------- BACKUP / RESTORE -----------------

export function exportFullDataJSON() {
  const backup = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    categories: getStoredCategories(),
    categoryMeta: getStoredCategoryMeta(),
    products: getStoredProducts(),
    bookings: getStoredBookings(),
    brands: getStoredBrands(),
    clients: getStoredClients(),
    contact: getStoredContact()
  };
  return JSON.stringify(backup, null, 2);
}

export function importFullDataJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (data.categories && data.categoryMeta && data.products) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
      localStorage.setItem(STORAGE_KEYS.CATEGORY_META, JSON.stringify(data.categoryMeta));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
      if (data.bookings) localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(data.bookings));
      if (data.brands) localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(data.brands));
      if (data.clients) localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(data.clients));
      if (data.contact) localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(data.contact));
      notifyDataChanged();
      return { success: true };
    }
    return { success: false, error: 'Invalid data format' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export function resetToFactoryDefaults() {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.CATEGORY_META, JSON.stringify(DEFAULT_CATEGORY_META));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(BRANDS_WE_CARRY));
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(TRUSTED_CLIENTS));
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(CONTACT_DETAILS));
  notifyDataChanged();
}
