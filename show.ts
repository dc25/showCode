declare var PR:any; 

function getOnlineText(displayCB: (st: string) => void)
{
  let params = new URLSearchParams(window.location.search);  

  let encodedUrl = params.get("codeURL");  
  let url = decodeURIComponent(encodedUrl);

  fetch(url)
    .then(resp => resp.text())
    .then(resp => displayCB(resp))
    .catch(err => displayCB(err));
}
