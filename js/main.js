// [EN] Main Entry Point
// [VN] Điểm truy cập chính khởi tạo ứng dụng

import { initAuth } from './modules/auth.js';
import { initTodo, fetchTodos } from './modules/todo.js';
import { initMusic, fetchFavoriteMusic } from './modules/music.js';
import { initPomodoro } from './modules/pomodoro.js';
import { initStopwatch } from './modules/stopwatch.js';
import { initTimer } from './modules/timer.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize all modular features / Khởi tạo các tính năng
    initAuth();
    initTodo();
    initMusic();
    initPomodoro();
    initStopwatch();
    initTimer();

    // 2. Navigation Routing Logic / Xử lý chuyển đổi View
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const currentActiveLink = document.querySelector('.nav-link.active');
            if (currentActiveLink) currentActiveLink.classList.remove('active');
            link.classList.add('active');
            
            const viewId = 'view-' + link.getAttribute('data-view');
            const currentActiveView = document.querySelector('.app-view.active');
            if (currentActiveView) currentActiveView.classList.remove('active');
            
            const newView = document.getElementById(viewId);
            if (newView) newView.classList.add('active');

            // [EN] Lazy load components when their view is opened
            // [VN] Tải dữ liệu khi view tương ứng được mở
            if (viewId === 'view-pomodoro') fetchTodos();
            if (viewId === 'view-about') fetchFavoriteMusic();
        });
    });

    // [EN] Set default view fallback
    // [VN] Thiết lập view mặc định nếu chưa có
    const defaultView = document.querySelector('.app-view.active');
    const defaultViewEl = document.getElementById('view-clock');
    const defaultLinkEl = document.querySelector('.nav-link[data-view="clock"]');
    if (!defaultView && defaultViewEl && defaultLinkEl) {
        defaultViewEl.classList.add('active');
        defaultLinkEl.classList.add('active');
    }

    // 3. Real-time Clock Logic / Logic đồng hồ thời gian thực
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        if(timeEl) timeEl.textContent = `${hours}:${minutes}:${seconds}`;
        
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        if(dateEl) dateEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase().replace(',', ' -');
    }

    if (timeEl) {
        updateClock();
        setInterval(updateClock, 1000);
    }
});