"use strict";
//#region PUNTATORI
let preferitisContainer = document.getElementById("preferitisContainer");
let noPreferiti = document.getElementById("noPreferiti");
//#endregion

//#region VARIABILI
let lstFavPeople = [];
//#endregion

//#region MAIN
caricaPreferiti();
//#endregion

//#region FUNZIONI


function caricaPreferiti() {
    let datiSalvati = localStorage.getItem("Favourites");
    if (datiSalvati) {
        lstFavPeople = JSON.parse(datiSalvati);
        console.log("Preferiti caricati:", lstFavPeople);
        mostraPreferiti();
    } else {
        mostraMessaggioVuoto();
    }
}


function mostraPreferiti() {
    if (lstFavPeople.length === 0) {
        mostraMessaggioVuoto();
        return;
    }

    preferitisContainer.innerHTML = "";
    noPreferiti.style.display = "none";

    lstFavPeople.forEach((person, index) => {
        let colDiv = document.createElement("div");
        colDiv.className = "col-12 col-md-4 mb-4";

        let card = document.createElement("div");
        card.className = "card h-100 shadow-sm";
        card.style.borderTop = "5px solid #0d6efd";

        let img = document.createElement("img");
        img.src = person.picture.large;
        img.className = "card-img-top";
        img.alt = person.name.first + " " + person.name.last;

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = person.name.first + " " + person.name.last;

        let info = document.createElement("p");
        info.className = "card-text text-muted";
        info.innerHTML = `
            <strong>Età:</strong> ${person.dob.age}<br>
            <strong>Città:</strong> ${person.location.city}<br>
            <strong>Paese:</strong> ${person.location.country}<br>
            <strong>Email:</strong> ${person.email}<br>
            <strong>Telefono:</strong> ${person.cell}
        `;

        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer text-center d-flex justify-content-center";

        let btnRemove = document.createElement("button");
        btnRemove.classList = "btn btn-danger";
        btnRemove.textContent = "Rimuovi dai preferiti";
        btnRemove.addEventListener("click", function() {
            rimuoviPreferito(index);
        });

        cardFooter.appendChild(btnRemove);

        cardBody.appendChild(title);
        cardBody.appendChild(info);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        colDiv.appendChild(card);
        preferitisContainer.appendChild(colDiv);
    });
}


function mostraMessaggioVuoto() {
    preferitisContainer.innerHTML = "";
    noPreferiti.style.display = "block";
}


function rimuoviPreferito(index) {
    lstFavPeople.splice(index, 1);
    localStorage.setItem("Favourites", JSON.stringify(lstFavPeople));
    console.log("Preferito rimosso. Totale:", lstFavPeople.length);
    mostraPreferiti();
}

//#endregion