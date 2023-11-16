import db from "./firebase.js";

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-button");

    let nameInputValue;
    let subjectInputValue;
    let feedbackInputValue;

    const submitForm = function() {
        nameInputValue = document.getElementById("name-input").value;
        subjectInputValue = document.getElementById("subject-input").value;
        feedbackInputValue = document.getElementById("feedback-input").value;

        if (nameInputValue !== "" && subjectInputValue !== "" && feedbackInputValue !== "") {
            db.collection("feedback").doc().set({
                name: nameInputValue.toLowerCase(),
                subject: subjectInputValue.toLowerCase(),
                feedback: feedbackInputValue.toLowerCase()
            })
            .then(() => {
                nameInputValue = "";
                subjectInputValue = "";
                feedbackInputValue = "";

                document.getElementById("content").innerHTML = "<h1>Thank you for your feedback!</h1>";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    }

    submitButton.addEventListener("click", function() {submitForm()});
})