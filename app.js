
function generatePlayers(e) {
    let container = e.nextSibling.nextSibling;
    let numberOfPlayers = document.getElementById("numberOfPlayers").value;
    container.innerHTML = "";

    for (let id = 1; id <= numberOfPlayers; id++) {
        container.innerHTML += `
                            <div id="clock${id}" class="clock">
                                <button type="button" class="button startButton" id="startButton${id}">START</button>
                                <button type="button" class="button resetButton" id="resetButton${id}">RESET</button>
                                <form id="timeBox${id}" class="timeBox">
                                    <input id="minutes${id}" class="minutes" type="text" value="00">
                                    <span class="separator">:</span>
                                    <input id="seconds${id}" class="seconds" type="text" value="00">
                                    <span class="separator">:</span>
                                    <input id="miliseconds${id}" class="miliseconds" type="text" value="00">
                                </form>
                                <button type="button" class="button lapButton" id="lapButton${id}">LAP</button>
                                <div id="laps${id}"></div>
                            </div>      
                            `
    }

    let allClocks = document.getElementsByClassName("clock");

    for (let i = 0; i < allClocks.length; i++) {
        stopWatch(i+1);
    }
    
}

function stopWatch(id) {
    let minutes = document.getElementById(`minutes${id}`);
    let seconds = document.getElementById(`seconds${id}`);
    let miliseconds = document.getElementById(`miliseconds${id}`);
    let startButton = document.getElementById(`startButton${id}`);
    let resetButton = document.getElementById(`resetButton${id}`);

    let [mili, secs, min, i] = Array(4).fill(0);

    startButton.addEventListener('click', function(e) {
        let event = e.target; 

        if (event.interval) {
            clearInterval(event.interval);
            event.interval = undefined;
            event.innerHTML = "START";
            resetButton.style.display = "inline-block";
            startButton.style.padding = "15px 45px";
            startButton.style.backgroundColor = "rgb(48, 121, 48)";

        } else {
            
            event.interval = setInterval(function() {
                i++;
    
                if (i%6000 === 0) {
                    seconds.value = "00";
                    min++;
                    min < 10 ? minutes.value = "0" + min : minutes.value = min;
                    secs = 0;

                } else if (i%100 === 0) {
                    secs++;
                    secs < 10 ? seconds.value = "0" + secs : seconds.value = secs;
                    mili = 0;
                    
                } else {
                    mili++;
                    mili < 10 ? miliseconds.value = "0" + mili : miliseconds.value = mili;

                }  
            }, 10);
            event.innerHTML = "STOP";
            resetButton.style.display = "none";
            startButton.style.padding = "15px 130px";
            startButton.style.backgroundColor = "rgb(175, 57, 57)";

        }
    });


    document.getElementById(`lapButton${id}`).addEventListener('click', function() {

        if (minutes.value !== "00" || seconds.value !== "00" || miliseconds.value !== "00") {
            let laps = document.getElementById(`laps${id}`);

            laps.innerHTML += `
                    <input class="laps" type="text" value="${minutes.value}">
                    <span class="separator">:</span>
                    <input class="laps" type="text" value="${seconds.value}">
                    <span class="separator">:</span>
                    <input class="laps" type="text" value="${miliseconds.value}">
                    <hr>
                    `
        }
    });

    resetButton.addEventListener('click', function() {
        document.getElementById(`timeBox${id}`).reset();
        document.getElementById(`laps${id}`).innerHTML = "";
        [mili, secs, min, i] = Array(4).fill(0);
        
    });
}


