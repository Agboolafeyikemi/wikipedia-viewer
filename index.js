class Search {
  constructor(search) {
    this.search = search;
  }
  async getResults() {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${this.search}&format=json`
      );
      let json = await res.json();
      this.info = json.query.search;
      this.info.map(data => {
        displayResult(data);
        console.log(data.title)
      });
    } catch (error) {
      alert(error);
    }
  }
}
let form = document.querySelector(".search");
let formCover = document.querySelector(".cover");

function renderInput() {
  document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
    form.reset();
  });
}
renderInput();
const getInput = () => {
  return document.querySelector(".input").value;
};
const adjustForm = () => {
  formCover.style.top = "10%";
};
const controlSearch = () => {
  let query = getInput();
  if (query) {
    adjustForm();
    clearResults();
    const search = new Search(query);
    search.getResults();
  }
};
const displayResult = data => {
  const url = encodeURI(`https://en.wikipedia.org/wiki/${data.title}`);

  const markup = `
    <li class="list">
        <div class="div-list">
            <a href= "${url}" class="title">${data.title}</a>
            <p class="snippet">${data.snippet}</p>
        </div>
     </li> 
    `;
  document
    .querySelector(".result-list")
    .insertAdjacentHTML("beforeend", markup);
};

const clearResults = () => {
  document.querySelector(".result-list").innerHTML = "";
};