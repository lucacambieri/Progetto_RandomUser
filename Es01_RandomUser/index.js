"use strict";
	
let tbody = document.querySelector("tbody");

//#region Puntatori Card Persona
let content = document.getElementById("content");
let iconName = document.getElementById("iconName");
let iconPhone = document.getElementById("iconPhone");
let iconMail = document.getElementById("iconMail");
let iconCity = document.getElementById("iconCity");
//#endregion

//#region Puntatori Filtri
let divNazioni = document.getElementById("nazioni");
let rangeInput = document.getElementById("rangeRecords");
let valueDisplay = document.getElementById("valueRange");
let btnSalva = document.getElementById("btnSalvaImpostazioni");
//#endregion

//#region Puntatori Buttons di navigazione
let lblNumRecord = document.getElementById("lblNumRecord");
let btns = buttons.querySelectorAll("#buttons button");
//#endregion

//#region Puntatori / Variabili Gestione Preferiti
let iconFavorite = document.getElementById("iconFavorite");
let lstFavPeople = [];
//#endregion

//#region Variabili
let selectedPerson;
let previousTr;
let isSettingsOpen = false;
let nationalities = [{id:"AU", desc:"Australia"}, {id:"BR", desc:"Brasile"}, {id:"CA", desc:"Canada"}, {id:"CH", desc:"Svizzera"}, {id:"DE", desc:"Germania"}, {id:"DK", desc:"Danimarca"}, {id:"ES", desc:"Spagna"},
                    {id:"FI", desc:"Finlandia"}, {id:"FR", desc:"Francia"}, {id:"GB", desc:"Inghilterra"}, {id:"IE", desc:"Irlanda"}, {id:"IN", desc:"India"}, {id:"IR", desc:"Iran"}, {id:"MX", desc:"Messico"}, 
                    {id:"NL", desc:"Olanda"}, {id:"NO", desc:"Norvegia"}, {id:"NZ", desc:"N. Zelanda"}, {id:"RS", desc:"Serbia"}, {id:"TR", desc:"Turchia"}, {id:"UA", desc:"Ucraina"}, {id:"US", desc:"Stati Uniti"}
];
let params = {
    results:30,
}
let lstPeople = [];
let currentUser = 1;
//#endregion

//#region Main
fillTable(params);

popolaChksNazioni();

abilitaPulsanti();

caricaPreferiti();
//#endregion

//#region Eventi
btnSalva.addEventListener("click", function() {
    // Qui aggiungi la logica per salvare le impostazioni
    impostazioni.style.display = "none";  
    isSettingsOpen = !isSettingsOpen; 
    console.log("Impostazioni salvate");

    params = {
        results:30,
        nat: "",
    };
    let cnt = 0;
    let radioF = document.getElementById("rdbF");
    let radioM = document.getElementById("rdbM");
    let chksNat = nazioni.querySelectorAll("input[type=checkbox]:checked");
    let valueRange = document.getElementById("valueRange").textContent;

    //#region GENDER
    if (radioF.checked) {
        params.gender = "female";
    }
    else if (radioM.checked) {
        params.gender = "male";
    }
    else{
        params.gender = "";
    }
    //#endregion
    
    //#region NATIONALITIES
    chksNat.forEach(chk => {
        if (cnt == 0) {
            params.nat += chk.value;
        }
        else{
            params.nat += "," + chk.value;
        }
        cnt++;
    });
    //#endregion

    //#region RESULTS
    params.results = valueRange;
    //#endregion
    
    lblNumRecord.textContent = `1/${valueRange}`;

    console.log("Parametri:", params);
    fillTable(params);
});

rangeInput.addEventListener("input", function() {
    valueDisplay.textContent = this.value;
});

//#region GESTIONE ICONE
iconName.addEventListener("mouseover", function(){
    if (selectedPerson != null) {
        iconName.classList = "bi bi-person-badge-fill";
        iconName.innerHTML = "<path d=\"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z\"/>"
        content.textContent = selectedPerson.name.first + " " + selectedPerson.name.last
        labelContent.textContent = "Nome:"
    }
})
iconName.addEventListener("mouseout", function(){
    if (selectedPerson != null) {
        iconName.classList = "bi bi-person-badge";
        iconName.innerHTML = "<path d=\"M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0\"/>" + 
	    					"<path d=\"M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z\"/>"
    }
})

