// Navigation Toggle
$(document).ready(function () {
  $("#icon").on("click", function () {
    $(".menu .info").toggle(500);
    $(".menu .info").removeClass("d-none");
  });
});

// when it start
async function getApiStart() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
  );
  const response = await api.json();
  console.log(response);
  displayStart(response.meals);
}

function displayStart(start) {
  let container = "";
  for (let i = 0; i < start.length; i++) {
    container += `
    <div class="col-md-3" onclick="getCatData('${start[i].idMeal}')">
    <div class="card m-4">
        <img src="${start[i].strMealThumb}" class="card-img-top" alt="Meal Image">
        <div class="card-body layer position-absolute overflow-hidden">
          <h5 class="card-title">${start[i].strMeal}</h5>
        </div>
      </div></div>

      `;
  }
  document.getElementById("card").innerHTML = container;
}

getApiStart();

// category
$("#cat").on("click", function () {
  getApi();
});

async function getApi() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const response = await api.json();
  displayCat(response.categories);
}

async function displayCat(info) {
  let cartona = "";
  for (let i = 0; i < info.length; i++) {
    cartona += `
    <div class="col-md-3">
      <div class="card" onclick="getShow('${info[i].strCategory}')">
        <img src="${info[i].strCategoryThumb}" class="card-img-top" alt="...">
        <div class="card-body layer position-absolute overflow-hidden">
          <h5 class="card-title">${info[i].strCategory}</h5>
          <p class="card-text fs">${info[i].strCategoryDescription}</p>
        </div>
      </div>
    </div>
    `;
    console.log("bye");
  }
  document.getElementById("card").innerHTML = cartona;
}

// data category
async function getShow(cat1) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat1}`
  );
  const response = await api.json();
  console.log(response.meals.idMeal);
  displayCatShow(response.meals);
}

function displayCatShow(info1) {
  let cartona = "";
  for (let i = 0; i < info1.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="card" onclick="getCatData('${info1[i].idMeal}')">
        <img src="${info1[i].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body layer position-absolute overflow-hidden">
          <h5 class="card-title">${info1[i].strMeal} </h5>
        </div>
      </div>
    </div>

      `;

    console.log("hi");
  }
  document.getElementById("card").innerHTML = cartona;
}
async function getCatData(id) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const showData = await api.json();
    displayCatData(showData.meals);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}
