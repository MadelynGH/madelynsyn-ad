import db from "./firebase.js";

const andrewADDisplayAmount = document.getElementById("andrew-ad-display");
const danielADDisplayAmount = document.getElementById("daniel-ad-display");
const madelynADDisplayAmount = document.getElementById("madelyn-ad-display");
const sharedADDisplayAmount = document.getElementById("shared-ad-display");

let andrewId;
let danielId;
let madelynId;
let sharedADId;
let andrewAmount;
let danielAmount;
let madelynAmount;
let sharedADAmount;

const andrewNumber = document.getElementById("andrew-number");
const andrewAddButton = document.getElementById("andrew-add");
const andrewTakeAwayButton = document.getElementById("andrew-take-away");

const danielNumber = document.getElementById("daniel-number");
const danielAddButton = document.getElementById("daniel-add");
const danielTakeAwayButton = document.getElementById("daniel-take-away");

const madelynNumber = document.getElementById("madelyn-number");
const madelynAddButton = document.getElementById("madelyn-add");
const madelynTakeAwayButton = document.getElementById("madelyn-take-away");

const sharedADNumber = document.getElementById("shared-ad-number");
const sharedADAddButton = document.getElementById("shared-ad-add");
const sharedADTakeAwayButton = document.getElementById("shared-ad-take-away");

// Display real-time amount for Andrew
db.collection("users").where("name", "==", "andrew")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("users").doc(doc.id)
            .onSnapshot((doc) => {
                andrewId = doc.id;
                andrewAmount = doc.data().ad_dollars;
                andrewADDisplayAmount.innerHTML = "Andrew's AD Dollars: " + doc.data().ad_dollars;
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

// Display real-time amount for Daniel
db.collection("users").where("name", "==", "daniel")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("users").doc(doc.id)
            .onSnapshot((doc) => {
                danielId = doc.id;
                danielAmount = doc.data().ad_dollars;
                danielADDisplayAmount.innerHTML = "Daniel's AD Dollars: " + doc.data().ad_dollars;
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
// Display real-time amount for Madelyn
db.collection("users").where("name", "==", "madelyn")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("users").doc(doc.id)
            .onSnapshot((doc) => {
                madelynId = doc.id;
                madelynAmount = doc.data().ad_dollars;
                madelynADDisplayAmount.innerHTML = "Madelyn's AD Dollars: " + doc.data().ad_dollars;
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

// Display real-time amount for Shared AD
db.collection("users").where("name", "==", "shared_ad")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("users").doc(doc.id)
            .onSnapshot((doc) => {
                sharedADId = doc.id;
                sharedADAmount = doc.data().ad_dollars;
                sharedADDisplayAmount.innerHTML = "Shared AD Dollars: " + doc.data().ad_dollars;
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

const addAD = function(amount, personId, person, personAmountVariable) {
    db.collection("users").doc(personId).set({
        name: person,
        ad_dollars: personAmountVariable * 1 + amount * 1
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const takeAwayAD = function(amount, personId, person, personAmountVariable) {
    db.collection("users").doc(personId).set({
        name: person,
        ad_dollars: personAmountVariable * 1 - amount * 1
    })
    .then(() => {
        console.log("Document successfully written!");
        amount = "";
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

andrewAddButton.addEventListener("click", function() {addAD(andrewNumber.value, andrewId, "andrew", andrewAmount); andrewNumber.value = "";})
danielAddButton.addEventListener("click", function() {addAD(danielNumber.value, danielId, "daniel", danielAmount); danielNumber.value = "";})
madelynAddButton.addEventListener("click", function() {addAD(madelynNumber.value, madelynId, "madelyn", madelynAmount); madelynNumber.value = "";})
sharedADAddButton.addEventListener("click", function() {addAD(sharedADNumber.value, sharedADId, "shared_ad", sharedADAmount); sharedADNumber.value = "";})

andrewTakeAwayButton.addEventListener("click", function() {takeAwayAD(andrewNumber.value, andrewId, "andrew", andrewAmount); andrewNumber.value = "";})
danielTakeAwayButton.addEventListener("click", function() {takeAwayAD(danielNumber.value, danielId, "daniel", danielAmount); danielNumber.value = "";})
madelynTakeAwayButton.addEventListener("click", function() {takeAwayAD(madelynNumber.value, madelynId, "madelyn", madelynAmount); madelynNumber.value = "";})
sharedADTakeAwayButton.addEventListener("click", function() {takeAwayAD(sharedADNumber.value, sharedADId, "shared_ad", sharedADAmount); sharedADNumber.value = "";})