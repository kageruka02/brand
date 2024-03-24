const paragraphinput = document.getElementById('paragraphInput');
const form  = document.getElementById('form');
const subject = document.getElementById('subject');
const name = document.getElementById('name');
const email = document.getElementById('email');
const lastname = document.getElementById('lastname');
const emailerror = document.getElementById('emailerror');
const emaill = document.getElementById('emaillogin');
const texterror = document.getElementById('text');
const passwordBox = document.getElementById('password');
const passwordWord = document.getElementById('passwordWord');

const formlogin = document.getElementById('formlogin');
const forgotlogin = document.getElementById('forgotlogin');
const arrayofpassword = ['123456']; 
localStorage.setItem('password',JSON.stringify(arrayofpassword))
/*login pagee*/
function validateEmail(){
    if (!emaill.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && emaill.value.trim() !== ''){
        texterror.innerHTML = 'please enter valid email';
        return false;
     }
     texterror.innerHTML = '';
     return true;     
}

passwordBox.addEventListener('focus', function() {
    console.log('e=hello');
   passwordWord.classList.add('clicked');
});
passwordBox.addEventListener('blur' , function(){
    if (!this.value)
    {
        passwordWord.classList.remove('clicked');
    }
}) ;
/*form login function*/
formlogin.addEventListener('submit' , (e) => {
    if (!validateEmail()){
        e.preventDefault();
    }
let messages = [];
if (passwordBox.value === '' || passwordBox == null || passwordBox.value.length < 6)
{
    messages.push('password have to be 6 characters')
}
if (messages.length > 0)
{
    e.preventDefault()
    forgotlogin.innerText = messages;
}
else if (passwordBox.value !== '123456'){
    e.preventDefault();
    forgotlogin.innerText = 'invalid login'
}
else if (validateEmail() && passwordBox.value == arrayofpassword[0] )
{
    e.preventDefault();
    arrayofpassword.push(passwordBox.value);
    console.log(arrayofpassword)
    localStorage.setItem('password',JSON.stringify(arrayofpassword));
    window.location.href = 'dashboard.html';
}
}
)
/*login page*/
/*portfolio page*/

