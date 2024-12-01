// Lấy các nút "Thêm vào giỏ hàng"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const notification = document.getElementById("notification");

// Hiển thị thông báo
function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000); // 3 giây
}

// Lưu sản phẩm vào LocalStorage
function addToCart(event) {
    const productItem = event.target.closest(".product-item");
    const productId = productItem.getAttribute("data-id");
    const productName = productItem.querySelector("h3").textContent;
    const productPrice = productItem.querySelector(".price").textContent;
    const productImage = productItem.querySelector("img").src;

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    };

    // Lấy dữ liệu giỏ hàng từ LocalStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);

    // Lưu lại giỏ hàng
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hiển thị thông báo
    showNotification();
}

// Gắn sự kiện cho các nút
addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            products.forEach((product) => {
                if (category === "all" || product.getAttribute("data-category").toLowerCase() === category.toLowerCase()) {
                    product.style.display = "block"; // Hiện sản phẩm
                } else {
                    product.style.display = "none"; // Ẩn sản phẩm
                }
            });
        });
    });
});
function sortProducts() {
    const sortOrder = document.getElementById('sort').value;  // Lấy giá trị của dropdown
    const productContainer = document.querySelector('.products');
    const products = Array.from(productContainer.getElementsByClassName('product-item'));

    // Sắp xếp các sản phẩm dựa trên giá
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace(' VNĐ', '').replace('.', '').trim());
        const priceB = parseFloat(b.querySelector('.price').textContent.replace(' VNĐ', '').replace('.', '').trim());

        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Chèn lại các sản phẩm đã sắp xếp vào container
    products.forEach(product => productContainer.appendChild(product));
}
