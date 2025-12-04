
const $ = id => document.getElementById(id);

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.setAttribute('aria-hidden', 'false');
}
function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.setAttribute('aria-hidden', 'true');
}

// модаока
const phoneBtn = $('phoneBtn');
const phoneModal = $('phoneModal');
const closePhoneBtn = $('closePhoneModal');
if (phoneBtn) phoneBtn.addEventListener('click', () => openModal(phoneModal));
if (closePhoneBtn) closePhoneBtn.addEventListener('click', () => closeModal(phoneModal));
if (phoneModal) phoneModal.addEventListener('click', (e) => { if (e.target === phoneModal) closeModal(phoneModal); });

// модалка
const contactsBtn = $('contactsBtn');
const contactsBtnMobile = $('contactsBtnMobile');
const contactModal = $('contactModal');
const closeContactBtn = $('closeContactModal');
if (contactsBtn) contactsBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(contactModal); });
if (contactsBtnMobile) contactsBtnMobile.addEventListener('click', (e) => { e.preventDefault(); openModal(contactModal); });
if (closeContactBtn) closeContactBtn.addEventListener('click', () => closeModal(contactModal));
if (contactModal) contactModal.addEventListener('click', (e) => { if (e.target === contactModal) closeModal(contactModal); });

/* бурегер меню*/
const burgerBtn = $('burgerBtn');
const dropdownMenu = $('dropdownMenu');
if (burgerBtn && dropdownMenu) {
  burgerBtn.addEventListener('click', () => {
    const opened = dropdownMenu.style.top === '70px';
    if (opened) {
      dropdownMenu.style.top = '-100vh';
      dropdownMenu.setAttribute('aria-hidden', 'true');
      burgerBtn.setAttribute('aria-expanded', 'false');
    } else {
      dropdownMenu.style.top = '70px';
      dropdownMenu.setAttribute('aria-hidden', 'false');
      burgerBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // закрытие модалки
  dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      dropdownMenu.style.top = '-100vh';
      dropdownMenu.setAttribute('aria-hidden', 'true');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* авто слайдер*/
document.querySelectorAll('.auto-slider').forEach(img => {
  const raw = img.dataset.images || '';
  const arr = raw.split(',').map(s => s.trim()).filter(Boolean);
  if (!arr.length) return;

  //плавный переход
  const fadeImg = document.createElement('img');
  fadeImg.style.position = 'absolute';
  fadeImg.style.inset = '0';
  fadeImg.style.width = '100%';
  fadeImg.style.height = '100%';
  fadeImg.style.objectFit = 'cover';
  fadeImg.style.opacity = '0';
  fadeImg.style.transition = 'opacity .45s ease';
  fadeImg.alt = img.alt || '';
  const wrapper = img.parentElement;
  wrapper.style.position = 'relative';
  wrapper.appendChild(fadeImg);

  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % arr.length;
    fadeImg.src = arr[idx];
    
    requestAnimationFrame(() => { fadeImg.style.opacity = '1'; });
    setTimeout(() => {
      img.src = arr[idx];
      fadeImg.style.opacity = '0';
    }, 450);
  }, 3500);
});

/* скрол вниз вверх, скрытие и отображение */
let lastScroll = window.scrollY || 0;
const headerEl = $('header');
const menuEl = $('menu');

window.addEventListener('scroll', () => {
  const cur = window.scrollY || 0;

  if (cur > lastScroll && cur > 60) {
    
    if (headerEl) headerEl.classList.add('header-hidden');
    if (menuEl) menuEl.classList.add('menu-hidden');
    
    if (dropdownMenu) { dropdownMenu.style.top = '-100vh'; dropdownMenu.setAttribute('aria-hidden', 'true'); }
  } else {
    // scrolling up -> show
    if (headerEl) headerEl.classList.remove('header-hidden');
    if (menuEl) menuEl.classList.remove('menu-hidden');
  }

  lastScroll = cur;
});

/* Аля поисковик*/
const searchInput = $('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const txt = (card.innerText || '').toLowerCase();
      card.style.display = txt.includes(q) ? '' : 'none';
    });
  });
}

/* закрытие модалок на эскейп */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (phoneModal) closeModal(phoneModal);
    if (contactModal) closeModal(contactModal);
    if (dropdownMenu) { dropdownMenu.style.top = '-100vh'; dropdownMenu.setAttribute('aria-hidden','true'); if (burgerBtn) burgerBtn.setAttribute('aria-expanded','false'); }
  }
});
