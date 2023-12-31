import db from "./firebase.js";

let url = new URL(window.location);

const setURL = function(pageID) {
    url.searchParams.set("pageid", pageID);
    location.href = url.href;
}

const addPage = function(name) {
    db.collection("notes").doc().set({
        name: name,
        notes: ``
    })
    .then(() => {
        console.log("Your page has been created!!");
        setURL(doc.id);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}