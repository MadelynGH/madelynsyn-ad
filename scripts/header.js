const matthewButtonCode = `<button style="background-color:red;position:fixed;right:50px;top:30vh" height="7vh" onclick="document.getElementById('content').style='background-color:blue';document.getElementById('header').style='background-color:pink'"><i>The Original</i> <b>Party Mode!!!</b></button><button style="background-color:darkblue;position:fixed;right:50px;top:40vh" height="7vh" onclick="document.getElementById('content').style='background-color:darkblue';document.getElementById('header').style='background-color:darkblue'"><i>Dampened</i> <b>Sea Mode!!!</b></button><button style="background-color:white;position:fixed;right:50px;top:50vh" height="7vh" onclick="document.getElementById('content').style='display:none';document.getElementById('header').style='display:none'"><i>Secret</i> <b>Invisible Mode</b></button>`;

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

<div class="break"></div><div id="content">` + document.body.innerHTML + matthewButtonCode + "</div>";