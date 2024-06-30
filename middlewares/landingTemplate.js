/**
 * https://github.com/Stremio/stremio-addon-sdk/blob/master/src/landingTemplate.js
 *
 * The MIT License (MIT)
 =====================

 Copyright © 2019 SmartCode OOD

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the “Software”), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 */
const manifest = require('../data/manifest');

const STYLESHEET = `
* {
   box-sizing: border-box;
}

body,
html {
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100%;
}

html {
   background-size: auto 100%;
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
   background-attachment:fixed;
}

body {
   display: flex;
   flex-direction: column;
   font-family: 'Open Sans', Arial, sans-serif;
   color: white;
}

h1 {
   font-size: 4.5vh;
   font-weight: 700;
}

h2 {
   font-size: 2.2vh;
   font-weight: normal;
   font-style: italic;
   opacity: 0.8;
}

h3 {
   font-size: 2.2vh;
}

h1,
h2,
h3,
p {
   margin: 0;
   text-shadow: 0 0 1vh rgba(0, 0, 0, 0.15);
}

p {
   font-size: 1.75vh;
}

ul {
   font-size: 1.75vh;
   margin: 0;
   margin-top: 1vh;
   padding-left: 3vh;
}

a {
   color: white
}

a.install-link {
   text-decoration: none
}

button {
   border: 0;
   outline: 0;
   color: white;
   background: #8A5AAB;
   padding: 1.2vh 3.5vh;
   margin: auto;
   text-align: center;
   font-family: 'Open Sans', Arial, sans-serif;
   font-size: 2.2vh;
   font-weight: 600;
   cursor: pointer;
   display: block;
   box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.2);
   transition: box-shadow 0.1s ease-in-out;
}

button:hover {
   box-shadow: none;
}

button:active {
   box-shadow: 0 0 0 0.5vh white inset;
}

#addon {
   width: 40vh;
   margin: auto;
}

.github {
   color: #3F3F44;
   margin-bottom: 10px;
   display: inline-block;
   width: 100%;
   background: #f5f5f5;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   padding: 5px 10px 5px 10px;
   line-height: 40px;
   border-bottom: 1px solid #e5e5e5;
   border-top-right-radius: 3px;
   border-top-left-radius: 3px;
   font-size: 13px;
   font-weight: 700;
}

.github, .fa {
   font-size: 30px;
   margin-right: 10px;
}

.markdown {
   padding: 70px 30px 30px 30px;
   margin: 50px 50px 50px 50px;
   background-color: #FCFCFC;
   border: 1px solid #e5e5e5;
   border-radius: 4px;
   padding: 30px;
   padding-top: 70px;
   position: relative;
   word-wrap: break-word;
   box-shadow: 0 4px 8px 12px rgba(0,0,0,0.2);
   border-radius: 5px;
}

.logo {
   height: 14vh;
   width: 14vh;
   margin: auto;
   margin-bottom: 3vh;
}

.logo img {
   width: 100%;
}

.name, .version {
   display: inline-block;
   vertical-align: top;
}

.name {
   line-height: 5vh;
}

.version {
   position: absolute;
   line-height: 5vh;
   margin-left: 1vh;
   opacity: 0.8;
}

.contact {
   margin-top: 50px;
   width: 100%;
   text-align: center;
}

.contact a {
   font-size: 1.4vh;
   font-style: italic;
}

.separator {
   margin-bottom: 4vh;
}
`;

function landing(req, res) {
  const landingHtml = landingTemplate(manifest);
  res.set('Content-Type', 'text/html');
  res.send(landingHtml);
}

function landingTemplate(manifest) {
  const background =
    manifest.background || 'https://dl.strem.io/addon-background.jpg';
  const logo = manifest.logo || 'https://dl.strem.io/addon-logo.png';
  const contactHTML = manifest.contactEmail
    ? `<div class="contact">
         <p>Contact ${manifest.name} addon creator:</p>
         <a href="mailto:${manifest.contactEmail}">${manifest.contactEmail}</a>
      </div>`
    : '';

  const stylizedTypes = manifest.types.map(
    (t) => t[0].toUpperCase() + t.slice(1) + (t !== 'series' ? 's' : '')
  );

  return `
   <!DOCTYPE html>
   <html style="background-image: url(${background})">

   <head>
      <meta charset="utf-8">
      <title>${manifest.name} - Stremio Addon</title>
      <style>${STYLESHEET}</style>
      <link rel="shortcut icon" href="${logo}" type="image/x-icon">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script type="module" src="https://cdn.jsdelivr.net/npm/zero-md@3?register"></script>
   </head>

   <body>
      <div id="background-shade" style="background:rgba(0, 0, 0, 0.60);padding-top: 30px;">
         <div id="addon">
            <div class="logo">
               <a href="https://wizdom.xyz/">
                  <img src="${logo}">
               </a>
            </div>
            <h1 class="name">${manifest.name}</h1>
            <h2 class="version">${manifest.version || '0.0.0'}</h2>
            <h2 class="description">${manifest.description || ''}</h2>

            <div class="separator"></div>

            <h3 class="gives">This addon has more :</h3>
            <ul>
               ${stylizedTypes.map((t) => `<li>${t}</li>`).join('')}
            </ul>

            <div class="separator"></div>

            <a id="installLink" class="install-link" href="#">
               <button name="Install">INSTALL</button>
            </a>
            ${contactHTML}
            
         </div>
         <div class="markdown">
            <a href="https://github.com/maormagori/wizdom-stremio-v2" class="github">
               <i class="fa fa-github"></i>
               <span> Github README.md </span>
            </a>
            <zero-md src="/README.md"></zero-md>
         </div>
      </div>
      <script>
         installLink.href = 'stremio://' + window.location.host + '/manifest.mock.js'
      </script>
      
	</body>

	</html>`;
}

module.exports = landing;
