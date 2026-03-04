// [EN] Stopwatch Module
// [VN] Module Bấm giờ

import { formatStopwatchTime } from '../utils/formatters.js';

export function initStopwatch() {
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStartBtn = document.getElementById('stopwatch-start-pause');
    const stopwatchResetBtn = document.getElementById('stopwatch-reset');
    
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;

    if (stopwatchStartBtn) {
        stopwatchStartBtn.addEventListener('click', () => {
            if (stopwatchRunning) {
                clearInterval(stopwatchInterval);
                stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            } else {
                stopwatchInterval = setInterval(() => {
                    stopwatchTime++;
                    if(stopwatchDisplay) stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
                }, 1000);
                stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
            }
            stopwatchRunning = !stopwatchRunning;
        });
        
        if(stopwatchResetBtn) {
            stopwatchResetBtn.addEventListener('click', () => {
                clearInterval(stopwatchInterval);
                stopwatchRunning = false; 
                stopwatchTime = 0;
                if(stopwatchDisplay) stopwatchDisplay.textContent = '00:00:00';
                stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            });
        }
    }
}