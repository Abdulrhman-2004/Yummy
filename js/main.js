let section1 = document.getElementById('section1');
let section2 = document.getElementById('section2');
let section3 = document.getElementById('section3');
let closeIcon = document.getElementById('closeIcon');
let navlinks = document.getElementById('navlinks')
let Xmark = document.getElementById('Xmark');
let rowS = document.getElementById('rowS');
let nav = document.getElementById('nav-1');

lood();
function lood() {
    $(document).ready(function () {
        $('#loding').fadeIn(1);
        $('#loding').fadeOut(1000);
        getIntro();
    });
}

let t;
async function getIntro() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    let respons = await api.json();

    t = respons.meals;


    displayIntro(t);

}

function displayIntro(t) {

    // console.log(t);
    let cartona = ``;
    for (let i = 0; i < t.length; i++) {
        cartona += `
                <div class="col-md-3 mt-4" onclick="lood();getDetails(${t[i].idMeal})">
                    <div class=" h-intro" >
                        <div class="hw d-flex align-items-center" >
                            <h2 >${t[i].strMeal}</h2>
                        </div>
                        <img src="${t[i].strMealThumb}" class="rounded rounded-2 " alt="">
                    </div>
                </div>
        `
    }

    document.getElementById('rowIntro').innerHTML = cartona;
}

let x;
async function getDetails(i) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`);
    // console.log(api);
    // console.log(i);
    let respons = await api.json();
    x = respons.meals;

    showDetails();
}

function showDetails() {
    let y = ``;
    section1.classList.add('d-none');
    section2.classList.remove('d-none');
    section3.classList.add('d-none');
    rowS.classList.add('d-none');

    y += `
                <div class="col-md-4 ">
                    <div class="mt-3">
                        <img src="${x[0].strMealThumb}" class="rounded rounded-2 " alt="">
                        <h3>${x[0].strMeal}</h3>
                    </div>
                </div>
                <div class="col-md-8 ">
                    <div class="mt-3">
                        <h2>Instructions :</h2>
                        <p>
                            ${x[0].strInstructions}
                        </p>
                        <h3>Area : ${x[0].strArea}</h3>
                        <h3>Category : ${x[0].strCategory}</h3>
                        <h3>Recipes :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">
                        
                            <li class="alert alert-info m-2 p-1">${x[0].strMeasure1 + x[0].strIngredient1}</li>
                            <li class="alert alert-info m-2 p-1">${x[0].strMeasure2 + x[0].strIngredient2}</li>
                            <li class="alert alert-info m-2 p-1">${x[0].strMeasure3 + x[0].strIngredient3}</li>
                            <li class="alert alert-info m-2 p-1">${x[0].strMeasure4 + x[0].strIngredient4}</li>
                            <li class="alert alert-info m-2 p-1">${x[0].strMeasure5 + x[0].strIngredient5}</li>

                            </ul>

                        <h3>Tags :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">

                            <li class="alert alert-danger m-2 p-1">${x[0].strTags}</li>
                        </ul>
                        <div class="mt-5">
                            <a class="btn  btn-success" href="${x[0].strSource}" role="button">source</a>
                            <a class="btn btn-danger" href="${x[0].strYoutube}" role="button">Youtube</a>

                        </div>
                    </div>
                </div>
    `
    document.getElementById('rowDetails').innerHTML = y;
}

$(Xmark).click(function () {
    lood();
    section1.classList.remove('d-none');
    section2.classList.add('d-none');


    rowS.classList.remove('d-none');
});


let wBox = $(nav).innerWidth();
$(closeIcon).click(function () {
    // console.log(wBox);

    if ($(nav).css('width') == '0px') {
        $(nav).animate({ width: `${wBox}px` }, 500)
        $('#nav').animate({ width: `25%` }, 500)

        $(navlinks).slideToggle(1100);

        closeIcon.classList.replace('fa-bars', 'fa-xmark')
    }
    else {
        $(nav).animate({ width: `0px` }, 800)
        $(navlinks).slideToggle(500);
        $('#nav').animate({ width: `5%` }, 800)



        closeIcon.classList.replace('fa-xmark', 'fa-bars')
    }

})

closeNav();
function closeNav() {

    $(nav).animate({ width: `0px` }, 800)
    $(navlinks).slideToggle(500);
    $('#nav').animate({ width: `5%` }, 800)
    closeIcon.classList.replace('fa-xmark', 'fa-bars')
}

function search() {
    section1.classList.add('d-none');
    section2.classList.add('d-none');
    section3.classList.remove('d-none');
  
    rowS.classList.add('d-none');

}

async function searchByName(y) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${y}`);
    let respons = await api.json();
    let z = respons.meals;
    showesearchByName(z);

}

