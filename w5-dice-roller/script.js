function rollDice(e){const t=[];for(let r=0;r<e;r++)t.push(Math.floor(10*Math.random())+1);return t}function interpretResults(e,t){const r=[];for(let l=0;l<t&&0!=e.length;l++){let t=e.pop();t>5&&(r[l]="rageSuccess",10==t&&(r[l]="rageCritical")),t<6&&(r[l]="rageFailure",t<3&&(r[l]="brutal"))}for(;0!=e.length;){let t=e.pop();t>5&&(10==t?r.push("critical"):r.push("success")),t<6&&r.push("failure")}return r}function displayRoll(){rageDice=parseInt(rage.innerText);const e=document.querySelectorAll("td");for(let t=0;t<e.length;t++)e[t].remove();const t=interpretResults(rollDice(parseInt(pool.innerText)),rageDice);let r=0,l=0,s=!1;for(;0!=t.length;){let e=t.pop();"success"!=e&&"rageSuccess"!=e||r++,"critical"!=e&&"rageCritical"!=e||l++,"brutal"==e&&(s=!0);let n=document.createElement("td");n.innerHTML='<img class="icon" src="'+e+'.png">',resultsTable.appendChild(n)}l>1&&(l*=l),r+=l,resultsText.innerText=r+" successes",1==r&&(resultsText.innerText="1 success"),s&&(resultsText.innerText+=", Brutal result"),l>1&&(resultsText.innerText+=", potential critical")}