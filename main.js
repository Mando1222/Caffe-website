let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

/* عرض السلة */
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    cartItems.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ${item.price} جنيه</span>
                <button class="remove" onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    totalElement.innerText = total;
}

/* إزالة عنصر من السلة */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

/* حفظ السلة */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* إضافة منتج */
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const itemDiv = button.parentElement;
        const name = itemDiv.getAttribute("data-name");
        const price = parseFloat(itemDiv.getAttribute("data-price"));

        if (!name || isNaN(price)) return;

        cart.push({ name, price });
        saveCart();
        renderCart();
    });
});

/* مشاركة الموقع */
document.getElementById("share-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("المتصفح لا يدعم تحديد الموقع");
        return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
        const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        document.getElementById("location").value += `\n${link}`;
    });
});

/* إرسال الطلب على واتساب */
document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("❌ السلة فاضية");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!name || !phone || !location) {
        alert("❗ اكتب الاسم ورقم الموبايل والعنوان");
        return;
    }

    let message = `🛒 طلب جديد من كافيه Mando\n\n`;
    message += `👤 الاسم: ${name}\n`;
    message += `📞 الموبايل: ${phone}\n`;
    message += `📍 العنوان: ${location}\n\n`;
    message += `📦 الطلب:\n`;

    cart.forEach(item => {
        message += `- ${item.name} (${item.price} جنيه)\n`;
    });

    message += `\n💰 الإجمالي: ${total} جنيه`;

    const whatsappURL = `https://wa.me/201004561691?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappURL; // يفتح App أو Web مباشرة

    cart = [];
    saveCart();
    renderCart();
    document.getElementById("order-form").reset();
});

/* تحميل السلة عند فتح الصفحة */
renderCart();
