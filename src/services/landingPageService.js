import stylesheet from "../utils/stylesheets.js";


const landingPage = (manifest) => {
   const background = manifest.background || 'https://dl.strem.io/addon-background.jpg'
   const logo = manifest.logo || 'https://dl.strem.io/addon-logo.png'
   const contactHTML = manifest.contactEmail ?
      `<div class="contact">
         <p>Contact ${manifest.name} addon creator:</p>
         <a href="mailto:${manifest.contactEmail}">${manifest.contactEmail}</a>
      </div>` : ''

   const stylizedTypes = manifest.types
      .map(t => t[0].toUpperCase() + t.slice(1) + (t !== 'series' ? 's' : ''))

   return `
   <!DOCTYPE html>
   <html style="background-image: url(${background})">

   <head>
      <meta charset="utf-8">
      <title>${manifest.name} - Stremio Addon</title>
      <style>${stylesheet}</style>
      <link rel="shortcut icon" href="${logo}" type="image/x-icon">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <script type="module" src="https://cdn.jsdelivr.net/npm/zero-md@next/dist/zero-md.min.js"></script>
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
               ${stylizedTypes.map(t => `<li>${t}</li>`).join('')}
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
         installLink.href = 'stremio://' + window.location.host + '/manifest.json'
      </script>
      
   </body>

   </html>`
}

const landingPageService = { landingPage };


export default landingPageService;