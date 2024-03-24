var readmore = document.getElementById('readmoreblog');
var photoblogs = document.getElementById('photoblogs');
var articlesid = document.getElementById('articlesid');
var greaterthan = document.getElementById('greaterthan');
var lessthan = document.getElementById('lessthanid');
var theseconddivblog = document.getElementById('theseconddivblogid');
//const gobackbutton: HTMLElement | null = document.getElementById('gobackbuttonid')
window.onload = function () {
    loadblogs();
};
var blogdisplay;
function loadblogs() {
    // let contacts = JSON.parse(localStorage.getItem('items') || '[]') as any[];
    //   console.log(contacts);
    fetch('https://backend-fwkm.onrender.com/blogss')
        .then(function (response) {
        if (!response.ok)
            throw new Error('response is not okay');
        return response.json();
    }).then(function (data) {
        console.log(data);
        blogdisplay = data;
        for (var i = 0; i < data.length; i++) {
            console.log(i);
            var projectContainer = document.createElement('div');
            projectContainer.classList.add('projectphotoblo');
            projectContainer.id = 'projectphotobloid';
            //projectContainer.style.display = 'none';
            var button = document.createElement('button');
            button.textContent = 'Back';
            button.classList.add('gobackbutton');
            button.id = 'gobackbuttonid';
            button.style.display = 'none';
            var imageElement = document.createElement('img');
            imageElement.classList.add('photoblogs');
            imageElement.id = 'photoblogsid';
            imageElement.src = data[i].author;
            console.log(data[i].author);
            imageElement.alt = 'wait for the right time';
            var titleElement = document.createElement('div');
            titleElement.classList.add('thedigitalrealmblogs');
            titleElement.id = 'thedigitalrealmblogsid';
            titleElement.textContent = data[i].title;
            console.log(data[i].title);
            var readmoreBlog = document.createElement('div');
            readmoreBlog.classList.add('readmoreblog');
            readmoreBlog.id = 'readmoreblog';
            readmoreBlog.innerHTML = 'readmore';
            var descriptionElement = document.createElement('div');
            descriptionElement.classList.add('thedigitalparagraphblog');
            descriptionElement.id = 'thedigitalparagraphblogid';
            descriptionElement.textContent = data[i].description.split('.')[0] + '.';
            projectContainer.appendChild(button);
            projectContainer.appendChild(imageElement);
            projectContainer.appendChild(titleElement);
            projectContainer.appendChild(descriptionElement);
            projectContainer.appendChild(readmoreBlog);
            // articlesid?.appendChild(projectContainer);
            articlesid.appendChild(projectContainer);
        }
        reachingBlog();
    }).catch(function (error) {
        console.error('this is the error', error);
    });
}
var indexnumber;
//resetButton();
function reachingBlog() {
    var projectphotoarray = document.querySelectorAll('.projectphotoblo');
    projectphotoarray.forEach(function (postContent, index) {
        var readmoreBlog = postContent.querySelector('.readmoreblog');
        readmoreBlog.addEventListener('click', function () {
            console.log('ehllor');
            indexnumber = index;
            theseconddivblog.style.width = '50%';
            // Toggle full-width class for the clicked post content
            postContent.classList.toggle('full-width');
            var backButton = postContent.querySelector('.gobackbutton');
            backButton.style.display = 'block';
            var descriptionElement = postContent.querySelector('.thedigitalparagraphblog');
            if (descriptionElement) {
                descriptionElement.textContent = blogdisplay[index].description;
                descriptionElement.style.fontSize = '1rem';
            }
            // Hide other post contents
            projectphotoarray.forEach(function (content) {
                if (content !== postContent) {
                    content.style.display = 'none';
                }
                readmoreBlog.style.display = 'none';
            });
        });
    });
    resetButton();
    // resetButton();
    // const slide: NodeListOf<Element> = document.querySelectorAll('.projectphotoblo');
    // let numslide: number = 3;
}
function resetButton() {
    var buttonArray = document.querySelectorAll('.gobackbutton');
    buttonArray.forEach(function (button) {
        button.addEventListener('click', function () {
            location.reload();
        });
    });
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
photoblogs.addEventListener('mouseenter', function (e) {
    readmore.style.display = 'block';
});
photoblogs.addEventListener('mouseleave', function (e) {
    readmore.style.display = 'none';
});
readmore.addEventListener('mouseenter', function (e) {
    readmore.style.display = 'block';
});
readmore.addEventListener('mouseleave', function (e) {
    readmore.style.display = 'none';
});
