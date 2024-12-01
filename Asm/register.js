document.querySelector('.registration-form form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn gửi form

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Kiểm tra dữ liệu
    if (!name || !phone || !email || !password || !confirmPassword || !gender || !day || !month || !year) {
        alert('Please fill out all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Tạo đối tượng tài khoản
    const account = {
        name,
        phone,
        email,
        password,
        gender,
        birthdate: `${year}-${month}-${day}`
    };

    // Lấy danh sách tài khoản hiện có từ Local Storage
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Kiểm tra email đã tồn tại hay chưa
    if (accounts.some(acc => acc.email === email)) {
        alert('This email is already registered.');
        return;
    }

    // Thêm tài khoản mới
    accounts.push(account);

    // Lưu lại danh sách vào Local Storage
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Hiển thị thông báo đăng ký thành công
    alert('Registration successful! You can now log in.');

    // Chuyển hướng về trang login
    window.location.href = 'Login.html';
});
