// VI: Module Countdown Timer, cô lập state đếm ngược và logic xử lý interval (SRP). 
// EN: Countdown Timer module, isolating countdown state and interval handling logic (SRP).

import { formatStopwatchTime } from '../utils/formatters.js';

export function initTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const timerHoursInput = document.getElementById('timer-hours');
    const timerMinutesInput = document.getElementById('timer-minutes');
    const timerSecondsInput = document.getElementById('timer-seconds');
    const timerStartBtn = document.getElementById('timer-start-pause');
    const timerResetBtn = document.getElementById('timer-reset');

    // VI: Khởi tạo biến State cục bộ để tránh ô nhiễm Global Scope. 
    // EN: Initializing local State variables to avoid Global Scope pollution.
    let timerInterval, timerRunning = false, timerTimeLeft = 0, initialTimerTime = 0;

    // VI: Helper function tính tổng số giây, áp dụng Guard clause để tránh lỗi runtime nếu thiếu node DOM. 
    // EN: Helper function computing total seconds, applying Guard clause to prevent runtime errors if DOM node is missing.
    function getTimerInputSeconds() {
        if (!timerHoursInput) return 0;
        const hours = parseInt(timerHoursInput.value) || 0;
        const minutes = parseInt(timerMinutesInput.value) || 0;
        const seconds = parseInt(timerSecondsInput.value) || 0;
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    // VI: Đồng bộ State xuống UI (One-way Data Binding). 
    // EN: Syncing State to UI (One-way Data Binding).
    function updateTimerDisplay() {
        if (timerDisplay) timerDisplay.textContent = formatStopwatchTime(timerTimeLeft);
    }

    if (timerStartBtn) {
        timerStartBtn.addEventListener('click', () => {
            // VI: State machine xử lý luân chuyển các trạng thái Play/Pause. 
            // EN: State machine handling transition between Play/Pause states.
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

                    // VI: Non-blocking background task cập nhật đếm ngược. 
                    // EN: Non-blocking background task updating the countdown.
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

        // VI: Reset state và dọn dẹp bộ nhớ (clear interval) để chặn memory leak. 
        // EN: Reset state and memory cleanup (clear interval) to prevent memory leaks.
        if (timerResetBtn) {
            timerResetBtn.addEventListener('click', () => {
                clearInterval(timerInterval);
                timerRunning = false;
                timerTimeLeft = initialTimerTime > 0 ? initialTimerTime : getTimerInputSeconds();
                updateTimerDisplay();
                timerStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            });
        }

        // VI: Delegate event listener cho mảng input để cập nhật State realtime (chỉ khi Timer đang Idle). 
        // EN: Delegate event listener for input array to update State in realtime (only when Timer is Idle).
        const timerInputs = [timerHoursInput, timerMinutesInput, timerSecondsInput];
        if (timerInputs.every(el => el)) {
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