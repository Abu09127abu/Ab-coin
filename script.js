let coinCount = 0;
const abCoin = document.getElementById('ab-coin');
const coinCounter = document.getElementById('coin-count');
const taskPopup = document.getElementById('task-popup');
const airdropPopup = document.getElementById('airdrop-popup');
const luckyPopup = document.getElementById('lucky-popup');
const taskItemsContainer = document.getElementById('task-items');

// Local Storage Keys
const LOCAL_STORAGE_KEY = 'ab_coin_count';
const LOCAL_STORAGE_TASKS = 'completed_tasks';

function formatCoinCount(count) {
    return count.toLocaleString(); // Add commas to the number (e.g., 1,000)
}

function showClickEffect(x, y) {
    const clickEffect = document.createElement('div');
    clickEffect.textContent = "+1";
    clickEffect.style.position = 'absolute';
    clickEffect.style.left = `${x}px`;
    clickEffect.style.top = `${y - 20}px`; // Slightly above the click
    clickEffect.style.opacity = 1;
    clickEffect.style.color = 'yellow';
    clickEffect.style.fontSize = '1.5rem';
    document.body.appendChild(clickEffect);

    setTimeout(() => {
        clickEffect.style.top = `${y - 60}px`;
        clickEffect.style.opacity = 0;
    }, 100);

    setTimeout(() => {
        clickEffect.remove();
    }, 500);
}

function updateCoinCount() {
    coinCounter.textContent = formatCoinCount(coinCount);
    localStorage.setItem(LOCAL_STORAGE_KEY, coinCount);
}

function openTaskPopup() {
    taskPopup.style.display = "block";
    loadTasks();
}

function closeTaskPopup() {
    taskPopup.style.display = "none";
}

function openAirdropPopup() {
    airdropPopup.style.display = "block";
}

function closeAirdropPopup() {
    airdropPopup.style.display = "none";
}

function openLuckyPopup() {
    luckyPopup.style.display = "block";
}

function closeLuckyPopup() {
    luckyPopup.style.display = "none";
}

function loadTasks() {
    taskItemsContainer.innerHTML = ''; // Clear existing items
    const tasks = [
        { text: "Task 1", url: "https://youtube.com/@absiddik1" },
        { text: "Task 2", url: "https://youtube.com/@abcreationsx" },
        { text: "Task 3", url: "https://youtube.com/@absiddik4" },
        { text: "Task 4", url: "https://t.me/protacttheabcoin" },
        { text: "Task 5", url: "https://t.me/abcoinchat" },
        { text: "Task 6", url: "https://t.me/+P2HHpv1WVKBhMTNl" },
        { text: "Task 7", url: "https://t.me/ABcoinairdrop" },
    ];

    const completedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS)) || [];

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = task.text;
        taskItem.onclick = () => {
            if (!completedTasks.includes(task.text)) {
                window.open(task.url, '_blank');
                coinCount += 1000000;
                updateCoinCount();
                completedTasks.push(task.text);
                localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(completedTasks));
                taskItem.style.backgroundColor = 'lightgreen'; // Mark as completed
                taskItem.textContent += " - Completed!";
            }
        };
        if (completedTasks.includes(task.text)) {
            taskItem.style.backgroundColor = 'lightgreen'; // Already completed
            taskItem.textContent += " - Completed!";
        }
        taskItemsContainer.appendChild(taskItem);
    });
}

function generateLuckyCode() {
    const luckyCode = `abcoin${Math.floor(Math.random() * 10000)}`; // Example: abcoin1234
    localStorage.setItem('lucky_code', luckyCode);
    // Send message to Telegram (simulation)
    console.log(`New lucky code generated: ${luckyCode}`);
}

function submitLuckyCode() {
    const luckyCodeInput = document.getElementById('lucky-code-input').value;
    const storedLuckyCode = localStorage.getItem('lucky_code');
    if (luckyCodeInput === storedLuckyCode) {
        coinCount += 5000000;
        updateCoinCount();
        alert("Congratulations! You've earned 5 million AB Coins!");
    } else {
        alert("Invalid lucky code. Try again.");
    }
}

// Initialize game state
function initializeGame() {
    const storedCoinCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCoinCount) {
        coinCount = parseInt(storedCoinCount);
    }
    updateCoinCount();
    generateLuckyCode(); // Generate lucky code on start
}

// Event Listeners
abCoin.addEventListener('touchstart', (event) => {
    Array.from(event.touches).forEach((touch) => {
        coinCount++;
        updateCoinCount();

        const x = touch.clientX;
        const y = touch.clientY;

        showClickEffect(x, y);
    });

    abCoin.style.transform = "scale(1.2)";
    setTimeout(() => {
        abCoin.style.transform = "scale(1)";
    }, 200);
});

abCoin.addEventListener('click', (event) => {
    coinCount++;
    updateCoinCount();

    const x = event.clientX;
    const y = event.clientY;

    showClickEffect(x, y);

    abCoin.style.transform = "scale(1.2)";
    setTimeout(() => {
        abCoin.style.transform = "scale(1)";
    }, 200);
});

// Popup button event listeners
document.getElementById('task-button').onclick = openTaskPopup;
document.getElementById('airdrop-button').onclick = openAirdropPopup;
document.getElementById('lucky-button').onclick = openLuckyPopup;

document.getElementById('close-task-popup').onclick = closeTaskPopup;
document.getElementById('close-airdrop-popup').onclick = closeAirdropPopup;
document.getElementById('close-lucky-popup').onclick = closeLuckyPopup;
document.getElementById('submit-lucky-code').onclick = submitLuckyCode;

// Initialize game
initializeGame();
