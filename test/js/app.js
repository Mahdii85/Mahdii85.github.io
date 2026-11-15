
/* ---------- سبد خرید (localStorage) ---------- */
const CART_KEY = 'faroshop_cart';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
const cartCount = () => getCart().reduce((s,i)=>s+i.qty,0);

function addToCart(id, qty=1){
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(item) item.qty += qty; else cart.push({id, qty});
  saveCart(cart); updateBadge(); toast('✅ به سبد خرید اضافه شد');
}
function setQty(id, qty){
  let cart = getCart();
  if(qty <= 0) cart = cart.filter(i => i.id !== id);
  else cart.find(i => i.id === id).qty = qty;
  saveCart(cart); updateBadge();
}
function updateBadge(){
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cartCount();
    el.style.display = cartCount() ? 'flex' : 'none';
  });
}
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ---------- هدر و فوتر مشترک ---------- */
function renderHeader(active){
  document.body.insertAdjacentHTML('afterbegin', `
  <header><div class="container nav">
    <a href="index.html" class="logo"><span>🛍️</span><span>فروشگاه من</span></a>
    <nav class="nav-links" id="navLinks">
      <a href="index.html" class="${active==='home'?'active':''}">خانه</a>
      <a href="shop.html" class="${active==='shop'?'active':''}">فروشگاه</a>
      <a href="index.html#cats">دسته‌بندی‌ها</a>
      <a href="index.html#features">چرا ما؟</a>
      <a href="cart.html" class="${active==='cart'?'active':''}">سبد خرید</a>
    </nav>
    <div style="display:flex;gap:12px;align-items:center">
      <a href="cart.html" class="cart-btn">🛒<span class="cart-count" style="display:none">0</span></a>
      <button class="mobile-menu" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
    </div>
  </div></header>`);
  updateBadge();
}
function renderFooter(){
  document.body.insertAdjacentHTML('beforeend', `
  <footer><div class="container">
    <div class="footer-grid">
      <div><h4>🛍️ فروشگاه من</h4><p style="font-size:14px;line-height:2">مرجع خرید آنلاین کالاهای دیجیتال، مد، ورزشی و زیبایی با ضمانت اصالت کالا و ارسال سریع به سراسر کشور.</p></div>
      <div><h4>دسترسی سریع</h4><a href="index.html">خانه</a><a href="shop.html">فروشگاه</a><a href="cart.html">سبد خرید</a><a href="admin.html">پنل مدیریت</a></div>
      <div><h4>خدمات مشتریان</h4><a href="#">پیگیری سفارش</a><a href="#">شرایط بازگشت</a><a href="#">پاسخ به پرسش‌ها</a></div>
      <div><h4>خبرنامه</h4><p style="font-size:14px">از تخفیف‌ها زودتر باخبر شوید:</p>
        <form class="news" onsubmit="event.preventDefault(); toast('📬 ایمیل شما ثبت شد'); this.reset();">
          <input type="email" placeholder="ایمیل شما" required><button>عضویت</button></form></div>
    </div>
    <div class="copy">© ۱۴۰۵ فروشگاه من — تمامی حقوق محفوظ است.</div>
  </div></footer>`);
}

/* ---------- کارت محصول ---------- */
function productCard(p){
  const d = off(p);
  return `<div class="card">
    <a href="product.html?id=${p.id}" class="thumb" style="background:${p.grad}">${p.emoji}
      ${d ? `<span class="off">٪${d}-</span>` : ''}</a>
    <div class="card-body">
      <span class="cat">${p.cat}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="stars">${stars(p.rating)}</div>
      <div class="price-row">
        <div><div class="price">${fmt(p.price)} <small>تومان</small></div>
        ${p.old ? `<div class="old-price">${fmt(p.old)}</div>` : ''}</div>
        <button class="add-btn" title="افزودن به سبد" onclick="addToCart(${p.id})">＋</button>
      </div>
    </div></div>`;
}
