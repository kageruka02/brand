/*const body = document.body
body.append('hello world' , 'hyjn');
const div= document.createElement('div');
const strong= document.createElement('strong');
strong.innerText= 'acapulco';
div.append(strong);  
body.append(div);
const spanhi = document.querySelector('#hello');
const divs= document.querySelector('#why');
const grandparent = document.querySelector('.grandparent')
const parent = document.querySelector('.parent')
const child = document.querySelector('.child');
grandparent.addEventListener('click' , e => {
    console.log('grandparent 1')
})
parent.addEventListener('click' , e => {
    console.log('parent 1')
})
child.addEventListener('click' , e => {
    console.log('child 1')}
    , {once: true}/*this means that it will run one time you click it so for the second time when you do it it will not display*/
    /*)
child.addEventListener('click' , e => {
    console.log('capture child 1')
}, {capture: true})
grandparent.addEventListener('click' , e => {
    console.log('grand parent capture')
}, {capture: true})
parent.addEventListener('click' , e => {
    /*e.stopPropagation()*//*this stops the propagation either from up to down or viceversa*/
 /*   console.log('parent capture')
}, {capture: true})*/

let menu = document.querySelector('#menu-bars');
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    menu.classList.toggle('fa-times');
}