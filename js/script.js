/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// list variables
const list = document.querySelector(".student-list");
const listItems = [...list.children];

let page = 1;
const rows = 10;
const pages = Math.ceil(listItems.length / rows);

// hide all the list items
for (let i = 0; i < listItems.length; i++) {
  listItems[i].style.display = "none";
}

/*** 
   showPage function to hide all of the items in the 
   list except for the ten you want to show.
***/
const showPage = (listItems, page, rows) => {
  const trimStart = (page - 1) * rows;
  const trimEnd = trimStart + rows;

  const trimmedData = listItems.slice(trimStart, trimEnd);

  // display the links that are on the current page
  for (let i = 0; i < trimmedData.length; i++) {
    trimmedData[i].style.display = "block";
  }
};
// call the function on page 1 before the page changes
showPage(listItems, page, rows);

/*** 
   appendPageLinks function to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(listItems) {
  const pageDiv = document.querySelector(".page");
  const div = document.createElement("div");
  div.className = "pagination";
  pageDiv.appendChild(div);

  const ul = document.createElement("ul");
  div.appendChild(ul);

  // loop thorough the amount of pages to create buttons
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement("li");
    const btn = document.createElement("a");

    btn.innerText = i;
    li.appendChild(btn);
    ul.appendChild(li);

    // assign an active class to the first button
    btn.innerText == page ? (btn.className = "active") : (btn.className = "");

    // adding an event listener to the button
    btn.addEventListener("click", () => {
      // hide the items that are already on the page
      listItems.map((item) => {
        item.style.display = "none";
      });
      // change the class to the button that is selected
      let previousBtn = document.querySelector(".active");
      previousBtn.className = "";
      btn.className = "active";
      page = i;
      // switch to next page
      showPage(listItems, page, rows);
    });
  }
}
appendPageLinks(listItems);

// search function
function search() {
  const searchDiv = document.querySelector(".student-search");
  const input = searchDiv.querySelector("input");
  input.onkeyup = () => {
    const filter = input.value.toUpperCase();

    for (let i = 0; i < listItems.length; i++) {
      const name = listItems[i].querySelector("h3");
      const textValue = name.innerText || name.textContent;

      if (textValue.toUpperCase().indexOf(filter) > -1) {
        listItems[i].style.display = "";
      } else {
        listItems[i].style.display = "none";
      }
    }
  };
}
search();
