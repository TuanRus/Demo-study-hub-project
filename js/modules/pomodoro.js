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
    const statWorkCount = document.querySelector('#stat-work .count');
    const statShortCount = document.querySelector('#stat-short .count');
    const statLongCount = document.querySelector('#stat-long .count');
    const statItems = document.querySelectorAll('.stat-item');
    const hintEl = document.querySelector('.pomo-hint i b');
    const learnBtn = document.getElementById('learn-pomo-btn');
    const closeBtn = document.getElementById('close-ex-btn');
    const explanationModal = document.getElementById('pomo-explanation');

    let stats = { work: 0, shortBreak: 0, longBreak: 0 };
    let pomoInterval;
    let pomoIsRunning = false;
    let currentMode = 'work';
    let sessionCount = 0;

    let pomoTimeLeft = (timeWorkInput ? parseFloat(timeWorkInput.value) : 25) * 60;
    const alarmSound = new Audio('assets/alarm.mp3');
    alarmSound.preload = 'auto';

    function updateUIStats() {
        if (statWorkCount) statWorkCount.textContent = stats.work;
        if (statShortCount) statShortCount.textContent = stats.shortBreak;
        if (statLongCount) statLongCount.textContent = stats.longBreak;

        statItems.forEach(item => item.classList.remove('active'));
        const currentId = currentMode === 'work' ? 'stat-work' :
            (currentMode === 'shortBreak' ? 'stat-short' : 'stat-long');
        const activeItem = document.getElementById(currentId);
        if (activeItem) activeItem.classList.add('active');

        if (hintEl) hintEl.textContent = currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
    }

    function playAlarmShort(seconds = 3) {
        alarmSound.currentTime = 0;
        alarmSound.play().catch(e => console.log("Audio blocked"));
        setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }, seconds * 1000);
    }

    function updatePomoDisplay() {
        if (pomoTimeEl) pomoTimeEl.textContent = formatTime(pomoTimeLeft);
    }

    function stopPomoTimer() {
        clearInterval(pomoInterval);
        pomoIsRunning = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
        if (pomoStartBtn) pomoStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    }

    function startPomoTimer() {
        pomoIsRunning = true;
        if (pomoStartBtn) pomoStartBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';

        pomoInterval = setInterval(() => {
            if (pomoTimeLeft > 0) {
                pomoTimeLeft--;
                updatePomoDisplay();
            } else {
                clearInterval(pomoInterval);
                playAlarmShort(3);
                if (pomoStatusEl) pomoStatusEl.textContent = 'Time is up!';
                setTimeout(() => {
                    if (pomoIsRunning) {
                        switchMode();
                        startPomoTimer();
                    }
                }, 5000);
            }
        }, 1000);
    }

    function switchMode() {
        stats[currentMode === 'work' ? 'work' : (currentMode === 'shortBreak' ? 'shortBreak' : 'longBreak')]++;

        if (currentMode === 'work') {
            sessionCount++;
            if (sessionCount % 4 === 0) {
                currentMode = 'longBreak';
                pomoTimeLeft = (timeLongBreakInput ? parseFloat(timeLongBreakInput.value) : 15) * 60;
                if (pomoStatusEl) pomoStatusEl.textContent = 'Long Break';
            } else {
                currentMode = 'shortBreak';
                pomoTimeLeft = (timeShortBreakInput ? parseFloat(timeShortBreakInput.value) : 5) * 60;
                if (pomoStatusEl) pomoStatusEl.textContent = 'Short Break';
            }
        } else {
            currentMode = 'work';
            pomoTimeLeft = (timeWorkInput ? parseFloat(timeWorkInput.value) : 25) * 60;
            if (pomoStatusEl) pomoStatusEl.textContent = 'Work';
        }
        updateUIStats();
        updatePomoDisplay();
    }

    function resetPomoTimer() {
        stopPomoTimer();
        currentMode = 'work';
        pomoTimeLeft = (timeWorkInput ? parseFloat(timeWorkInput.value) : 25) * 60;
        sessionCount = 0;
        if (pomoStatusEl) pomoStatusEl.textContent = 'Work';
        updateUIStats();
        updatePomoDisplay();
    }

    if (pomoStartBtn) {
        pomoStartBtn.addEventListener('click', () => {
            pomoIsRunning ? stopPomoTimer() : startPomoTimer();
        });

        if (pomoResetBtn) pomoResetBtn.addEventListener('click', resetPomoTimer);

        if (pomoSkipBtn) pomoSkipBtn.addEventListener('click', () => {
            stopPomoTimer();
            switchMode();
        });

        const inputsToWatch = [timeWorkInput, timeShortBreakInput, timeLongBreakInput];
        inputsToWatch.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    if (!pomoIsRunning) {
                        if (currentMode === 'work' && input === timeWorkInput) {
                            pomoTimeLeft = parseFloat(input.value || 0) * 60;
                        } else if (currentMode === 'shortBreak' && input === timeShortBreakInput) {
                            pomoTimeLeft = parseFloat(input.value || 0) * 60;
                        } else if (currentMode === 'longBreak' && input === timeLongBreakInput) {
                            pomoTimeLeft = parseFloat(input.value || 0) * 60;
                        }
                        updatePomoDisplay();
                    }
                });
            }
        });
        updateUIStats();
        updatePomoDisplay();
    }

    if (learnBtn && explanationModal) {
        learnBtn.addEventListener('click', () => {
            explanationModal.classList.remove('hidden');
        });
    }

    if (closeBtn && explanationModal) {
        closeBtn.addEventListener('click', () => {
            explanationModal.classList.add('hidden');
        });
    }
}