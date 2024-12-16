// Returns an array of random integers from 1-10 with length pool
function rollDice(pool){
	const results = [];
	for(let i = 0; i < pool; i++){
		results.push(Math.floor(Math.random() * 10) + 1);
	}
	return results;
}

// Accepts an array of random integers 1-10 and number of Rage dice, returns an array of equal size with integers interpreted into successes, criticals, failures, or brutal results
function interpretResults(results, rageDice){
	const interpretedResults = [];
	for(let i = 0; i < rageDice && results.length != 0; i++){
		let die = results.pop();
		if(die > 5){
			interpretedResults[i] = "rageSuccess";
			if(die == 10){
				interpretedResults[i] = "rageCritical";
			}
		}
		if(die < 6){
			interpretedResults[i] = "rageFailure";
			if(die < 3){
				interpretedResults[i] = "brutal";
			}
		}
	}
	while(results.length != 0){
		let die = results.pop();
		if(die > 5){
			if(die == 10){
				interpretedResults.push("critical");
			}else{
				interpretedResults.push("success");
			}
		}
		if(die < 6){
			interpretedResults.push("failure");
		}
	}
	return interpretedResults;
}

// Calls rollDice into interpretResults, renders dice icons and successes
function displayRoll(){
	rageDice = parseInt(rage.innerText);
	const cells = document.querySelectorAll("td");
	for(let i = 0; i < cells.length; i++){
		cells[i].remove();
	}
	const results = interpretResults(rollDice(parseInt(pool.innerText)), rageDice);
	let successCount = 0;
	let criticalCount = 0;
	let brutal = false;
	while(results.length != 0){
		let die = results.pop()
		if(die == "success" || die == "rageSuccess"){
			successCount++;
		}
		if(die == "critical" || die == "rageCritical"){
			criticalCount++;
		}
		if(die == "brutal"){
			brutal = true;
		}
		let cell = document.createElement("td")
		cell.innerHTML = '<img class="icon" src="' + die + '.png">'
		resultsTable.appendChild(cell)
	}
	if(criticalCount > 1){
		criticalCount *= criticalCount;
	}
	successCount += criticalCount;
	resultsText.innerText = successCount + " successes"
	if(successCount == 1){
		resultsText.innerText = "1 success"
	}
	if(brutal){
		resultsText.innerText += ", Brutal result"
	}
	if(criticalCount > 1){
		resultsText.innerText += ", potential critical"
	}
}