//
function displayCatData(displayDataCat) {
  let cartona = "";
  for (let i = 0; i < displayDataCat.length; i++) {
    let ingredients = ``;

    for (let j = 1; j <= 20; j++) {
      if (displayDataCat[i][`strIngredient${j}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
          displayDataCat[i][`strMeasure${j}`]
        } ${displayDataCat[i][`strIngredient${j}`]}</li>`;
      }
    }

    let tags = displayDataCat[i].strTags?.split(",");
    if (!tags) tags = [];

    let displayTags = "";
    for (let k = 0; k < tags.length; k++) {
      displayTags += `<li class="alert alert-danger m-2 p-1">${tags[k]}</li>`;
    }

    cartona += `
      <div class="row">
        <div class="col-md-4 text-white">
          <img class="w-100 rounded-3" src="${displayDataCat[i].strMealThumb}" alt="...">
          <h2>${displayDataCat[i].strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
          <h2>Instructions</h2>
          <p>${displayDataCat[i].strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${displayDataCat[i].strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${displayDataCat[i].strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
          </ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${displayTags}
          </ul>
          <a target="_blank" href="${displayDataCat[i].strSource}" class="btn btn-success">Source</a>
          <a target="_blank" href="${displayDataCat[i].strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
      </div>`;
  }

  document.getElementById("card").innerHTML = cartona;
}

// js ال صح

// area
$("#area").on("click", function () {
  getApiArea();
});

async function getApiArea() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const responseArea = await api.json();
    console.log(responseArea);
    displayArea(responseArea.meals);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

function displayArea(infoArea) {
  let cartona = "";
  for (let i = 0; i < infoArea.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="text-white fs-0" onclick="showArea('${infoArea[i].strArea}')">
    <i class="fas fa-home"></i>
    <h5 class="card-title">${infoArea[i].strArea}</h5>
  </div></div>

     `;
  }
  document.getElementById("card").innerHTML = cartona;
}

// area data
async function showArea(city) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`
    );
    const responseArea = await api.json();
    displayShowArea(responseArea.meals);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

function displayShowArea(infoArea1) {
  let cartona = "";
  for (let i = 0; i < infoArea1.length; i++) {
    cartona += `
    <div class="col-md-3" onclick="getCatData('${infoArea1[i].idMeal}')">
    <div class="card">
    <img src="${infoArea1[i].strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body layer position-absolute overflow-hidden">
      <h5 class="card-title">${infoArea1[i].strMeal}</h5>
    </div>
  </div>
    </div>

    `;
  }
  document.getElementById("card").innerHTML = cartona;
}

// ingredients
$("#ingredients").on("click", getApiIngredients);

async function getApiIngredients() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const responseIngredients = await api.json();
    displayIngredients(responseIngredients.meals);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

function displayIngredients(infoIngredients) {
  const filteredIngredients = infoIngredients.filter(
    (ingredient) => ingredient.strDescription
  );

  let cartona = "";
  for (let i = 0; i < filteredIngredients.length; i++) {
    cartona += `
    <div class="col-md-3">
      <div class="card data text-white overflow-hidden" onclick="showIngredient('${
        filteredIngredients[i].strIngredient
      }')">
        <div class="card-body overflow-hidden">
          <div class="fs-0">
            <i class="fas fa-drumstick-bite"></i>
            <h5 class="card-title">${filteredIngredients[i].strIngredient}</h5>
          </div>
          <p class="card-text overflow-hidden">${filteredIngredients[
            i
          ].strDescription.substring(0, 109)}</p>
        </div>
      </div>
    </div>
    `;
  }
  $("#card").html(cartona);
}

async function showIngredient(ingredient) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const responseIngredients = await api.json();
    console.log(responseIngredients);
    displayIngredientsShow(responseIngredients.meals);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

function displayIngredientsShow(infoIngredients1) {
  let cartona = "";
  for (let i = 0; i < infoIngredients1.length; i++) {
    cartona += `
    <div class="col-md-3">
      <div class="card" onclick="getCatData('${infoIngredients1[i].idMeal}')">
        <img src="${infoIngredients1[i].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body layer position-absolute overflow-hidden">
          <h5 class="card-title">${infoIngredients1[i].strMeal}</h5>
        </div>
      </div>
    </div>
    `;
  }
  $("#card").html(cartona);
}

// Contact click event
document.getElementById("contact").addEventListener("click", function () {
  show();
});

function show() {
  document.getElementById("card").innerHTML = `<main class="container my-3 " >
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center" id="hi">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" oninput="check()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameValid" class="alert alert-danger w-100 mt-2 d-none">
                   enter name does't include any  Special characters and numbers 
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" oninput="check()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailValid" class="alert alert-danger w-100 mt-2 d-none">
                   please enter valid email 
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" oninput="check()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneValid" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" oninput="check()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageValid" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" oninput="check()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordValid" class="alert alert-danger w-100 mt-2 d-none">
                     *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" oninput="check()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordValid" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid re-password 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>

</main>`;
}
let submitBtn = document.getElementById("submitBtn");
let name = document.getElementById("nameValid");
let email = document.getElementById("emailValid");
let phone = document.getElementById("phoneValid");
let age = document.getElementById("ageValid");
let password = document.getElementById("passwordValid");
let rePassword = document.getElementById("repasswordValid");

function check() {
  if (nameValidation()) {
    name.classList.add("d-none");
  } else {
    name.classList.remove("d-none");
  }

  if (emailValidation()) {
    email.classList.add("d-none");
  } else {
    email.classList.remove("d-none");
  }

  if (phoneValidation()) {
    phone.classList.add("d-none");
  } else {
    phone.classList.remove("d-none");
  }

  if (ageValidation()) {
    age.classList.add("d-none");
  } else {
    age.classList.remove("d-none");
  }

  if (passwordValidation()) {
    password.classList.add("d-none");
  } else {
    password.classList.remove("d-none");
  }

  if (repasswordValidation()) {
    rePassword.classList.add("d-none");
  } else {
    rePassword.classList.remove("d-none");
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  const regexName = /^[a-zA-Z ]+$/;
  const nameV = document.getElementById("name").value;
  return regexName.test(nameV);
}

function emailValidation() {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailCheck = document.getElementById("email").value;
  return regexEmail.test(emailCheck);
}

function phoneValidation() {
  const regexPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const phoneValidation = document.getElementById("phone").value;
  return regexPhone.test(phoneValidation);
}

function ageValidation() {
  const regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  const ageValidation = document.getElementById("age").value;
  return regexAge.test(ageValidation);
}

function passwordValidation() {
  const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  const pass = document.getElementById("password").value;
  return regexPass.test(pass);
}

function repasswordValidation() {
  return (
    document.getElementById("repassword").value ===
    document.getElementById("password").value
  );
}
// search
let search = document.getElementById("searchinput");

document.getElementById("search").addEventListener("click", function () {
  showSearchInputs();
});
function showSearchInputs() {
  search.innerHTML = `
    <div class="row py-4 position-fixed top-0 mb-5">
        <div class="col-md-6  ">
            <input oninput="searchName(this.value)" class="form-control text" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchFLetter(this.value)"  class="form-control text" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  document.getElementById("card").innerHTML = "";
}

async function searchName(data) {
  document.getElementById("card").innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`
  );
  response = await response.json();
  response.meals ? displayStart(response.meals) : displayStart([]);
}

async function searchFLetter(data) {
  document.getElementById("card").innerHTML = "";
  data == "" ? (data = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`
  );
  response = await response.json();

  response.meals ? displayStart(response.meals) : displayStart([]);
}
