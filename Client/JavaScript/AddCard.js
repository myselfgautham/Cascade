import {
    validateCookies,
    enforceCookiesPolicy,
    getCookieFromStorage
} from "/static/JavaScript/Cookies.js"
enforceCookiesPolicy()
validateCookies()
document.addEventListener("DOMContentLoaded", () => {
    let exit = document.getElementById("exit");
    exit.addEventListener("click", () => {
        window.location.href = "/cards";
    })
    let buffers = {
        F1: document.getElementById("f1"),
        F2: document.getElementById("f2"),
        F3: document.getElementById("f3")
    }
    document.getElementById("encrypt").addEventListener("click", () => {
        if (buffers.F1.checked === true) {
            buffers.F1.checked = false;
            document.getElementById("encrypt").style.color = "white";
        } else {
            buffers.F1.checked = true;
            document.getElementById("encrypt").style.color = "orange";
        }
    })
    document.getElementById("verify").addEventListener("click", () => {
        if (buffers.F2.checked === true) {
            buffers.F2.checked = false;
            document.getElementById("verify").style.color = "white";
        } else {
            buffers.F2.checked = true;
            document.getElementById("verify").style.color = "orange";
        }
    })
    document.getElementById("cvv").addEventListener("click", () => {
        if (buffers.F3.checked === true) {
            buffers.F3.checked = false;
            document.getElementById("cvv").style.color = "white";
        } else {
            buffers.F3.checked = true;
            document.getElementById("cvv").style.color = "orange";
        }
    })
    document.getElementById("buffer").value = getCookieFromStorage("Email")
    document.getElementById("cardNumber").addEventListener("focusout", () => {
        if (
            (document.getElementById("cardNumber").value != "")
        )
        {
            let ret = sizedSplit(document.getElementById("cardNumber").value.replace(/\s/g, ""), 4);
            var res = "";
            document.getElementById("cardNumber").value = "";
            for (let i = 0; i < ret.length; i++) {
                if (i === 0) {
                    res += ret[i];
                } else {
                    res += ` ${ret[i]}`;
                }
            }
            document.getElementById("cardNumber").value = res;
        }
    })
})
function sizedSplit(str, size)
{
    return str.match(new RegExp('.{1,' + size + '}', 'g'));
}
function hasWhiteSpace(s)
{
    return /\s/g.test(s);
}