// PHONE MODAL
const phoneBtn = document.getElementById("phoneBtn");
const phoneModal = document.getElementById("phoneModal");
const closeModal = document.getElementById("closeModal");

phoneBtn.onclick = () => phoneModal.style.display = "flex";
closeModal.onclick = () => phoneModal.style.display = "none";

// CONTACT MODAL
const contactsBtn = document.getElementById("contactsBtn");
const contactsBtnMobile = document.getElementById("contactsBtnMobile");
const contactModal = document.getElementById("contactModal");
const closeContactModal = document.getElementById("closeContactModal");

contactsBtn.onclick = contactsBtnMobile.onclick = e => {
    e.preventDefault();
    contactModal.style.display = "flex";
};

closeContactModal.onclick = () => contactModal.style.display = "none";

// Close modals on outside click
window.onclick = e => {
    if (e.target === phoneModal) phoneModal.style.display = "none";
    if (e.target === contactModal) contactModal.style.display = "none";
};

// BURGER MENU
const burgerBtn = document.getElementById("burgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
burgerBtn.onclick = () => dropdownMenu.classList.toggle("open");

// AUTO SLIDER FOR CARDS
document.querySelectorAll(".auto-slider").forEach(img => {
    const images = img.dataset.images.split(",");
    let i = 0;
    setInterval(() => {
        i = (i + 1) % images.length;
        img.src = images[i].trim();
    }, 3000);
});
