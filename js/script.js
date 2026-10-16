// To-Do List Life Dashboard - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // ==================== STATE MANAGEMENT ====================
    let todos = [];
    let quickLinks = [];
    let currentFilter = 'all';
    let timerInterval = null;
    let timerSeconds = 25 * 60; // 25 minutes in seconds
    let isTimerRunning = false;
    let editingTodoId = null;

    // ==================== DOM ELEMENTS ====================
    // Greeting Elements
    const currentTimeEl = document.getElementById('currentTime');
    const currentDateEl = document.getElementById('currentDate');
    const greetingTextEl = document.getElementById('greetingText');
    const userGreetingEl = document.getElementById('userGreeting');
    const userNameInput = document.getElementById('userNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');

    // Timer Elements
    const timerDisplayEl = document.getElementById('timerDisplay');
    const timerStatusEl = document.getElementById('timerStatus');
    const startTimerBtn = document.getElementById('startTimer');
    const stopTimerBtn = document.getElementById('stopTimer');
    const resetTimerBtn = document.getElementById('resetTimer');

    // To-Do Elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoListEl = document.getElementById('todoList');
    const tasksCountEl = document.getElementById('tasksCount');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Quick Links Elements
    const linkNameInput = document.getElementById('linkNameInput');
    const linkUrlInput = document.getElementById('linkUrlInput');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const linksGridEl = document.getElementById('linksGrid');

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');

    // Modal Elements
    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');

    // ==================== LOCAL STORAGE ====================
    const STORAGE_KEYS = {
        TODOS: 'lifeDashboard_todos',
        LINKS: 'lifeDashboard_links',
        THEME: 'lifeDashboard_theme',
        USERNAME: 'lifeDashboard_username'
    };

    // Save to Local Storage
    function saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Load from Local Storage
    function loadFromLocalStorage(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return defaultValue;
        }
    }

    // ==================== INITIALIZATION ====================
    function initializeApp() {
        // Load saved data
        todos = loadFromLocalStorage(STORAGE_KEYS.TODOS);
        quickLinks = loadFromLocalStorage(STORAGE_KEYS.LINKS);
        
        // Load theme
        const savedTheme = loadFromLocalStorage(STORAGE_KEYS.THEME, 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
        
        // Load username
        const savedUsername = loadFromLocalStorage(STORAGE_KEYS.USERNAME, '');
        if (savedUsername) {
            userNameInput.value = savedUsername;
        }

        // Update UI
        updateGreeting();
        updateTodoList();
        updateLinksGrid();
        updateTimerDisplay();
        
        // Start time updates
        updateTime();
        setInterval(updateTime, 1000);
    }

    // ==================== TIME & GREETING ====================
    function updateTime() {
        const now = new Date();
        
        // Format time
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        currentTimeEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
        
        // Format date
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateEl.textContent = now.toLocaleDateString('en-US', dateOptions);
        
        // Update greeting
        updateGreeting();
    }

    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const username = userNameInput.value || 'there';
        
        let greeting = '';
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        
        greetingTextEl.textContent = greeting;
        userGreetingEl.textContent = `${greeting}, ${username}! Let's make today productive.`;
    }

    // ==================== THEME TOGGLE ====================
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        saveToLocalStorage(STORAGE_KEYS.THEME, newTheme);
        updateThemeButton(newTheme);
    }

    function updateThemeButton(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    // ==================== POMODORO TIMER ====================
    function updateTimerDisplay() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerDisplayEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isTimerRunning) return;
        
        isTimerRunning = true;
        timerStatusEl.textContent = 'Focusing...';
        timerStatusEl.style.color = 'var(--success-color)';
        
        startTimerBtn.disabled = true;
        stopTimerBtn.disabled = false;
        
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerComplete();
            }
        }, 1000);
    }

    function stopTimer() {
        if (!isTimerRunning) return;
        
        isTimerRunning = false;
        clearInterval(timerInterval);
        timerStatusEl.textContent = 'Paused';
        timerStatusEl.style.color = 'var(--warning-color)';
        
        startTimerBtn.disabled = false;
        stopTimerBtn.disabled = true;
    }

    function resetTimer() {
        stopTimer();
        timerSeconds = 25 * 60;
        updateTimerDisplay();
        timerStatusEl.textContent = 'Ready';
        timerStatusEl.style.color = 'var(--text-light)';
        
        startTimerBtn.disabled = false;
        stopTimerBtn.disabled = true;
    }

    function timerComplete() {
        isTimerRunning = false;
        timerStatusEl.textContent = 'Time\'s up! Take a break.';
        timerStatusEl.style.color = 'var(--accent-color)';
        
        // Play notification sound (optional)
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Show notification
        alert('Pomodoro session complete! 🎉\nTake a 5-minute break.');
        
        startTimerBtn.disabled = false;
        stopTimerBtn.disabled = true;
    }

    // ==================== TO-DO LIST ====================
    function generateTodoId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function addTodo(text) {
        // Check for duplicate tasks
        const isDuplicate = todos.some(todo => 
            todo.text.toLowerCase().trim() === text.toLowerCase().trim()
        );
        
        if (isDuplicate) {
            alert('This task already exists! Please add a different task.');
            return false;
        }
        
        if (text.trim() === '') {
            alert('Please enter a task description');
            return false;
        }
        
        const newTodo = {
            id: generateTodoId(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.push(newTodo);
        saveToLocalStorage(STORAGE_KEYS.TODOS, todos);
        updateTodoList();
        
        todoInput.value = '';
        todoInput.focus();
        
        return true;
    }

    function toggleTodoComplete(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].completed = !todos[todoIndex].completed;
            saveToLocalStorage(STORAGE_KEYS.TODOS, todos);
            updateTodoList();
        }
    }

    function editTodo(id, newText) {
        if (!newText.trim()) {
            alert('Task cannot be empty');
            return false;
        }
        
        // Check for duplicate tasks
        const isDuplicate = todos.some(todo => 
            todo.id !== id && todo.text.toLowerCase().trim() === newText.toLowerCase().trim()
        );
        
        if (isDuplicate) {
            alert('This task already exists! Please use a different description.');
            return false;
        }
        
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].text = newText.trim();
            saveToLocalStorage(STORAGE_KEYS.TODOS, todos);
            updateTodoList();
            return true;
        }
        return false;
    }

    function deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            todos = todos.filter(todo => todo.id !== id);
            saveToLocalStorage(STORAGE_KEYS.TODOS, todos);
            updateTodoList();
        }
    }

    function clearCompletedTodos() {
        const hasCompleted = todos.some(todo => todo.completed);
        if (!hasCompleted) {
            alert('No completed tasks to clear');
            return;
        }
        
        if (confirm('Clear all completed tasks?')) {
            todos = todos.filter(todo => !todo.completed);
            saveToLocalStorage(STORAGE_KEYS.TODOS, todos);
            updateTodoList();
        }
    }

    function updateTodoList() {
        const filteredTodos = getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            todoListEl.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>${getEmptyStateMessage()}</p>
                </div>
            `;
        } else {
            todoListEl.innerHTML = filteredTodos.map(todo => `
                <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                    <div class="todo-actions">
                        <button class="btn-edit" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        updateTasksCount();
    }

    function getFilteredTodos() {
        switch (currentFilter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }

    function getEmptyStateMessage() {
        switch (currentFilter) {
            case 'active':
                return 'No active tasks. Great job!';
            case 'completed':
                return 'No completed tasks yet. Keep going!';
            default:
                return 'No tasks yet. Add your first task!';
        }
    }

    function updateTasksCount() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const active = total - completed;
        
        let countText = '';
        if (currentFilter === 'all') {
            countText = `${total} task${total !== 1 ? 's' : ''} (${active} active, ${completed} completed)`;
        } else if (currentFilter === 'active') {
            countText = `${active} active task${active !== 1 ? 's' : ''}`;
        } else {
            countText = `${completed} completed task${completed !== 1 ? 's' : ''}`;
        }
        
        tasksCountEl.textContent = countText;
    }

    function openEditModal(todoId) {
        const todo = todos.find(t => t.id === todoId);
        if (!todo) return;
        
        editingTodoId = todoId;
        editTaskInput.value = todo.text;
        editModal.style.display = 'flex';
        editTaskInput.focus();
    }

    function closeEditModal() {
        editingTodoId = null;
        editModal.style.display = 'none';
        editTaskInput.value = '';
    }

    // ==================== QUICK LINKS ====================
    function addQuickLink(name, url) {
        if (!name.trim() || !url.trim()) {
            alert('Please enter both link name and URL');
            return false;
        }
        
        // Validate URL
        try {
            new URL(url);
        } catch {
            alert('Please enter a valid URL (include https:// or http://)');
            return false;
        }
        
        // Check for duplicate URLs
        const isDuplicate = quickLinks.some(link => 
            link.url.toLowerCase() === url.toLowerCase()
        );
        
        if (isDuplicate) {
            alert('This URL is already saved!');
            return false;
        }
        
        const newLink = {
            id: generateTodoId(),
            name: name.trim(),
            url: url.trim(),
            icon: getFaviconUrl(url)
        };
        
        quickLinks.push(newLink);
        saveToLocalStorage(STORAGE_KEYS.LINKS, quickLinks);
        updateLinksGrid();
        
        linkNameInput.value = '';
        linkUrlInput.value = '';
        linkNameInput.focus();
        
        return true;
    }

    function getFaviconUrl(url) {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
            return '';
        }
    }

    function deleteLink(id) {
        if (confirm('Are you sure you want to remove this link?')) {
            quickLinks = quickLinks.filter(link => link.id !== id);
            saveToLocalStorage(STORAGE_KEYS.LINKS, quickLinks);
            updateLinksGrid();
        }
    }

    function updateLinksGrid() {
        if (quickLinks.length === 0) {
            linksGridEl.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <p>No links yet. Add your first quick link!</p>
                </div>
            `;
        } else {
            linksGridEl.innerHTML = quickLinks.map(link => `
                <div class="link-item" data-id="${link.id}">
                    <div class="link-icon">
                        ${link.icon ? 
                            `<img src="${link.icon}" alt="${link.name} icon" width="24" height="24">` : 
                            `<i class="fas fa-link"></i>`
                        }
                    </div>
                    <div class="link-content">
                        <a href="${link.url}" class="link-name" target="_blank" rel="noopener noreferrer">
                            ${escapeHtml(link.name)}
                        </a>
                        <span class="link-url">${escapeHtml(link.url)}</span>
                    </div>
                    <div class="link-actions">
                        <a href="${link.url}" class="btn-open" target="_blank" rel="noopener noreferrer" title="Open link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <button class="btn-remove-link" title="Remove link">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function setActiveFilter(filter) {
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        currentFilter = filter;
        updateTodoList();
    }

    // ==================== EVENT LISTENERS ====================
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // User name
    saveNameBtn.addEventListener('click', () => {
        const username = userNameInput.value.trim();
        saveToLocalStorage(STORAGE_KEYS.USERNAME, username);
        updateGreeting();
        alert('Name saved successfully!');
    });

    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveNameBtn.click();
        }
    });

    // Timer controls
    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
    resetTimerBtn.addEventListener('click', resetTimer);

    // To-Do controls
    addTodoBtn.addEventListener('click', () => {
        addTodo(todoInput.value);
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value);
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveFilter(btn.dataset.filter);
        });
    });

    // Clear completed
    clearCompletedBtn.addEventListener('click', clearCompletedTodos);

    // To-Do list events (delegation)
    todoListEl.addEventListener('click', (e) => {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;
        
        const todoId = todoItem.dataset.id;
        
        // Checkbox click
        if (e.target.classList.contains('todo-checkbox')) {
            toggleTodoComplete(todoId);
        }
        
        // Edit button click
        if (e.target.closest('.btn-edit')) {
            openEditModal(todoId);
        }
        
        // Delete button click
        if (e.target.closest('.btn-delete')) {
            deleteTodo(todoId);
        }
    });

    // Quick Links
    addLinkBtn.addEventListener('click', () => {
        addQuickLink(linkNameInput.value, linkUrlInput.value);
    });

    linkUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addQuickLink(linkNameInput.value, linkUrlInput.value);
        }
    });

    // Links grid events (delegation)
    linksGridEl.addEventListener('click', (e) => {
        const linkItem = e.target.closest('.link-item');
        if (!linkItem) return;
        
        const linkId = linkItem.dataset.id;
        
        // Remove button click
        if (e.target.closest('.btn-remove-link')) {
            e.preventDefault();
            deleteLink(linkId);
        }
    });

    // Modal controls
    saveEditBtn.addEventListener('click', () => {
        if (editingTodoId && editTodo(editingTodoId, editTaskInput.value)) {
            closeEditModal();
        }
    });

    cancelEditBtn.addEventListener('click', closeEditModal);

    editTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEditBtn.click();
        }
    });

    // Close modal when clicking outside
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // ==================== INITIALIZE APP ====================
    initializeApp();
});