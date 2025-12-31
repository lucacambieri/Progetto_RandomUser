"use strict";

class Ajax {
 // Properties
 _URL = "https://randomuser.me"
 
 // Methods
 // method può essere get o post
 // url = risorsa da richiedere al server (es: /api)
 // parameters: contiene i parametri della richiesta scritti come json
 // In caso di chiamata get, sarà sendRequest a convertire questi parametri in url-encoded e accodarli alla URL
 sendRequest(method, url, parameters={}) {
	let options={
		"baseURL":this._URL, // Indirizzo server
		"url":  url, // Risorsa da richiedere
		"method": method.toUpperCase(), // Metodo da usare per la richiesta
		"headers": {"Accept": "application/json"},
		"responseType": "json", // Indica il formato della risposta
		"timeout": 5000, // Tempo massimo di attesa della risposta, se non arriva entro quel tempo da errore
	}

	if (method.toUpperCase() == 'GET') {
		// Definisco il content-type dell'urlencoded
		options.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=uth-8"
		// Prende i 'parameters', li converte in urlencoded e li accoda alla url
		options.params = parameters;
	}
	else {
		// Nel caso delle chiamate diverse da GET, il content-type dei parametri è JSON
		options.headers["Content-Type"] = "application/json;charset=uth-8"
		// Scrive i parametri nel body dell'http request
		options.data = parameters;
	}
	let promise = axios(options);
	return promise;
 }

 errore(err) {
	if(!err.response) 
		alert("Connection Refused or Server timeout");	
	// 200 = non ci sono stati errori nel lato server, però il risultato è stato restituito come JSON non valido, per cui il client va in errore durante il parsing
	else if (err.response.status == 200) 
        alert("Formato dei dati non corretto : " + err.response.data);
    else 
        alert("Server Error: " +err.response.status + " - " +err.response.data)
 }
}

let ajax = new Ajax()