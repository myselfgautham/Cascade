document.addEventListener('DOMContentLoaded', () => {
    let loginBtn = document.getElementById('login');
    loginBtn.addEventListener('click', () => {
        window.location.href = "/account/login";
    })
})