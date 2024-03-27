const inputdashboard: HTMLInputElement | null = document.getElementById(
  "inputdashboard"
) as HTMLInputElement;
/*title place*/
const paragraphdashboard: HTMLInputElement | null = document.getElementById(
  "paragraphdashboard"
) as HTMLInputElement;
/*paragraph on create article*/
let footerdashboard: HTMLInputElement | null = document.getElementById(
  "footer"
) as HTMLInputElement;
/*footer*/
const senddashboard: HTMLElement | null =
  document.getElementById("senddashboard");
/*the send button*/
const formdashboard: HTMLFormElement | null = document.getElementById(
  "formdashboard"
) as HTMLFormElement;
const thewholeedittable: HTMLElement | null =
  document.getElementById("thewholeedittable");
let checking: string = "";
const inputdashboardedit: HTMLInputElement | null = document.getElementById(
  "inputdashboardedit"
) as HTMLInputElement;
const paragraphdashboardedit: HTMLInputElement | null = document.getElementById(
  "paragraphdashboardedit"
) as HTMLInputElement;
const footerdashboardedit: HTMLInputElement | null = document.getElementById(
  "footeredit"
) as HTMLInputElement;
const messagediv: HTMLElement | null = document.getElementById("messagediv");
let table: HTMLElement | null = document.getElementById("table");
let tablecreatearticle: HTMLElement | null = document.getElementById(
  "thewholecreatetable"
);
//tablecreatearticle.style.display = 'none';
//table.style.display = 'none';
const originalDisplay: string | null = window.getComputedStyle(
  thewholeedittable!
).display;
thewholeedittable!.style.display = "none";
tablecreatearticle!.style.display = "none";
//table.style.display = 'none';
const dashboardbutton: HTMLElement | null =
  document.getElementById("dashboardbutton");
const newarticlebutton: HTMLElement | null =
  document.getElementById("newarticlebutton");
const messagesbutton: HTMLElement | null =
  document.getElementById("messagesbutton");
let themessagedash: HTMLElement | null =
  document.getElementById("themessagedash");
themessagedash!.style.display = "none";
const logoutbutton: HTMLElement | null =
  document.getElementById("logoutbutton");
let nomessage: HTMLElement | null = document.getElementById("nomessage");
let displayMessageId: HTMLElement | null =
  document.getElementById("displayMessageId");

/*dashboard functions*/
dashboardbutton!.addEventListener("click", (e) => {
  location.reload();
});
messagesbutton!.addEventListener("click", (e) => {
  thewholeedittable!.style.display = "none";
  tablecreatearticle!.style.display = "none";
  table!.style.display = "none";
  themessagedash!.style.display = "block";
});
newarticlebutton!.addEventListener("click", (e) => {
  thewholeedittable!.style.display = "none";

  table!.style.display = "none";
  themessagedash!.style.display = "none";
  tablecreatearticle!.style.display = "block";
});
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

logoutbutton!.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.href = "login.html";
});
interface blogObject {
  _id: string;
  title: string;
  author: string;
  topictext: string;
  description: string;
}
let blogss: blogObject[];

let k: number = 0;
/* this number helps to get the return of the activateEditListeners which we use for manipulating publish and delete */
function activateEditListeners(): void {
  const editBtn: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".blogpagess");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      k = i;
      themessagedash!.style.display = "none";
      tablecreatearticle!.style.display = "none";
      table!.style.display = "none";
      thewholeedittable!.style.display = originalDisplay!;
      inputdashboardedit!.value = blogss[i].title;
      paragraphdashboardedit!.value = blogss[i].description;
      console.log(blogss[i].author);
      //  footerdashboardedit!.value = blogss[i].author;
    });
  });
}

let image: any;
footerdashboardedit!.addEventListener("change", function () {
  const reader: FileReader = new FileReader();
  reader.addEventListener("load", () => {
    if (reader.result) {
      image = reader.result;
      console.log("uri imbwa");
    } else {
      image = false;
      console.log("it failed");
    }
  });
  reader.readAsDataURL(this.files![0]);
});

