"use strict";
fetch("https://restcountries.com/v3.1/all").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (datas) {
            startApplication(datas);
        });
    }
    else {
        document.querySelector("h1").textContent = "les informations recupérées ne sont pas au format JSON";
    }
});
let listePays = [];
let randomPays;
function startApplication(datas) {
    for (let unPays of datas) {
        const pays = {
            nom: unPays.translations.fra.official,
            drapeau: unPays.flags.svg,
        };
        listePays.push(pays);
    }
    console.log(listePays);
}
function getRandomPays(listePays) {
    let random = Math.floor(Math.random() * listePays.length);
    return listePays[random];
}
//# sourceMappingURL=main.js.map