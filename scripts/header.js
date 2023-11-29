document.head.innerHTML = document.head.innerHTML + `
    <link rel="icon" type="image/x-icon" href="/images/ad-club-favicon.png">
    <link rel="stylesheet" type="text/css" href="/styles/header.css">
`;

document.body.innerHTML = `<div id="header">
<a href="/"><img id="logo" src="/images/ad-club-logo-for-website.png"></a>
<div id="button-header-div">
    <a href="/login"><button>Log In</button></a>
</div>
</div>

<div class="break"></div><div id="content">` + document.body.innerHTML + "</div>";