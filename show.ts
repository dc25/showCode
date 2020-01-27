declare var PR:any; 

function getOnlineText(titleId:string, contentId:string):Promise<void>
{
  // get the URL to display and determine how to display it.
  let params = new URLSearchParams(window.location.search);  
  let urlParam:string;
  let showAsCode:boolean;

  if (params.has("codeURL")) {
    urlParam = "codeURL";  
    showAsCode = true;
  } else {
    if (params.has("textURL")) {
      urlParam = "textURL";  
      showAsCode = false;
    } else {
      console.log ("Expecting either textURL or codeURL as argument");
      return;
    }
  }

  let encodedUrl = params.get(urlParam);  
  let url = decodeURIComponent(encodedUrl);

  // display the url
  document.getElementById(titleId).innerText = url;

  // display the content at the url
  let el = document.getElementById(contentId);
  fetch(url)
    .then(resp => resp.text())
    .then(resp => { if (showAsCode) {
                      el.innerHTML = PR.prettyPrintOne(resp);  
                    } else {
                      el.innerText = resp; 
                    }
                    return;
                  }
         )
    .catch(err => { el.innerText = err; })
}
