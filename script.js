document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const appViews = document.querySelectorAll('.app-view');

    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoListEl = document.getElementById('todo-list');
    const TODOS_STORAGE_KEY = 'studyhub_todos';

    function getTodosFromStorage() {
        const todosJSON = localStorage.getItem(TODOS_STORAGE_KEY);
        return todosJSON ? JSON.parse(todosJSON) : [];
    }

    function saveTodosToStorage(todos) {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }

    function fetchTodos() {
        const todos = getTodosFromStorage();
        renderTodos(todos);
    }

    function renderTodos(todos) {
        if (!todoListEl) return;
        todoListEl.innerHTML = '';
        
        if (todos.length === 0) {
             todoListEl.innerHTML = '<p class="todo-login-prompt">No tasks yet. Add one!</p>';
        }

        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);
            
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="todo-item-controls">
                    <button class="complete-btn" title="Complete"><i class="ph-fill ${todo.completed ? 'ph-check-circle' : 'ph-circle'}"></i></button>
                    <button class="delete-btn" title="Delete"><i class="ph-fill ph-trash"></i></button>
                </div>
            `;
            todoListEl.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => {
                toggleTodoStatus(todo.id, !todo.completed);
            });
            li.querySelector('.delete-btn').addEventListener('click', () => {
                deleteTodo(todo.id);
            });
        });
    }
    
    if(addTodoBtn) {
        addTodoBtn.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text) {
                const newTodo = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                const todos = getTodosFromStorage();
                todos.push(newTodo);
                saveTodosToStorage(todos);
                
                todoInput.value = '';
                renderTodos(todos);
            }
        });
    }
    if(todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodoBtn.click();
            }
        });
    }

    function toggleTodoStatus(id, isCompleted) {
        const todos = getTodosFromStorage();
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (todoToUpdate) {
            todoToUpdate.completed = isCompleted;
            saveTodosToStorage(todos);
            renderTodos(todos);
        }
    }

    function deleteTodo(id) {
        if (confirm("Are you sure you want to delete this task?")) {
            let todos = getTodosFromStorage();
            todos = todos.filter(todo => todo.id !== id);
            saveTodosToStorage(todos);
            renderTodos(todos);
        }
    }

    const musicLinkInput = document.getElementById('music-link-input');
    const saveMusicBtn = document.getElementById('save-music-btn');
    const musicListEl = document.getElementById('favorite-music-list');
    const MUSIC_STORAGE_KEY = 'studyhub_music';

    function getMusicFromStorage() {
        const musicJSON = localStorage.getItem(MUSIC_STORAGE_KEY);
        return musicJSON ? JSON.parse(musicJSON) : [];
    }

    function saveMusicToStorage(musicList) {
        localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(musicList));
    }
    
    function fetchFavoriteMusic() {
        const musicList = getMusicFromStorage();
        renderFavoriteMusic(musicList);
    }

    function renderFavoriteMusic(musicList) {
        if (!musicListEl) return;
        musicListEl.innerHTML = '';

        if (musicList.length === 0) {
             musicListEl.innerHTML = '<p class="todo-login-prompt">No saved music yet.</p>';
        }

        musicList.forEach(music => {
            const li = document.createElement('li');
            li.className = 'music-item';
            li.setAttribute('data-id', music.id);
            li.innerHTML = `
                <div class="music-item-info">
                    <i class="ph-fill ${music.type === 'youtube' ? 'ph-youtube-logo' : 'ph-spotify-logo'}"></i>
                    <div>
                        <span>${music.name}</span>
                        <a href="${music.url}" target="_blank">(Link)</a>
                    </div>
                </div>
                <div class="music-item-controls">
                    <button class="delete-music-btn" title="Delete"><i class="ph-fill ph-trash"></i></button>
                </div>
            `;
            musicListEl.appendChild(li);

            li.querySelector('.delete-music-btn').addEventListener('click', () => {
                deleteMusic(music.id);
            });
        });
    }

    if(saveMusicBtn) {
        saveMusicBtn.addEventListener('click', () => {
            const link = musicLinkInput.value.trim();
            if (!link) {
                alert("Please paste a link first.");
                return;
            }

            let type = '';
            if (link.includes('spotify.com')) type = 'spotify';
            if (link.includes('youtube.com') || link.includes('youtu.be')) type = 'youtube';

            if (!type) {
                alert("Invalid link. Only Spotify or YouTube links are supported.");
                return;
            }

            const name = prompt("Enter a name for this link (e.g., 'Lofi Beats'):");
            if (!name) return; 

            const newMusic = {
                id: Date.now(),
                name: name,
                url: link,
                type: type
            };
            
            const musicList = getMusicFromStorage();
            musicList.push(newMusic);
            saveMusicToStorage(musicList);
            
            alert("Music saved!");
            fetchFavoriteMusic();
        });
    }

    function deleteMusic(id) {
        if (confirm("Are you sure you want to delete this saved music?")) {
            let musicList = getMusicFromStorage();
            musicList = musicList.filter(music => music.id !== id);
            saveMusicToStorage(musicList);
            fetchFavoriteMusic();
        }
    }

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

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
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
            if (pomoIsRunning) stopPomoTimer();
            else startPomoTimer();
        });
        if(pomoResetBtn) pomoResetBtn.addEventListener('click', resetPomoTimer);
        if(pomoSkipBtn) pomoSkipBtn.addEventListener('click', () => {
            stopPomoTimer();
            switchMode();
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

    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStartBtn = document.getElementById('stopwatch-start-pause');
    const stopwatchResetBtn = document.getElementById('stopwatch-reset');
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;
    function formatStopwatchTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
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
        if(stopwatchResetBtn) stopwatchResetBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
            stopwatchTime = 0;
            if(stopwatchDisplay) stopwatchDisplay.textContent = '00:00:00';
            stopwatchStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
        });
    }

    const timerDisplay = document.getElementById('timer-display');
    const timerHoursInput = document.getElementById('timer-hours');
    const timerMinutesInput = document.getElementById('timer-minutes');
    const timerSecondsInput = document.getElementById('timer-seconds');
    const timerStartBtn = document.getElementById('timer-start-pause');
    const timerResetBtn = document.getElementById('timer-reset');
    let timerInterval;
    let timerRunning = false;
    let timerTimeLeft = 0;
    let initialTimerTime = 0;
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
        if(timerResetBtn) timerResetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerRunning = false;
            timerTimeLeft = initialTimerTime > 0 ? initialTimerTime : getTimerInputSeconds();
            updateTimerDisplay();
            timerStartBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
        });       
        timerTimeLeft = getTimerInputSeconds();
        initialTimerTime = timerTimeLeft;
        updateTimerDisplay();

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
    const playMusicBtn = document.getElementById('play-music-btn');
    const musicPlayerContainer = document.getElementById('music-player-container');
    if (playMusicBtn) {
        playMusicBtn.addEventListener('click', () => {
            const link = musicLinkInput.value.trim();
            if (!link) return;
            let embedUrl = '';
            if (link.includes('spotify.com')) {
                const url = new URL(link);
                if (url.pathname.includes('/track/')) embedUrl = `https://open.spotify.com/embed${url.pathname}`;
                else if (url.pathname.includes('/album/')) embedUrl = `https://open.spotify.com/embed${url.pathname}`;
                else if (url.pathname.includes('/playlist/')) embedUrl = `https://open.spotify.com/embed${url.pathname}`;
            } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
                let videoId = '';
                if (link.includes('youtu.be')) videoId = new URL(link).pathname.substring(1);
                else videoId = new URL(consorigin_link).searchParams.get('v');
                if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
            if (embedUrl) {
                if(musicPlayerContainer) {
                    musicPlayerContainer.innerHTML = `<iframe src="${embedUrl}" allow="encrypted-media" allowfullscreen></iframe>`;
                    musicPlayerContainer.classList.add('active');
                }
            } else {
                alert('Invalid link. Please try a Spotify or YouTube link.');
            }
        });
    }
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

            if (viewId === 'view-pomodoro') fetchTodos();
            if (viewId === 'view-about') fetchFavoriteMusic();
        });
    });

    const defaultView = document.querySelector('.app-view.active');
    const defaultViewEl = document.getElementById('view-clock');
    const defaultLinkEl = document.querySelector('.nav-link[data-view="clock"]');
    
    if (!defaultView && defaultViewEl && defaultLinkEl) {
        defaultViewEl.classList.add('active');
        defaultLinkEl.classList.add('active');
    }

});