async function searchByfirstLetter(a) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${a}`);
    let respons = await api.json();
    let z = respons.meals;
    showesearchByName(z);

}

function showesearchByName(z) {
    let cartona = ``;
    for (let i = 0; i < z.length; i++) {
        cartona +=
            `
        <div class="col-md-3 mt-4" onclick="getDetails(${z[i].idMeal})">
            <div class=" h-intro">
                <div class="hw d-flex align-items-center">
                    <h2>${z[i].strMeal}</h2>
                </div>
                <img src="${z[i].strMealThumb}" class="rounded rounded-2 " alt="">
            </div>
        </div>
        `
    }
    document.getElementById('rowS').innerHTML = cartona;
    rowS.classList.remove('d-none')
}

async function getCategory() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let respons = await api.json()
    let x = respons.categories;
    // console.log(x);
    showeCategore(x)
}

function showeCategore(z) {
    let cartona = ``;
    for (let i = 0; i < z.length; i++) {
        cartona +=
            `
        <div class="col-md-3 mt-4" onclick="filtrIngredients('${z[i].strCategory}')">
            <div class=" h-intro">
                <div class="hw text-center">
                    <h2 class="">${z[i].strCategory}</h2>
                    <p>${z[i].strCategoryDescription}</p>
                </div>
                <img src="${z[i].strCategoryThumb}" class="rounded rounded-2 " alt="">
            </div>
        </div>
        `
    }
    document.getElementById('rowS').innerHTML = cartona;

    section1.classList.add('d-none');
    section2.classList.add('d-none');
    section3.classList.add('d-none');

}

async function getCArea() {

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let respons = await api.json()
    let x = respons.meals;
    showeArea(x);
}

function showeArea(z) {
    // console.log(z);
    let cartona = ``;
    for (let i = 0; i < z.length; i++) {
        cartona +=
            `
        <div class="col-md-3 mt-4 " onclick="getCatFilterr('${z[i].strArea}')">
            
            <div class="text-center">
                <h1><i class="fa-solid fa-house-chimney" ></i></h1>
                    <h2 class="cursor-pointer">${z[i].strArea}</h2>
            
            </div>
        </div>
        `
    }

    rowS.classList.remove('d-none');
    section1.classList.add('d-none');
    section2.classList.add('d-none');
    section3.classList.add('d-none');

    rowS.innerHTML = cartona;
}

async function getCatFilterr(a) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a} `);
    let respons = await api.json();
    let x = respons.meals;
    showesearchByName(x)
}

async function Ingredients() {
    // console.log(a);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let respons = await api.json();
    let x = respons.meals;
    // console.log(x);
    showeIngredients(x.slice(0, 20));
}
function showeIngredients(z) {
    console.log(z);
    let cartona = ``;
    for (let i = 0; i < z.length; i++) {
        cartona +=
            `
        <div class="col-md-3 mt-4 " onclick="filtrIngredients('${z[i].strIngredient}')">
            
            <div class="text-center">
                <h1><i class="fa-solid fa-drumstick-bite fa-4x" ></i></h1>
                    <h2 class="cursor-pointer">${z[i].strIngredient}</h2>
                    <p>${z[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            
            </div>
        </div>
        `
    }

    rowS.classList.remove('d-none');
    section1.classList.add('d-none');
    section2.classList.add('d-none');
    section3.classList.add('d-none');
 

    rowS.innerHTML = cartona;
}

async function filtrIngredients(a) {
    console.log(a);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${a}`);
    let respons = await api.json();
    let x = respons.meals;
    // console.log(x);
    showesearchByName(x);
}

/***************/
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}