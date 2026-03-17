// VI: Module Stopwatch quản lý thời gian đếm tiến, cô lập logic xử lý interval và state. 
// EN: Stopwatch module managing count-up time, isolating interval logic and state.

import { formatStopwatchTime } from '../utils/formatters.js';

export function initStopwatch() {
    // VI: Khởi tạo DOM cache để tối ưu hiệu suất truy xuất phần tử.
    //  EN: Initializing DOM cache to optimize element retrieval performance.
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStartBtn = document.getElementById('stopwatch-start-pause');
    const stopwatchResetBtn = document.getElementById('stopwatch-reset');
    
    // VI: State cục bộ quản lý vòng đời của bộ bấm giờ. 
    // EN: Local state managing the stopwatch lifecycle.
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;

    // VI: Guard clause chặn binding nếu thiếu node điều khiển chính. 
    // EN: Guard clause preventing binding if the main control node is missing.
    if (stopwatchStartBtn) {
        stopwatchStartBtn.addEventListener('click', () => {
            // VI: Cỗ máy trạng thái (State Machine) điều khiển luồng Start/Pause. 
            // EN: State machine controlling the Start/Pause flow.
            if (stopwatchRunning) {
                clearInterval(stopwatchInterval);
                stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
            } else {
                // VI: Khởi tạo tiến trình chạy ngầm để cập nhật thời gian mỗi giây. 
                // EN: Initializing background process to update time every second.
                stopwatchInterval = setInterval(() => {
                    stopwatchTime++;
                    if(stopwatchDisplay) stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
                }, 1000);
                stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
            }
            // VI: Chuyển đổi trạng thái nhị phân. 
            // EN: Toggling binary state.
            stopwatchRunning = !stopwatchRunning;
        });
        
        // VI: Logic dọn dẹp và đưa State về giá trị mặc định (Idle state). 
        // EN: Cleanup logic and resetting State to default values (Idle state).
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