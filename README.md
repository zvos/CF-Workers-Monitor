[![Deploy with Vercel](https://img.shields.io/badge/status-active-success)
[![Deploy with Vercel](https://img.shields.io/badge/license-MIT-blue)

Cloudflare Workers/Pages 用量监控

一个基于 Cloudflare Workers 开发的用量监控工具，可以实时监控多个 Cloudflare 账户的 Workers 和 Pages 服务请求使用情况。


![img](./img.png)

## ✨ 功能特点

**·** 🎯 多账户支持 - 同时监控多个 Cloudflare 账户

**·** 📊 实时数据 - 显示 Workers 和 Pages 的请求量和使用情况

**·** 🎨 美观界面 - 现代化、响应式的仪表板界面

**·** 🌙 主题切换 - 支持亮色/暗色主题

**·** ⚡ 快速响应 - 使用并发查询优化性能

**·** 🔄 自动刷新 - 每5分钟自动更新数据

**·** 📱 移动友好 - 完美适配各种屏幕尺寸


## 🚀 快速开始

**前提条件**

**·** Cloudflare 账户

**·** Workers 权限

**·** 需要监控的账户的 API 密钥

**部署步骤**

**1.** 克隆或下载项目
   ```bash
   git clone <repository-url>
   cd workers-usage-monitor
   ```
**2.** 配置环境变量
   在 Cloudflare Workers 控制台中设置 EDGE 环境变量，格式如下：
   ```json
   [
     {
       "name": "账户1",
       "email": "your-email1@example.com",
       "key": "your-api-key1",
       "accountId": "your-account-id1",
       "total": 100000
     },
     {
       "name": "账户2", 
       "email": "your-email2@example.com",
       "key": "your-api-key2",
       "accountId": "your-account-id2",
       "total": 100000
     }
   多帐号以此类推……
   ]
   ```
**3.** 部署 Worker
   将 worker.js 文件内容复制到 Cloudflare Workers 编辑器中，或使用 Wrangler CLI 部署：
   ```bash
   wrangler deploy
   ```
**4.** 访问监控面板
   打开 Worker 的 URL 即可访问监控面板。

## ⚙️ 配置说明

环境变量
| 变量名 | 类型 | 必填 |
|--|--|--|
|EDGE|密钥|必须|

**API 密钥权限**

确保 API 密钥具有以下权限：

**·** Account Analytics: Read

**·** Account Settings: Read

## 🎯 使用方法

**基本操作**

**1.** 查看总览：首页显示所有账户的总览统计

**2.** 切换账户：点击"查看账号"下拉菜单选择特定账户

**3.** 刷新数据：点击"刷新数据"按钮手动更新

**4.** 主题切换：点击主题切换按钮切换亮色/暗色模式

**API 接口**

**·** GET / - 返回监控面板 HTML 页面

**·** GET /?all=true - 返回所有账户的 JSON 数据

**·** GET /?accountIndex=N - 返回指定账户的 JSON 数据

**·** GET /?optimized=true - 返回优化后的缓存数据

## 📊 数据说明

监控指标

**·** Pages 请求数：Cloudflare Pages 函数的调用次数

**·** Workers 请求数：Cloudflare Workers 的调用次数

**·** 剩余额度：总配额减去已使用量

**·** 使用百分比：剩余额度占总配额的百分比

**状态指示**

**·** 🟢 充足：剩余额度 ≥ 70%

**·** 🟡 警告：剩余额度 30% - 70%

**·** 🔴 不足：剩余额度 < 30%

## 🔧 技术细节

**架构设计**

```
用户请求 → Cloudflare Worker → Cloudflare GraphQL API → 数据处理 → 响应返回
```

**性能优化**

**·** 并发查询：同时查询多个账户，大幅减少等待时间

**·** 智能缓存：2分钟缓存机制，减少 API 调用

**·** 重试机制：自动重试失败的请求

**·** 错误隔离：单个账户失败不影响其他账户

## 技术栈

**·** 运行时：Cloudflare Workers

**·** 前端：原生 HTML/CSS/JavaScript

**·** API：Cloudflare GraphQL API

**·** 部署：Cloudflare 边缘网络

## 🛠️ 开发指南

本地开发

1. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```
2. 登录 Cloudflare：
   ```bash
   wrangler login
   ```
3. 本地测试：
   ```bash
   wrangler dev
   ```

自定义配置

修改代码中的常量来调整行为：

```javascript
// 调整并发限制
const CONCURRENT_LIMIT = 5;

// 调整缓存时间
const ttl = 2 * 60 * 1000; // 2分钟

// 调整重试策略
const maxRetries = 2;
const retryDelay = 1000;
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

**1.** Fork 本项目

**2.** 创建功能分支 (git checkout -b feature/AmazingFeature)

**3.** 提交更改 (git commit -m 'Add some AmazingFeature')

**4.** 推送到分支 (git push origin feature/AmazingFeature)

**5.** 开启 Pull Request

## 📝 更新日志

**v1.0.0**

**·** ✅ 多账户监控支持

**·** ✅ 实时数据展示

**·** ✅ 主题切换功能

**·** ✅ 并发查询优化

**·** ✅ 自动刷新机制

## ⚠️ 注意事项

**1.** API 限制：Cloudflare API 有速率限制，请合理配置刷新频率

**2.** 权限安全：妥善保管 API 密钥，使用最小权限原

**3.** 数据延迟：监控数据可能有几分钟的延迟

**4.** 配额计算：确保配置的总配额与实际账户配额一致

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 LICENSE 文件了解详情。

## 🙏 致谢

**·** Cloudflare Workers
**·** Cloudflare GraphQL API
**·** 所有贡献者和用户

---

有问题？ 请提交 Issue 或联系维护者。

觉得有用？ 请给个 ⭐️ 支持一下！
