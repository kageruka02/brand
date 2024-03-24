const paragraphInput: HTMLInputElement = document.getElementById('paragraphInput') as HTMLInputElement;
const formElement: HTMLFormElement = document.getElementById('form') as HTMLFormElement;
const subjectElement: HTMLInputElement = document.getElementById('subject') as HTMLInputElement;
const nameInput: HTMLInputElement = document.getElementById('name') as HTMLInputElement;
const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
const lastNameInput: HTMLInputElement = document.getElementById('lastname') as HTMLInputElement;
const emailErrorElement: HTMLElement | null = document.getElementById('emailerror');
const emailLoginInput: HTMLInputElement = document.getElementById('emaillogin') as HTMLInputElement;
const textErrorElement: HTMLElement | null = document.getElementById('text');
const passwordBoxInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
const passwordWordElement: HTMLElement | null = document.getElementById('passwordWord');
//let contactsArray: any[] = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')!) : []; 
const home: HTMLElement  | null = document.getElementById('home') ;
const about: HTMLElement  | null = document.getElementById('about') ;
const aboutButton:  HTMLElement  | null = document.getElementById('aboutButton') ;
const dashboardContact: HTMLElement | null = document.getElementById('dashboardContact');
const contact: HTMLElement | null = document.getElementById('contact');
const dashboardSkills: HTMLElement | null = document.getElementById('dashboardSkills');
const skills: HTMLElement | null = document.getElementById('skills');
const projectBlogId: HTMLElement | null = document.getElementById('projectsblogid');
const readmorebutton: NodeListOf<HTMLElement>= document.querySelectorAll('.read');
const othertext:  NodeListOf<HTMLElement>= document.querySelectorAll('.othertext');



window.onload = function() {
    displayBlogs();
}
readmorebutton!.forEach((e, index) => {
    e.addEventListener('click', () => {
    if(e.innerHTML === 'Show less')
    {
        othertext![index].style.display = 'none';
        e.innerHTML = 'Read more';
    }
   
else 
{
    othertext![index].style.display = 'block';
    e.textContent = 'Show less';
}

})}
)


function displayBlogs() {
    fetch('https://backend-fwkm.onrender.com/blogss')
    .then(response => {
        if (!response.ok)
        throw new Error('response is not okay');
    return response.json()
    }).then(data => {
        console.log(data);
        for(let i:number = 0; i<2; i++ )
        { const projectPhotoBlogDiv = document.createElement('div');
        projectPhotoBlogDiv.classList.add('projectphotoblog');
        projectPhotoBlogDiv.id = 'projectphotoblogid';
    
        // Create the title div
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titlepopulartopics');
        titleDiv.id = 'titlepopulartopicsid';
        titleDiv.textContent = data[i].title;
        
        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.classList.add('photoblog');
        imgElement.id = 'photoblogid';
        imgElement.src =data[i].author;
        imgElement.alt = 'wait for the right time';
    
        // Create the blog description div
        const blogDescriptionDiv = document.createElement('div');
        blogDescriptionDiv.classList.add('thedigitalrealmblog');
        blogDescriptionDiv.id = 'thedigitalrealmblogid';
        blogDescriptionDiv.textContent = data[i].description.split('.')[0];

        const readMoreDiv = document.createElement('div');
    readMoreDiv.classList.add('readmoreblog');
    readMoreDiv.textContent = 'Readmore';
    
        // Append all elements to the main container
        projectPhotoBlogDiv.appendChild(titleDiv);
        projectPhotoBlogDiv.appendChild(imgElement);
        projectPhotoBlogDiv.appendChild(blogDescriptionDiv);
        projectPhotoBlogDiv.appendChild(readMoreDiv);
        projectBlogId?.appendChild(projectPhotoBlogDiv);

        clickTheBlog();

        }
    }).catch(error => { 
        console.error(error, 'this is the error');
    })
}

function clickTheBlog() {
    const ArrayOfBlogs: NodeListOf<HTMLElement>= document.querySelectorAll('.readmoreblog');
    ArrayOfBlogs.forEach(e => {
        e.addEventListener('click', ()=> {
            window.location.href = 'blog.html';
        })
    })
}

function AddToScroll(button:HTMLElement | null, section:HTMLElement | null) : void
{
    button!.addEventListener('click', () => {
        if (section) {
            section?.scrollIntoView({ behavior: 'smooth' });
        }
    })
  

}
AddToScroll(dashboardSkills, skills);
AddToScroll(dashboardContact, contact);
AddToScroll(aboutButton,about);


saveToLocalStorage();




function validateEmailAddress(): boolean {
    if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && emailInput.value.trim() !== '') {
        if (emailErrorElement) emailErrorElement.innerHTML = 'please enter valid email';
        return false;
    }
    if (emailErrorElement) emailErrorElement.innerHTML = '';
    return true;
}//onkey is in the html file so no problem with this

function saveToLocalStorage(): void {
    formElement.addEventListener('submit', (e) => {
        console.log('hy');
        if (validateEmailAddress() && paragraphInput.value.trim() !== '' && emailInput.value.trim() !== '' && nameInput.value.trim() !== '' && lastNameInput.value.trim() !== '' && subjectElement.value.trim() !== '') {
            e.preventDefault();
          //  contactsArray.push([nameInput.value, lastNameInput.value, emailInput.value, paragraphInput.value]);
         //   localStorage.setItem('contacts', JSON.stringify(contactsArray));
         const message = {
            firstname: nameInput.value.trim(),
            lastname: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectElement.value.trim(),
            description: paragraphInput.value.trim()

         }
         fetch('https://backend-fwkm.onrender.com/messages' , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)

         }).then( (response) => {
            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }
            return response.json();

         }).then((data) => {
            console.log('response from the server:', data);
            location.reload();
         }).catch((error) => {
            console.error(error);
         })
            
        } else {
            e.preventDefault();
        }
    });
}