function activatePublishListeners(): void {
  const sendii: HTMLElement | null = document.getElementById("publishbutton");
  sendii!.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(itemsArray[k]);
    if (
      inputdashboardedit!.value.toString() !== "" ||
      paragraphdashboardedit!.value.toString() !== ""
    ) {
      // itemsArray[k][0] = inputdashboardedit!.value;
      // itemsArray[k][1] = paragraphdashboardedit!.value;
      // console.log(inputdashboardedit!.value);
      // console.log(paragraphdashboardedit!.value);
      // e.preventDefault();
      //  itemsArray[k][2] = footerdashboardedit!.value;
      //   localStorage.setItem('items', JSON.stringify(itemsArray));
      // location.reload();

      const updatedBlog = {
        title: inputdashboardedit!.value.toString(),
        author: !image ? blogss[k].author : image,
        topictext: blogss[k].topictext,
        description: paragraphdashboardedit!.value.toString(),
      };
      if (window.confirm("the blog will be edited")) {
        sendii!.style.minWidth = "100px";
        sendii!.innerHTML = "publishing ...";

        const tokenStringified: any = localStorage.getItem("token");
        const token = JSON.parse(tokenStringified);
        console.log(token);
        const blogId = blogss[k]._id;
        fetch(`https://mybackend-kc02.onrender.com/blogss/${blogId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBlog),
        })
          .then((response) => {
            if (!response.ok) throw new Error("your response is not okay");
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setMessage("Blog edited successfully");
            //location.reload();
          })
          .catch((error) => {
            console.error("the error is this", error);
          });
      }
    }
  });
}
/*handling the message displayed when we publish , edit , create new blog , message*/
function setMessage(message) {
  let url = new URL(window.location.href);
  url.searchParams.set("msg", message);
  window.location.href = url.href;
}
function displayMessage() {
  let urlParams = new URLSearchParams(window.location.search);
  let message = urlParams.get("msg");
  if (message) {
    displayMessageId!.style.display = "block";

    displayMessageId!.textContent = message;
    urlParams.delete("msg");
    let newUrl = "?" + urlParams.toString();
    window.history.replaceState({}, "", newUrl);
  }
  setTimeout(() => {
    displayMessageId!.style.display = "none";
  }, 4000);
}

function activatedeletebutton(): void {
  const deletebutton: HTMLElement | null =
    document.getElementById("deletebutton");
  deletebutton!.addEventListener("click", (e) => {
    // itemsArray.splice(k, 1);
    // localStorage.setItem('items', JSON.stringify(itemsArray));
    // location.reload;
    if (window.confirm("are you sure you want to delete this article")) {
      e.preventDefault();
      deletebutton!.style.minWidth = "100px";
      deletebutton!.innerHTML = "deleting ...";
      const blogId = blogss[k]._id;
      const tokenStringified: any = localStorage.getItem("token");
      const token = JSON.parse(tokenStringified);
      fetch(`https://mybackend-kc02.onrender.com/blogss/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("the response was not okay");
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setMessage("Blog deleted successfully");
          //location.reload();
        })
        .catch((error) => {
          console.error("the error is this", error);
        });
    }
  });
}

const itemsArray: any[][] = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items")!)
  : [];
console.log(itemsArray);

function displayDate(): void {
  let date = new Date();
  let datestring = date.toString().split(" ");
  checking = datestring[1] + "." + datestring[2] + "." + datestring[3];
  console.log(checking);
}

function validpassword(): boolean {
  const thepasswordarray: string[] | null = JSON.parse(
    localStorage.getItem("password")!
  );
  return thepasswordarray![0] == thepasswordarray![1];
}

