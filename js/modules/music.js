// VI: Module quản lý Playlist, ứng dụng Factory/Strategy pattern ngầm để phân loại nền tảng. 
// EN: Playlist management module, implicitly applying Factory/Strategy pattern to classify platforms.

import { getStorageData, setStorageData } from '../utils/storage.js';

const MUSIC_STORAGE_KEY = 'studyhub_music';

export function fetchFavoriteMusic() {
    const musicList = getStorageData(MUSIC_STORAGE_KEY, []);
    renderFavoriteMusic(musicList);
}

// VI: Render function được tách riêng để thực hiện Data Binding một chiều. 
// EN: Render function isolated to perform one-way Data Binding.
function renderFavoriteMusic(musicList) {
    const musicListEl = document.getElementById('favorite-music-list');
    
    // VI: Guard clause bảo vệ logic thao tác DOM. 
    // EN: Guard clause protecting DOM manipulation logic.
    if (!musicListEl) return;
    musicListEl.innerHTML = '';

    if (musicList.length === 0) {
         musicListEl.innerHTML = '<p class="todo-login-prompt">No saved music yet.</p>';
    }

    musicList.forEach(music => {
        const li = document.createElement('li');
        li.className = 'music-item';
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

function deleteMusic(id) {
    if (confirm("Are you sure you want to delete this saved music?")) {
        let musicList = getStorageData(MUSIC_STORAGE_KEY, []);
        musicList = musicList.filter(music => music.id !== id);
        setStorageData(MUSIC_STORAGE_KEY, musicList);
        fetchFavoriteMusic();
    }
}

export function initMusic() {
    const musicLinkInput = document.getElementById('music-link-input');
    const saveMusicBtn = document.getElementById('save-music-btn');
    const playMusicBtn = document.getElementById('play-music-btn');
    const musicPlayerContainer = document.getElementById('music-player-container');

    if(saveMusicBtn) {
        saveMusicBtn.addEventListener('click', () => {
            const link = musicLinkInput.value.trim();
            
            // VI: Early returns để validate input ngay từ đầu. 
            // EN: Early returns to validate input upfront.
            if (!link) return alert("Please paste a link first.");

            let type = '';
            if (link.includes('spotify.com')) type = 'spotify';
            if (link.includes('youtube.com') || link.includes('youtu.be')) type = 'youtube';

            if (!type) return alert("Invalid link. Only Spotify or YouTube links are supported.");

            const name = prompt("Enter a name for this link (e.g., 'Lofi Beats'):");
            if (!name) return; 

            const newMusic = { id: Date.now(), name: name, url: link, type: type };
            const musicList = getStorageData(MUSIC_STORAGE_KEY, []);
            musicList.push(newMusic);
            setStorageData(MUSIC_STORAGE_KEY, musicList);
            
            alert("Music saved!");
            fetchFavoriteMusic();
        });
    }

    if (playMusicBtn) {
        playMusicBtn.addEventListener('click', () => {
            const link = musicLinkInput.value.trim();
            if (!link) return;
            let embedUrl = '';

            // VI: Phân tích URL dựa theo signature của từng service. 
            // EN: Parsing URL based on each service's signature.
            if (link.includes('spotify.com')) {
                const url = new URL(link);
                embedUrl = `https://open.spotify.com/embed$$${url.pathname}`;
            } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
                const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/;
                const match = link.match(ytRegex);
                
                if (match && match[1]) {
                    const videoId = match[1];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}`;
                }
            }
            if (embedUrl && musicPlayerContainer) {
                musicPlayerContainer.innerHTML = `<iframe src="${embedUrl}" allow="encrypted-media" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
                musicPlayerContainer.classList.add('active');
            } else {
                alert('Invalid link. Please try a valid Spotify or YouTube link.');
            }
        });
    }
}