import db from "./firebase.js";

let user;

if (!(document.cookie.indexOf("user=andrew") == -1)) {
    console.log("The user is Andrew.");
    user = "andrew";
} else if (!(document.cookie.indexOf("user=daniel") == -1)) {
    console.log("The user is Daniel.");
    user = "daniel";
}