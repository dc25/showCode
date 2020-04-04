declare var PR:any; 

function getOnlineText(titleId:string, contentId:string)
{
  let params = new URLSearchParams(window.location.search);  

  let encodedUrl = params.get("codeURL");  
  let url = decodeURIComponent(encodedUrl);

  // display the url
  document.getElementById(titleId).innerText = url;
  (<HTMLAnchorElement>document.getElementById(titleId)).href = url;

  // display the content at the url
  let el = document.getElementById(contentId);
  fetch(url)
    .then(resp => resp.text())
    .then(resp => el.innerHTML 
                      = PR.prettyPrintOne(
                            resp.replace(/&/g,"&amp;")
                                .replace(/</g,"&lt")
                                .replace(/>/g,"&gt")))
    .catch(err => el.innerText = err);
}