iconPhone.addEventListener("mouseover", function(){
    if (selectedPerson != null) {
        iconPhone.classList = "bi bi-telephone-fill";
        iconPhone.innerHTML = "<path fill-rule=\"evenodd\" d=\"M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z\"/>"
        content.textContent = selectedPerson.cell;
        labelContent.textContent = "Cellulare:"
    }
})
iconPhone.addEventListener("mouseout", function(){
    if (selectedPerson != null) {
        iconPhone.classList = "bi bi-telephone";
        iconPhone.innerHTML = "<path d=\"M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z\"/>"
    }
})

iconMail.addEventListener("mouseover", function(){
    if (selectedPerson != null) {
        iconMail.classList = "bi bi-envelope-at-fill";
        iconMail.innerHTML = "<path d=\"M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671\"/>" +
            "<path d=\"M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791\"/>";
        content.textContent = selectedPerson.email;
        labelContent.textContent = "Email:"
    }
})
iconMail.addEventListener("mouseout", function(){
    if (selectedPerson != null) {
        iconMail.classList = "bi bi-envelope-at";
        iconMail.innerHTML = "<path d=\"M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z\"/>" + 
                            "<path d=\"M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z\"/>"
    }
})

iconCity.addEventListener("mouseover", function(){
    if (selectedPerson != null) {
        iconCity.classList = "bi bi-geo-alt-fill";
        iconCity.innerHTML = "  <path d=\"M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6\"/>"
        content.textContent = selectedPerson.location.city;
        labelContent.textContent = "Città:"
    }
})
iconCity.addEventListener("mouseout", function(){
    if (selectedPerson != null) {
        iconCity.classList = "bi bi-geo-alt";
        iconCity.innerHTML = "<path d=\"M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10\"/>" + 
                            "<path d=\"M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6\"/>"
    }
})
//#endregion

impostazioniButton.addEventListener("click", function(){
    if (!isSettingsOpen) {
        impostazioni.style.display = "block";   
    }
    else{
        impostazioni.style.display = "none";   
    }
    isSettingsOpen = !isSettingsOpen;
})

for (let btn of btns) {
    btn.addEventListener("click", naviga);
}

iconFavorite.addEventListener("click", function() {
    if (this.classList.contains("bi-star")) {
        lstFavPeople.push(lstPeople[currentUser - 1]);
        this.classList.remove("bi-star");
        this.classList.add("bi-star-fill");  // stella piena
        this.innerHTML = "<path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>"
    } else {
        lstFavPeople.pop(lstPeople[currentUser - 1]);
        this.classList.add("bi-star");
        this.classList.remove("bi-star-fill");
        this.innerHTML ="<path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/>";
    }
    salvaPreferiti();
    console.log("Persone preferite:", lstFavPeople)
});
//#endregion

//#region Funzioni
/** 
 * Riempie la tabella con i dati ottenuti dalla API
 */
function fillTable(params){
    let promise = richiamaAPI(params);
    let cnt = 0;

    let changeColor = true;
    
    lstPeople = [];

    promise.catch(ajax.errore);
    promise.then(function(httpResponse){
        console.log("Dati:", httpResponse);
        let people = httpResponse.data;
        tbody.innerHTML = "";
        for (const person of people.results) {
            cnt++;

            lstPeople.push(person);

            let tr = document.createElement("tr");
            //tr.vAlign = "middle";
            if (changeColor) {
                tr.classList.add("bg-info-subtle");
            } else {
                tr.classList.add("bg-primary-subtle");
            }
            changeColor = !changeColor;
            
            tbody.appendChild(tr);

            let img = document.createElement("img");
            img.src = person.picture.thumbnail;
            img.classList = "img-fluid img-thumbnail border-5 rounded-circle ";
            tr.appendChild(img);

            let td = document.createElement("td");
            td.classList = "w-75 p-2";
            td.innerHTML = person.name.first + " " + person.name.last + "<br>" + 
                            person.dob.age + "<br>" + 
                            person.nat;

            tr.addEventListener("click", function(){
                previousTr.classList.remove("border");
                selectedPerson = person;
                imgPersona.src = selectedPerson.picture.large;
                content.textContent = "..."; // + "border-primary"
                tr.classList.add("border");
                tr.classList.add("border-primary");
                previousTr = tr;

                currentUser = lstPeople.indexOf(person) + 1;
                abilitaPulsanti();
                lblNumRecord.textContent = `${currentUser}/${lstPeople.length}`;

                console.log(currentUser)
                if (lstFavPeople.includes(selectedPerson)) {
                    iconFavorite.classList.remove("bi-star");
                    iconFavorite.classList.add("bi-star-fill");  // stella piena
                    iconFavorite.innerHTML = "<path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>"
                }
                else{
                    iconFavorite.classList.add("bi-star");
                    iconFavorite.classList.remove("bi-star-fill");
                    iconFavorite.innerHTML ="<path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/>";
                }
            });

            tr.appendChild(td);
        }
        selectedPerson = people.results[0];
        imgPersona.src = selectedPerson.picture.large;
        previousTr = tbody.querySelector("tr");
        previousTr.classList.add("border");
        previousTr.classList.add("border-primary");
        currentUser = 1;
        console.log("Lista persone:", lstPeople);
    });
}

