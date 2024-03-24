var paragraphInput = document.getElementById('paragraphInput');
var formElement = document.getElementById('form');
var subjectElement = document.getElementById('subject');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var lastNameInput = document.getElementById('lastname');
var emailErrorElement = document.getElementById('emailerror');
var emailLoginInput = document.getElementById('emaillogin');
var textErrorElement = document.getElementById('text');
var passwordBoxInput = document.getElementById('password');
var passwordWordElement = document.getElementById('passwordWord');
//let contactsArray: any[] = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')!) : []; 
var home = document.getElementById('home');
var about = document.getElementById('about');
var aboutButton = document.getElementById('aboutButton');
var dashboardContact = document.getElementById('dashboardContact');
var contact = document.getElementById('contact');
var dashboardSkills = document.getElementById('dashboardSkills');
var skills = document.getElementById('skills');
var projectBlogId = document.getElementById('projectsblogid');
var readmorebutton = document.querySelectorAll('.read');
var othertext = document.querySelectorAll('.othertext');
window.onload = function () {
    displayBlogs();
};
readmorebutton.forEach(function (e, index) {
    e.addEventListener('click', function () {
        if (e.innerHTML === 'Show less') {
            othertext[index].style.display = 'none';
            e.innerHTML = 'Read more';
        }
        else {
            othertext[index].style.display = 'block';
            e.textContent = 'Show less';
        }
    });
});
function displayBlogs() {
    fetch('https://backend-fwkm.onrender.com/blogss')
        .then(function (response) {
        if (!response.ok)
            throw new Error('response is not okay');
        return response.json();
    }).then(function (data) {
        console.log(data);
        for (var i = 0; i < 2; i++) {
            var projectPhotoBlogDiv = document.createElement('div');
            projectPhotoBlogDiv.classList.add('projectphotoblog');
            projectPhotoBlogDiv.id = 'projectphotoblogid';
            // Create the title div
            var titleDiv = document.createElement('div');
            titleDiv.classList.add('titlepopulartopics');
            titleDiv.id = 'titlepopulartopicsid';
            titleDiv.textContent = data[i].title;
            // Create the image element
            var imgElement = document.createElement('img');
            imgElement.classList.add('photoblog');
            imgElement.id = 'photoblogid';
            imgElement.src = data[i].author;
            imgElement.alt = 'wait for the right time';
            // Create the blog description div
            var blogDescriptionDiv = document.createElement('div');
            blogDescriptionDiv.classList.add('thedigitalrealmblog');
            blogDescriptionDiv.id = 'thedigitalrealmblogid';
            blogDescriptionDiv.textContent = data[i].description.split('.')[0];
            var readMoreDiv = document.createElement('div');
            readMoreDiv.classList.add('readmoreblog');
            readMoreDiv.textContent = 'Readmore';
            // Append all elements to the main container
            projectPhotoBlogDiv.appendChild(titleDiv);
            projectPhotoBlogDiv.appendChild(imgElement);
            projectPhotoBlogDiv.appendChild(blogDescriptionDiv);
            projectPhotoBlogDiv.appendChild(readMoreDiv);
            projectBlogId === null || projectBlogId === void 0 ? void 0 : projectBlogId.appendChild(projectPhotoBlogDiv);
            clickTheBlog();
        }
    }).catch(function (error) {
        console.error(error, 'this is the error');
    });
}
function clickTheBlog() {
    var ArrayOfBlogs = document.querySelectorAll('.readmoreblog');
    ArrayOfBlogs.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'blog.html';
        });
    });
}
function AddToScroll(button, section) {
    button.addEventListener('click', function () {
        if (section) {
            section === null || section === void 0 ? void 0 : section.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
AddToScroll(dashboardSkills, skills);
AddToScroll(dashboardContact, contact);
AddToScroll(aboutButton, about);
saveToLocalStorage();
function validateEmailAddress() {
    if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && emailInput.value.trim() !== '') {
        if (emailErrorElement)
            emailErrorElement.innerHTML = 'please enter valid email';
        return false;
    }
    if (emailErrorElement)
        emailErrorElement.innerHTML = '';
    return true;
} //onkey is in the html file so no problem with this
function saveToLocalStorage() {
    formElement.addEventListener('submit', function (e) {
        console.log('hy');
        if (validateEmailAddress() && paragraphInput.value.trim() !== '' && emailInput.value.trim() !== '' && nameInput.value.trim() !== '' && lastNameInput.value.trim() !== '' && subjectElement.value.trim() !== '') {
            e.preventDefault();
            //  contactsArray.push([nameInput.value, lastNameInput.value, emailInput.value, paragraphInput.value]);
            //   localStorage.setItem('contacts', JSON.stringify(contactsArray));
            var message = {
                firstname: nameInput.value.trim(),
                lastname: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectElement.value.trim(),
                description: paragraphInput.value.trim()
            };
            fetch('https://backend-fwkm.onrender.com/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(function (data) {
                console.log('response from the server:', data);
                location.reload();
            }).catch(function (error) {
                console.error(error);
            });
        }
        else {
            e.preventDefault();
        }
    });
}
