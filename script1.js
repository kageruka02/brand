const inputdashboard =  document.getElementById('inputdashboard');
/*title place*/
const paragraphdashboard = document.getElementById('paragraphdashboard');/*paragraph on create article*/
let footerdashboard = document.getElementById('footer');/*footer*/
const senddashboard = document.getElementById('senddashboard');/*the send button*/
const formdashboard = document.getElementById('formdashboard');
const thewholeedittable = document.getElementById('thewholeedittable')
let checking = '';
const inputdashboardedit = document.getElementById('inputdashboardedit');
const paragraphdashboardedit = document.getElementById('paragraphdashboardedit');
const footerdashboardedit = document.getElementById('footeredit');
let table = document.getElementById('table');
let tablecreatearticle = document.getElementById('thewholecreatetable');
//tablecreatearticle.style.display = 'none';
//table.style.display = 'none';
const originalDisplay = window.getComputedStyle(thewholeedittable).display;
thewholeedittable.style.display = 'none';
tablecreatearticle.style.display = 'none';
//table.style.display = 'none';
const dashboardbutton = document.getElementById('dashboardbutton');
const newarticlebutton = document.getElementById('newarticlebutton');
const messagesbutton = document.getElementById('messagesbutton');
let themessagedash = document.getElementById('themessagedash');
themessagedash.style.display = 'none';
const logoutbutton = document.getElementById('logoutbutton');





/*dashboard functions*/
dashboardbutton.addEventListener('click', e =>{
    location.reload();
})
messagesbutton.addEventListener('click', (e) => {
    thewholeedittable.style.display = 'none';
    tablecreatearticle.style.display = 'none';
    table.style.display = 'none';   
    themessagedash.style.display = 'block';
})
newarticlebutton.addEventListener('click', e => {

    thewholeedittable.style.display = 'none';
    tablecreatearticle.style.display = 'block';
    table.style.display = 'none';   
})
logoutbutton.addEventListener('click', e => {
    localStorage.removeItem('password');
    window.location.href = 'login.html';
})


let k = 0;/* this number helps to get the return of the activateEditListeners which we use for manipulating publish and delete */
function activateEditListeners(){
    const editBtn = document.querySelectorAll('.blogpagess');
    editBtn.forEach((eb , i) => {
        eb.addEventListener('click', () => { 
            k = i;
            tablecreatearticle.style.display = 'none';
            table.style.display = 'none';
            thewholeedittable.style.display = originalDisplay;
            inputdashboardedit.value = itemsArray[i][0];
        paragraphdashboardedit.value = itemsArray[i][1];
    footerdashboardedit.value = itemsArray[i][2]})
        })
    }
function activatePublishListeners(){
    const sendii = document.getElementById('publishbutton');
    sendii.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(itemsArray[k]);
        if (inputdashboardedit.value !== '' &&  paragraphdashboardedit.value !== '' && footerdashboardedit !== '')
        {
            itemsArray[k][0] = inputdashboardedit.value;
            itemsArray[k][1] = paragraphdashboardedit.value;
            itemsArray[k][2] = footerdashboardedit.value;
            localStorage.setItem('items', JSON.stringify(itemsArray))
            location.reload();
        }
    } )

}

function activatedeletebutton(){
    const deletebutton = document.getElementById('deletebutton');
    deletebutton.addEventListener('click', (e) => {
        itemsArray.splice(k, 1);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        location.reload;
    } )

}

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log(itemsArray)

function displayDate()
{
    let date = new Date();
    date = date.toString().split(' ');
    checking = date[1] + '.' + date[2] + '.' + date[3];
    console.log(checking);
}
 function validpassword(){
const thepasswordarray = JSON.parse(localStorage.getItem('password'));
return thepasswordarray[0] == thepasswordarray[1];
}


window.onload = function( )
{
    if (!validpassword())
    window.location.href = 'login.html'
    displayDate();
    displaydashboard();
    displaymessage();
}

function displaydashboard() {
    for (let i = 0; i < itemsArray.length; i++) {
        // Create a new row
        let newRow = document.createElement('div');
        newRow.className = 'rows';

        // Create individual elements for the row
        let articleDiv = document.createElement('div');
        articleDiv.className = 'articledashboards';
        articleDiv.textContent = itemsArray[i][0];

        let dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.id = 'date';
        dateDiv.textContent = itemsArray[i][3];

        let editDiv = document.createElement('div');
        editDiv.className = 'edit';
        editDiv.id = 'editid';

        // Create a button element
        let buttonElement = document.createElement('button');
        buttonElement.className = 'blogpagess';
        buttonElement.textContent = 'edit';

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
}
function displaymessage()
{
   
    const hello = JSON.parse(localStorage.getItem('contacts'));
    for (let i= 0 ; i < hello.length ; i++)
    {
        let tabledash = document.createElement('div');
        tabledash.className = 'tabledash';

        let messageblo = document.createElement('div');
        messageblo.className = 'messageblo';

        let devimage = new Image();
        devimage.className = 'theprofilephoto';
        devimage.src = 'OIP (2).jpeg';

        let chatsdashboard = document.createElement('div');
        chatsdashboard.className = 'chatsdashboard';

        let identification  = document.createElement('div');
        identification.className = 'identification';

        let Muhizi = document.createElement('div');
        Muhizi.className = 'Muhizi';
        Muhizi.innerText = `${hello[i][0]} ${hello[i][1]} `

        let email = document.createElement('div');
        email.innerText = hello[i][2];

        let date = document.createElement('div');
        date.innerText = checking;

        let message = document.createElement('div');
        message.className = 'yournumber';
        message.innerText = hello[i][3];
        identification.appendChild(Muhizi);
        identification.appendChild(email);
        identification.appendChild(date);
        chatsdashboard.appendChild(identification);
        chatsdashboard.appendChild(message);
        messageblo.appendChild(devimage);
        messageblo.appendChild(chatsdashboard);
        tabledash.appendChild(messageblo);
        themessagedash.appendChild(tabledash);
    }
}

let hello;
            footerdashboard.addEventListener('change', function(){

                

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                     hello = reader.result;
                })
                reader.readAsDataURL(this.files[0]);
            })

function check()
{ 
 
    formdashboard.addEventListener('submit', (e)=>{
        if (inputdashboard.value === '' || !inputdashboard.value || paragraphdashboard.value === '' || !paragraphdashboard.value )
        {
            e.preventDefault();
    
        }
        else  
        { e.preventDefault();   
            console.log(paragraphdashboard.value);
            console.log(inputdashboard.value);
            //console.log(footerdashboard.value);
            itemsArray.push([inputdashboard.value, paragraphdashboard.value,hello,checking]);
            localStorage.setItem('items', JSON.stringify(itemsArray));
            location.reload();
        }  })
}
check();
table.classList.add('hidden');