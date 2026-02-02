        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;

        const cartItems = document.getElementById("cart-items");
        const totalElement = document.getElementById("total");

        /* إضافة منتج */
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const item = button.parentElement;
                const name = item.dataset.name;
                const price = parseFloat(item.dataset.price);

                cart.push({ name, price });
                saveCart();
                renderCart();
            });
        });

        /* حفظ السلة */
        function saveCart() {
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        /* عرض السلة */
        function renderCart() {
            cartItems.innerHTML = "";
            total = 0;

            cart.forEach((item, index) => {
                total += item.price;

                cartItems.innerHTML += `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span>${item.name} - ${item.price} جنيه</span>
            <button onclick="removeItem(${index})">❌</button>
          </div>
        `;
            });

            totalElement.innerText = total;
        }

        /* حذف عنصر */
        function removeItem(index) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }

        /* طلب الآن + واتساب */
        document.getElementById("checkout").addEventListener("click", () => {
            if (cart.length === 0) {
                alert("❌ السلة فاضية");
                return;
            }

            let message = "🛒 طلب جديد من الكافيه:%0A";
            cart.forEach(item => {
                message += `- ${item.name} (${item.price} جنيه)%0A`;
            });
            message += `%0Aالإجمالي: ${total} جنيه`;

            // غير الرقم لرقمك
            let phone = "201004561691";
            let url = `https://wa.me/${phone}?text=${message}`;

            window.open(url, "_blank");

            cart = [];
            saveCart();
            renderCart();
        });

        /* تحميل السلة عند فتح الصفحة */
        renderCart();