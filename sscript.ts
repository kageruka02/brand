const paragraph: HTMLElement | null = document.getElementById('paragraphInput');
const form: HTMLFormElement | null = document.getElementById('form') as HTMLFormElement;
const subject: HTMLElement | null = document.getElementById('subject');
const names: HTMLElement | null = document.getElementById('name');
const email: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
const lastname: HTMLElement | null = document.getElementById('lastname');
const emailerror: HTMLElement | null = document.getElementById('emailerror');
const emaill: HTMLInputElement | null = document.getElementById('emaillogin') as HTMLInputElement;
const texterror: HTMLElement | null = document.getElementById('text');
const passwordBox: HTMLInputElement | null = document.getElementById('password') as HTMLInputElement;
const passwordWord: HTMLElement | null = document.getElementById('passwordWord');

const loginform: HTMLFormElement | null = document.getElementById('formlogin') as HTMLFormElement;
const loginforgot: HTMLElement | null = document.getElementById('forgotlogin');
const passwordArray: string[] = ['123456'];
const sign: HTMLElement | null = document.getElementById('sign') as HTMLElement;
localStorage.setItem('password', JSON.stringify(passwordArray));

/*login pagee*/
function validateEmail(): boolean {
    if (!emaill!.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && emaill!.value.trim() !== '') {
        texterror!.innerHTML = 'please enter valid email';
        return false;
    }
    texterror!.innerHTML = '';
    return true;
}

passwordBox!.addEventListener('focus', function () {
    console.log('e=hello');
    passwordWord!.classList.add('clicked');
    loginforgot!.innerText = '';
});

passwordBox!.addEventListener('blur', function () {
    if (!this.value) {
        passwordWord!.classList.remove('clicked');
    }
});

/*form login function*/
loginform!.addEventListener('submit', (e) => {
    if (!validateEmail()) {
        e.preventDefault();
    }
    let messages: string[] = [];
    if (passwordBox!.value.trim() === '' || passwordBox.value.trim() == null || passwordBox!.value.length < 6) {
        messages.push('password have to be 6 characters');
    }
    // if (credentials.email !== 'dalidapcm@gmail.com')
    // {
        
    //     return 
    // }
    if (messages.length > 0) {
        e.preventDefault();
        loginforgot!.innerText = messages.join('\n');
    } 
    // else if (passwordBox!.value !== '123456') {
    //     e.preventDefault();
    //     loginforgot!.innerText = 'invalid login';
    // } 

    else if (validateEmail() && passwordBox!.value.trim().length>=6) {
        e.preventDefault();
        let credentials = {
            email: emaill!.value.trim(),
            password: passwordBox!.value.trim()
        }
       
        // passwordArray.push(passwordBox!.value);
        // console.log(passwordArray);
        // localStorage.setItem('password', JSON.stringify(passwordArray)); 
        fetch('https://backend-fwkm.onrender.com/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        })
        .then((response) => {
            if (!response.ok) 
            {
                throw new Error('the response is not okay')
            }
            return response.json()
        })
        .then((data) => {
            console.log('response from data', data);
            if(data.message == 'Auth successful')
            {
                loginforgot!.innerText = 'invalid login';
                return;

            }
            const token = data.yourtoken;
            localStorage.setItem('token', JSON.stringify(token));
           // document.cookie = `token=${token}; path=/; max-age=3600; secure; SameSite=Strict`;
            console.log('hey het hey hey');
            console.log(document.cookie);
           sign.style.display = 'inline-block';
           setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
            // window.location.href = 'dashboard.html';


        })
        .catch((error) => {
            loginforgot!.innerText = 'invalid login';
            console.error('this is the error', error)
        })
    }
});