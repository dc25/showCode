declare var PR:any; 

function getOnlineText(search: string, displayCB: (st: string) => void) : void
{
  let params = new URLSearchParams(search);  
  let encodedUrl = params.get("codeURL");  
  if (encodedUrl === null) {
     displayCB("Missing argument 'codeURL' in query params: \'" + search + "\'.");
     return;
  }

  let url = decodeURIComponent(encodedUrl);

  fetch(url)
    .then(resp => resp.text())
    .then(resp => { let replaced 
                          = resp.replace(/&/g,"&amp;")
                                .replace(/</g,"&lt")
                                .replace(/>/g,"&gt");

                    let prettied 
                          = PR.prettyPrintOne
                              ( replaced
                              , null // let prettyPrintOne guess the language
                              , true // print line numbers.
                              );

                    displayCB(prettied); 
                  }
         )
    .catch(err => displayCB(err));
}
