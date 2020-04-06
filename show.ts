declare var PR:any; 

function getOnlineText(contentId:string)
{
  let params = new URLSearchParams(window.location.search);  

  let encodedUrl = params.get("codeURL");  
  let url = decodeURIComponent(encodedUrl);

  // display the content at the url
  let el = document.getElementById(contentId);
  fetch(url)
    .then(resp => resp.text())
    .then(resp => el.innerHTML 
                      = PR.prettyPrintOne(
                            resp.replace(/&/g,"&amp;")
                                .replace(/</g,"&lt")
                                .replace(/>/g,"&gt")
                          , null // let prettyPrintOne figure out the language
                          , true // print line numbers.
                          )
         )
    .catch(err => el.innerText = err);
}
