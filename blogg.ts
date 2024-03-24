const readmore: HTMLElement | null = document.getElementById('readmoreblog');
const photoblogs: HTMLElement | null = document.getElementById('photoblogs');
let articlesid: HTMLElement | null = document.getElementById('articlesid');
const greaterthan: HTMLElement | null = document.getElementById('greaterthan');
const lessthan: HTMLElement | null = document.getElementById('lessthanid');
const theseconddivblog: HTMLElement | null = document.getElementById('theseconddivblogid');
//const gobackbutton: HTMLElement | null = document.getElementById('gobackbuttonid')

window.onload = function() {
    loadblogs();
}
interface theobject{
   _id: string,
   title: string,
   description: string,
   topictext: string,
   author: string

}
let blogdisplay: theobject[];

function loadblogs() {
   // let contacts = JSON.parse(localStorage.getItem('items') || '[]') as any[];
 //   console.log(contacts);
 fetch('https://backend-fwkm.onrender.com/blogss')
 .then(response => {
    if (!response.ok)
    throw new Error('response is not okay');
    return response.json()
 }).then(data => {
    console.log(data);
    blogdisplay = data;

    for (let i = 0; i < data.length; i++) {
        console.log(i);

        const projectContainer: HTMLDivElement = document.createElement('div');
        projectContainer.classList.add('projectphotoblo');
        projectContainer.id = 'projectphotobloid';
        //projectContainer.style.display = 'none';

        const button = document.createElement('button');
        button.textContent = 'Back';
        button.classList.add('gobackbutton');
        button.id = 'gobackbuttonid';
        button.style.display = 'none';

        const imageElement: HTMLImageElement = document.createElement('img');
        imageElement.classList.add('photoblogs');
        imageElement.id = 'photoblogsid';
        imageElement.src = data[i].author;
        console.log(data[i].author);
        imageElement.alt = 'wait for the right time';

        const titleElement: HTMLDivElement = document.createElement('div');
        titleElement.classList.add('thedigitalrealmblogs');
        titleElement.id = 'thedigitalrealmblogsid';
        titleElement.textContent = data[i].title;
        console.log(data[i].title);

        const readmoreBlog: HTMLDivElement = document.createElement('div');
        readmoreBlog.classList.add('readmoreblog');
        readmoreBlog.id = 'readmoreblog';
        readmoreBlog.innerHTML = 'readmore';

        const descriptionElement: HTMLDivElement = document.createElement('div');
        descriptionElement.classList.add('thedigitalparagraphblog');
        descriptionElement.id = 'thedigitalparagraphblogid';
        descriptionElement.textContent = data[i].description.split('.')[0] + '.';

        projectContainer.appendChild(button);
        projectContainer.appendChild(imageElement);
        projectContainer.appendChild(titleElement);
        projectContainer.appendChild(descriptionElement);
        projectContainer.appendChild(readmoreBlog);
       // articlesid?.appendChild(projectContainer);

        articlesid!.appendChild(projectContainer);
    }
    reachingBlog();
    

 }).catch(error => {
    console.error('this is the error', error)
 })
   

}

let indexnumber : number;
//resetButton();

function reachingBlog() {
   const projectphotoarray : NodeListOf<HTMLDivElement>= document.querySelectorAll('.projectphotoblo');
   

projectphotoarray.forEach((postContent :HTMLDivElement , index)=> {
   const readmoreBlog: HTMLElement | null = postContent.querySelector('.readmoreblog');
  readmoreBlog!.addEventListener('click', () => {
     console.log('ehllor');
     indexnumber = index;
     theseconddivblog!.style.width = '50%';
    // Toggle full-width class for the clicked post content
    postContent.classList.toggle('full-width');
     const backButton = postContent.querySelector('.gobackbutton') as HTMLButtonElement;
     backButton!.style.display = 'block';
     const descriptionElement: HTMLElement | null = postContent.querySelector('.thedigitalparagraphblog');
     if (descriptionElement)
     {
      descriptionElement!.textContent = blogdisplay[index].description;
      descriptionElement!.style.fontSize = '1rem'
     }
     

    // Hide other post contents
    projectphotoarray.forEach((content  :HTMLDivElement) => {
      if (content !== postContent) {
        content.style.display = 'none';
      }
      readmoreBlog!.style.display = 'none';

    });
  });
});
resetButton();

// resetButton();

   // const slide: NodeListOf<Element> = document.querySelectorAll('.projectphotoblo');
   // let numslide: number = 3;
}


function resetButton() {
   
   const buttonArray : NodeListOf<HTMLButtonElement>= document.querySelectorAll('.gobackbutton')
   buttonArray.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
         location.reload()
      })
     
   })
}




//     let slides: any[] = Array.from(slide);
//     console.log(slides);

//     slides.slice(numslide - 3, numslide).forEach(slide => (slide as HTMLElement).style.display = 'block');

//     greaterthan?.addEventListener('click', function(e) {
//         if (numslide <= slides.length - 1) {
//             (slides[numslide - 3] as HTMLElement).style.display = 'none';
//             numslide++;
//             slides.slice(numslide - 3, numslide).forEach(slide => (slide as HTMLElement).style.display = 'block');
//         }
//     });

//     lessthan?.addEventListener('click', function(e) {
//         if (numslide >= 4) {
//             (slides[numslide - 1] as HTMLElement).style.display = 'none';
//             numslide--;
//             slides.slice(numslide - 3, numslide).forEach(slide => (slide as HTMLElement).style.display = 'block');
//         }
//     });
// }

// photoblogs!.addEventListener('mouseenter', (e) => {
//     readmore!.style.display = 'block';
// });

// photoblogs!.addEventListener('mouseleave', (e) => {
//     readmore!.style.display = 'none';
// });

// readmore!.addEventListener('mouseenter', (e) => {
//     readmore!.style.display = 'block';
// });

// readmore!.addEventListener('mouseleave', (e) => {
//     readmore!.style.display = 'none';
// });
