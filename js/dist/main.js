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
            nom: unPays.translations.fra.common,
            drapeau: unPays.flags.svg,
        };
        listePays.push(pays);
    }
    randomPays = getRandomPays(listePays);
    document.querySelector("#drapeau").innerHTML = `<img src="${randomPays.drapeau}"/ width="250px" class="border border-dark" alt="${randomPays.nom}">`;
    const bonneReponse = randomPays.nom;
    const mauvaiseReponse1 = getRandomPays(listePays).nom;
    const mauvaiseReponse2 = getRandomPays(listePays).nom;
    const mauvaiseReponse3 = getRandomPays(listePays).nom;
    let optionsReponse = [bonneReponse, mauvaiseReponse1, mauvaiseReponse2, mauvaiseReponse3];
    optionsReponse = trieTableau(optionsReponse);
}
function trieTableau(tab) {
    let radomTab = tab;
    for (let i = radomTab.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [radomTab[i], radomTab[j]] = [radomTab[j], radomTab[i]];
    }
    return radomTab;
}
function getRandomPays(listePays) {
    let random = Math.floor(Math.random() * listePays.length);
    return listePays[random];
}
//# sourceMappingURL=main.js.map