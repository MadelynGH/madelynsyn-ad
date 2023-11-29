if (!(document.cookie === "")) {
    location.replace("/dashboard");
}

document.addEventListener("DOMContentLoaded", function() {
    const andrewButton = document.getElementById("andrew-button");
    const danielButton = document.getElementById("daniel-button");

    andrewButton.addEventListener("click", function() {
        document.cookie = "user=andrew; path=/;";
        location.replace("/dashboard");
    });

    danielButton.addEventListener("click", function() {
        document.cookie = "user=daniel; path=/;";
        location.replace("/dashboard");
    });
})