var paragraph = document.getElementById("paragraphInput");
var form = document.getElementById("form");
var subject = document.getElementById("subject");
var names = document.getElementById("name");
var email = document.getElementById("email");
var lastname = document.getElementById("lastname");
var emailerror = document.getElementById("emailerror");
var emaill = document.getElementById("emaillogin");
var texterror = document.getElementById("text");
var passwordBox = document.getElementById("password");
var passwordWord = document.getElementById("passwordWord");
var loginform = document.getElementById("formlogin");
var loginforgot = document.getElementById("forgotlogin");
var passwordArray = ["123456"];
var sign = document.getElementById("sign");
localStorage.setItem("password", JSON.stringify(passwordArray));
/*login pagee*/
function validateEmail() {
    if (!emaill.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&
        emaill.value.trim() !== "") {
        texterror.innerHTML = "please enter valid email";
        return false;
    }
    texterror.innerHTML = "";
    return true;
}
passwordBox.addEventListener("focus", function () {
    console.log("e=hello");
    passwordWord.classList.add("clicked");
    loginforgot.innerText = "";
});
passwordBox.addEventListener("blur", function () {
    if (!this.value) {
        passwordWord.classList.remove("clicked");
    }
});
/*form login function*/
loginform.addEventListener("submit", function (e) {
    if (!validateEmail()) {
        e.preventDefault();
    }
    var messages = [];
    if (passwordBox.value.trim() === "" ||
        passwordBox.value.trim() == null ||
        passwordBox.value.length < 6) {
        messages.push("password have to be 6 characters");
    }
    // if (credentials.email !== 'dalidapcm@gmail.com')
    // {
    //     return
    // }
    if (messages.length > 0) {
        e.preventDefault();
        loginforgot.innerText = messages.join("\n");
    }
    // else if (passwordBox!.value !== '123456') {
    //     e.preventDefault();
    //     loginforgot!.innerText = 'invalid login';
    // }
    else if (validateEmail() && passwordBox.value.trim().length >= 6) {
        e.preventDefault();
        var credentials = {
            email: emaill.value.trim(),
            password: passwordBox.value.trim(),
        };
        // passwordArray.push(passwordBox!.value);
        // console.log(passwordArray);
        // localStorage.setItem('password', JSON.stringify(passwordArray));
        fetch("https://mybackend-kc02.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error("the response is not okay");
            }
            return response.json();
        })
            .then(function (data) {
            console.log("response from data", data);
            if (data.message == "Auth successful") {
                loginforgot.innerText = "invalid login";
                return;
            }
            var token = data.yourtoken;
            localStorage.setItem("token", JSON.stringify(token));
            // document.cookie = `token=${token}; path=/; max-age=3600; secure; SameSite=Strict`;
            console.log("hey het hey hey");
            console.log(document.cookie);
            sign.style.display = "inline-block";
            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 2000);
            // window.location.href = 'dashboard.html';
        })
            .catch(function (error) {
            loginforgot.innerText = "invalid login";
            console.error("this is the error", error);
        });
    }
});
