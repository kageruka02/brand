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
let contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : []; 
storetolocal();
function validateEmail(){
    if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && email.value.trim() !== ''){
        emailerror.innerHTML = 'please enter valid email';
        return false;
     }
     emailerror.innerHTML = '';   
     return true;  
}//for this function this to be trigerred i put onkey element in html
function storetolocal()
{
  
    form.addEventListener('submit', (e) => {
        console.log('hy');
        if (validateEmail() && paragraphinput.value.trim() !== '' && email.value.trim() !== '' && name.value.trim() !== '' && lastname.value.trim() !== '')
        {
           
            e.preventDefault();
            contacts.push([name.value, lastname.value, email.value, paragraphinput.value]);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            location.reload();
        }
        else{
            e.preventDefault();
        }

    } )
}