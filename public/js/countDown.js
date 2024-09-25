const countDownTimer = document.querySelector('#countdown-timer');
let expired_time = parseInt(countDownTimer.getAttribute('data-expired-time'));

const countdownInterval = setInterval(() => {
    expired_time--;
    let minutes = Math.floor(expired_time / 60);
    let seconds = expired_time % 60;
    if (expired_time > 0) {
        countDownTimer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
        countDownTimer.innerHTML = `00:00`;
        clearInterval(countdownInterval);
        alert("OTP has expired. Please request a new one.");
        
        const formVerify = document.querySelector('#verify-otp-form');
        formVerify.classList.add('d-none');

        const formResendOTP = document.querySelector('#resend-otp-form');
        formResendOTP.classList.remove('d-none');
    }
}, 1000);