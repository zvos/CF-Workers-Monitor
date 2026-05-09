const HTML_PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>用量监控</title>
    <style>
        :root {
            --bg-primary: rgba(255, 255, 255, 0.1);
            --bg-secondary: rgba(255, 255, 255, 0.2);
            --text-primary: #333;
            --text-secondary: #666;
            --card-bg: rgba(255, 255, 255, 0.9);
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            --border: 1px solid rgba(0, 0, 0, 0.1);
            --btn-text: #333;
            --btn-bg: rgba(255, 255, 255, 0.8);
            --btn-hover-bg: rgba(255, 255, 255, 0.9);
            --last-update-text: #666;
        }
        .dark-theme {
            --bg-primary: rgba(0, 0, 0, 0.2);
            --bg-secondary: rgba(0, 0, 0, 0.3);
            --text-primary: #fff;
            --text-secondary: #ccc;
            --card-bg: rgba(30, 30, 30, 0.9);
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            --border: 1px solid rgba(255, 255, 255, 0.1);
            --btn-text: #fff;
            --btn-bg: rgba(255, 255, 255, 0.1);
            --btn-hover-bg: rgba(255, 255, 255, 0.2);
            --last-update-text: #ccc;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f9fcff;
            min-height: 100vh;
            padding: 20px;
            transition: background 0.3s ease, color 0.3s ease;
            color: var(--text-primary);
        }
        body.dark-theme {
            background: #000000;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px 25px;
            box-shadow: var(--shadow);
            margin-bottom: 20px;
            border: var(--border);
            color: var(--text-primary);
            flex-wrap: nowrap;
            gap: 15px;
            overflow: visible;
            position: relative;
            z-index: 100;
        }
        .header-left {
            display: flex;
            align-items: center;
            gap: 14px;
            flex-shrink: 0;
        }
        .header-icon svg {
            width: 48px;
            height: 48px;
        }
        .header-text {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .header-item {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.3;
            white-space: nowrap;
            letter-spacing: 0.02em;
        }
        .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: nowrap;
            flex-shrink: 0;
        }
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
            background: var(--btn-bg);
            backdrop-filter: blur(10px);
            color: var(--btn-text);
            border: var(--border);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
        }
        .btn:hover {
            background: var(--btn-hover-bg);
        }
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        #themeBtn {
            border-radius: 8px;
            width: 48px;
            height: 48px;
            padding: 0;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .dropdown {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            width: 100%;
            box-shadow: var(--shadow);
            z-index: 1001;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 5px;
            border: var(--border);
        }
        .dropdown-content.show {
            display: block;
        }
        .dropdown-content a {
            color: var(--text-primary);
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border-bottom: 1px solid var(--border);
            transition: background 0.3s ease;
        }
        .dropdown-content a:hover {
            background: var(--bg-secondary);
        }
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            box-shadow: var(--shadow);
            transition: transform 0.3s ease;
            border: var(--border);
            color: var(--text-primary);
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .account-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--border);
        }
        .account-name {
            font-size: 1.4rem;
            font-weight: bold;
            color: var(--text-primary);
        }
        .account-status {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
        }
        .status-good {
            background: rgba(46, 125, 50, 0.2);
            color: #2e7d32;
        }
        .status-warning {
            background: rgba(245, 124, 0, 0.2);
            color: #f57c00;
        }
        .status-danger {
            background: rgba(198, 40, 40, 0.2);
            color: #c62828;
        }
        .metric-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .metric {
            text-align: center;
            padding: 15px;
            background: var(--bg-primary);
            border-radius: 10px;
            border: var(--border);
        }
        .metric-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        .metric-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--text-primary);
        }
        .progress-section {
            margin-top: 20px;
        }
        .progress-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .progress-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .progress-percent {
            font-weight: bold;
            color: var(--text-primary);
        }
        .progress-bar {
            height: 12px;
            background: var(--bg-primary);
            border-radius: 6px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            transition: width 0.5s ease;
        }
        .summary-card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            box-shadow: var(--shadow);
            margin-bottom: 20px;
            border: var(--border);
            color: var(--text-primary);
        }
        .summary-card h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .summary-stats-row {
            display: flex;
            width: 100%;
            gap: 20px;
            margin-bottom: 30px;
            justify-content: space-between;
        }
        .summary-stat-item {
            flex: 1;
            min-width: 0;
            text-align: center;
            padding: 20px 10px;
            background: var(--bg-primary);
            border-radius: 10px;
            border: var(--border);
        }
        .summary-stat-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        .summary-stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text-primary);
            line-height: 1.2;
        }
        .summary-remaining {
            text-align: center;
            padding: 20px;
            background: var(--bg-primary);
            border-radius: 10px;
            border: var(--border);
            max-width: 400px;
            margin: 0 auto;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: var(--text-secondary);
        }
        .error {
            background: rgba(198, 40, 40, 0.2);
            color: #c62828;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border: 1px solid rgba(198, 40, 40, 0.3);
        }
        .last-update {
            text-align: center;
            color: var(--last-update-text);
            margin-top: 20px;
            font-size: 0.9rem;
        }
        .refresh-progress {
            margin: 10px 0;
            text-align: center;
            color: var(--text-primary);
        }
        .progress-text {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        .progress-bar-container {
            width: 100%;
            height: 6px;
            background: var(--bg-primary);
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-bar-inner {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            transition: width 0.3s ease;
        }
        @media (max-width: 768px) {
            .header-card {
                padding: 15px 15px;
                gap: 8px;
            }
            .header-left {
                gap: 10px;
            }
            .header-icon svg {
                width: 32px;
                height: 32px;
            }
            .header-item {
                font-size: 1rem;
            }
            .header-right {
                gap: 6px;
            }
            .btn {
                padding: 8px 12px;
                font-size: 0.85rem;
                border-radius: 6px;
            }
            #themeBtn {
                width: 36px;
                height: 36px;
                font-size: 1.2rem;
                border-radius: 6px;
            }
            .summary-stats-row {
                gap: 8px;
            }
            .summary-stat-item {
                padding: 12px 4px;
            }
            .summary-stat-value {
                font-size: 1.3rem;
            }
            .dashboard {
                grid-template-columns: 1fr;
            }
            /* 移动端也保持并排，缩小间距和字体 */
            .metric-grid {
                gap: 8px;
            }
            .metric {
                padding: 10px 6px;
            }
            .metric-label {
                font-size: 0.7rem;
                gap: 3px;
            }
            .metric-value {
                font-size: 1.2rem;
            }
            .metric-label svg {
                width: 12px;
                height: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-card">
            <div class="header-left">
                <div class="header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="cloudflare">
                        <path fill="#F38020" d="M16.493 17.4c.135-.52.08-.983-.161-1.338-.215-.328-.592-.519-1.05-.519l-8.663-.109a.148.148 0 01-.135-.082c-.027-.054-.027-.109-.027-.163.027-.082.108-.164.189-.164l8.744-.11c1.05-.054 2.153-.9 2.556-1.937l.511-1.31c.027-.055.027-.11.027-.164C17.92 8.91 15.66 7 12.942 7c-2.503 0-4.628 1.638-5.381 3.903a2.432 2.432 0 00-1.803-.491c-1.21.109-2.153 1.092-2.287 2.32-.027.328 0 .628.054.9C1.56 13.688 0 15.326 0 17.319c0 .19.027.355.027.545 0 .082.08.137.161.137h15.983c.08 0 .188-.055.215-.164l.107-.437"></path>
                        <path fill="#FCAD32" d="M19.238 11.75h-.242c-.054 0-.108.054-.135.109l-.35 1.2c-.134.52-.08.983.162 1.338.215.328.592.518 1.05.518l1.855.11c.054 0 .108.027.135.082.027.054.027.109.027.163-.027.082-.108.164-.188.164l-1.91.11c-1.05.054-2.153.9-2.557 1.937l-.134.355c-.027.055.026.137.107.137h6.592c.081 0 .162-.055.162-.137.107-.41.188-.846.188-1.31-.027-2.62-2.153-4.777-4.762-4.777"></path>
                    </svg>
                </div>
                <div class="header-text">
                    <div class="header-item">Pages</div>
                    <div class="header-item" style="font-size: 0.74em;">workers</div>
                </div>
            </div>
            <div class="header-right">
                <button class="btn" id="refreshBtn" onclick="loadData(true)">刷新数据</button>
                <div class="dropdown">
                    <button class="btn" id="accountDropdownBtn">查看账号</button>
                    <div class="dropdown-content" id="accountDropdown"></div>
                </div>
                <button id="themeBtn" class="btn">☀️</button>
            </div>
        </div>

        <div id="refreshProgress" class="refresh-progress" style="display: none;">
            <div class="progress-text">正在刷新数据: <span id="progressText">0%</span></div>
            <div class="progress-bar-container">
                <div class="progress-bar-inner" id="progressBar" style="width: 0%"></div>
            </div>
        </div>
        <div id="loading" class="loading"><p>正在加载数据...</p></div>
        <div id="error" class="error" style="display: none;"></div>
        <div id="summary" class="summary-card" style="display: none;">
            <h2>总览统计</h2>
            <div id="summaryContent"></div>
        </div>
        <div id="dashboard" class="dashboard" style="display: none;"></div>
        <div class="last-update" id="lastUpdate"></div>
    </div>

    <script>
        const WORKER_SVG = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-icon"><path d="m8.213.063 8.879 12.136-8.67 11.739h2.476l8.665-11.735-8.89-12.14Zm4.728 0 9.02 11.992-9.018 11.883h2.496L24 12.656v-1.199L15.434.063ZM7.178 2.02.01 11.398l-.01 1.2 7.203 9.644 1.238-1.676-6.396-8.556 6.361-8.313Z" fill="#F38020"/></svg>\`;
        const PAGES_SVG = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-icon"><path d="M10.715 14.32H5.442l-.64-1.203L13.673 0l1.397.579-1.752 9.112h5.24l.648 1.192L10.719 24l-1.412-.54ZM4.091 5.448a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.543 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.544 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm8.657-2.7h5.424l.772.771v16.975l-.772.772h-7.392l.374-.579h6.779l.432-.432V3.758l-.432-.432h-4.676l-.552 2.85h-.59l.529-2.877.108-.552ZM2.74 21.265l-.772-.772V3.518l.772-.771h7.677l-.386.579H2.98l-.432.432v16.496l.432.432h5.586l-.092.579zm1.157-1.93h3.28l-.116.58h-3.55l-.192-.193v-3.473l.578 1.158zm13.117 0 .579.58H14.7l.385-.58z" fill="#F38020"/></svg>\`;
        const ACCOUNT_SVG = \`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="account-icon"><path fill="#F38020" d="M16.493 17.4c.135-.52.08-.983-.161-1.338-.215-.328-.592-.519-1.05-.519l-8.663-.109a.148.148 0 01-.135-.082c-.027-.054-.027-.109-.027-.163.027-.082.108-.164.189-.164l8.744-.11c1.05-.054 2.153-.9 2.556-1.937l.511-1.31c.027-.055.027-.11.027-.164C17.92 8.91 15.66 7 12.942 7c-2.503 0-4.628 1.638-5.381 3.903a2.432 2.432 0 00-1.803-.491c-1.21.109-2.153 1.092-2.287 2.32-.027.328 0 .628.054.9C1.56 13.688 0 15.326 0 17.319c0 .19.027.355.027.545 0 .082.08.137.161.137h15.983c.08 0 .188-.055.215-.164l.107-.437"></path><path fill="#FCAD32" d="M19.238 11.75h-.242c-.054 0-.108.054-.135.109l-.35 1.2c-.134.52-.08.983.162 1.338.215.328.592.518 1.05.518l1.855.11c.054 0 .108.027.135.082.027.054.027.109.027.163-.027.082-.108.164-.188.164l-1.91.11c-1.05.054-2.153.9-2.557 1.937l-.134.355c-.027.055.026.137.107.137h6.592c.081 0 .162-.055.162-.137.107-.41.188-.846.188-1.31-.027-2.62-2.153-4.777-4.762-4.777"></path></svg>\`;

        const WORKER_URL = window.location.origin;
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
                const url = showAll ? \`\${WORKER_URL}?all=true&optimized=true\` : \`\${WORKER_URL}?accountIndex=0\`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(\`请求失败: \${response.status}\`);
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
                link.textContent = \`\${account.accountName}\`;
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
                const response = await fetch(\`\${WORKER_URL}?accountIndex=\${accountIndex}\`);
                if (!response.ok) throw new Error(\`请求失败: \${response.status}\`);
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
                summaryContent.innerHTML = \`
                    <div class="summary-stats-row">
                        <div class="summary-stat-item">
                            <div class="summary-stat-label">
                                \${ACCOUNT_SVG}
                                Account
                            </div>
                            <div class="summary-stat-value">\${data.accounts.length}</div>
                        </div>
                        <div class="summary-stat-item">
                            <div class="summary-stat-label">
                                \${PAGES_SVG}
                                Pages
                            </div>
                            <div class="summary-stat-value">\${data.totals.formatted.pagesSum}</div>
                        </div>
                        <div class="summary-stat-item">
                            <div class="summary-stat-label">
                                \${WORKER_SVG}
                                Workers
                            </div>
                            <div class="summary-stat-value">\${data.totals.formatted.workersSum}</div>
                        </div>
                    </div>
                    <div class="summary-remaining">
                        <div class="summary-stat-label">总剩余额度</div>
                        <div class="summary-stat-value">\${data.totals.formatted.remaining}</div>
                        <div class="progress-percent">\${data.totals.percent}%</div>
                    </div>
                \`;
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
            return \`
                <div class="card">
                    <div class="account-header">
                        <div class="account-name">\${account.accountName}</div>
                        <div class="account-status \${statusClass}">\${statusText}</div>
                    </div>
                    <div class="metric-grid">
                        <div class="metric">
                            <div class="metric-label">
                                \${PAGES_SVG}
                                Pages 请求
                            </div>
                            <div class="metric-value">\${account.formatted.pagesSum}</div>
                            <div class="metric-label">\${account.pagesSum.toLocaleString()} 次</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">
                                \${WORKER_SVG}
                                Workers 请求
                            </div>
                            <div class="metric-value">\${account.formatted.workersSum}</div>
                            <div class="metric-label">\${account.workersSum.toLocaleString()} 次</div>
                        </div>
                    </div>
                    <div class="progress-section">
                        <div class="progress-header">
                            <div class="progress-label">剩余额度</div>
                            <div class="progress-percent">\${account.percent}%</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: \${account.percent}%"></div>
                        </div>
                        <div style="text-align: center; margin-top: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                            \${account.formatted.remaining} / \${account.formatted.total}
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); text-align: center; color: var(--text-secondary); font-size: 0.8rem;">
                        最后更新: \${account.date}
                    </div>
                </div>
            \`;
        }
        
        function createErrorCard(account) {
            return \`
                <div class="card">
                    <div class="account-header">
                        <div class="account-name">\${account.accountName}</div>
                        <div class="account-status status-danger">错误</div>
                    </div>
                    <div class="error" style="margin: 0;">\${account.error}</div>
                </div>
            \`;
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
            document.getElementById('lastUpdate').textContent = \`最后更新: \${now.toLocaleString('zh-CN')}\`;
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            loadData(true);
            setInterval(() => {
                if (!isRefreshing) loadData(true);
            }, 60 * 1000);
        });
    </script>
</body>
</html>`;
