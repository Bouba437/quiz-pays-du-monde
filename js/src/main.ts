
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
      official: string,
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
      nom: unPays.translations.fra.official,
      drapeau: unPays.flags.svg,
    }
    listePays.push(pays);    
  }
  console.log(listePays);  
}

function getRandomPays(listePays: Pays[]): Pays {
  let random = Math.floor(Math.random() * listePays.length);
  return listePays[random];
}