/**
 * Effettua una chiamata alla API per generare utenti casuali
 * @param {JSON} params JSON dei parametri della richiesta
 * @returns promise della chiamata AJAX
 */
function richiamaAPI(params){
    //params['nat'] = "GB";
    let promise = ajax.sendRequest("GET", "/api", params);
    //let promise = ajax.sendRequest("GET", "/api?results=20&gender=male"); // le due righe sono equivalenti
    return promise;
}

function popolaChksNazioni() {
    let cnt = 0;
    let col;
    for (const nat of nationalities) {
        if (cnt % 7 == 0) {
            col = document.createElement("div");
            col.classList.add("col-4");
            divNazioni.appendChild(col);
        }
        let chk = document.createElement("div");
        chk.classList.add("mb-3");
        chk.innerHTML = `<input type=\"checkbox\" id=\"chk${nat.id}\" value=\"${nat.id}\" checked=\"true\" class=\"form-check-input\">` +
                        `<label for=\"chk${nat.id}\">${nat.desc}</label>`;
        col.appendChild(chk);
        cnt++;
    }
}

function abilitaPulsanti() {
    if (currentUser == 1) {
        btns[0].disabled = true;
        btns[1].disabled = true;
        btns[2].disabled = false;
        btns[3].disabled = false;
    }
    else if (currentUser == lstPeople.length) {
        btns[0].disabled = false;
        btns[1].disabled = false;
        btns[2].disabled = true;
        btns[3].disabled = true;
    }
    else{
        btns[0].disabled = false;
        btns[1].disabled = false;
        btns[2].disabled = false;
        btns[3].disabled = false;
    }
}


function salvaPreferiti() {
    localStorage.setItem("Favourites", JSON.stringify(lstFavPeople));
    console.log("Preferiti salvati nel localStorage");
}


function caricaPreferiti() {
    let datiSalvati = localStorage.getItem("Favourites");
    if (datiSalvati) {
        lstFavPeople = JSON.parse(datiSalvati);
        console.log("Preferiti caricati dal localStorage:", lstFavPeople);
    }
}

function naviga() {
    let trs = tbody.querySelectorAll("tr");

    switch (this.value) {
        case "Primo":
            currentUser = 1;
            break;
        case "Indietro":
            currentUser--;
            break;
        case "Avanti":
            currentUser++;
            break;
        case "Ultimo":
            currentUser = lstPeople.length;
        break;
        default:
            break;
    }
    abilitaPulsanti();
    //displayData();
    lblNumRecord.textContent = `${currentUser}/${lstPeople.length}`;

    selectedPerson = lstPeople[currentUser - 1];

    imgPersona.src = selectedPerson.picture.large;

    previousTr.classList.remove("border");
    content.textContent = "..."; // + "border-primary"
    trs[currentUser - 1].classList.add("border");
    trs[currentUser - 1].classList.add("border-primary");
    previousTr = trs[currentUser - 1];
    if (lstFavPeople.includes(selectedPerson)) {
        iconFavorite.classList.remove("bi-star");
        iconFavorite.classList.add("bi-star-fill");  // stella piena
        iconFavorite.innerHTML = "<path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>"
    }
    else{
        iconFavorite.classList.add("bi-star");
        iconFavorite.classList.remove("bi-star-fill");
        iconFavorite.innerHTML ="<path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/>";
    }
}
//#endregion