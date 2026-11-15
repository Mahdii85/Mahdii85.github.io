
const PRODUCTS = [
 {id:1, name:"هدفون بی‌سیم پرو", cat:"دیجیتال", price:2890000, old:3590000, emoji:"🎧", grad:"linear-gradient(135deg,#c7d2fe,#a5b4fc)", rating:5, stock:12, desc:"هدفون بلوتوثی با نویزکنسلینگ فعال، باتری ۴۰ ساعته و صدای استودیویی. دارای میکروفون دوگانه برای تماس‌های شفاف."},
 {id:2, name:"ساعت هوشمند اسپرت", cat:"دیجیتال", price:3450000, old:4200000, emoji:"⌚", grad:"linear-gradient(135deg,#bae6fd,#7dd3fc)", rating:4, stock:8, desc:"ساعت هوشمند با نمایشگر AMOLED، پایش ضربان قلب، اکسیژن خون و بیش از ۱۰۰ حالت ورزشی. ضدآب ۵ATM."},
 {id:3, name:"کیف چرم دست‌دوز", cat:"مد و پوشاک", price:1850000, old:null, emoji:"👜", grad:"linear-gradient(135deg,#fde68a,#fbbf24)", rating:5, stock:20, desc:"کیف چرم طبیعی دست‌دوز با دوخت ظریف، مناسب استفاده روزمره و محیط کار."},
 {id:4, name:"کفش رانینگ ایر", cat:"ورزشی", price:2150000, old:2680000, emoji:"👟", grad:"linear-gradient(135deg,#a7f3d0,#6ee7b7)", rating:4, stock:15, desc:"کفش دویدن با زیره فنری و رویه تنفس‌پذیر؛ سبک و راحت برای مسافت‌های طولانی."},
 {id:5, name:"دوربین عکاسی میرورلس", cat:"دیجیتال", price:12400000, old:13900000, emoji:"📷", grad:"linear-gradient(135deg,#ddd6fe,#c4b5fd)", rating:5, stock:5, desc:"دوربین میرورلس ۲۴ مگاپیکسلی با فیلم‌برداری 4K و لرزشگیر داخل بدنه."},
 {id:6, name:"عطر مردانه رویال", cat:"زیبایی و سلامت", price:1480000, old:1890000, emoji:"🧴", grad:"linear-gradient(135deg,#fecdd3,#fda4af)", rating:4, stock:25, desc:"عطر مردانه با رایحه چوبی-شرقی، ماندگاری بالا و حجم ۱۰۰ میلی‌لیتر."},
 {id:7, name:"اسپیکر بلوتوثی قابل حمل", cat:"دیجیتال", price:980000, old:1250000, emoji:"🔊", grad:"linear-gradient(135deg,#fbcfe8,#f9a8d4)", rating:4, stock:30, desc:"اسپیکر قابل حمل ضدآب با ۲۰ ساعت پخش موسیقی و اتصال TWS."},
 {id:8, name:"ست قهوه‌ساز و آسیاب", cat:"خانه و آشپزخانه", price:4320000, old:null, emoji:"☕", grad:"linear-gradient(135deg,#e7e5e4,#d6d3d1)", rating:5, stock:10, desc:"قهوه‌ساز اسپرسو ۱۵ بار با آسیاب سرامیکی؛ لذت قهوه تازه در خانه."},
 {id:9, name:"کوله‌پشتی لپ‌تاپ", cat:"مد و پوشاک", price:890000, old:1100000, emoji:"🎒", grad:"linear-gradient(135deg,#cffafe,#67e8f9)", rating:4, stock:18, desc:"کوله ضدآب با محفظه مخصوص لپ‌تاپ ۱۵.۶ اینچی و پورت USB بیرونی."},
 {id:10,name:"صندلی گیمینگ ارگو", cat:"خانه و آشپزخانه", price:5600000, old:6800000, emoji:"🪑", grad:"linear-gradient(135deg,#d9f99d,#a3e635)", rating:5, stock:7, desc:"صندلی گیمینگ با پشتیبانی کمری تنظیم‌شونده، دسته 4D و روش تنفس‌پذیر."},
 {id:11,name:"کرم مرطوب‌کننده طبیعی", cat:"زیبایی و سلامت", price:420000, old:560000, emoji:"🧴", grad:"linear-gradient(135deg,#fef3c7,#fcd34d)", rating:4, stock:40, desc:"کرم مرطوب‌کننده با عصاره آلوئه‌ورا و هیالورونیک اسید؛ مناسب انواع پوست."},
 {id:12,name:"دمبل تنظیمی ۲۰ کیلویی", cat:"ورزشی", price:1750000, old:null, emoji:"🏋️", grad:"linear-gradient(135deg,#fecaca,#fca5a5)", rating:5, stock:14, desc:"ست دمبل قابل تنظیم ۲ تا ۲۰ کیلوگرم با دسته چرمی ضدلغزش."}
];
const CATEGORIES = [
 {name:"دیجیتال", icon:"💻", count:0},
 {name:"مد و پوشاک", icon:"👕", count:0},
 {name:"ورزشی", icon:"🏀", count:0},
 {name:"خانه و آشپزخانه", icon:"🏠", count:0},
 {name:"زیبایی و سلامت", icon:"💄", count:0}
];
CATEGORIES.forEach(c => c.count = PRODUCTS.filter(p => p.cat === c.name).length);
const fmt = n => n.toLocaleString('fa-IR');
const stars = r => "★".repeat(r) + "☆".repeat(5 - r);
const off = p => p.old ? Math.round((1 - p.price/p.old)*100) : 0;

// ---------- پنل ادمین: محصولات ویرایش‌شده ----------
const _savedProducts = localStorage.getItem('faroshop_products');
if (_savedProducts) {
  try {
    PRODUCTS.length = 0;
    PRODUCTS.push(...JSON.parse(_savedProducts));
    CATEGORIES.forEach(c => c.count = PRODUCTS.filter(p => p.cat === c.name).length);
  } catch(e) {}
}
const saveProducts = () => localStorage.setItem('faroshop_products', JSON.stringify(PRODUCTS));
