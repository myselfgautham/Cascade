function logOutUserSession() {
    if (confirm("Are You Sure You Want To Sign Out\nYou Will Have To Login Again\nAs Per Our Security Policies"))
    {
        localStorage.setItem("LoggedIn", undefined);
        localStorage.setItem("Email", undefined);
        setTimeout(() => {
            window.location.href = "/";
        }, 200)
    }
}