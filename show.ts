declare var PR:any; 

export function getOnlineText(url: string, displayCB: (st: string) => void)
{
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
