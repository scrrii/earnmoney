// Global variables
let currentUser = null;
let videoTimer = null;
let timeRemaining = 30;

// Utility functions
function showMessage(message, type = 'success') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message ${type} show`;
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

// Authentication functions
async function register(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('registerFullname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Registration successful! Please login.', 'success');
            showLogin();
            document.getElementById('registerFormElement').reset();
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        showMessage('Registration failed. Please try again.', 'error');
    }
}

async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        showMessage('Login failed. Please try again.', 'error');
    }
}

async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Logged out successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    } catch (error) {
        window.location.href = '/';
    }
}

// Dashboard functions
async function loadUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            updateDashboard();
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        window.location.href = '/';
    }
}

function updateDashboard() {
    if (currentUser) {
        const welcomeEl = document.getElementById('welcomeMessage');
        const pointsEl = document.getElementById('pointsDisplay');
        
        if (welcomeEl) {
            welcomeEl.textContent = `Welcome back, ${currentUser.fullname}!`;
        }
        
        if (pointsEl) {
            pointsEl.textContent = currentUser.points.toLocaleString();
        }
        
        // Update withdraw button state
        const withdrawBtn = document.getElementById('withdrawBtn');
        if (withdrawBtn) {
            if (currentUser.points >= 10000) {
                withdrawBtn.disabled = false;
                withdrawBtn.textContent = '💰 Withdraw $1 USD (10,000 Points)';
            } else {
                withdrawBtn.disabled = true;
                withdrawBtn.textContent = `💰 Need ${(10000 - currentUser.points).toLocaleString()} more points to withdraw`;
            }
        }
    }
}

// Video watching functions
function startVideoTimer() {
    timeRemaining = 30;
    const timerEl = document.getElementById('timer');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (confirmBtn) {
        confirmBtn.style.display = 'none';
    }
    
    videoTimer = setInterval(() => {
        timeRemaining--;
        
        if (timerEl) {
            timerEl.textContent = `Time remaining: ${timeRemaining} seconds`;
        }
        
        if (timeRemaining <= 0) {
            clearInterval(videoTimer);
            if (timerEl) {
                timerEl.textContent = 'Video completed! You can now earn points.';
            }
            if (confirmBtn) {
                confirmBtn.style.display = 'block';
            }
        }
    }, 1000);
}

async function earnPoints(points, type) {
    try {
        const response = await fetch('/api/earn-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points, type })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(data.message, 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        showMessage('Failed to earn points. Please try again.', 'error');
    }
}

// Withdrawal functions
async function submitWithdrawal(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('withdrawFullname').value;
    const email = document.getElementById('withdrawEmail').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentDetails = document.getElementById('paymentDetails').value;
    
    try {
        const response = await fetch('/api/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, paymentMethod, paymentDetails })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(data.message, 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 3000);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        showMessage('Withdrawal request failed. Please try again.', 'error');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Authentication forms
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    const withdrawForm = document.getElementById('withdrawFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
    
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', submitWithdrawal);
    }
    
    // Load user data on dashboard
    if (window.location.pathname === '/dashboard') {
        loadUserData();
    }
    
    // Start video timer on video pages
    if (window.location.pathname === '/watch-ad' || window.location.pathname === '/link-video') {
        setTimeout(startVideoTimer, 1000);
    }
    
    // Redirect to shortened link
    if (window.location.pathname === '/visit-link') {
        setTimeout(() => {
            // Simulate redirect to shortened link service
            showMessage('Redirecting to shortened link...', 'success');
            setTimeout(() => {
                window.location.href = '/link-video';
            }, 3000);
        }, 1000);
    }
});

// Global functions for button clicks
function goToWatchAd() {
    window.location.href = '/watch-ad';
}

function goToVisitLink() {
    window.location.href = '/visit-link';
}

function goToWithdraw() {
    window.location.href = '/withdraw';
}

function confirmAdWatch() {
    earnPoints(40, 'video');
}

function confirmLinkVideo() {
    earnPoints(65, 'link_video');
}

function goToDashboard() {
    window.location.href = '/dashboard';
}