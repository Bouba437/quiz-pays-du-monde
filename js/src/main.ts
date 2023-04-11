
fetch("https://restcountries.com/v3.1/all").then(function(response) {
  var contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(datas) {
        startApplication(datas);      
    });
  } else {
    document.querySelector("h1")!.textContent = "les informations recupérées ne sont pas au format JSON";
  }
});

type Pays = {
  nom: string;
  drapeau: string;
}

type Name = {
  common: string;
}

type Datas = {
  translations: {
    fr: {
      common: string,
      [props:string]: string,
    };
    [props:string]: any;
  }
  flags: {
    svg: string;
  };
  [props:string]: any;
}

let listePays: Pays[] = [];
let randomPays: Pays;

function startApplication(datas: Datas[]) {
  for (let unPays of datas) {
    const pays: Pays = {
      nom: unPays.translations.fra.common,
      drapeau: unPays.flags.svg,
    }
    listePays.push(pays);    
  }
  debuterJeu();
}

function debuterJeu() {
  randomPays = getRandomPays(listePays);
  document.querySelector("#drapeau")!.innerHTML = `<img src="${randomPays.drapeau}"/ width="250px" class="border border-dark" alt="${randomPays.nom}">`;

  const bonneReponse = randomPays.nom;
  const mauvaiseReponse1 = getRandomPays(listePays).nom;
  const mauvaiseReponse2 = getRandomPays(listePays).nom;
  const mauvaiseReponse3 = getRandomPays(listePays).nom;

  let optionsReponse: string[] = [bonneReponse, mauvaiseReponse1, mauvaiseReponse2, mauvaiseReponse3]; 
  optionsReponse = melangeTableau(optionsReponse);

  document.querySelector("#boutons")!.innerHTML = genererBoutonsReponse(optionsReponse);
}

function melangeTableau(tab: any[]) {
  let radomTab = tab;
  for (let i = radomTab.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [radomTab[i], radomTab[j]] = [radomTab[j], radomTab[i]];
  }
  return radomTab;
}

function genererBoutonsReponse(tab: string[]): string {
  let boutonsHTML = "";
  for (let nom of tab) {
    boutonsHTML += `<button class="btn btn-primary me-1 mt-1" onClick="verificationReponse('${nom}')">${nom}</button>`;
  }
  return boutonsHTML;
}

function verificationReponse(reponse: string): void {
  const divResultat = document.querySelector("#resultat")! as HTMLDivElement;
  if (reponse === randomPays.nom) {
    divResultat.innerHTML = `<div class="alert alert-success mt-2" role="alert">${reponse} est la onne réponse.</div>`;
  } else {
    divResultat.innerHTML = `<div class="alert alert-danger mt-2" role="alert">Mauvaise réponse.</div>`;  
  }
  divResultat.innerHTML += `<button class="btn btn-warning mt-1" onClick="debuterJeu()">Changer de pays</button>`;
}


function getRandomPays(listePays: Pays[]): Pays {
  let random = Math.floor(Math.random() * listePays.length);
  return listePays[random];
}
