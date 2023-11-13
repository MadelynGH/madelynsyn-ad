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
    const messageDiv = document.getElementById("message-div");
    const userHeader = document.getElementById("user-header");

    const sendMessageButton = document.getElementById("send-message-button");
    const switchUserButton = document.getElementById("switch-user");
    
    let otherPersonMessages = new Array();
    let thisPersonMessages = new Array();
    let everyoneMessages = new Array();
    
    const iterateThrough = function(array) {
        const thisMessageDiv = document.getElementById("this-message-div");
        const otherMessageDiv = document.getElementById("other-message-div");

        thisMessageDiv.innerHTML = "";
        otherMessageDiv.innerHTML = "";

        for (let i = 0; i < array.length; i++) {
            if (array[i].name == user) {
                thisMessageDiv.innerHTML = thisMessageDiv.innerHTML + `<p class="this-person-message" id="` + i + `-message">` + array[i].message + `</p> <p class="user-picture">` + array[i].name.toUpperCase().charAt(0) + `<div class="break"></div>`;
                otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<div style="height: ` + document.getElementById(i + "-message").offsetHeight + `px; width: 100%;"></div>`;
            }

            if (array[i].name !== user) {
                if (array[i].name.toUpperCase().charAt(0) == "A") {
                    otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<p class="user-picture">` + "A" + `</p> <p class="other-person-message" id="` + i + `-message">` + array[i].message + `</p> <div class="break"></div>`;
                } else if (array[i].name.toUpperCase().charAt(0) == "D") {
                    otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<p class="user-picture">` + "D" + `</p> <p class="other-person-message" id="` + i + `-message">` + array[i].message + `</p> <div class="break"></div>`;
                }
                thisMessageDiv.innerHTML = thisMessageDiv.innerHTML + `<div style="height: ` + document.getElementById(i + "-message").offsetHeight + `px; width: 100%;"></div>`;
            }
        }

        messageDiv.scrollTop = messageDiv.scrollHeight;
    }
    
    if (user) {
        db.collection("messages")
        .orderBy("timestamp")
        .onSnapshot((querySnapshot) => {
            otherPersonMessages = [];
            thisPersonMessages = [];
            everyoneMessages = [];

            querySnapshot.forEach((doc) => {
                everyoneMessages.push(doc.data());
            });
            iterateThrough(everyoneMessages);
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
                    document.getElementById("message-input").value = "";
                    document.getElementById("message-input").rows = 1;
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
    })

    switchUserButton.addEventListener("click", function() {
        document.cookie = "user=; expires=Wed, 02 Jan 1970 00:00:00 UTC; path=/;";
        location.reload();
    });

    userHeader.innerText = user.charAt(0).toUpperCase() + user.slice(1);
});