const WORKER_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-icon"><path d="m8.213.063 8.879 12.136-8.67 11.739h2.476l8.665-11.735-8.89-12.14Zm4.728 0 9.02 11.992-9.018 11.883h2.496L24 12.656v-1.199L15.434.063ZM7.178 2.02.01 11.398l-.01 1.2 7.203 9.644 1.238-1.676-6.396-8.556 6.361-8.313Z" fill="#F38020"/></svg>`;
const PAGES_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-icon"><path d="M10.715 14.32H5.442l-.64-1.203L13.673 0l1.397.579-1.752 9.112h5.24l.648 1.192L10.719 24l-1.412-.54ZM4.091 5.448a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.543 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.544 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm8.657-2.7h5.424l.772.771v16.975l-.772.772h-7.392l.374-.579h6.779l.432-.432V3.758l-.432-.432h-4.676l-.552 2.85h-.59l.529-2.877.108-.552ZM2.74 21.265l-.772-.772V3.518l.772-.771h7.677l-.386.579H2.98l-.432.432v16.496l.432.432h5.586l-.092.579zm1.157-1.93h3.28l-.116.58h-3.55l-.192-.193v-3.473l.578 1.158zm13.117 0 .579.58H14.7l.385-.58z" fill="#F38020"/></svg>`;
const ACCOUNT_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="account-icon"><path fill="#F38020" d="M16.493 17.4c.135-.52.08-.983-.161-1.338-.215-.328-.592-.519-1.05-.519l-8.663-.109a.148.148 0 01-.135-.082c-.027-.054-.027-.109-.027-.163.027-.082.108-.164.189-.164l8.744-.11c1.05-.054 2.153-.9 2.556-1.937l.511-1.31c.027-.055.027-.11.027-.164C17.92 8.91 15.66 7 12.942 7c-2.503 0-4.628 1.638-5.381 3.903a2.432 2.432 0 00-1.803-.491c-1.21.109-2.153 1.092-2.287 2.32-.027.328 0 .628.054.9C1.56 13.688 0 15.326 0 17.319c0 .19.027.355.027.545 0 .082.08.137.161.137h15.983c.08 0 .188-.055.215-.164l.107-.437"></path><path fill="#FCAD32" d="M19.238 11.75h-.242c-.054 0-.108.054-.135.109l-.35 1.2c-.134.52-.08.983.162 1.338.215.328.592.518 1.05.518l1.855.11c.054 0 .108.027.135.082.027.054.027.109.027.163-.027.082-.108.164-.188.164l-1.91.11c-1.05.054-2.153.9-2.557 1.937l-.134.355c-.027.055.026.137.107.137h6.592c.081 0 .162-.055.162-.137.107-.41.188-.846.188-1.31-.027-2.62-2.153-4.777-4.762-4.777"></path></svg>`;

// 修改为请求同域下的 /api 路径
const WORKER_URL = '/api'; 
let ACCOUNTS_DATA = [];
let dropdownOpen = false;
let isRefreshing = false;

const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    body.classList.toggle('dark-theme', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeBtn.textContent = theme === 'dark' ? '✨' : '☀️';
}

const accountDropdownBtn = document.getElementById('accountDropdownBtn');
const accountDropdown = document.getElementById('accountDropdown');

accountDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownOpen = !dropdownOpen;
    accountDropdown.classList.toggle('show', dropdownOpen);
});

document.addEventListener('click', () => {
    dropdownOpen = false;
    accountDropdown.classList.remove('show');
});

accountDropdown.addEventListener('click', (e) => e.stopPropagation());

function updateProgress(percentage, text) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = text;
}

function showRefreshProgress() {
    document.getElementById('refreshProgress').style.display = 'block';
    updateProgress(0, '开始刷新...');
}

function hideRefreshProgress() {
    document.getElementById('refreshProgress').style.display = 'none';
}

async function loadData(showAll = true) {
    if (isRefreshing) return;
    isRefreshing = true;
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.disabled = true;
    refreshBtn.textContent = '刷新中...';
    showLoading();
    hideError();
    if (showAll) showRefreshProgress();
    try {
        const url = showAll ? `${WORKER_URL}?all=true&optimized=true` : `${WORKER_URL}?accountIndex=0`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`请求失败: ${response.status}`);
        const data = await response.json();
        ACCOUNTS_DATA = data.accounts || [data];
        updateAccountDropdown();
        displayData(data, showAll);
    } catch (error) {
        showError('加载数据失败: ' + error.message);
    } finally {
        hideLoading();
        if (showAll) hideRefreshProgress();
        refreshBtn.disabled = false;
        refreshBtn.textContent = '刷新数据';
        isRefreshing = false;
    }
}

function updateAccountDropdown() {
    const accountDropdown = document.getElementById('accountDropdown');
    accountDropdown.innerHTML = '';
    ACCOUNTS_DATA.forEach((account, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `${account.accountName}`;
        link.onclick = (e) => {
            e.preventDefault();
            dropdownOpen = false;
            accountDropdown.classList.remove('show');
            loadAccount(index);
        };
        accountDropdown.appendChild(link);
    });
}

async function loadAccount(accountIndex) {
    showLoading();
    hideError();
    try {
        const response = await fetch(`${WORKER_URL}?accountIndex=${accountIndex}`);
        if (!response.ok) throw new Error(`请求失败: ${response.status}`);
        const data = await response.json();
        displaySingleAccount(data);
    } catch (error) {
        showError('加载账号数据失败: ' + error.message);
    } finally {
        hideLoading();
    }
}

function displayData(data, showAll) {
    const dashboard = document.getElementById('dashboard');
    const summary = document.getElementById('summary');
    const summaryContent = document.getElementById('summaryContent');
    dashboard.innerHTML = '';
    summaryContent.innerHTML = '';
    
    if (showAll && data.accounts) {
        summary.style.display = 'block';
        summaryContent.innerHTML = `
            <div class="summary-stats-row">
                <div class="summary-stat-item">
                    <div class="summary-stat-label">
                        ${ACCOUNT_SVG}
                        Account
                    </div>
                    <div class="summary-stat-value">${data.accounts.length}</div>
                </div>
                <div class="summary-stat-item">
                    <div class="summary-stat-label">
                        ${PAGES_SVG}
                        Pages
                    </div>
                    <div class="summary-stat-value">${data.totals.formatted.pagesSum}</div>
                </div>
                <div class="summary-stat-item">
                    <div class="summary-stat-label">
                        ${WORKER_SVG}
                        Workers
                    </div>
                    <div class="summary-stat-value">${data.totals.formatted.workersSum}</div>
                </div>
            </div>
            <div class="summary-remaining">
                <div class="summary-stat-label">总剩余额度</div>
                <div class="summary-stat-value">${data.totals.formatted.remaining}</div>
                <div class="progress-percent">${data.totals.percent}%</div>
            </div>
        `;
        data.accounts.forEach(account => {
            if (account.error) dashboard.innerHTML += createErrorCard(account);
            else dashboard.innerHTML += createAccountCard(account);
        });
    } else {
        summary.style.display = 'none';
        if (data.error) dashboard.innerHTML = createErrorCard(data);
        else dashboard.innerHTML = createAccountCard(data);
    }
    dashboard.style.display = 'grid';
    updateLastUpdate();
}

function displaySingleAccount(account) {
    const dashboard = document.getElementById('dashboard');
    const summary = document.getElementById('summary');
    summary.style.display = 'none';
    dashboard.innerHTML = '';
    if (account.error) dashboard.innerHTML = createErrorCard(account);
    else dashboard.innerHTML = createAccountCard(account);
    dashboard.style.display = 'grid';
    updateLastUpdate();
}

function createAccountCard(account) {
    const statusClass = getStatusClass(account.percent);
    const statusText = getStatusText(account.percent);
    return `
        <div class="card">
            <div class="account-header">
                <div class="account-name">${account.accountName}</div>
                <div class="account-status ${statusClass}">${statusText}</div>
            </div>
            <div class="metric-grid">
                <div class="metric">
                    <div class="metric-label">
                        ${PAGES_SVG}
                        Pages 请求
                    </div>
                    <div class="metric-value">${account.formatted.pagesSum}</div>
                    <div class="metric-label">${account.pagesSum.toLocaleString()} 次</div>
                </div>
                <div class="metric">
                    <div class="metric-label">
                        ${WORKER_SVG}
                        Workers 请求
                    </div>
                    <div class="metric-value">${account.formatted.workersSum}</div>
                    <div class="metric-label">${account.workersSum.toLocaleString()} 次</div>
                </div>
            </div>
            <div class="progress-section">
                <div class="progress-header">
                    <div class="progress-label">剩余额度</div>
                    <div class="progress-percent">${account.percent}%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${account.percent}%"></div>
                </div>
                <div style="text-align: center; margin-top: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                    ${account.formatted.remaining} / ${account.formatted.total}
                </div>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); text-align: center; color: var(--text-secondary); font-size: 0.8rem;">
                最后更新: ${account.date}
            </div>
        </div>
    `;
}

function createErrorCard(account) {
    return `
        <div class="card">
            <div class="account-header">
                <div class="account-name">${account.accountName}</div>
                <div class="account-status status-danger">错误</div>
            </div>
            <div class="error" style="margin: 0;">${account.error}</div>
        </div>
    `;
}

function getStatusClass(percent) {
    if (percent >= 70) return 'status-good';
    if (percent >= 30) return 'status-warning';
    return 'status-danger';
}

function getStatusText(percent) {
    if (percent >= 70) return '充足';
    if (percent >= 30) return '警告';
    return '不足';
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('summary').style.display = 'none';
}

function hideLoading() { document.getElementById('loading').style.display = 'none'; }

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

function hideError() { document.getElementById('error').style.display = 'none'; }

function updateLastUpdate() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = `最后更新: ${now.toLocaleString('zh-CN')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    loadData(true);
    setInterval(() => {
        if (!isRefreshing) loadData(true);
    }, 60 * 1000);
});
