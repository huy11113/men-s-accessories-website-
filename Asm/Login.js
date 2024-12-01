document.querySelector('.form-container form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Kiểm tra thông tin
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Lấy danh sách tài khoản từ Local Storage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Tìm tài khoản có thông tin phù hợp
    const user = accounts.find(acc => acc.email === email && acc.password === password);

    if (user) {
       
        alert(`Welcome back, ${user.name}!`);

        
        window.location.href = 'Home.html';
    } else {
       
        alert('Invalid email or password. Please try again.');
    }
});

