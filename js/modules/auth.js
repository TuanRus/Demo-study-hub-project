// VI: Module xử lý định danh, cô lập logic authentication khỏi luồng thực thi chính (SRP). 
// EN: Identity handling module, isolating authentication logic from the main execution thread (SRP).

export function initAuth() {
    const authBtn = document.getElementById('auth-btn');
    const authBtnText = document.getElementById('auth-btn-text');
    const userGreeting = document.getElementById('user-greeting');
    const authModal = document.getElementById('auth-modal');
    const closeAuthBtn = document.getElementById('close-auth-btn');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForm = document.getElementById('auth-form');
    const authUsername = document.getElementById('auth-username');
    const authPassword = document.getElementById('auth-password');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authMessage = document.getElementById('auth-message');
    const authEmail = document.getElementById('auth-email');
    const authConfirmPassword = document.getElementById('auth-confirm-password');
    const registerOnlyFields = document.querySelectorAll('.register-only');

    // VI: Biến trạng thái quản lý mode hiện tại (login/register). 
    // EN: State variable managing the current mode (login/register).
    let currentAuthMode = 'login'; 

    function checkLoginStatus() {
        const currentUser = localStorage.getItem('studyhub_currentUser');
        if (currentUser) {
            if(userGreeting) {
                userGreeting.textContent = `Hello, ${currentUser}`;
                userGreeting.style.display = 'block';
            }
            if(authBtnText) authBtnText.textContent = 'Logout';
            if(authBtn) {
                authBtn.querySelector('i').className = 'ph-fill ph-sign-out';
                authBtn.classList.remove('btn-primary');
            }
        } else {
            if(userGreeting) userGreeting.style.display = 'none';
            if(authBtnText) authBtnText.textContent = 'Login';
            if(authBtn) {
                authBtn.querySelector('i').className = 'ph-fill ph-sign-in';
                authBtn.classList.add('btn-primary');
            }
        }
    }

    // VI: Guard clause chặn binding nếu thiếu DOM node. 
    // EN: Guard clause preventing binding if DOM node is missing.
    if(authBtn) {
        authBtn.addEventListener('click', () => {
            const currentUser = localStorage.getItem('studyhub_currentUser');
            if (currentUser) {
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('studyhub_currentUser');
                    checkLoginStatus();
                }
            } else {
                authModal.classList.add('active');
                authMessage.textContent = '';
                authForm.reset();
                document.querySelector('.auth-tab[data-action="login"]').click();
            }
        });
    }

    if(closeAuthBtn) {
        closeAuthBtn.addEventListener('click', () => authModal.classList.remove('active'));
    }

    // VI: Chuyển đổi linh hoạt View và Validation rules dựa trên State. 
    // EN: Dynamically switching View and Validation rules based on State.
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            authTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentAuthMode = e.target.getAttribute('data-action');
            
            authMessage.textContent = '';
            authMessage.className = 'auth-message';

            if (currentAuthMode === 'register') {
                authSubmitBtn.textContent = 'Sign Up';
                registerOnlyFields.forEach(field => field.style.display = 'flex');
                authEmail.setAttribute('required', 'true');
                authConfirmPassword.setAttribute('required', 'true');
            } else {
                authSubmitBtn.textContent = 'Login';
                registerOnlyFields.forEach(field => field.style.display = 'none');
                authEmail.removeAttribute('required');
                authConfirmPassword.removeAttribute('required');
            }
        });
    });

    if(authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = authUsername.value.trim();
            const password = authPassword.value.trim();
            let users = JSON.parse(localStorage.getItem('studyhub_users')) || {};

            if (currentAuthMode === 'register') {
                const email = authEmail.value.trim();
                const confirmPassword = authConfirmPassword.value.trim();

                // VI: Early return để chặn flow nếu validation thất bại. 
                // EN: Early return to block flow if validation fails.
                if (password !== confirmPassword) {
                    authMessage.textContent = "Passwords do not match!";
                    return;
                }

                if (users[username]) {
                    authMessage.textContent = "Username already exists!";
                } else {
                    users[username] = { password: password, email: email };
                    localStorage.setItem('studyhub_users', JSON.stringify(users));
                    authMessage.textContent = "Registration successful! Logging in...";
                    authMessage.className = 'auth-message success';
                    
                    setTimeout(() => {
                        localStorage.setItem('studyhub_currentUser', username);
                        authModal.classList.remove('active');
                        checkLoginStatus();
                    }, 1000);
                }
            } else {
                const storedUser = users[username];
                let isPasswordCorrect = false;

                // VI: Xử lý tương thích ngược cho cấu trúc data cũ (string vs object). EN: Backward compatibility handling for old data structures (string vs object).
                if (storedUser) {
                    if (typeof storedUser === 'string') isPasswordCorrect = (storedUser === password);
                    else if (storedUser.password === password) isPasswordCorrect = true;
                }

                if (isPasswordCorrect) {
                    localStorage.setItem('studyhub_currentUser', username);
                    authModal.classList.remove('active');
                    checkLoginStatus();
                } else {
                    authMessage.textContent = "Invalid username or password!";
                }
            }
        });
    }

    checkLoginStatus();
}