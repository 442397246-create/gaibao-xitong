window.NavigationTemplate = {
    sidebar: function(currentPage) {
        return `
            <aside id="sidebar">
                <div class="logo">
                    <div class="logo-icon"><i class="fa fa-cubes"></i></div>
                    <div class="logo-text">
                        <h2>分包管理</h2>
                        <p class="user-role" id="userRole"></p>
                    </div>
                </div>
                <nav>
                    <div class="menu-group">
                        <div class="menu-group-title">游戏管理</div>
                        <a href="新增游戏.html" class="menu-item ${currentPage === '新增游戏.html' ? 'active' : ''}"><i class="fa fa-plus-square"></i><span>新增游戏</span></a>
                        <a href="母包列表.html" class="menu-item ${currentPage === '母包列表.html' ? 'active' : ''}"><i class="fa fa-gamepad"></i><span>母包列表</span></a>
                        <a href="分包列表.html" class="menu-item ${currentPage === '分包列表.html' ? 'active' : ''}"><i class="fa fa-list-alt"></i><span>分包列表</span></a>
                    </div>
                    <div class="menu-group">
                        <div class="menu-group-title">改包系统</div>
                        <a href="新建改包.html" class="menu-item ${currentPage === '新建改包.html' ? 'active' : ''}"><i class="fa fa-plus-square"></i><span>新建改包</span></a>
                        <a href="改包任务列表.html" class="menu-item ${currentPage === '改包任务列表.html' ? 'active' : ''}"><i class="fa fa-pencil-square-o"></i><span>任务列表</span></a>
                    </div>
                    <div class="menu-group">
                        <div class="menu-group-title">渠道管理</div>
                        <a href="渠道列表.html" class="menu-item ${currentPage === '渠道列表.html' ? 'active' : ''}"><i class="fa fa-sitemap"></i><span>渠道列表</span></a>
                        <a href="渠道分包资源列表.html" class="menu-item ${currentPage === '渠道分包资源列表.html' ? 'active' : ''}"><i class="fa fa-folder-open"></i><span>分包资源列表</span></a>
                        <a href="签名列表.html" class="menu-item ${currentPage === '签名列表.html' ? 'active' : ''}"><i class="fa fa-shield"></i><span>签名列表</span></a>
                    </div>
                    <div class="menu-group">
                        <div class="menu-group-title">系统管理</div>
                        <a href="用户管理.html" class="menu-item ${currentPage === '用户管理.html' ? 'active' : ''}"><i class="fa fa-users"></i><span>用户管理</span></a>
                        <a href="岗位管理.html" class="menu-item ${currentPage === '岗位管理.html' ? 'active' : ''}"><i class="fa fa-user-circle"></i><span>岗位管理</span></a>
                        <a href="平台管理.html" class="menu-item ${currentPage === '平台管理.html' ? 'active' : ''}"><i class="fa fa-server"></i><span>平台管理</span></a>
                    </div>
                </nav>
            </aside>
        `;
    },
    header: function(pageTitle) {
        return `
            <header class="header">
                <div class="header-left">
                    <button id="toggleSidebar" class="toggle-btn"><i class="fa fa-bars"></i></button>
                </div>
                <div class="header-middle">
                    <div class="tabs-scroll">
                        <div class="tabs-list" id="tabsList"></div>
                    </div>
                </div>
                <div class="header-right">
                    <div class="header-actions">
                        <button class="tab-action-btn" id="closeAllTabs" title="关闭全部"><i class="fa fa-times-circle"></i></button>
                        <button class="tab-action-btn" id="closeOtherTabs" title="关闭其他"><i class="fa fa-ban"></i></button>
                    </div>
                    <div class="user-dropdown">
                        <div class="user-info" id="userInfo">
                            <div class="user-avatar" id="userAvatar">管</div>
                            <div class="user-name" id="userName">管理员</div>
                        </div>
                        <div class="dropdown-menu" id="dropdownMenu">
                            <div class="dropdown-item" onclick="openProfileModal()">
                                <i class="fa fa-user"></i> 修改个人资料
                            </div>
                            <div class="dropdown-item" onclick="openChangePasswordModal()">
                                <i class="fa fa-key"></i> 修改密码
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" onclick="openLogoutModal()">
                                <i class="fa fa-sign-out"></i> 退出登录
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    },
    styles: function() {
        return `
            #mainPage { display: flex; height: 100vh; opacity: 0; transition: opacity 0.2s ease-out; visibility: hidden; }
            #mainPage.nav-ready { opacity: 1; visibility: visible; }
            #sidebar { width: 240px; background: white; border-right: 1px solid var(--gray-200); flex-shrink: 0; transition: all 0.3s; }
            #sidebar.collapsed { width: 64px; }
            .logo { padding: 20px 16px; border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 12px; }
            .logo-icon { width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), #4080FF); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
            .logo-icon i { color: white; font-size: 20px; }
            .logo-text h2 { font-size: 18px; font-weight: 600; color: var(--gray-900); }
            .logo-text p { font-size: 12px; color: var(--gray-600); margin-top: 2px; }
            #sidebar.collapsed .logo-text { display: none; }
            nav { padding: 12px 0; }
            .menu-group { margin-bottom: 16px; }
            .menu-group-title { font-size: 12px; color: var(--gray-600); padding: 0 16px 8px; text-transform: uppercase; }
            #sidebar.collapsed .menu-group-title { display: none; }
            .menu-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: var(--gray-900); text-decoration: none; font-size: 14px; transition: all 0.2s; }
            .menu-item:hover, .menu-item.active { background: rgba(22, 93, 255, 0.1); color: var(--primary); }
            .menu-item i { font-size: 16px; width: 20px; text-align: center; }
            #sidebar.collapsed .menu-item span { display: none; }
            
            .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
            .header { 
                height: 56px; 
                background: white; 
                border-bottom: 1px solid var(--gray-200); 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                padding: 0 16px 0 0; 
                flex-shrink: 0; 
                gap: 16px;
            }
            .header-left {
                width: auto;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-left: 8px;
            }
            .header-middle {
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                overflow: hidden;
            }
            .header-right { 
                display: flex; 
                align-items: center; 
                gap: 16px;
                flex-shrink: 0;
            }
            .header-actions {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            .toggle-btn { 
                background: none; 
                border: none; 
                font-size: 20px; 
                cursor: pointer; 
                color: var(--gray-600); 
                padding: 8px; 
                border-radius: 8px; 
                transition: all 0.2s; 
                line-height: 1; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .toggle-btn:hover { background: var(--gray-100); }
            .tabs-scroll {
                flex: 1;
                overflow-x: auto;
                overflow-y: hidden;
                scrollbar-width: none;
                height: 100%;
            }
            .tabs-scroll::-webkit-scrollbar {
                display: none;
            }
            .tabs-list {
                display: flex;
                gap: 24px;
                min-width: max-content;
                height: 100%;
                align-items: center;
                padding: 0 8px;
            }
            .tab-item {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 4px;
                height: auto;
                background: transparent;
                border: none;
                border-bottom: 2px solid transparent;
                font-size: 14px;
                color: var(--gray-600);
                cursor: pointer;
                transition: all 0.2s;
                user-select: none;
                line-height: 1;
                margin-bottom: -1px;
            }
            .tab-item:hover {
                color: var(--primary);
            }
            .tab-item.active {
                color: var(--primary);
                border-bottom-color: var(--primary);
            }
            .tab-close {
                width: 16px;
                height: 16px;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                opacity: 0.6;
                transition: all 0.2s;
                line-height: 1;
            }
            .tab-close:hover {
                background: var(--danger);
                color: white;
                opacity: 1;
            }
            .tab-action-btn {
                width: 28px;
                height: 28px;
                border: none;
                background: none;
                border-radius: 6px;
                color: var(--gray-600);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .tab-action-btn:hover {
                background: var(--gray-100);
                color: var(--primary);
            }
            
            .user-dropdown { position: relative; }
            .user-info { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
            .user-info:hover { background: var(--gray-100); }
            .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px; }
            .user-name { font-size: 14px; font-weight: 500; color: var(--gray-900); }
            .dropdown-menu { position: absolute; top: calc(100% + 8px); right: 0; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); min-width: 200px; z-index: 100; display: none; animation: fadeInDown 0.2s ease; }
            .dropdown-menu.show { display: block; }
            @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: var(--gray-900); text-decoration: none; font-size: 14px; transition: all 0.2s; cursor: pointer; }
            .dropdown-item:first-child { border-radius: 12px 12px 0 0; }
            .dropdown-item:last-child { border-radius: 0 0 12px 12px; color: var(--danger); }
            .dropdown-item:hover { background: var(--gray-100); }
            .dropdown-item i { width: 18px; font-size: 16px; }
            .dropdown-divider { height: 1px; background: var(--gray-200); margin: 4px 0; }
            
            .modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center; }
            .modal-overlay.show { display: flex; }
            .modal { background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: modalIn 0.25s ease; }
            @keyframes modalIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--gray-200); }
            .modal-title { font-size: 16px; font-weight: 600; }
            .modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--gray-600); padding: 0 4px; }
            .modal-close:hover { color: var(--gray-900); }
            .modal-body { padding: 24px; }
            .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--gray-200); }
            .form-group { margin-bottom: 16px; }
            .form-group:last-child { margin-bottom: 0; }
            .form-label { display: block; font-size: 14px; font-weight: 500; color: var(--gray-900); margin-bottom: 6px; }
            .form-input { width: 100%; height: 40px; padding: 0 12px; border: 1px solid var(--gray-200); border-radius: 8px; font-size: 14px; }
            .form-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(22,93,255,0.1); }
            .required { color: var(--danger); }
            .confirm-icon { text-align: center; font-size: 48px; margin-bottom: 16px; }
            .confirm-message { text-align: center; font-size: 16px; color: var(--gray-900); }
        `;
    },
    commonModals: function() {
        return `
            <div class="modal-overlay" id="profileModal">
                <div class="modal" style="width: 460px;">
                    <div class="modal-header">
                        <div class="modal-title">修改个人资料</div>
                        <button class="modal-close" onclick="closeProfileModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">昵称</label>
                            <input type="text" id="profileNickname" class="form-input" placeholder="请输入昵称">
                        </div>
                        <div class="form-group">
                            <label class="form-label">真实姓名</label>
                            <input type="text" id="profileRealName" class="form-input" placeholder="请输入真实姓名">
                        </div>
                        <div class="form-group">
                            <label class="form-label">手机号</label>
                            <input type="text" id="profilePhone" class="form-input" placeholder="请输入手机号">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" onclick="closeProfileModal()">取消</button>
                        <button class="btn btn-primary" onclick="saveProfile()">保存</button>
                    </div>
                </div>
            </div>
            
            <div class="modal-overlay" id="changePasswordModal">
                <div class="modal" style="width: 460px;">
                    <div class="modal-header">
                        <div class="modal-title">修改密码</div>
                        <button class="modal-close" onclick="closeChangePasswordModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">原密码 <span class="required">*</span></label>
                            <input type="password" id="oldPassword" class="form-input" placeholder="请输入原密码">
                        </div>
                        <div class="form-group">
                            <label class="form-label">新密码 <span class="required">*</span></label>
                            <input type="password" id="newPassword" class="form-input" placeholder="请输入新密码">
                        </div>
                        <div class="form-group">
                            <label class="form-label">确认新密码 <span class="required">*</span></label>
                            <input type="password" id="confirmPassword" class="form-input" placeholder="请再次输入新密码">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" onclick="closeChangePasswordModal()">取消</button>
                        <button class="btn btn-primary" onclick="changePassword()">保存</button>
                    </div>
                </div>
            </div>
            
            <div class="modal-overlay" id="logoutModal">
                <div class="modal" style="width: 420px;">
                    <div class="modal-header">
                        <div class="modal-title">退出登录</div>
                        <button class="modal-close" onclick="closeLogoutModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="confirm-icon" style="color: var(--warning);"><i class="fa fa-sign-out"></i></div>
                        <div class="confirm-message">确定要退出登录吗？</div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" onclick="closeLogoutModal()">取消</button>
                        <button class="btn btn-primary" onclick="confirmLogout()">确认退出</button>
                    </div>
                </div>
            </div>
        `;
    }
};

window.Navigation = {
    init: function(pageTitle) {
        // 先注入样式，确保样式在DOM渲染前就存在
        this.injectStyles();
        
        const path = window.location.pathname;
        let currentPage = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1)) 
                       || path.substring(path.lastIndexOf('\\') + 1) 
                       || '签名列表.html';
        
        // 确保DOM加载完成后再渲染导航
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderNavigation(currentPage, pageTitle);
                this.renderCommonModals();
                this.bindEvents();
                
                // 自动绑定用户下拉菜单
                if (window.UI && UI.initUserDropdown) {
                    UI.initUserDropdown();
                }
            });
        } else {
            this.renderNavigation(currentPage, pageTitle);
            this.renderCommonModals();
            this.bindEvents();
            
            // 自动绑定用户下拉菜单
            if (window.UI && UI.initUserDropdown) {
                UI.initUserDropdown();
            }
        }
    },
    
    injectStyles: function() {
        const styleEl = document.createElement('style');
        styleEl.id = 'navigation-styles';
        styleEl.textContent = window.NavigationTemplate.styles();
        document.head.appendChild(styleEl);
    },
    
    renderNavigation: function(currentPage, pageTitle) {
        const mainPage = document.getElementById('mainPage');
        if (!mainPage) return;
        
        const originalContent = mainPage.innerHTML;
        const contentMatch = originalContent.match(/<main[\s\S]*?<\/main>/i);
        const mainContent = contentMatch ? contentMatch[0] : originalContent;
        
        // 先在内存中构建完整的新结构，避免中途清空导致闪烁
        const tempContainer = document.createElement('div');
        
        // 构建侧边栏
        const sidebarDiv = document.createElement('div');
        sidebarDiv.innerHTML = window.NavigationTemplate.sidebar(currentPage);
        tempContainer.appendChild(sidebarDiv.firstElementChild);
        
        // 构建主内容区
        const mainContentDiv = document.createElement('div');
        mainContentDiv.className = 'main-content';
        mainContentDiv.innerHTML = window.NavigationTemplate.header(pageTitle);
        
        // 添加内容区域容器
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';
        contentWrapper.style.flex = '1';
        contentWrapper.style.overflow = 'hidden';
        contentWrapper.style.position = 'relative';
        
        // 原来的内容作为第一个标签页的内容
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = mainContent;
        const mainTag = tempDiv.querySelector('main') || tempDiv;
        mainTag.style.display = 'block';
        mainTag.style.height = '100%';
        mainTag.style.overflow = 'auto';
        contentWrapper.appendChild(mainTag);
        
        // 添加iframe容器（预留，默认隐藏）
        const iframeContainer = document.createElement('div');
        iframeContainer.id = 'iframeContainer';
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = '100%';
        iframeContainer.style.position = 'absolute';
        iframeContainer.style.top = '0';
        iframeContainer.style.left = '0';
        iframeContainer.style.display = 'none';
        iframeContainer.style.zIndex = '-1';
        contentWrapper.appendChild(iframeContainer);
        
        mainContentDiv.appendChild(contentWrapper);
        tempContainer.appendChild(mainContentDiv);
        
        // 一次性替换所有内容
        mainPage.innerHTML = tempContainer.innerHTML;
        
        // 使用requestAnimationFrame确保DOM更新完成后再显示
        requestAnimationFrame(() => {
            mainPage.classList.add('nav-ready');
        });
    },
    
    renderCommonModals: function() {
        const body = document.body;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = window.NavigationTemplate.commonModals();
        
        while (tempDiv.firstChild) {
            const modal = tempDiv.firstChild;
            if (modal.id && !document.getElementById(modal.id)) {
                body.appendChild(modal);
            } else {
                tempDiv.removeChild(modal);
            }
        }
    },
    
    bindEvents: function() {
        const toggleBtn = document.getElementById('toggleSidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('collapsed');
                }
            });
        }
        
        // 初始化标签页功能
        this.initTabs();
    },
    
    // 标签页功能
    initTabs: function() {
        const path = window.location.pathname;
        let currentPage = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1)) 
                       || path.substring(path.lastIndexOf('\\') + 1) 
                       || '签名列表.html';
        
        // 获取当前页面对应的标题
        const pageTitles = {
            '新增游戏.html': '新增游戏',
            '母包列表.html': '母包列表',
            '新建改包.html': '新建改包',
            '改包任务列表.html': '任务列表',
            '渠道列表.html': '渠道列表',
            '渠道分包资源列表.html': '分包资源列表',
            '签名列表.html': '签名列表',
            '分包列表.html': '分包列表',
            '用户管理.html': '用户管理',
            '岗位管理.html': '岗位管理',
            '平台管理.html': '平台管理'
        };
        
        // 从localStorage获取已打开的标签页
        let openTabs = JSON.parse(localStorage.getItem('openTabs') || '[]');
        
        // 如果当前页面不在已打开的标签中，添加进去
        const currentTabExists = openTabs.some(tab => tab.url === currentPage);
        if (!currentTabExists) {
            openTabs.push({
                id: 'tab_' + Date.now(),
                title: pageTitles[currentPage] || currentPage.replace('.html', ''),
                url: currentPage,
                active: true
            });
        } else {
            // 激活当前标签
            openTabs = openTabs.map(tab => ({
                ...tab,
                active: tab.url === currentPage
            }));
        }
        
        // 保存标签页状态
        localStorage.setItem('openTabs', JSON.stringify(openTabs));
        
        // 渲染标签页
        this.renderTabs(openTabs, currentPage);
        
        // 绑定菜单点击事件，拦截跳转
        this.bindMenuClicks();
        
        // 绑定标签页操作事件
        this.bindTabActions();
    },
    
    // 渲染标签页
    renderTabs: function(tabs, currentPage) {
        const tabsList = document.getElementById('tabsList');
        if (!tabsList) return;
        
        tabsList.innerHTML = tabs.map(tab => `
            <div class="tab-item ${tab.active ? 'active' : ''}" data-tab-id="${tab.id}" data-url="${tab.url}">
                <span>${tab.title}</span>
                <span class="tab-close" data-tab-id="${tab.id}">×</span>
            </div>
        `).join('');
        
        // 绑定标签点击事件
        tabsList.querySelectorAll('.tab-item').forEach(tabEl => {
            tabEl.addEventListener('click', (e) => {
                if (e.target.classList.contains('tab-close')) return;
                
                const url = tabEl.dataset.url;
                const tabId = tabEl.dataset.tabId;
                
                // 如果是当前页面，不跳转
                if (url === currentPage) return;
                
                // 跳转到目标页面
                window.location.href = url;
            });
        });
        
        // 绑定关闭按钮事件
        tabsList.querySelectorAll('.tab-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tabId = closeBtn.dataset.tabId;
                this.closeTab(tabId);
            });
        });
        
        // 滚动到当前激活的标签
        const activeTab = tabsList.querySelector('.tab-item.active');
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    },
    
    // 绑定菜单点击事件
    bindMenuClicks: function() {
        document.querySelectorAll('.menu-item').forEach(menuItem => {
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                const url = menuItem.getAttribute('href');
                if (!url) return;
                
                // 获取页面标题
                const title = menuItem.querySelector('span')?.textContent || url.replace('.html', '');
                
                // 获取已打开的标签页
                let openTabs = JSON.parse(localStorage.getItem('openTabs') || '[]');
                
                // 检查是否已经打开
                const existingTab = openTabs.find(tab => tab.url === url);
                if (existingTab) {
                    // 已经打开，直接跳转到该页面
                    window.location.href = url;
                    return;
                }
                
                // 添加新标签
                openTabs = openTabs.map(tab => ({ ...tab, active: false }));
                openTabs.push({
                    id: 'tab_' + Date.now(),
                    title: title,
                    url: url,
                    active: true
                });
                
                // 保存标签页状态
                localStorage.setItem('openTabs', JSON.stringify(openTabs));
                
                // 跳转到新页面
                window.location.href = url;
            });
        });
    },
    
    // 绑定标签页操作事件
    bindTabActions: function() {
        // 关闭全部标签
        const closeAllBtn = document.getElementById('closeAllTabs');
        if (closeAllBtn) {
            closeAllBtn.addEventListener('click', () => {
                const path = window.location.pathname;
                let currentPage = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1)) 
                               || path.substring(path.lastIndexOf('\\') + 1) 
                               || '签名列表.html';
                
                // 只保留当前页面
                const openTabs = JSON.parse(localStorage.getItem('openTabs') || '[]');
                const currentTab = openTabs.find(tab => tab.url === currentPage);
                const newTabs = currentTab ? [currentTab] : [];
                
                localStorage.setItem('openTabs', JSON.stringify(newTabs));
                this.renderTabs(newTabs, currentPage);
            });
        }
        
        // 关闭其他标签
        const closeOtherBtn = document.getElementById('closeOtherTabs');
        if (closeOtherBtn) {
            closeOtherBtn.addEventListener('click', () => {
                const path = window.location.pathname;
                let currentPage = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1)) 
                               || path.substring(path.lastIndexOf('\\') + 1) 
                               || '签名列表.html';
                
                // 只保留当前页面
                const openTabs = JSON.parse(localStorage.getItem('openTabs') || '[]');
                const currentTab = openTabs.find(tab => tab.url === currentPage);
                const newTabs = currentTab ? [currentTab] : [];
                
                localStorage.setItem('openTabs', JSON.stringify(newTabs));
                this.renderTabs(newTabs, currentPage);
            });
        }
    },
    
    // 关闭标签页
    closeTab: function(tabId) {
        const path = window.location.pathname;
        let currentPage = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1)) 
                       || path.substring(path.lastIndexOf('\\') + 1) 
                       || '签名列表.html';
        
        let openTabs = JSON.parse(localStorage.getItem('openTabs') || '[]');
        const tabIndex = openTabs.findIndex(tab => tab.id === tabId);
        if (tabIndex === -1) return;
        
        const tabToClose = openTabs[tabIndex];
        
        // 如果关闭的是当前标签，跳转到前一个标签
        if (tabToClose.url === currentPage) {
            if (openTabs.length === 1) {
                // 只剩一个标签，不能关闭
                return;
            }
            
            // 跳转到前一个或后一个标签
            const targetTab = tabIndex > 0 ? openTabs[tabIndex - 1] : openTabs[tabIndex + 1];
            openTabs.splice(tabIndex, 1);
            openTabs = openTabs.map(tab => ({
                ...tab,
                active: tab.id === targetTab.id
            }));
            localStorage.setItem('openTabs', JSON.stringify(openTabs));
            
            // 跳转到目标页面
            window.location.href = targetTab.url;
        } else {
            // 关闭非当前标签
            openTabs.splice(tabIndex, 1);
            localStorage.setItem('openTabs', JSON.stringify(openTabs));
            this.renderTabs(openTabs, currentPage);
        }
    }
};

function openProfileModal() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    
    const modal = document.getElementById('profileModal');
    if (modal) {
        if (window.Storage && Storage.getCurrentUser) {
            const user = Storage.getCurrentUser();
            if (user) {
                const nicknameEl = document.getElementById('profileNickname');
                const realNameEl = document.getElementById('profileRealName');
                const phoneEl = document.getElementById('profilePhone');
                if (nicknameEl) nicknameEl.value = user.nickname || '';
                if (realNameEl) realNameEl.value = user.realName || '';
                if (phoneEl) phoneEl.value = user.phone || '';
            }
        }
        modal.classList.add('show');
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('show');
}

function saveProfile() {
    const nickname = document.getElementById('profileNickname')?.value.trim();
    const realName = document.getElementById('profileRealName')?.value.trim();
    const phone = document.getElementById('profilePhone')?.value.trim();
    
    if (!nickname) {
        if (window.showMessage) showMessage('error', '请输入昵称');
        return;
    }
    
    if (window.Storage && Storage.getCurrentUser && Storage.getUsers && Storage.saveUsers && Storage.saveCurrentUser) {
        const user = Storage.getCurrentUser();
        if (user) {
            const users = Storage.getUsers();
            const index = users.findIndex(u => u.id === user.id);
            if (index >= 0) {
                users[index].nickname = nickname;
                users[index].realName = realName;
                users[index].phone = phone;
                Storage.saveUsers(users);
                Storage.saveCurrentUser(users[index]);
                
                if (window.UI && UI.initUserInfo) UI.initUserInfo();
                if (window.showMessage) showMessage('success', '资料修改成功');
            }
        }
    }
    closeProfileModal();
}

function openChangePasswordModal() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.classList.add('show');
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.classList.remove('show');
}

function changePassword() {
    const oldPwd = document.getElementById('oldPassword')?.value.trim();
    const newPwd = document.getElementById('newPassword')?.value.trim();
    const confirmPwd = document.getElementById('confirmPassword')?.value.trim();
    
    if (!oldPwd) { if (window.showMessage) showMessage('error', '请输入原密码'); return; }
    if (!newPwd) { if (window.showMessage) showMessage('error', '请输入新密码'); return; }
    if (newPwd !== confirmPwd) { if (window.showMessage) showMessage('error', '两次输入的密码不一致'); return; }
    
    if (window.Storage && Storage.getCurrentUser && Storage.getUsers && Storage.saveUsers && Storage.saveCurrentUser) {
        const user = Storage.getCurrentUser();
        if (user && oldPwd === user.password) {
            const users = Storage.getUsers();
            const index = users.findIndex(u => u.id === user.id);
            if (index >= 0) {
                users[index].password = newPwd;
                Storage.saveUsers(users);
                user.password = newPwd;
                Storage.saveCurrentUser(user);
                
                if (window.showMessage) showMessage('success', '密码修改成功');
            }
        } else {
            if (window.showMessage) showMessage('error', '原密码不正确');
        }
    }
    closeChangePasswordModal();
}

function openLogoutModal() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    
    const modal = document.getElementById('logoutModal');
    if (modal) modal.classList.add('show');
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) modal.classList.remove('show');
}

function confirmLogout() {
    closeLogoutModal();
    localStorage.removeItem('repkg_current_user');
    window.location.href = '登录.html';
}
