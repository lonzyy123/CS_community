// --- БАЗА ДАННЫХ ТОВАРОВ CS:GO/CS2 ---
const csProductsData = [
    { id: 101, name: "AK-47 | Asiimov", category: "Skin", grade: "Covert", price: 25000, displayPrice: "25 000 ₸", image: "https://files.gamehag.com/img/key_visual/ak-47_asiimov.png" },
    { id: 102, name: "Desert Eagle | Blaze", category: "Skin", grade: "Covert", price: 45000, displayPrice: "45 000 ₸", image: "https://files.gamehag.com/img/key_visual/deagle_blaze.png" },
    { id: 103, name: "Prime Status Upgrade", category: "Status", grade: "Prime", price: 12500, displayPrice: "12 500 ₸", image: "https://cdn.icon-icons.com/icons2/2645/PNG/512/csgo_prime_icon_160358.png" },
    { id: 104, name: "Spectrum 2 Case", category: "Case", grade: "MilSpec", price: 500, displayPrice: "500 ₸", image: "https://files.gamehag.com/img/key_visual/spectrum_2_case.png" },
    { id: 105, name: "Spectrum 2 Key", category: "Key", grade: "MilSpec", price: 1500, displayPrice: "1 500 ₸", image: "https://files.gamehag.com/img/key_visual/spectrum_2_key.png" },
    { id: 106, name: "M4A4 | Neo-Noir", category: "Skin", grade: "Classified", price: 18000, displayPrice: "18 000 ₸", image: "https://files.gamehag.com/img/key_visual/m4a4_neo_noir.png" },
    { id: 107, name: "Operation Hydra Case", category: "Case", grade: "MilSpec", price: 3000, displayPrice: "3 000 ₸", image: "https://files.gamehag.com/img/key_visual/operation_hydra_case.png" },
    { id: 108, name: "AWP | Atheris", category: "Skin", grade: "Classified", price: 8000, displayPrice: "8 000 ₸", image: "https://files.gamehag.com/img/key_visual/awp_atheris.png" }
];

// Гифки для настроения (живой фон) - АКТУАЛЬНЫЕ CS:GO ФОНЫ (Радар/Мираж)
const backgrounds = {
    // Карта Mirage с эффектами, как будто бой идет прямо сейчас!
    energetic: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExazBqOWpzb2V0MDFkaHdwb2czdWlzNnl3c3h2d29yYml1cGNxNjR5bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kF28H5Y744bIuY3DmM/giphy.gif", 
    
    // HUD с радаром и тактической информацией.
    calm: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmwwd2Rjbm1jOXFxd3FmZnNqOGo5MWZib2Y0cW0xMXR0cjJpMDZlZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Jv8iJcI1W1HkG212bH/giphy.gif",
    
    // Эффект глитча/помех на фоне игрового процесса.
    moderate: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDYyMzh1cG94ZW10b2hwdml1ZWVvY2M2ajJ2OW12czZkYjhsc3R6OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XJ77xYn7F9gYg/giphy.gif"
};

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartCountElement = document.getElementById('cart-count');
const bgElement = document.getElementById('bg-video');

// Состояние Корзины (используем localStorage)
let cartItems = JSON.parse(localStorage.getItem('cs_cart')) || [];


// --- THEME AND MOOD LOGIC (Смена настроения) ---

function setMood(mood) {
    if(backgrounds[mood]) {
        bgElement.style.backgroundImage = `url('${backgrounds[mood]}')`;
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}


// --- CART LOGIC (Корзина) ---

function updateCartCount() {
    cartCountElement.innerText = cartItems.length;
}

function addToCart(productId) {
    const product = csProductsData.find(p => p.id === productId);
    if (product) {
        cartItems.push(product);
        localStorage.setItem('cs_cart', JSON.stringify(cartItems));
        updateCartCount();
        alert(`Скин "${product.name}" добавлен в инвентарь!`);
    }
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total');
    let total = 0;
    
    list.innerHTML = '';
    
    if (cartItems.length === 0) {
        list.innerHTML = '<p style="text-align: center;">Ваш инвентарь пуст.</p>';
        totalEl.innerText = 'Итого: 0 ₸';
    } else {
        cartItems.forEach(item => {
            total += item.price;
            list.innerHTML += `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <span>${item.displayPrice}</span>
                </div>
            `;
        });
        
        const formattedTotal = total.toLocaleString('ru-RU', { style: 'currency', currency: 'KZT', minimumFractionDigits: 0 });
        totalEl.innerText = `Итого: ${formattedTotal}`;
    }
    
    modal.style.display = "block";
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = "none";
}

// При нажатии "Оформить заказ" переходим на новую страницу
function goToCheckout() {
    if (cartItems.length === 0) {
        alert("Нельзя оформить пустой заказ!");
        return;
    }
    window.location.href = 'cs_checkout.html';
}


// --- PRODUCT RENDERING LOGIC (Отрисовка скинов) ---

function createProductCard(product) {
    return `
        <div class="product-card grade-${product.grade}">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>${product.category} | ${product.grade}</p>
                <div class="item-price">${product.displayPrice}</div>
                <button class="buy-btn" onclick="addToCart(${product.id})">Купить</button>
            </div>
        </div>
    `;
}

function renderAllProducts() {
    productsContainer.innerHTML = ''; 
    let productsHTML = '';
    
    csProductsData.forEach(product => {
        productsHTML += createProductCard(product);
    });
    
    productsContainer.innerHTML = productsHTML;
}

// --- ИНИЦИАЛИЗАЦИЯ (Запуск при загрузке) ---
setMood('moderate');
renderAllProducts();
updateCartCount();