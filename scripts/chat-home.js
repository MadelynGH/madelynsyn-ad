import db from "./firebase.js";

let user;

if (!(document.cookie.indexOf("user=andrew") == -1)) {
    console.log("The user is Andrew.");
    user = "andrew";
} else if (!(document.cookie.indexOf("user=daniel") == -1)) {
    console.log("The user is Daniel.");
    user = "daniel";
} else if (document.cookie == "") {
    location.replace("/chat");
}

document.addEventListener("DOMContentLoaded", function() {
    const sendMessageButton = document.getElementById("send-message-button");
    
    let otherPersonMessages = new Array();
    let thisPersonMessages = new Array();
    
    const iterateThrough = function(array, person) {
        const thisMessageDiv = document.getElementById("this-message-div");
        const otherMessageDiv = document.getElementById("other-message-div");

        if (person === "this") {
            thisMessageDiv.innerHTML = "";
        }
        if (person === "other") {
            otherMessageDiv.innerHTML = "";
        }
    
        for (let i = 0; i < array.length; i++) {
            if (person === "this") {
                thisMessageDiv.innerHTML = thisMessageDiv.innerHTML + `<p class="this-person-message">` + array[i] + `</p> <div class="break"></div>`;
            }

            if (person === "other") {
                otherMessageDiv.innerHTML =  otherMessageDiv.innerHTML + `<p class="other-person-message">` + array[i] + `</p> <div class="break"></div>`;
            }
        }
    }
    
    if (user) {
        db.collection("messages")
        .where("name", "!=", user)
        .orderBy("name")
        .orderBy("timestamp")
        .onSnapshot((querySnapshot) => {
            otherPersonMessages = [];

            querySnapshot.forEach((doc) => {
                otherPersonMessages.push(doc.data().message);
            });
            iterateThrough(otherPersonMessages, "other");
        });
    
        db.collection("messages")
        .where("name", "==", user)
        .orderBy("name")
        .orderBy("timestamp")
        .onSnapshot((querySnapshot) => {
            thisPersonMessages = [];
    
            querySnapshot.forEach((doc) => {
                thisPersonMessages.push(doc.data().message);
            });
            iterateThrough(thisPersonMessages, "this");
        });
    }
    
    sendMessageButton.addEventListener("click", function() {
            const messageInput = document.getElementById("message-input").value.replaceAll("\n", "<br>");
    
            console.log(user, messageInput);
    
            if (!(user == undefined) && !(messageInput == undefined)) {
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
                db.collection("messages").doc().set({
                    name: user,
                    message: messageInput,
                    timestamp: timestamp
                })
                .then(() => {
                    console.log("Your message has been sent!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
    })
});