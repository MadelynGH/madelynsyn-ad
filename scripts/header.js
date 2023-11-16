document.head.innerHTML = document.head.innerHTML + `

<link rel="icon" type="image/x-icon" href="/images/ad-club-favicon.png">
`;

document.body.innerHTML = `<div id="header">
<a href="/"><img id="logo" src="/images/ad-club-logo-for-website.png"></a>
<div id="button-header-div">
    <a href="/ad-dollars"><button>AD Dollars</button></a>
    <a href="/presidency"><button>Presidency</button></a>
    <a href="/certificate-maker"><button>Certificate Maker</button></a>
    <a href="/chat"><button>AD Chat</button></a>
    <a href="/feedback"><button id="feedback-button">Send Feedback</button></a>
</div>
</div>

<div class="break"></div><div id="content">` + document.body.innerHTML + "</div>";