window.onload = function () {
  // if (getTokenFromCookie() == null) window.location.href = 'login.html';
  if (!localStorage.getItem("token")) window.location.href = "login.html";
  // console.log(localStorage.getItem('token'));
  displayMessage();
  displayDate();
  displaydashboard();
  displaymessage();
};
//displaymessage();
function displaydashboard(): void {
  fetch("https://mybackend-kc02.onrender.com/blogss")
    .then((response) => {
      if (!response.ok) throw new Error("the response was not okay");
      return response.json();
    })
    .then((data) => {
      blogss = data;
      for (let i: number = 0; i < data.length; i++) {
        // Create a new row
        let newRow: HTMLDivElement = document.createElement("div");
        newRow.className = "rows";

        // Create individual elements for the row
        let articleDiv: HTMLDivElement = document.createElement("div");
        articleDiv.className = "articledashboards";
        articleDiv.textContent = data[i].title;

        let dateDiv: HTMLDivElement = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.id = "date";
        dateDiv.textContent = data[i].topictext;

        let editDiv: HTMLDivElement = document.createElement("div");
        editDiv.className = "edit";
        editDiv.id = "editid";

        // Create a button element
        let buttonElement: HTMLButtonElement = document.createElement("button");
        buttonElement.className = "blogpagess";
        buttonElement.textContent = "edit";

        // Append the button to editDiv
        editDiv.appendChild(buttonElement);

        // Append individual elements to the row
        newRow.appendChild(articleDiv);
        newRow.appendChild(dateDiv);
        newRow.appendChild(editDiv);

        // Append the new row to the table
        table!.appendChild(newRow);
      }
      activateEditListeners();
      activatePublishListeners();
      activatedeletebutton();
    })
    .catch((error) => {
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
interface MyObject {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  description: string;
}
let themessages: MyObject[];
let numbers: any[];

function displaymessage(): void {
  /* const hello: any[] | null = JSON.parse(localStorage.getItem('contacts')!);*/
  fetch("https://mybackend-kc02.onrender.com/messages")
    .then((response) => {
      if (!response.ok) throw new Error("Response was not okay");
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data);

      themessages = data;
      console.log(themessages);
      console.log(typeof themessages);
      console.log(typeof data);

      if (data.message) {
        nomessage!.style.display = "flex";
        console.log(data.message);
      } else {
        // nomessage!.classList.remove('');
        // nomessage!.classList.add('hidden');
        nomessage!.style.display = "none";
        console.log("thank you");
      }
      for (let i: number = 0; i < data!.length; i++) {
        let tabledash: HTMLDivElement = document.createElement("div");
        tabledash.className = "tabledash";

        let messageblo: HTMLDivElement = document.createElement("div");
        messageblo.className = "messageblo";

        let devimage: HTMLImageElement = new Image();
        devimage.src = "icons8-delete-48 (1).png";
        devimage.className = "deleteicon";

        let photodiv: HTMLDivElement = document.createElement("div");
        photodiv.appendChild(devimage);

        let replyimage: HTMLImageElement = new Image();
        replyimage.src = "reply.png";
        replyimage.className = "reply";

        let replydiv: HTMLDivElement = document.createElement("div");
        replydiv.className = "replydiv";
        replydiv.appendChild(replyimage);

        let chatsdashboard: HTMLDivElement = document.createElement("div");
        chatsdashboard.className = "chatsdashboard";

        let identification: HTMLDivElement = document.createElement("div");
        identification.className = "identification";

        let Muhizi: HTMLDivElement = document.createElement("div");
        Muhizi.className = "Muhizi";
        Muhizi.innerText = `${data![i].firstname} ${data![i].lastname} `;

        let email: HTMLDivElement = document.createElement("div");
        email.innerText = data![i].email;

        let date: HTMLDivElement = document.createElement("div");
        date.innerText = checking;

        let message: HTMLDivElement = document.createElement("div");
        message.className = "yournumber";
        message.innerText = data![i].description;
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
        messagediv!.appendChild(tabledash);
      }
      deletemessage();
      activatereplybutton();
    })
    .catch((error) => {
      // console.error('Error fetching messages:', error);
      // alert('Failed to fetch messages. Please try again later.');
    });
}

function activatereplybutton(): void {
  const replybutton = document.querySelectorAll(".reply");
  replybutton.forEach((e, index) => {
    e.addEventListener("click", () => {
      var bodyText = "Thank you for writing I will reach you in time";

      window.open(
        `mailto:${
          themessages[index].email
        }?subject=Subject&body=${encodeURIComponent(bodyText)}`
      );
    });
  });
}

function deletemessage(): void {
  let deletebutton = document.querySelectorAll(".deleteicon");
  deletebutton.forEach((e, index) => {
    e.addEventListener("click", () => {
      if (window.confirm("are you sure you want to delete the message")) {
        console.log(index);
        const target = event.target as HTMLElement;
        const id = themessages[index]._id;
        fetch(`https://mybackend-kc02.onrender.com/messages/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete data from the backend");
          }
          //  return response.json();
          const tabledashElement = target.closest(".tabledash") as HTMLElement;
          if (tabledashElement) {
            tabledashElement.remove();
          }
          deletebutton = document.querySelectorAll(".deleteicon");
          if (deletebutton.length < 1) {
            nomessage!.style.display = "flex";
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
let hello;
footerdashboard!.addEventListener("change", function () {
  const reader: FileReader = new FileReader();
  reader.addEventListener("load", () => {
    hello = reader.result;
  });
  reader.readAsDataURL(this.files![0]);
});

function getTokenFromCookie(): string | null {
  const cookieString = document.cookie;
  console.log(cookieString, "is the best");
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());
  console.log(cookies);
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "token") {
      return decodeURIComponent(value);
    }
    console.log([name, value]);
  }

  return null; // Token cookie not found
}

function AddAblog(): void {
  formdashboard!.addEventListener("submit", (e) => {
    if (
      inputdashboard!.value === "" ||
      !inputdashboard!.value ||
      paragraphdashboard!.value === "" ||
      !paragraphdashboard!.value
    ) {
      e.preventDefault();
    } else {
      e.preventDefault();
      const blog = {
        title: inputdashboard!.value.trim(),
        author: hello,
        topictext: checking,
        description: paragraphdashboard!.value.trim(),
      };
      const tokenStringified: any = localStorage.getItem("token");
      const token = JSON.parse(tokenStringified);
      fetch("https://mybackend-kc02.onrender.com/blogss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("the response was not okay");
          }
        })
        .then((data) => {
          console.log("this is the data", data);
          setMessage("Blog created successfully");
        })
        .catch((error) => {
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
table!.classList.add("hidden");
