let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
  // Reset slides
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.display = 'none';
  });

  // Show selected slide
  currentSlide = (index + slides.length) % slides.length; // Loop around
  slides[currentSlide].classList.add('active');
  slides[currentSlide].style.display = 'block';
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

// Auto slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

// Initial load
showSlide(currentSlide);

/* giỏ hàng */
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

