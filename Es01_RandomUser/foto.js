"use strict"

//#region PUNTATORI
let femaleGrid = document.getElementById("femaleGrid");
let maleGrid = document.getElementById("maleGrid");
let userModalElement = document.getElementById("userModal");
let userModal = null;
let modalImage = document.getElementById("modalImage");
let modalName = document.getElementById("modalName");
let modalAge = document.getElementById("modalAge");
//#endregion

//#region VARIABILI
let params = {
    results: 200,
    inc: "picture,name,gender,dob"
}
let lstPeople = [];
//#endregion

//#region MAIN
fillTable(params);
//#endregion

//#region FUNZIONI

/**
 * Riempie la griglia con le foto degli utenti
 * @param {JSON} params Parametri per la chiamata API
 */
function fillTable(params){
    let promise = richiamaAPI(params);
    
    promise.catch(ajax.errore);
    promise.then(function(httpResponse){
        let response = httpResponse.data;
        lstPeople = response.results;
        console.log("Dati ricevuti:", lstPeople);
        
        mostraFoto();
    });
}

/**
 * Effettua una chiamata alla API per generare utenti casuali
 * @param {JSON} params JSON dei parametri della richiesta
 * @returns promise della chiamata AJAX
 */
function richiamaAPI(params){
    let promise = ajax.sendRequest("GET", "/api", params);
    return promise;
}


function mostraFoto(){
    femaleGrid.innerHTML = "";
    maleGrid.innerHTML = "";
    
    let females = lstPeople.filter(person => person.gender === "female");
    let males = lstPeople.filter(person => person.gender === "male");
    
    females.forEach(person => {
        let imgDiv = creaImmagineCircolare(person);
        femaleGrid.appendChild(imgDiv);
    });
    
    males.forEach(person => {
        let imgDiv = creaImmagineCircolare(person);
        maleGrid.appendChild(imgDiv);
    });
}


function creaImmagineCircolare(person){
    let colDiv = document.createElement("div");
    colDiv.className = "col-auto";
    
    let imgContainer = document.createElement("div");
    imgContainer.className = "d-inline-block";
    imgContainer.style.cursor = "pointer";
    
    let img = document.createElement("img");
    img.src = person.picture.large;
    img.className = "img-fluid rounded-circle";
    img.style.width = "120px";
    img.style.height = "120px";
    img.style.objectFit = "cover";
    img.style.border = "3px solid #0d6efd";
    img.alt = person.name.first + " " + person.name.last;
    
    imgContainer.addEventListener("click", function(){
        mostraDettagliUtente(person);
    });
    
    imgContainer.appendChild(img);
    colDiv.appendChild(imgContainer);
    
    return colDiv;
}

function mostraDettagliUtente(person){
    if (!userModal) {
        userModal = new bootstrap.Modal(userModalElement);
    }
    
    modalImage.src = person.picture.large;
    modalName.textContent = person.name.first + " " + person.name.last;
    modalAge.textContent = "Età: " + person.dob.age + " anni";
    
    userModal.show();
}

//#endregion