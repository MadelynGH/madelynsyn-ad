const printButton = document.getElementById("print-button");

const printCertificate = function() {
    const certificateName = document.getElementById("certificate-name").value;
    const certificateJob = document.getElementById("certificate-job").value;
    const certificateSignature = document.getElementById("signature-text").value;

    const printWindow = window.open("", "", "width=715, height=550");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">

            <title>Print Certificate</title>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

                * {
                    transform: scale(1.1);
                }
                
                body {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    align-items: center;

                    padding: 0px;
                
                    font-family: 'Montserrat', sans-serif;
                }
                
                h1 {
                    text-align: center;
                }

                .break {
                    flex-basis: 100%;
                    height: 0px;
                }
                
                input {
                    border: none;
                    border-bottom: 4px solid rgb(14, 223, 133);
                
                    font-family: 'Montserrat', sans-serif;
                    font-size: 1.5em;
                    font-weight: bold;
                
                    margin: 10px;
                
                    width: 85%;
                
                    text-align: center;

                    box-sizing: border-box;
                }
                
                input:focus {
                    outline: none;
                }
                
                #certificate-container {
                    margin: 0px;
                    padding: 0px;

                    transform: scale(1.05);
                
                    width: 715px;
                    height: 550px;
                }
                
                #certificate-content {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;

                    width: 100%;
                    box-sizing: border-box;

                    margin-top: 130px;
                }
                
                #signature-text {
                    font-family: 'Allura', cursive;
                    font-weight: normal;
                
                    font-size: 2.0em;
                
                    border-bottom: 1px solid black;
                
                    width: 50%;

                    box-sizing: border-box;
                }
                
                #logo-certificate {
                    height: 50px;
                    margin-right: 3vw;
                
                    display: flex;

                    box-sizing: border-box;
                }
                
                #signature-and-logo {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                
                    width: 100%;
                
                    margin: 5%;
                    margin-top: 12%;

                    box-sizing: border-box;
                }
            </style>
            
        </head>

        <body>
    `)

    printWindow.document.write(`
        <div id="certificate-container">
            <div id="certificate-content">
                <h1>This award is presented to</h1>
                <div class="break"></div>

                <input type="text" id="certificate-name" value="
    ` + certificateName + `">
            <div class="break"></div>

            <h1>for</h1>
            <div class="break"></div>

            <input type="text" id="certificate-job" value="
    ` + certificateJob + `">
            <div class="break"></div>

                <div id="signature-and-logo">
                    <input type="text" id="signature-text" id="certificate-signature"
    ` + `value="` + certificateSignature + `">
                    <img src="/images/ad-club-logo-for-website.png" id="logo-certificate">
                </div>
            </div>
        </div>
    `);
    
    printWindow.document.write(`
        </body>
        </html>
    `)
    printWindow.document.close();

    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    }
}

printButton.addEventListener("click", function() { printCertificate(); })