// [EN] Countdown Timer Module
// [VN] Module Đếm ngược

import { formatStopwatchTime } from '../utils/formatters.js';

export function initTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const timerHoursInput = document.getElementById('timer-hours');
    const timerMinutesInput = document.getElementById('timer-minutes');
    const timerSecondsInput = document.getElementById('timer-seconds');
    const timerStartBtn = document.getElementById('timer-start-pause');
    const timerResetBtn = document.getElementById('timer-reset');
    
    let timerInterval, timerRunning = false, timerTimeLeft = 0, initialTimerTime = 0;

    function getTimerInputSeconds() {
        if (!timerHoursInput) return 0; 
        const hours = parseInt(timerHoursInput.value) || 0;
        const minutes = parseInt(timerMinutesInput.value) || 0;
        const seconds = parseInt(timerSecondsInput.value) || 0;
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    function updateTimerDisplay() {
        if(timerDisplay) timerDisplay.textContent = formatStopwatchTime(timerTimeLeft);
    }

    if (timerStartBtn) {
        timerStartBtn.addEventListener('click', () => {
            if (timerRunning) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            } else {
                if (timerTimeLeft === 0) {
                    timerTimeLeft = getTimerInputSeconds();
                    initialTimerTime = timerTimeLeft;
                }
                if (timerTimeLeft > 0) {
                    timerRunning = true;
                    timerStartBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
                    timerInterval = setInterval(() => {
                        timerTimeLeft--;
                        updateTimerDisplay();
                        if (timerTimeLeft <= 0) {
                            clearInterval(timerInterval);
                            timerRunning = false;
                            timerStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
                            alert("The timer has ended!");
                        }
                    }, 1000);
                }
            }
        });

        if(timerResetBtn) {
            timerResetBtn.addEventListener('click', () => {
                clearInterval(timerInterval);
                timerRunning = false;
                timerTimeLeft = initialTimerTime > 0 ? initialTimerTime : getTimerInputSeconds();
                updateTimerDisplay();
                timerStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            });
        }

        const timerInputs = [timerHoursInput, timerMinutesInput, timerSecondsInput];
        if(timerInputs.every(el => el)) { 
            timerInputs.forEach(input => {
                input.addEventListener('change', () => {
                    if (!timerRunning) {
                        timerTimeLeft = getTimerInputSeconds();
                        initialTimerTime = timerTimeLeft;
                        updateTimerDisplay();
                    }
                });
            });
        }
    }
}