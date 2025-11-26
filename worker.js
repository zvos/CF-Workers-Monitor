const pageIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQwSURBVGiB7ZlPaFxVFMZ/Z9pJShLbTqku1J0pGFs0WlshKFZwpQtxYaGZMVpsmwqtf8C/BTFVEFFRGsWqKUbNvCQNceHCjbioSqMWRkpqQGmhC4sLUYJto21m5h0XGevw8v7cd+cmVuy3erz73fOd771733n3XriE/zF0jBXqsU+HuMl17IzrgLEo8wrwCBlK6vGFy9CLZkSH2ARsr7vV6jL+ohjRd2khwwAgdbdLLjUW54208SLQHrjr1MjSuEYtshxhjVXkKj9IDzPqsRF4NIRRAtBhrkfJJsZTjkuB01HNEtWgg6ykic+ADclZz8NRzrKRHEKFEsq6QPssOZYDMM1ZEh7ohZgV7pQH+C2sMXpoNfM+dibKwFbppUyZPSEmAKbkLs4zTQdmJgA6yTIQ1RgXJFd3PQPMGskpb0qBozpKB1WeiWCVatx2hOmEiE3884XLRZFMn8YuyfOBIRftI0OFAwjN4YQ5I1JgHBiPjeXxIDCYpGlqBB1mLcpBoB/hR3z2k2FPbaL2oeyQAocBaOdxhK7IYMJ3prqmMDYC3AisRbkNYRVCBz63IFwGXAd0Aod1lGuo8kJMnDKzTDaSdBjMjWzBw+Mk55mkwjnamGAV3/ITS2jhIM1MqCIMMwC0xESakq2cazjzAIyNiKBQGzpz+LLu+isAHaYXuCMhlNNC+DecVXYd4UqUlw2oF7cRfN4GVhowL14jWqQbuMeAWiHLMReaQTRsRIdZjfCGEVmYks382ahmGNJ8fsPh049whSF7tXqMJXCmOc7D0oefJo2GjOgId+OzxbwDVwH3JfLamQA+TJOL9dDSMVbg845t/1gIz6tG/5mHwX6OVHgVuNq6fzw+rtUtY1gZ0SE2oWyz6WuAk1TpS9sptZGI9bcrKLBDephJ2zH9Gwlff7uB8p7k+dymayojtQl4r42QAU7RxNO2nVMZEUFR9tqKJWCXbOZ3287p68gJhlhDFzHLTgCErlrdSIYyIgU+SZ1LHVIbqVXc3iSeekyCkZFf8XksbR5BLMgGnQ6yDLjWkL5bevilUc2F2WnM0glGm26fSp5RF5ILtWW63oBzGtjpSnBhjIiBEeUJKXDKleS/80aEQ+Q54FLQuZHaRO+IofxBle1pfwqT4P6NLOMG4ia68JzczwnXsu6NaOywOsJS9jnXxLwgvqUer8cy5rZMx4meH7NUeUjyVLXIXoTdhtpNJqQ4I/W75K0knfnJheESZeQl6eF79egEnsWkzsTnFJCPQMqDngo52mpSZ5if5DGy3Mzl+PzMN5jVmSBiD3piF0fGR29CWbqZ1CIbEI4EWn2EW6Wbr/UjWlli/OsSSMby6M1Kq8hOhP2B269Jnidd6oTB7VdrfkW3Wn/bwPXnt96I9frbBq6NnKm7HrBdf9vAqRHJczs+64F+sjzlMvYl/NfwF38bF3/OBysWAAAAAElFTkSuQmCC'
const workerIcon = 'data:image/png;base64,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'
const accountIcon = 'data:image/png;base64,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'
const HTML_PAGE = `
<!DOCTYPE html>
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
            --border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dark-theme {
            --bg-primary: rgba(0, 0, 0, 0.2);
            --bg-secondary: rgba(0, 0, 0, 0.3);
            --text-primary: #fff;
            --text-secondary: #ccc;
            --card-bg: rgba(30, 30, 30, 0.9);
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            --border: 1px solid rgba(255, 255, 255, 0.1);
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #9FE2BF;
            min-height: 100vh;
            padding: 20px;
            transition: background 0.3s ease;
        }
        body.dark-theme {
            background: #000000;
        }
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            filter: blur(10px);
            z-index: -1;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
            align-items: center;
        }
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            background: transparent;
            backdrop-filter: none;
            color: white;
            border: none;
        }
        .btn:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: none;
        }
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
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
            min-width: 200px;
            box-shadow: var(--shadow);
            z-index: 1000;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 5px;
        }
        .dropdown-content.show {
            display: block;
        }
        .dropdown-content a {
            color: var(--text-primary);
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
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
            background: rgba(0, 0, 0, 0.1);
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
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .summary-metric {
            text-align: center;
            padding: 20px;
            background: var(--bg-primary);
            border-radius: 10px;
            border: var(--border);
        }
        .summary-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text-primary);
            margin: 10px 0;
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
            color: rgba(255, 255, 255, 0.8);
            margin-top: 20px;
            font-size: 0.9rem;
        }
        .theme-toggle {
            position: relative;
            width: 60px;
            height: 30px;
            background: var(--bg-primary);
            border-radius: 15px;
            border: var(--border);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .theme-toggle::before {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s ease;
        }
        .dark-theme .theme-toggle::before {
            transform: translateX(30px);
        }
        .custom-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            vertical-align: middle;
            filter: invert(0.8);
            object-fit: contain;
        }
        .dark-theme .custom-icon {
            filter: invert(0.2);
        }
        .account-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            vertical-align: middle;
            filter: invert(0.8);
            object-fit: contain;
        }
        .dark-theme .account-icon {
            filter: invert(0.2);
        }
        .refresh-progress {
            margin: 10px 0;
            text-align: center;
            color: white;
        }
        .progress-text {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        .progress-bar-container {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-bar-inner {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            transition: width 0.3s ease;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
            .metric-grid {
                grid-template-columns: 1fr;
            }
            .header h1 {
                font-size: 2rem;
            }
            .controls {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body class="light-theme">
    <div class="container">
        <div class="header">
            <h1>Workers/Pages 用量监控</h1>
            <p>实时监控 Workers 和 Pages 的请求使用情况</p>
        </div>
        <div class="controls">
            <button class="btn" id="refreshBtn" onclick="loadData(true)">
                刷新数据
            </button>
            <div class="dropdown">
                <button class="btn" id="accountDropdownBtn">
                    查看账号
                    <span style="margin-left: 0px;"></span>
                </button>
                <div class="dropdown-content" id="accountDropdown">
                </div>
            </div>
            <div class="theme-toggle" id="themeToggle"></div>
        </div>

        <div id="refreshProgress" class="refresh-progress" style="display: none;">
            <div class="progress-text">正在刷新数据: <span id="progressText">0%</span></div>
            <div class="progress-bar-container">
                <div class="progress-bar-inner" id="progressBar" style="width: 0%"></div>
            </div>
        </div>
        <div id="loading" class="loading">
            <p>正在加载数据...</p>
        </div>
        <div id="error" class="error" style="display: none;"></div>
        <div id="summary" class="summary-card" style="display: none;">
            <h2>总览统计</h2>
            <div class="summary-grid" id="summaryGrid"></div>
        </div>
        <div id="dashboard" class="dashboard" style="display: none;"></div>
        <div class="last-update" id="lastUpdate"></div>
    </div>
    <script>
        const WORKER_URL = window.location.origin;
        let ACCOUNTS_DATA = [];
        let dropdownOpen = false;
        let isRefreshing = false;
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
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
        accountDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        function updateProgress(percentage, text) {
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
            if (progressText) {
                progressText.textContent = text;
            }
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
            if (showAll) {
                showRefreshProgress();
            }
            try {
                const url = showAll ? \`\${WORKER_URL}?all=true&optimized=true\` : \`\${WORKER_URL}?accountIndex=0\`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(\`请求失败: \${response.status}\`);
                }
                const data = await response.json();
                ACCOUNTS_DATA = data.accounts || [data];
                updateAccountDropdown();
                displayData(data, showAll);
            } catch (error) {
                showError('加载数据失败: ' + error.message);
            } finally {
                hideLoading();
                if (showAll) {
                    hideRefreshProgress();
                }
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
                if (!response.ok) {
                    throw new Error(\`请求失败: \${response.status}\`);
                }
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
            const summaryGrid = document.getElementById('summaryGrid');
            dashboard.innerHTML = '';
            summaryGrid.innerHTML = '';
            if (showAll && data.accounts) {
                summary.style.display = 'block';
                summaryGrid.innerHTML = \`
                    <div class="summary-metric">
                        <div class="metric-label">
                            <img src="${accountIcon}" class="account-icon" />
                            Account 总数
                        </div>
                        <div class="summary-value">\${data.accounts.length}</div>
                    </div>
                    <div class="summary-metric">
                        <div class="metric-label">
                            <img src="${pageIcon}" class="custom-icon" />
                            Pages 请求
                        </div>
                        <div class="summary-value">\${data.totals.formatted.pagesSum}</div>
                    </div>
                    <div class="summary-metric">
                        <div class="metric-label">
                            <img src="${workerIcon}" class="custom-icon" />
                            Workers 请求
                        </div>
                        <div class="summary-value">\${data.totals.formatted.workersSum}</div>
                    </div>
                    <div class="summary-metric">
                        <div class="metric-label">总剩余额度</div>
                        <div class="summary-value">\${data.totals.formatted.remaining}</div>
                        <div class="progress-percent">\${data.totals.percent}%</div>
                    </div>
                \`;
                data.accounts.forEach(account => {
                    if (account.error) {
                        dashboard.innerHTML += createErrorCard(account);
                    } else {
                        dashboard.innerHTML += createAccountCard(account);
                    }
                });
            } else {
                summary.style.display = 'none';
                dashboard.innerHTML = createAccountCard(data);
            }
            dashboard.style.display = 'grid';
            updateLastUpdate();
        }
        function displaySingleAccount(account) {
            const dashboard = document.getElementById('dashboard');
            const summary = document.getElementById('summary');
            summary.style.display = 'none';
            dashboard.innerHTML = '';
            if (account.error) {
                dashboard.innerHTML = createErrorCard(account);
            } else {
                dashboard.innerHTML = createAccountCard(account);
            }
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
                                <img src="${pageIcon}" class="custom-icon" />
                                Pages 请求
                            </div>
                            <div class="metric-value">\${account.formatted.pagesSum}</div>
                            <div class="metric-label">\${account.pagesSum.toLocaleString()} 次</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">
                                <img src="${workerIcon}" class="custom-icon" />
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
                    <div class="error" style="margin: 0;">
                        \${account.error}
                    </div>
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
        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }
        function showError(message) {
            const errorEl = document.getElementById('error');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
        function hideError() {
            document.getElementById('error').style.display = 'none';
        }
        function updateLastUpdate() {
            const now = new Date();
            document.getElementById('lastUpdate').textContent = 
                \`最后更新: \${now.toLocaleString('zh-CN')}\`;
        }
        document.addEventListener('DOMContentLoaded', function() {
            loadData(true);
            setInterval(() => {
                if (!isRefreshing) {
                    loadData(true);
                }
            }, 1 * 60 * 1000);
        });
    </script>
</body>
</html>
`;
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
const cache = {
    data: null,
    lastUpdated: 0,
    ttl: 1 * 60 * 1000
};
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
            if (response.status >= 500) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
    }
}
async function handleRequest(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }
    if (url.searchParams.toString() !== '') {
        return handleAPIRequest(request, env);
    }
    return new Response(HTML_PAGE, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            ...corsHeaders
        }
    });
}
async function handleAPIRequest(request, env) {
    try {
        const url = new URL(request.url);
        const isOptimized = url.searchParams.get('optimized') === 'true';
        const now = Date.now();
        if (isOptimized && cache.data && (now - cache.lastUpdated) < cache.ttl) {
            return jsonResponse(cache.data);
        }
        let EDGE;
        try {
            EDGE = JSON.parse(env.EDGE || '[]');
        } catch (e) {
            return jsonResponse({ error: '环境变量 EDGE 格式错误' }, 500);
        }
        if (EDGE.length === 0) {
            return jsonResponse({ error: '没有配置账户信息' }, 400);
        }
        const accountIndex = parseInt(url.searchParams.get('accountIndex')) || 0;
        const getAllAccounts = url.searchParams.get('all') === 'true';

        let result;
        if (getAllAccounts) {
            result = await getAllAccountsDataOptimized(EDGE);
            if (isOptimized) {
                cache.data = result;
                cache.lastUpdated = now;
            }
        } else {
            if (accountIndex >= EDGE.length) {
                return jsonResponse({ error: '账户索引超出范围' }, 400);
            }
            result = await getAccountData(EDGE[accountIndex], accountIndex);
        }
        return jsonResponse(result);
    } catch (error) {
        console.error('Error:', error);
        return jsonResponse({ error: error.message }, 500);
    }
}
async function getAccountData(account, accountIndex) {
    const { email, key, accountId, total = 100000 } = account;
    
    if (!email || !key || !accountId) {
        throw new Error(`账户 ${accountIndex} 缺少必要配置`);
    }
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const startDate = now.toISOString();
    const endDate = new Date().toISOString();
    const { pagesSum = 0, workersSum = 0 } = await getSum(email, key, accountId, startDate, endDate);
    const remaining = total - pagesSum - workersSum;
    const percent = (remaining / total) * 100;
    return {
        accountIndex,
        accountName: account.name || `Account ${accountIndex}`,
        pagesSum,
        workersSum,
        total,
        remaining,
        percent: Math.round(percent),
        date: new Date().toISOString().split('T')[0],
        formatted: {
            pagesSum: formatNumber(pagesSum),
            workersSum: formatNumber(workersSum),
            remaining: remaining.toLocaleString(),
            total: formatNumber(total)
        }
    };
}
async function getAllAccountsDataOptimized(accounts) {
    const CONCURRENT_LIMIT = 6;
    const results = [];
    const accountPromises = accounts.map((account, index) => 
        getAccountDataWithRetry(account, index)
    );
    for (let i = 0; i < accountPromises.length; i += CONCURRENT_LIMIT) {
        const batch = accountPromises.slice(i, i + CONCURRENT_LIMIT);
        const batchResults = await Promise.allSettled(batch);
        batchResults.forEach((result, batchIndex) => {
            const accountIndex = i + batchIndex;
            if (result.status === 'fulfilled') {
                results.push(result.value);
            } else {
                results.push({
                    accountIndex,
                    accountName: accounts[accountIndex]?.name || `Account ${accountIndex}`,
                    error: result.reason.message,
                    pagesSum: 0,
                    workersSum: 0,
                    total: accounts[accountIndex]?.total || 100000,
                    remaining: 0,
                    percent: 0
                });
            }
        });
        if (i + CONCURRENT_LIMIT < accountPromises.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    const totals = results.reduce((acc, curr) => {
        if (!curr.error) {
            acc.pagesSum += curr.pagesSum;
            acc.workersSum += curr.workersSum;
            acc.total += curr.total;
            acc.remaining += curr.remaining;
        }
        return acc;
    }, { pagesSum: 0, workersSum: 0, total: 0, remaining: 0 });

    const overallPercent = totals.total > 0 ? (totals.remaining / totals.total) * 100 : 0;
    return {
        accounts: results,
        totals: {
            ...totals,
            percent: Math.round(overallPercent),
            formatted: {
                pagesSum: formatNumber(totals.pagesSum),
                workersSum: formatNumber(totals.workersSum),
                remaining: totals.remaining.toLocaleString(),
                total: formatNumber(totals.total)
            }
        },
        timestamp: new Date().toISOString()
    };
}
async function getAccountDataWithRetry(account, accountIndex, maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await getAccountData(account, accountIndex);
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}
async function getSum(email, key, accountId, startDate, endDate) {
    const query = {
        query: `query getBillingMetrics($accountId: string!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {
      viewer {
        accounts(filter: {accountTag: $accountId}) {
          pagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) {
            sum {
              requests
            }
          }
          workersInvocationsAdaptive(limit: 10000, filter: $filter) {
            sum {
              requests
            }
          }
        }
      }
    }`,
        variables: {
            accountId,
            filter: { datetime_geq: startDate, datetime_leq: endDate }
        },
    };
    const response = await fetchWithRetry('https://api.cloudflare.com/client/v4/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-EMAIL': email,
            'X-AUTH-KEY': key,
        },
        body: JSON.stringify(query),
    }, 2, 1000);
    if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.errors) {
        throw new Error(`GraphQL 错误: ${JSON.stringify(data.errors)}`);
    }
    const accounts = data?.data?.viewer?.accounts;
    if (!accounts || accounts.length === 0) {
        throw new Error('未找到账户数据');
    }
    const accountData = accounts[0];
    const pagesGroups = accountData.pagesFunctionsInvocationsAdaptiveGroups || [];
    const workersData = accountData.workersInvocationsAdaptive || [];
    const pagesSum = pagesGroups.reduce((sum, group) => sum + (group?.sum?.requests || 0), 0);
    const workersSum = workersData.reduce((sum, item) => sum + (item?.sum?.requests || 0), 0);
    return { pagesSum, workersSum };
}
function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    }
    const suffixes = ['', 'k', 'm', 'b', 't'];
    let suffixIndex = 0;
    let formattedNum = num;
    while (formattedNum >= 1000 && suffixIndex < suffixes.length - 1) {
        formattedNum /= 1000;
        suffixIndex++;
    }
    return formattedNum.toFixed(1) + suffixes[suffixIndex];
}
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data, null, 2), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    });
}
export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env);
    }
};