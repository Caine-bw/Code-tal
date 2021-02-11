// # Bienvenu à Codepital:
// >Dans cet exercice nous aurons des malades qui iront ce faire débuger chez un doctor. Le doctor les diagnostiquera et leur préscrira un remède. Par la suite les malades irons à la pharmacie afin d'acheter leur remède puis le prendrons et seront guérri.

// ## Description des patients
// >les malades ont un nom, une maladie, de l'argent, une poche, un état de santé,ils savent aller à un endroit, prendre un médicamment et payer. Au début, les patients sont dans un salle d'attente. 

//class Malades

class Malades {
    constructor(nom, maladie, argent, poche, etatSante, traitement){
    this.nom = nom;
    this.maladie = maladie;
    this.argent = argent;
    this.poche = poche;
    this.etatSante = etatSante;;
    this.traitement = traitement;
    this.goTo = (depart, arrivee) => {
        arrivee.personnes.push(this)
        depart.personnes.splice(depart.personnes.indexOf(this))
        console.log(`${this.nom} est à ${depart.nom} et se dirrige vers ${arrivee.nom}`);
        }
    this.takeCare = (payer) => {
        this.argent -= traitement.prix;
        payer.argent += traitement.prix;
        console.log(`${this.nom} a payé ${traitement.prix},00€`);
        console.log(`il lui reste ${this.argent},00€`);
        }
    this.paye = (client) => {
        this.argent -= 50;
        client.argent += 50;
        console.log(`${this.nom} a payé 50,00€ a ${doctor.nom}`);
        }
    }
}

class Traitement {
    constructor(nom, prix){
        this.nom = nom
        this.prix = prix
    }
}

//Instance Traiteùent
let t1 = new Traitement("ctrl+maj+f", 60)
let t2 = new Traitement("saveOnFocusChange", 100)
let t3 = new Traitement("CheckLinkRelation", 635)
let t4 = new Traitement("Ventoline", 40)
let t5 = new Traitement("f12+doc", 20)


//Instance Patient
let p1 = new Malades ('Marcus', 'mal indenté', 100, 'vide', 'malade', '');
let p2 = new Malades ('Optimus', 'unsave', 200, 'vide', 'malade', '');
let p3 = new Malades ('Sangoku', '404', 80, 'vide', 'malade', '');
let p4 = new Malades ('Darthvader', 'azmatique', 110, 'vide', 'malade', '');
let p5 = new Malades ('Semicolon', 'syntaxError', 60, 'vide', 'malade', '');

// Objet salle d'attente
let salleDattente = {
    nom: "salle d'attente",
    personnes: [p1, p2, p3, p4, p5]
}

// Objet Doctor

let doctor = {
    nom: "Dr Oetker",
    argent: 50,
    cabinet: [],
    salle:  salleDattente,
    diagnostique(patients){
        switch (patients.maladie) {
            case "mal indenté":
                patients.traitement = t1
                break;
            case "unsave":
                patients.traitement = t2
                break;
            case "404":
                patients.traitement = t3
                break;
            case "azmatique":
                patients.traitement = t4
                break;
            case "syntaxError":
               patients.traitement = t5
                break;
            default:
                console.log("Nous ne pouvons rien pour vous, eror 666 go  to Jahanam.");
                break;
        }
        console.log(`Le diagnostique de ${patients.nom} est le suivant: il est ${patients.maladie}, il auras besoin du traitement suivant: ${patients.traitement.nom}.`);
    },
    patientIn(){
        let patients = this.salle.personnes[0];
        this.cabinet.push(this.salle.personnes.shift())
        console.log(`${patients.nom} est entrer dans le cabinet.`)
    },
    patientOut(){
        let patients = this.cabinet[0];
        console.log(`${patients.nom} a été diagnostiquer.`)
        console.log(`${patients.nom} est sortie du cabinet.`)
        console.log(`${patients.nom} ce rend compte que ses problemes ne sont pas encore fini`);
        this.cabinet.splice(this.cabinet.indexOf(patients))
        this.salle.personnes.push(patients)
    }
}

// Objet cimetiere
let cimetiere = {
    nom: "Cimetière",
    personnes: []
}

// Objet pharmacie
let pharmacie = {
    nom: "pharmacie",
    argent: 0,
    personnes: [],
    methodetraitement(patients) {
        let care;
        switch (patients.traitement) {
            case t1:
                care = 60;
                break;
            case t2:
                care = 100;
                 break;   
             case t3:
                care = 35;
                break;
            case t4:
                care = 40;
                break;
            case t5:
                care = 20;
                break;
            default:
                console.log("Nous ne puvons rien pour vous");
                break;
     
       }
       if (patients.argent >= care) {
           console.log(`${patients.nom} a ${patients.argent},00€ et vas payer ${care},00€ `);
           patients.argent -= care
           this.argent += care
           console.log(`Il lui rest ${patients.argent},00€`);
       } else {
           console.log(`${patients.nom} a ${patients.argent},00€ et vas payer ${care},00€.`);
           console.log(`${patients.nom} n'a pas assez d'argent.`);
           patients.goTo(pharmacie, cimetiere)
           console.log(`Have a good trip in hell`);
       }
       console.log("_______________________________________________________________");
    }
}

//boucles
do {
    let x = doctor.salle.personnes[0]
    doctor.patientIn()
    x.paye(doctor)
    doctor.diagnostique(x)
    doctor.patientOut()
    x.goTo(doctor.salle, pharmacie)
    pharmacie.methodetraitement(x)
} while (doctor.salle.personnes.length > 0);