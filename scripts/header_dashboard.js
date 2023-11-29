if (document.cookie === "") {
    location.replace("/");
}

document.head.innerHTML = document.head.innerHTML + `
    <link rel="icon" type="image/x-icon" href="/images/ad-club-favicon.png">
    <link rel="stylesheet" type="text/css" href="/styles/header.css">
`;

document.body.innerHTML = `<div id="header">
<a href="/dashboard"><img id="logo" src="/images/ad-club-logo-for-website.png"></a>
<div id="button-header-div">
    <a href="/dashboard/ad-dollars"><button>AD Dollars</button></a>
    <a href="/dashboard/presidency"><button>Presidency</button></a>
    <a href="/dashboard/certificate-maker"><button>Certificate Maker</button></a>
    <a href="/dashboard/chat/home"><button>AD Chat</button></a>

    <div id="blue-button-div">
        <a href="/dashboard/feedback"><button class="blue-button">Send Feedback</button></a>
        <button class="blue-button" onclick="document.cookie = 'user=; expires=Wed, 02 Jan 1970 00:00:00 UTC; path=/;';
        location.reload();">Log out</button>
    </div>
</div>
</div>

<div class="break"></div><div id="content">` + document.body.innerHTML + "</div>";