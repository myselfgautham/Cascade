function routeLogin()
{
    window.location.href = "/login";
}

function signup()
{
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var hashSet = [name,email,phone,password];
    var notifier = document.getElementById("notifier");
    if (hashSet.includes(""))
    {
        notifier.style.display = "block";
        notifier.innerText = "Please Fill In All Fields"
    }
    else if ((!email.includes("@")) || (!(email.includes("."))) || (email.length < 5))
    {
        notifier.style.display = "block";
        notifier.innerText = "Enter A Valid Email Address"
    }
    else if (!isValidPhoneNumber(phone) || phone.length <= 5)
    {
        notifier.style.display = "block";
        notifier.innerText = "Enter A Valid Phone Number"
    }
    else if (password.length < 8)
    {
        notifier.style.display = "block";
        notifier.innerText = "Choose A Stronger Password"
    }
    else {
        notifier.style.display = "none";
        console.log("All Set!")
    }
}

function isValidPhoneNumber(phoneNumber)
{
    var regex = /^\+\d{1,3}\d{6,14}$/;
    return regex.test(phoneNumber);
}