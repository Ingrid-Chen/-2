// 家庭保单管理工具 - 前端应用
class FamilyInsuranceApp {
    constructor() {
        this.apiBaseUrl = '/api';
        this.currentPage = 'dashboard';
        this.init();
    }

    // 初始化应用
    init() {
        this.setupEventListeners();
        this.loadPage('dashboard');
        this.checkServerConnection();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 导航点击事件
        document.getElementById('mainNav').addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.loadPage(page);
                this.setActiveNav(e.target);
            }
        });

        // 通知关闭事件
        document.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification();
        });
    }

    // 设置活动导航项
    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // 加载页面内容
    async loadPage(pageName) {
        this.currentPage = pageName;
        const content = document.getElementById('content');
        
        // 显示加载状态
        content.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>正在加载${this.getPageTitle(pageName)}...</p>
            </div>
        `;

        try {
            // 模拟加载延迟
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 根据页面名称加载不同内容
            switch(pageName) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'members':
                    this.loadMembersPage();
                    break;
                case 'policies':
                    this.loadPoliciesPage();
                    break;
                case 'matching':
                    this.loadMatchingPage();
                    break;
                case 'chat':
                    this.loadChatPage();
                    break;
                default:
                    this.load404Page();
            }
        } catch (error) {
            console.error('页面加载失败:', error);
            this.showNotification('页面加载失败，请稍后重试', 'error');
        }
    }

    // 获取页面标题
    getPageTitle(pageName) {
        const titles = {
            dashboard: '仪表板',
            members: '家庭成员管理',
            policies: '保单管理',
            matching: '问题匹配',
            chat: 'AI助手'
        };
        return titles[pageName] || '页面';
    }

    // 加载仪表板
    loadDashboard() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="dashboard">
                <h2>🏠 家庭保单管理工具</h2>
                
                <!-- 主要功能：问题匹配 -->
                <div class="main-feature">
                    <div class="matching-section">
                        <h3>🔍 问题匹配 - 找到适合的保险保单</h3>
                        <p class="feature-description">描述您遇到的问题，系统将为您匹配相关的保险保单</p>
                        
                        <div class="matching-form">
                            <div class="form-group">
                                <label for="memberSelect">选择家庭成员：</label>
                                <select id="memberSelect" class="form-select">
                                    <option value="">请选择家庭成员...</option>
                                    <option value="all">所有成员</option>
                                    <!-- 动态加载家庭成员选项 -->
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="issueType">问题类型：</label>
                                <select id="issueType" class="form-select">
                                    <option value="">请选择问题类型...</option>
                                    <option value="医疗">🏥 医疗相关</option>
                                    <option value="意外">⚠️ 意外伤害</option>
                                    <option value="财产">🏠 财产损失</option>
                                    <option value="人寿">👤 人寿保险</option>
                                    <option value="旅行">✈️ 旅行相关</option>
                                    <option value="宠物">🐕 宠物相关</option>
                                    <option value="教育">🎓 教育相关</option>
                                    <option value="养老">👴 养老相关</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="issueDescription">问题描述：</label>
                                <textarea id="issueDescription" class="form-textarea" 
                                    placeholder="请详细描述您遇到的问题，例如：孩子在学校摔伤需要住院治疗..." 
                                    rows="4"></textarea>
                            </div>
                            
                            <button id="matchButton" class="match-button">
                                🔍 查找匹配的保单
                            </button>
                        </div>
                        
                        <div id="matchResults" class="match-results hidden">
                            <h4>匹配结果：</h4>
                            <div id="resultsList" class="results-list">
                                <!-- 匹配结果将在这里显示 -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 统计信息卡片 -->
                <div class="stats-section">
                    <div class="stats-grid">
                        <div class="stat-card members-card">
                            <div class="stat-icon">👥</div>
                            <div class="stat-info">
                                <div class="stat-number">-</div>
                                <div class="stat-label">家庭成员</div>
                            </div>
                        </div>
                        <div class="stat-card policies-card">
                            <div class="stat-icon">📋</div>
                            <div class="stat-info">
                                <div class="stat-number">-</div>
                                <div class="stat-label">保单总数</div>
                            </div>
                        </div>
                        <div class="stat-card expiring-card">
                            <div class="stat-icon">⚠️</div>
                            <div class="stat-info">
                                <div class="stat-number">-</div>
                                <div class="stat-label">即将到期</div>
                            </div>
                        </div>
                        <div class="stat-card matches-card">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-info">
                                <div class="stat-number">-</div>
                                <div class="stat-label">今日匹配</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 快速操作 -->
                <div class="quick-actions">
                    <h3>⚡ 快速操作</h3>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="app.loadPage('members')">
                            <span class="btn-icon">👥</span>
                            <span class="btn-text">管理家庭成员</span>
                        </button>
                        <button class="action-btn" onclick="app.loadPage('policies')">
                            <span class="btn-icon">📋</span>
                            <span class="btn-text">管理保单</span>
                        </button>
                        <button class="action-btn" onclick="app.showAddMemberModal()">
                            <span class="btn-icon">➕</span>
                            <span class="btn-text">添加成员</span>
                        </button>
                        <button class="action-btn" onclick="app.showAddPolicyModal()">
                            <span class="btn-icon">📝</span>
                            <span class="btn-text">添加保单</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 设置问题匹配功能的事件监听器
        this.setupMatchingFeature();
    }

    // 加载家庭成员页面
    loadMembersPage() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="members-page">
                <h2>👥 家庭成员管理</h2>
                <p style="color: #666; margin: 1rem 0;">管理您的家庭成员信息，为每个成员分别管理保险保单。</p>
                <div style="text-align: center; margin: 3rem 0; color: #999;">
                    <p>🚧 此功能正在开发中...</p>
                    <p>即将支持添加、编辑和删除家庭成员</p>
                </div>
            </div>
        `;
    }

    // 加载保单管理页面
    loadPoliciesPage() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="policies-page">
                <h2>📋 保单管理</h2>
                <p style="color: #666; margin: 1rem 0;">管理所有家庭成员的保险保单，包括添加、编辑和查看保单详情。</p>
                <div style="text-align: center; margin: 3rem 0; color: #999;">
                    <p>🚧 此功能正在开发中...</p>
                    <p>即将支持保单的完整生命周期管理</p>
                </div>
            </div>
        `;
    }

    // 加载问题匹配页面
    loadMatchingPage() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="matching-page">
                <h2>🔍 问题匹配</h2>
                <p style="color: #666; margin: 1rem 0;">输入您遇到的问题，系统将为您匹配相关的保险保单。</p>
                <div style="text-align: center; margin: 3rem 0; color: #999;">
                    <p>🚧 此功能正在开发中...</p>
                    <p>即将支持智能问题匹配和保单推荐</p>
                </div>
            </div>
        `;
    }

    // 加载AI聊天页面
    async loadChatPage() {
        const content = document.getElementById('content');
        
        // 检查API配置状态
        const configStatus = await this.checkApiConfiguration();
        
        if (!configStatus.is_configured) {
            this.loadApiConfigurationPage();
            return;
        }

        content.innerHTML = `
            <div class="chat-page">
                <div class="chat-container">
                    <div class="chat-sidebar">
                        <div class="sidebar-header">
                            <h3>🤖 AI助手</h3>
                            <button id="newChatBtn" class="new-chat-btn">
                                <span>➕</span>
                                <span>新对话</span>
                            </button>
                        </div>
                        <div class="conversations-list" id="conversationsList">
                            <div class="loading-conversations">
                                <div class="spinner"></div>
                                <p>加载对话中...</p>
                            </div>
                        </div>
                        <div class="sidebar-footer">
                            <button id="configBtn" class="config-btn">
                                <span>⚙️</span>
                                <span>API设置</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-main">
                        <div class="chat-header">
                            <h4 id="chatTitle">选择或创建对话</h4>
                        </div>
                        
                        <div class="chat-messages" id="chatMessages">
                            <div class="welcome-message">
                                <div class="welcome-icon">🤖</div>
                                <h3>欢迎使用AI助手</h3>
                                <p>我可以帮助您解答关于保险保单的问题，提供专业建议。</p>
                                <p>请选择一个对话或创建新对话开始聊天。</p>
                            </div>
                        </div>
                        
                        <div class="chat-input-container" id="chatInputContainer" style="display: none;">
                            <div class="chat-input-wrapper">
                                <textarea id="messageInput" placeholder="输入您的问题..." rows="1"></textarea>
                                <button id="sendBtn" class="send-btn" disabled>
                                    <span>📤</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 初始化聊天功能
        this.initializeChatFeatures();
    }

    // 加载API配置页面
    loadApiConfigurationPage() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="api-config-page">
                <div class="config-container">
                    <div class="config-header">
                        <h2>🔧 API配置</h2>
                        <p>首次使用需要配置AI API信息</p>
                    </div>
                    
                    <div class="config-form">
                        <div class="form-group">
                            <label for="apiUrl">API地址 *</label>
                            <input type="url" id="apiUrl" class="form-input" placeholder="https://api.example.com/v1/chat/completions" required>
                            <small class="form-hint">请输入完整的API端点地址</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="apiKey">API密钥 *</label>
                            <input type="password" id="apiKey" class="form-input" placeholder="sk-..." required>
                            <small class="form-hint">您的API密钥将被安全存储</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="modelName">模型名称 *</label>
                            <input type="text" id="modelName" class="form-input" placeholder="gpt-3.5-turbo" required>
                            <small class="form-hint">例如：gpt-3.5-turbo, gpt-4, claude-3-sonnet</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="publishableKey">Publishable Key</label>
                            <input type="text" id="publishableKey" class="form-input" placeholder="可选">
                            <small class="form-hint">如果需要的话</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="projectUrl">Project URL</label>
                            <input type="url" id="projectUrl" class="form-input" placeholder="https://project.example.com">
                            <small class="form-hint">项目地址（可选）</small>
                        </div>
                        
                        <div class="form-actions">
                            <button id="saveConfigBtn" class="save-config-btn">
                                <span>💾</span>
                                <span>保存配置</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 初始化配置功能
        this.initializeConfigFeatures();
    }

    // 加载404页面
    load404Page() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div style="text-align: center; margin: 3rem 0;">
                <h2>😕 页面未找到</h2>
                <p style="color: #666; margin: 1rem 0;">抱歉，您访问的页面不存在。</p>
                <button onclick="app.loadPage('dashboard')" style="background: #667eea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                    返回首页
                </button>
            </div>
        `;
    }

    // 检查服务器连接
    async checkServerConnection() {
        try {
            const response = await fetch('/health');
            if (response.ok) {
                const data = await response.json();
                console.log('服务器连接正常:', data);
            } else {
                throw new Error('服务器响应异常');
            }
        } catch (error) {
            console.warn('服务器连接检查失败:', error);
            this.showNotification('服务器连接异常，某些功能可能不可用', 'warning');
        }
    }

    // 显示通知
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        
        messageElement.textContent = message;
        notification.className = `notification ${type} show`;
        
        // 3秒后自动隐藏
        setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }

    // 全局错误处理
    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }

    // 设置问题匹配功能
    setupMatchingFeature() {
        const matchButton = document.getElementById('matchButton');
        const memberSelect = document.getElementById('memberSelect');
        const issueType = document.getElementById('issueType');
        const issueDescription = document.getElementById('issueDescription');
        const matchResults = document.getElementById('matchResults');
        const resultsList = document.getElementById('resultsList');

        // 加载家庭成员选项
        this.loadFamilyMembers();

        // 匹配按钮点击事件
        matchButton.addEventListener('click', async () => {
            const selectedMember = memberSelect.value;
            const selectedType = issueType.value;
            const description = issueDescription.value.trim();

            // 验证输入
            if (!description) {
                this.showNotification('请输入问题描述', 'warning');
                return;
            }

            if (!selectedMember) {
                this.showNotification('请选择家庭成员', 'warning');
                return;
            }

            // 显示加载状态
            matchButton.innerHTML = '🔍 正在匹配...';
            matchButton.disabled = true;

            try {
                // 模拟匹配过程（实际会调用API）
                await this.performMatching(selectedMember, selectedType, description);
            } catch (error) {
                console.error('匹配失败:', error);
                this.showNotification('匹配失败，请稍后重试', 'error');
            } finally {
                // 恢复按钮状态
                matchButton.innerHTML = '🔍 查找匹配的保单';
                matchButton.disabled = false;
            }
        });

        // 问题类型选择事件
        issueType.addEventListener('change', (e) => {
            if (e.target.value && !issueDescription.value) {
                // 根据问题类型提供示例描述
                const examples = {
                    '医疗': '例如：孩子发烧需要住院治疗，需要报销医疗费用',
                    '意外': '例如：在家中意外摔伤，需要紧急治疗',
                    '财产': '例如：家中电器因雷击损坏，需要理赔',
                    '人寿': '例如：了解人寿保险的保障范围和理赔流程',
                    '旅行': '例如：出国旅行期间生病，需要医疗救助',
                    '宠物': '例如：宠物狗生病需要治疗，产生医疗费用',
                    '教育': '例如：孩子教育费用支出，查看教育保险保障',
                    '养老': '例如：了解养老保险的保障和给付条件'
                };
                issueDescription.placeholder = examples[e.target.value] || '请详细描述您遇到的问题...';
            }
        });
    }

    // 加载家庭成员选项
    async loadFamilyMembers() {
        try {
            // 模拟API调用（实际会从后端获取）
            const mockMembers = [
                { id: 1, name: '张三', relationship: '户主' },
                { id: 2, name: '李四', relationship: '配偶' },
                { id: 3, name: '张小明', relationship: '子女' }
            ];

            const memberSelect = document.getElementById('memberSelect');
            if (memberSelect) {
                // 清空现有选项（保留默认选项）
                const defaultOptions = memberSelect.querySelectorAll('option[value=""], option[value="all"]');
                memberSelect.innerHTML = '';
                defaultOptions.forEach(option => memberSelect.appendChild(option));

                // 添加家庭成员选项
                mockMembers.forEach(member => {
                    const option = document.createElement('option');
                    option.value = member.id;
                    option.textContent = `${member.name} (${member.relationship})`;
                    memberSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('加载家庭成员失败:', error);
        }
    }

    // 执行问题匹配
    async performMatching(memberId, issueType, description) {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 模拟匹配结果
        const mockResults = [
            {
                id: 1,
                policyNumber: 'LIFE001',
                insuranceCompany: '中国人寿',
                policyType: '人寿保险',
                memberName: '张三',
                relevanceScore: 0.95,
                coverageDetails: '基本人寿保险，保额50万元，涵盖意外身故和疾病身故',
                reason: '该保单涵盖您描述的问题类型，相关性很高'
            },
            {
                id: 2,
                policyNumber: 'HEALTH001',
                insuranceCompany: '平安保险',
                policyType: '医疗保险',
                memberName: '张三',
                relevanceScore: 0.88,
                coverageDetails: '住院医疗保险，年度限额10万元，包含门诊和住院费用',
                reason: '该保单可以覆盖医疗费用，建议优先使用'
            }
        ];

        this.displayMatchResults(mockResults, issueType, description);
    }

    // 显示匹配结果
    displayMatchResults(results, issueType, description) {
        const matchResults = document.getElementById('matchResults');
        const resultsList = document.getElementById('resultsList');

        if (results.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">😔</div>
                    <h4>未找到匹配的保单</h4>
                    <p>根据您的问题描述，暂时没有找到相关的保险保单。</p>
                    <p>建议：</p>
                    <ul>
                        <li>检查是否已录入相关类型的保单</li>
                        <li>尝试使用不同的关键词描述问题</li>
                        <li>考虑购买相应类型的保险</li>
                    </ul>
                </div>
            `;
        } else {
            resultsList.innerHTML = results.map(result => `
                <div class="result-item">
                    <div class="result-header">
                        <div class="result-title">
                            <span class="policy-number">${result.policyNumber}</span>
                            <span class="insurance-company">${result.insuranceCompany}</span>
                        </div>
                        <div class="relevance-score">
                            <span class="score-label">匹配度:</span>
                            <span class="score-value">${Math.round(result.relevanceScore * 100)}%</span>
                        </div>
                    </div>
                    <div class="result-content">
                        <div class="policy-info">
                            <span class="policy-type">${result.policyType}</span>
                            <span class="member-name">👤 ${result.memberName}</span>
                        </div>
                        <div class="coverage-details">
                            <strong>保障范围：</strong>${result.coverageDetails}
                        </div>
                        <div class="match-reason">
                            <strong>匹配原因：</strong>${result.reason}
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="action-btn-small" onclick="app.viewPolicyDetails(${result.id})">
                            查看详情
                        </button>
                        <button class="action-btn-small primary" onclick="app.startClaim(${result.id})">
                            申请理赔
                        </button>
                    </div>
                </div>
            `).join('');
        }

        matchResults.classList.remove('hidden');
        
        // 滚动到结果区域
        matchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        this.showNotification(`找到 ${results.length} 个匹配的保单`, 'success');
    }

    // 查看保单详情
    viewPolicyDetails(policyId) {
        this.showNotification(`查看保单详情功能开发中... (保单ID: ${policyId})`, 'info');
    }

    // 开始理赔流程
    startClaim(policyId) {
        this.showNotification(`理赔申请功能开发中... (保单ID: ${policyId})`, 'info');
    }

    // 显示添加成员模态框
    showAddMemberModal() {
        this.showNotification('添加成员功能开发中...', 'info');
    }

    // 显示添加保单模态框
    showAddPolicyModal() {
        this.showNotification('添加保单功能开发中...', 'info');
    }

    // 检查API配置状态
    async checkApiConfiguration() {
        try {
            const response = await this.apiRequest('/config/status');
            return response.data;
        } catch (error) {
            console.error('检查API配置失败:', error);
            return { is_configured: false };
        }
    }

    // 初始化配置功能
    initializeConfigFeatures() {
        const saveBtn = document.getElementById('saveConfigBtn');
        const apiUrl = document.getElementById('apiUrl');
        const apiKey = document.getElementById('apiKey');
        const modelName = document.getElementById('modelName');
        const publishableKey = document.getElementById('publishableKey');
        const projectUrl = document.getElementById('projectUrl');

        saveBtn.addEventListener('click', async () => {
            // 验证必填字段
            if (!apiUrl.value.trim() || !apiKey.value.trim() || !modelName.value.trim()) {
                this.showNotification('请填写所有必填字段', 'warning');
                return;
            }

            // 验证URL格式
            try {
                new URL(apiUrl.value.trim());
                if (projectUrl.value.trim()) {
                    new URL(projectUrl.value.trim());
                }
            } catch (error) {
                this.showNotification('URL格式不正确', 'error');
                return;
            }

            saveBtn.innerHTML = '<span>💾</span><span>保存中...</span>';
            saveBtn.disabled = true;

            try {
                const configData = {
                    api_url: apiUrl.value.trim(),
                    api_key: apiKey.value.trim(),
                    model_name: modelName.value.trim(),
                    publishable_key: publishableKey.value.trim() || null,
                    project_url: projectUrl.value.trim() || null
                };

                await this.apiRequest('/config', {
                    method: 'POST',
                    body: JSON.stringify(configData)
                });

                this.showNotification('API配置保存成功！', 'success');
                
                // 延迟跳转到聊天页面
                setTimeout(() => {
                    this.loadChatPage();
                }, 1500);

            } catch (error) {
                console.error('保存配置失败:', error);
                this.showNotification('保存配置失败：' + error.message, 'error');
            } finally {
                saveBtn.innerHTML = '<span>💾</span><span>保存配置</span>';
                saveBtn.disabled = false;
            }
        });
    }

    // 初始化聊天功能
    initializeChatFeatures() {
        this.currentConversationId = null;
        this.conversations = [];

        // 绑定事件
        this.bindChatEvents();
        
        // 加载对话列表
        this.loadConversations();
    }

    // 绑定聊天事件
    bindChatEvents() {
        const newChatBtn = document.getElementById('newChatBtn');
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        const configBtn = document.getElementById('configBtn');

        // 新建对话
        newChatBtn.addEventListener('click', () => {
            this.createNewConversation();
        });

        // 发送消息
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        // 输入框事件
        messageInput.addEventListener('input', (e) => {
            this.handleInputChange(e);
        });

        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 配置按钮
        configBtn.addEventListener('click', () => {
            this.loadApiConfigurationPage();
        });
    }

    // 加载对话列表
    async loadConversations() {
        try {
            const response = await this.apiRequest('/chat/conversations');
            this.conversations = response.data;
            this.renderConversations();
        } catch (error) {
            console.error('加载对话列表失败:', error);
            document.getElementById('conversationsList').innerHTML = `
                <div class="error-message">
                    <p>加载对话失败</p>
                    <button onclick="app.loadConversations()" class="retry-btn">重试</button>
                </div>
            `;
        }
    }

    // 渲染对话列表
    renderConversations() {
        const conversationsList = document.getElementById('conversationsList');
        
        if (this.conversations.length === 0) {
            conversationsList.innerHTML = `
                <div class="empty-conversations">
                    <p>暂无对话</p>
                    <p>点击"新对话"开始聊天</p>
                </div>
            `;
            return;
        }

        conversationsList.innerHTML = this.conversations.map(conv => `
            <div class="conversation-item ${conv.id === this.currentConversationId ? 'active' : ''}" 
                 data-id="${conv.id}" onclick="app.selectConversation('${conv.id}')">
                <div class="conversation-title">${conv.title}</div>
                <div class="conversation-time">${this.formatTime(conv.updated_at)}</div>
            </div>
        `).join('');
    }

    // 创建新对话
    async createNewConversation() {
        try {
            const response = await this.apiRequest('/chat/conversations', {
                method: 'POST',
                body: JSON.stringify({ title: '新对话' })
            });

            const newConversation = response.data;
            this.conversations.unshift(newConversation);
            this.selectConversation(newConversation.id);
            this.renderConversations();
            
            this.showNotification('新对话创建成功', 'success');
        } catch (error) {
            console.error('创建对话失败:', error);
            this.showNotification('创建对话失败', 'error');
        }
    }

    // 选择对话
    async selectConversation(conversationId) {
        this.currentConversationId = conversationId;
        
        // 更新UI状态
        this.renderConversations();
        document.getElementById('chatInputContainer').style.display = 'block';
        
        // 加载对话消息
        await this.loadConversationMessages(conversationId);
    }

    // 加载对话消息
    async loadConversationMessages(conversationId) {
        const chatMessages = document.getElementById('chatMessages');
        const chatTitle = document.getElementById('chatTitle');
        
        chatMessages.innerHTML = `
            <div class="loading-messages">
                <div class="spinner"></div>
                <p>加载消息中...</p>
            </div>
        `;

        try {
            const response = await this.apiRequest(`/chat/conversations/${conversationId}/messages`);
            const { conversation, messages } = response.data;
            
            chatTitle.textContent = conversation.title;
            this.renderMessages(messages);
        } catch (error) {
            console.error('加载消息失败:', error);
            chatMessages.innerHTML = `
                <div class="error-message">
                    <p>加载消息失败</p>
                    <button onclick="app.loadConversationMessages('${conversationId}')" class="retry-btn">重试</button>
                </div>
            `;
        }
    }

    // 渲染消息
    renderMessages(messages) {
        const chatMessages = document.getElementById('chatMessages');
        
        if (messages.length === 0) {
            chatMessages.innerHTML = `
                <div class="empty-messages">
                    <div class="empty-icon">💬</div>
                    <p>开始您的第一条消息吧！</p>
                </div>
            `;
            return;
        }

        chatMessages.innerHTML = messages.map(msg => `
            <div class="message ${msg.role}">
                <div class="message-avatar">
                    ${msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessageContent(msg.content)}</div>
                    <div class="message-time">${this.formatTime(msg.created_at)}</div>
                </div>
            </div>
        `).join('');

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 处理输入变化
    handleInputChange(e) {
        const sendBtn = document.getElementById('sendBtn');
        const hasContent = e.target.value.trim().length > 0;
        
        sendBtn.disabled = !hasContent;
        
        // 自动调整高度
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }

    // 发送消息
    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const content = messageInput.value.trim();

        if (!content || !this.currentConversationId) return;

        // 禁用输入
        messageInput.disabled = true;
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span>⏳</span>';

        try {
            const response = await this.apiRequest(`/chat/conversations/${this.currentConversationId}/messages`, {
                method: 'POST',
                body: JSON.stringify({ content })
            });

            // 清空输入框
            messageInput.value = '';
            messageInput.style.height = 'auto';

            // 重新加载消息
            await this.loadConversationMessages(this.currentConversationId);
            
        } catch (error) {
            console.error('发送消息失败:', error);
            this.showNotification('发送消息失败', 'error');
        } finally {
            // 恢复输入状态
            messageInput.disabled = false;
            sendBtn.innerHTML = '<span>📤</span>';
            messageInput.focus();
        }
    }

    // 格式化时间
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
        
        return date.toLocaleDateString();
    }

    // 格式化消息内容
    formatMessageContent(content) {
        // 简单的换行处理
        return content.replace(/\n/g, '<br>');
    }

    // API请求封装
    async apiRequest(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || '请求失败');
            }

            return data;
        } catch (error) {
            console.error('API请求失败:', error);
            throw error;
        }
    }
}

// 初始化应用
const app = new FamilyInsuranceApp();

// 全局错误处理
window.addEventListener('error', (event) => {
    console.error('全局错误:', event.error);
    app.showNotification('应用发生错误，请刷新页面重试', 'error');
});

// 全局未处理的Promise拒绝
window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的Promise拒绝:', event.reason);
    app.showNotification('网络请求失败，请检查网络连接', 'error');
});