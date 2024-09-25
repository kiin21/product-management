// alert message
//show
const alertMessage = document.querySelector("#alert-popup");
if (alertMessage) {
    let timeout = alertMessage.getAttribute("timeout");
    setTimeout(() => {
        alertMessage.classList.add("alert-hidden");
        console.log("Timeout, alert message hidden");
        console.log(alertMessage.classList.contains("alert-hidden"));
    }, timeout);
}
//close
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        alertMessage.classList.add("alert-hidden");
    });
}
// end alert message

//countdown clock for OTP

//end countdown clock for OTP