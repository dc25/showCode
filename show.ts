declare var PR:any; 

function getOnlineText(url: string, displayCB: (st: string) => void)
{
  fetch(url)
    .then(resp => resp.text())
    .then(resp => displayCB(resp))
    .catch(err => displayCB(err));
}
