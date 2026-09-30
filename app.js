console.log("pr1s0nbr34k")
const START_HOURS = 1;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = MINUTES_PER_HOUR * SECONDS_PER_MINUTE
const hourSpan = document.getElementById("hours")
const minuteSpan = document.getElementById("minutes")
const secondSpan = document.getElementById("seconds")
const stopBtn = document.getElementById("check");
const codeInput = document.getElementById("code");
const feedbacker = document.getElementById("instructions")
const timeContainer = document.getElementById("timer")
let timeleft = START_HOURS * MINUTES_PER_HOUR * SECONDS_PER_MINUTE; //totalseconds 
let countdown; // I want this in global scope
let tickSpeed = 1000
const lblText = "Enter the code to stop Minos Prime"
let clueText = "Hint: Open the browser console (f12)"
feedbacker.innerHTML = lblText + "<br>" + clueText;
setClock();
setCountdown();

        function setClock(){
            if(timeleft <= 0) timeleft = 0
            if(timeleft < SECONDS_PER_MINUTE * 2){
                addStress()
            }
            let tempTime = timeleft;
            hourSpan.innerHTML = Math.floor(tempTime/(SECONDS_PER_HOUR)).toString().padStart(2,"0");
            tempTime %= SECONDS_PER_HOUR;
            
            minuteSpan.innerHTML = Math.floor(tempTime / SECONDS_PER_MINUTE).toString().padStart(2,"0");
            tempTime %= SECONDS_PER_MINUTE
            secondSpan.innerHTML = tempTime.toString().padStart(2,"0");
        }

        function setCountdown(){
            if(countdown) clearInterval(countdown)
            countdown = setInterval(function(){
                timeleft--;
                setClock();
                if(timeleft <= 0){
                    timeleft = 0
                    clearInterval(countdown);
                    document.body.classList.add("Minos-Incursion")
                }
                setClock();
            }, tickSpeed)
        }
        stopBtn.addEventListener("click", async function(){
            let userCode=codeInput.value;
            let encrytpedCode = await sha256(userCode);
            if(encrytpedCode === "c4aed8382e3b4724dabf1c1b97e43e8b2add145f6cf44df05bad65628f71dd69"){
                clearInterval(countdown);
                document.body.classList.add("success")
            }else if(userCode === "I'm so hungry"){
                clearInterval(countdown);
                document.body.classList.add("jorse")
            }
            else{
                updateClue(userCode)
                blinkRed()
                feedbacker.innerHTML = "Woe 10,000 drones be upon ye <br> Countdown Adjusted"
                setTimeout(function(){
                    feedbacker.innerHTML = lblText + "<br>" + clueText;

                },1000);
                timeleft = Math.floor(timeleft / 2)
                if(timeleft < 5 * SECONDS_PER_MINUTE){
                    tickSpeed /= 2;
                    setCountdown();
                }
            }
            
            function blinkRed(){
        timeContainer.classList.add("wrong")
        setTimeout(function(){
            timeContainer.classList.remove("wrong")
        }, 1000)
    }
        function updateClue(userCode){
            if(userCode == "pr1s0nbr34k"){
                    clueText = "try looking in the CSS"
                }else if(userCode == "Judg3m3n7"){
                    clueText = "Look in the HTML source"
                }else if(userCode == "U$eY0ourh34dM4ch1n3"){
                    clueText = "the answer is right in front of you"
                }
        }
           
    }

)
function addStress(){
                timeContainer.classList.add("stress");
            }

     async function sha256(message) {
    // Encode string as UTF-8 bytes
    const msgBuffer = new TextEncoder().encode(message);

    // Hash the message using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // Convert ArrayBuffer back to a readable Hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
     }