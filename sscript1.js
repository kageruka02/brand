var inputdashboard = document.getElementById("inputdashboard");
/*title place*/
var paragraphdashboard = document.getElementById("paragraphdashboard");
/*paragraph on create article*/
var footerdashboard = document.getElementById("footer");
/*footer*/
var senddashboard = document.getElementById("senddashboard");
/*the send button*/
var formdashboard = document.getElementById("formdashboard");
var thewholeedittable = document.getElementById("thewholeedittable");
var checking = "";
var inputdashboardedit = document.getElementById("inputdashboardedit");
var paragraphdashboardedit = document.getElementById("paragraphdashboardedit");
var footerdashboardedit = document.getElementById("footeredit");
var messagediv = document.getElementById("messagediv");
var table = document.getElementById("table");
var tablecreatearticle = document.getElementById("thewholecreatetable");
//tablecreatearticle.style.display = 'none';
//table.style.display = 'none';
var originalDisplay = window.getComputedStyle(thewholeedittable).display;
thewholeedittable.style.display = "none";
tablecreatearticle.style.display = "none";
//table.style.display = 'none';
var dashboardbutton = document.getElementById("dashboardbutton");
var newarticlebutton = document.getElementById("newarticlebutton");
var messagesbutton = document.getElementById("messagesbutton");
var themessagedash = document.getElementById("themessagedash");
themessagedash.style.display = "none";
var logoutbutton = document.getElementById("logoutbutton");
var nomessage = document.getElementById("nomessage");
var displayMessageId = document.getElementById("displayMessageId");
/*dashboard functions*/
dashboardbutton.addEventListener("click", function (e) {
    location.reload();
});
messagesbutton.addEventListener("click", function (e) {
    thewholeedittable.style.display = "none";
    tablecreatearticle.style.display = "none";
    table.style.display = "none";
    themessagedash.style.display = "block";
});
newarticlebutton.addEventListener("click", function (e) {
    thewholeedittable.style.display = "none";
    table.style.display = "none";
    themessagedash.style.display = "none";
    tablecreatearticle.style.display = "block";
});
function deleteCookie(name) {
    document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
}
logoutbutton.addEventListener("click", function (e) {
    localStorage.clear();
    window.location.href = "login.html";
});
var blogss;
var k = 0;
/* this number helps to get the return of the activateEditListeners which we use for manipulating publish and delete */
function activateEditListeners() {
    var editBtn = document.querySelectorAll(".blogpagess");
    editBtn.forEach(function (eb, i) {
        eb.addEventListener("click", function () {
            k = i;
            themessagedash.style.display = "none";
            tablecreatearticle.style.display = "none";
            table.style.display = "none";
            thewholeedittable.style.display = originalDisplay;
            inputdashboardedit.value = blogss[i].title;
            paragraphdashboardedit.value = blogss[i].description;
            console.log(blogss[i].author);
            //  footerdashboardedit!.value = blogss[i].author;
        });
    });
}
var image;
footerdashboardedit.addEventListener("change", function () {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        if (reader.result) {
            image = reader.result;
            console.log("uri imbwa");
        }
        else {
            image = false;
            console.log("it failed");
        }
    });
    reader.readAsDataURL(this.files[0]);
});
function activatePublishListeners() {
    var sendii = document.getElementById("publishbutton");
    sendii.addEventListener("click", function (e) {
        e.preventDefault();
        // console.log(itemsArray[k]);
        if (inputdashboardedit.value.toString() !== "" ||
            paragraphdashboardedit.value.toString() !== "") {
            // itemsArray[k][0] = inputdashboardedit!.value;
            // itemsArray[k][1] = paragraphdashboardedit!.value;
            // console.log(inputdashboardedit!.value);
            // console.log(paragraphdashboardedit!.value);
            // e.preventDefault();
            //  itemsArray[k][2] = footerdashboardedit!.value;
            //   localStorage.setItem('items', JSON.stringify(itemsArray));
            // location.reload();
            var updatedBlog = {
                title: inputdashboardedit.value.toString(),
                author: !image ? blogss[k].author : image,
                topictext: blogss[k].topictext,
                description: paragraphdashboardedit.value.toString(),
            };
            if (window.confirm("the blog will be edited")) {
                sendii.style.minWidth = "100px";
                sendii.innerHTML = "publishing ...";
                var tokenStringified = localStorage.getItem("token");
                var token = JSON.parse(tokenStringified);
                console.log(token);
                var blogId = blogss[k]._id;
                fetch("https://mybackend-kc02.onrender.com/blogss/".concat(blogId), {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer ".concat(token),
                    },
                    body: JSON.stringify(updatedBlog),
                })
                    .then(function (response) {
                    if (!response.ok)
                        throw new Error("your response is not okay");
                    return response.json();
                })
                    .then(function (data) {
                    console.log(data);
                    setMessage("Blog edited successfully");
                    //location.reload();
                })
                    .catch(function (error) {
                    console.error("the error is this", error);
                });
            }
        }
    });
}
/*handling the message displayed when we publish , edit , create new blog , message*/
function setMessage(message) {
    var url = new URL(window.location.href);
    url.searchParams.set("msg", message);
    window.location.href = url.href;
}
function displayMessage() {
    var urlParams = new URLSearchParams(window.location.search);
    var message = urlParams.get("msg");
    if (message) {
        displayMessageId.style.display = "block";
        displayMessageId.textContent = message;
        urlParams.delete("msg");
        var newUrl = "?" + urlParams.toString();
        window.history.replaceState({}, "", newUrl);
    }
    setTimeout(function () {
        displayMessageId.style.display = "none";
    }, 4000);
}
function activatedeletebutton() {
    var deletebutton = document.getElementById("deletebutton");
    deletebutton.addEventListener("click", function (e) {
        // itemsArray.splice(k, 1);
        // localStorage.setItem('items', JSON.stringify(itemsArray));
        // location.reload;
        if (window.confirm("are you sure you want to delete this article")) {
            e.preventDefault();
            deletebutton.style.minWidth = "100px";
            deletebutton.innerHTML = "deleting ...";
            var blogId = blogss[k]._id;
            var tokenStringified = localStorage.getItem("token");
            var token = JSON.parse(tokenStringified);
            fetch("https://mybackend-kc02.onrender.com/blogss/".concat(blogId), {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer ".concat(token),
                },
            })
                .then(function (response) {
                if (!response.ok)
                    throw new Error("the response was not okay");
                return response.json();
            })
                .then(function (data) {
                console.log(data);
                setMessage("Blog deleted successfully");
                //location.reload();
            })
                .catch(function (error) {
                console.error("the error is this", error);
            });
        }
    });
}
var itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
console.log(itemsArray);
function displayDate() {
    var date = new Date();
    var datestring = date.toString().split(" ");
    checking = datestring[1] + "." + datestring[2] + "." + datestring[3];
    console.log(checking);
}
function validpassword() {
    var thepasswordarray = JSON.parse(localStorage.getItem("password"));
    return thepasswordarray[0] == thepasswordarray[1];
}
window.onload = function () {
    // if (getTokenFromCookie() == null) window.location.href = 'login.html';
    if (!localStorage.getItem("token"))
        window.location.href = "login.html";
    // console.log(localStorage.getItem('token'));
    displayMessage();
    displayDate();
    displaydashboard();
    displaymessage();
};
//displaymessage();
function displaydashboard() {
    fetch("https://mybackend-kc02.onrender.com/blogss")
        .then(function (response) {
        if (!response.ok)
            throw new Error("the response was not okay");
        return response.json();
    })
        .then(function (data) {
        blogss = data;
        for (var i = 0; i < data.length; i++) {
            // Create a new row
            var newRow = document.createElement("div");
            newRow.className = "rows";
            // Create individual elements for the row
            var articleDiv = document.createElement("div");
            articleDiv.className = "articledashboards";
            articleDiv.textContent = data[i].title;
            var dateDiv = document.createElement("div");
            dateDiv.className = "date";
            dateDiv.id = "date";
            dateDiv.textContent = data[i].topictext;
            var editDiv = document.createElement("div");
            editDiv.className = "edit";
            editDiv.id = "editid";
            // Create a button element
            var buttonElement = document.createElement("button");
            buttonElement.className = "blogpagess";
            buttonElement.textContent = "edit";
            // Append the button to editDiv
            editDiv.appendChild(buttonElement);
            // Append individual elements to the row
            newRow.appendChild(articleDiv);
            newRow.appendChild(dateDiv);
            newRow.appendChild(editDiv);
            // Append the new row to the table
            table.appendChild(newRow);
        }
        activateEditListeners();
        activatePublishListeners();
        activatedeletebutton();
    })
        .catch(function (error) {
        console.error("this is the error", error);
    });
    //     for (let i: number = 0; i < itemsArray.length; i++) {
    //         // Create a new row
    //         let newRow: HTMLDivElement = document.createElement('div');
    //         newRow.className = 'rows';
    //         // Create individual elements for the row
    //         let articleDiv: HTMLDivElement = document.createElement('div');
    //         articleDiv.className = 'articledashboards';
    //         articleDiv.textContent = itemsArray[i][0];
    //         let dateDiv: HTMLDivElement = document.createElement('div');
    //         dateDiv.className = 'date';
    //         dateDiv.id = 'date';
    //         dateDiv.textContent = itemsArray[i][3];
    //         let editDiv: HTMLDivElement = document.createElement('div');
    //         editDiv.className = 'edit';
    //         editDiv.id = 'editid';
    //         // Create a button element
    //         let buttonElement: HTMLButtonElement = document.createElement('button');
    //         buttonElement.className = 'blogpagess';
    //         buttonElement.textContent = 'edit';
    //         // Append the button to editDiv
    //         editDiv.appendChild(buttonElement);
    //         // Append individual elements to the row
    //         newRow.appendChild(articleDiv);
    //         newRow.appendChild(dateDiv);
    //         newRow.appendChild(editDiv);
    //         // Append the new row to the table
    //         table!.appendChild(newRow);
    //     }
}
var themessages;
var numbers;
function displaymessage() {
    /* const hello: any[] | null = JSON.parse(localStorage.getItem('contacts')!);*/
    fetch("https://mybackend-kc02.onrender.com/messages")
        .then(function (response) {
        if (!response.ok)
            throw new Error("Response was not okay");
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        console.log(data);
        themessages = data;
        console.log(themessages);
        console.log(typeof themessages);
        console.log(typeof data);
        if (data.message) {
            nomessage.style.display = "flex";
            console.log(data.message);
        }
        else {
            // nomessage!.classList.remove('');
            // nomessage!.classList.add('hidden');
            nomessage.style.display = "none";
            console.log("thank you");
        }
        for (var i = 0; i < data.length; i++) {
            var tabledash = document.createElement("div");
            tabledash.className = "tabledash";
            var messageblo = document.createElement("div");
            messageblo.className = "messageblo";
            var devimage = new Image();
            devimage.src = "icons8-delete-48 (1).png";
            devimage.className = "deleteicon";
            var photodiv = document.createElement("div");
            photodiv.appendChild(devimage);
            var replyimage = new Image();
            replyimage.src = "reply.png";
            replyimage.className = "reply";
            var replydiv = document.createElement("div");
            replydiv.className = "replydiv";
            replydiv.appendChild(replyimage);
            var chatsdashboard = document.createElement("div");
            chatsdashboard.className = "chatsdashboard";
            var identification = document.createElement("div");
            identification.className = "identification";
            var Muhizi = document.createElement("div");
            Muhizi.className = "Muhizi";
            Muhizi.innerText = "".concat(data[i].firstname, " ").concat(data[i].lastname, " ");
            var email = document.createElement("div");
            email.innerText = data[i].email;
            var date = document.createElement("div");
            date.innerText = checking;
            var message = document.createElement("div");
            message.className = "yournumber";
            message.innerText = data[i].description;
            identification.appendChild(Muhizi);
            identification.appendChild(email);
            identification.appendChild(date);
            identification.appendChild(photodiv);
            identification.appendChild(replydiv);
            chatsdashboard.appendChild(identification);
            chatsdashboard.appendChild(message);
            /*messageblo.appendChild(devimage);*/
            messageblo.appendChild(chatsdashboard);
            tabledash.appendChild(messageblo);
            messagediv.appendChild(tabledash);
        }
        deletemessage();
        activatereplybutton();
    })
        .catch(function (error) {
        // console.error('Error fetching messages:', error);
        // alert('Failed to fetch messages. Please try again later.');
    });
}
function activatereplybutton() {
    var replybutton = document.querySelectorAll(".reply");
    replybutton.forEach(function (e, index) {
        e.addEventListener("click", function () {
            var bodyText = "Thank you for writing I will reach you in time";
            window.open("mailto:".concat(themessages[index].email, "?subject=Subject&body=").concat(encodeURIComponent(bodyText)));
        });
    });
}
function deletemessage() {
    var deletebutton = document.querySelectorAll(".deleteicon");
    deletebutton.forEach(function (e, index) {
        e.addEventListener("click", function () {
            if (window.confirm("are you sure you want to delete the message")) {
                console.log(index);
                var target_1 = event.target;
                var id = themessages[index]._id;
                fetch("https://mybackend-kc02.onrender.com/messages/".concat(id), {
                    method: "DELETE",
                }).then(function (response) {
                    if (!response.ok) {
                        throw new Error("Failed to delete data from the backend");
                    }
                    //  return response.json();
                    var tabledashElement = target_1.closest(".tabledash");
                    if (tabledashElement) {
                        tabledashElement.remove();
                    }
                    deletebutton = document.querySelectorAll(".deleteicon");
                    if (deletebutton.length < 1) {
                        nomessage.style.display = "flex";
                    }
                    // Reload the page after successful deletion
                    // location.reload();
                });
            }
            // .then((data) => {
            //     console.log(data);
            // })
            // .catch((error) => {
            //     console.error('this is the error', error)
            // })
        });
    });
}
var hello;
footerdashboard.addEventListener("change", function () {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        hello = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});
function getTokenFromCookie() {
    var cookieString = document.cookie;
    console.log(cookieString, "is the best");
    var cookies = cookieString.split(";").map(function (cookie) { return cookie.trim(); });
    console.log(cookies);
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.split("="), name_1 = _a[0], value = _a[1];
        if (name_1 === "token") {
            return decodeURIComponent(value);
        }
        console.log([name_1, value]);
    }
    return null; // Token cookie not found
}
function AddAblog() {
    formdashboard.addEventListener("submit", function (e) {
        if (inputdashboard.value === "" ||
            !inputdashboard.value ||
            paragraphdashboard.value === "" ||
            !paragraphdashboard.value) {
            e.preventDefault();
        }
        else {
            e.preventDefault();
            var blog = {
                title: inputdashboard.value.trim(),
                author: hello,
                topictext: checking,
                description: paragraphdashboard.value.trim(),
            };
            var tokenStringified = localStorage.getItem("token");
            var token = JSON.parse(tokenStringified);
            fetch("https://mybackend-kc02.onrender.com/blogss", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(token),
                },
                body: JSON.stringify(blog),
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("the response was not okay");
                }
            })
                .then(function (data) {
                console.log("this is the data", data);
                setMessage("Blog created successfully");
            })
                .catch(function (error) {
                console.error("this is the error", error);
            });
            // console.log(paragraphdashboard!.value);
            // console.log(inputdashboard!.value);
            //  console.log(hello);
            //console.log(footerdashboard.value);
            // itemsArray.push([inputdashboard!.value, paragraphdashboard!.value, hello, checking]);
            // localStorage.setItem('items', JSON.stringify(itemsArray));
            //  location.reload();
        }
    });
}
AddAblog();
table.classList.add("hidden");
