// [EN] Pomodoro Timer Module
// [VN] Module Đồng hồ Pomodoro

import { formatTime } from '../utils/formatters.js';

export function initPomodoro() {
    const pomoStatusEl = document.getElementById('pomo-status');
    const pomoTimeEl = document.getElementById('pomo-time');
    const pomoStartBtn = document.getElementById('pomo-start-pause');
    const pomoResetBtn = document.getElementById('pomo-reset');
    const pomoSkipBtn = document.getElementById('pomo-skip');
    const timeWorkInput = document.getElementById('pomo-time-setting');
    const timeShortBreakInput = document.getElementById('short-break-setting');
    const timeLongBreakInput = document.getElementById('long-break-setting');

    let pomoInterval;
    let pomoIsRunning = false;
    let pomoTimeLeft = (timeWorkInput ? timeWorkInput.value : 25) * 60;
    let currentMode = 'work';
    let sessionCount = 0;

    function updatePomoDisplay() {
        if(pomoTimeEl) pomoTimeEl.textContent = formatTime(pomoTimeLeft);
    }

    function stopPomoTimer() {
        clearInterval(pomoInterval);
        pomoIsRunning = false;
        if(pomoStartBtn) pomoStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    }

    function startPomoTimer() {
        pomoIsRunning = true;
        if(pomoStartBtn) pomoStartBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
        pomoInterval = setInterval(() => {
            pomoTimeLeft--;
            updatePomoDisplay();
            if (pomoTimeLeft <= 0) {
                stopPomoTimer();
                switchMode();
            }
        }, 1000);
    }

    function switchMode() {
        if (currentMode === 'work') {
            sessionCount++;
            if (sessionCount % 4 === 0) {
                currentMode = 'longBreak';
                pomoTimeLeft = (timeLongBreakInput ? timeLongBreakInput.value : 15) * 60;
                if(pomoStatusEl) pomoStatusEl.textContent = 'Long Break';
            } else {
                currentMode = 'shortBreak';
                pomoTimeLeft = (timeShortBreakInput ? timeShortBreakInput.value : 5) * 60;
                if(pomoStatusEl) pomoStatusEl.textContent = 'Short Break';
            }
        } else {
            currentMode = 'work';
            pomoTimeLeft = (timeWorkInput ? timeWorkInput.value : 25) * 60;
            if(pomoStatusEl) pomoStatusEl.textContent = 'Work';
        }
        updatePomoDisplay();
    }

    function resetPomoTimer() {
        stopPomoTimer();
        currentMode = 'work';
        pomoTimeLeft = (timeWorkInput ? timeWorkInput.value : 25) * 60;
        sessionCount = 0;
        if(pomoStatusEl) pomoStatusEl.textContent = 'Work';
        updatePomoDisplay();
    }

    if (pomoStartBtn) {
        pomoStartBtn.addEventListener('click', () => {
            pomoIsRunning ? stopPomoTimer() : startPomoTimer();
        });
        if(pomoResetBtn) pomoResetBtn.addEventListener('click', resetPomoTimer);
        if(pomoSkipBtn) pomoSkipBtn.addEventListener('click', () => {
            stopPomoTimer(); switchMode();
        });
        
        const inputsToWatch = [timeWorkInput, timeShortBreakInput, timeLongBreakInput];
        if(inputsToWatch.every(el => el)) { 
            inputsToWatch.forEach(input => {
                input.addEventListener('change', () => {
                    if (!pomoIsRunning) resetPomoTimer();
                });
            });
        }
        updatePomoDisplay(); 
    }
}