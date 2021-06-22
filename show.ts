declare var PR:any; 

async function getOnlineText(search: string, displayCB: (st: string) => any) 
{
  try {
    const params = new URLSearchParams(search);  
    const encodedUrl = params.get("codeURL");  
    if (encodedUrl === null) {
       throw "Missing argument 'codeURL' in query params: \'" + search + "\'.";
    }

    const url = decodeURIComponent(encodedUrl);

    const resp = await fetch(url);
    const respText = await resp.text();
    const replaced = respText.replace(/&/g,"&amp;")
                             .replace(/</g,"&lt")
                             .replace(/>/g,"&gt");

    const prettied = PR.prettyPrintOne
                                ( replaced
                                , null // let prettyPrintOne guess the language
                                , true // print line numbers.
                                );

    displayCB(prettied); 
  } catch (err) {
    displayCB(err);
  }
}
