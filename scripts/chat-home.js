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
    const messageInputElement = document.getElementById("message-input");
    const typingDiv = document.getElementById("typing-div");

    let everyoneMessages = new Array();

    let id;
    
    const iterateThrough = function(array) {
        const thisMessageDiv = document.getElementById("this-message-div");
        const otherMessageDiv = document.getElementById("other-message-div");

        thisMessageDiv.innerHTML = "";
        otherMessageDiv.innerHTML = "";

        for (let i = 0; i < array.length; i++) {
            if (array[i].name == user) {
                thisMessageDiv.innerHTML = thisMessageDiv.innerHTML + `<div class="message-group" id="` + i + `-message"><div class="this-person-message">` + array[i].message + `</div> <p class="user-picture-this user-picture">` + array[i].name.toUpperCase().charAt(0) + `</div><div class="break"></div>`;
                otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<div style="height: ` + document.getElementById(i + "-message").offsetHeight + `px; width: 100%;"></div>`;
            }

            if (array[i].name !== user) {
                if (array[i].name.toUpperCase().charAt(0) == "A") {
                    otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<div class="message-group" id="` + i + `-message"><p class="user-picture-other user-picture">A</p> <div class="other-person-message">` + array[i].message + `</div></div><div class="break"></div>`;
                } else if (array[i].name.toUpperCase().charAt(0) == "D") {
                    otherMessageDiv.innerHTML = otherMessageDiv.innerHTML + `<div class="message-group" id="` + i + `-message"><p class="user-picture-other user-picture">D</p> <div class="other-person-message">` + array[i].message + `</div></div><div class="break"></div>`;
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
            everyoneMessages = [];

            querySnapshot.forEach((doc) => {
                everyoneMessages.push(doc.data());
            });
            iterateThrough(everyoneMessages);
        });
    }

    const checkTypingStatus = function() {
        db.collection("typing")
        .onSnapshot((querySnapshot) => {    
            querySnapshot.forEach((doc) => {
                if (doc.data().name == "andrew") {
                    if (doc.data().typing && user !== "andrew") {
                        typingDiv.innerText = "Andrew is typing...";
                    }
                } else if (doc.data().name == "daniel") {
                    if (doc.data().typing && user !== "daniel") {
                        console.log("Daniel is typing...");
                        typingDiv.innerText = "Daniel is typing...";
                    } else {
                        typingDiv.innerText = "";
                    }
                }
            });
        });

    }
    
    sendMessageButton.addEventListener("click", function() {
            const messageInput = document.getElementById("message-input").value.replaceAll("\n", "<br>");
    
            console.log(user, messageInput);
    
            if (!(user == undefined) && (messageInput !== "")) {
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

    if (user == "andrew") {
        id = "wAjf5deM8N6Ydex0BwXK";
    } else if (user == "daniel") {
        id = "EoDFykf22YvWXbXKfP3N";
    }

    messageInputElement.addEventListener("focus", function() {
        console.log("You just started typing.");

        db.collection("typing").doc(id).set({
            name: user,
            typing: true
        })
        .then(() => {
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    });

    messageInputElement.addEventListener("blur", function() {
        console.log("You just stopped typing.");

        db.collection("typing").doc(id).set({
            name: user,
            typing: false
        })
        .then(() => {
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    });

    setInterval(checkTypingStatus(), 100);
});