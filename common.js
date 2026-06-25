// 权限管理系统 - 公共JavaScript文件

// ==================== 数据存储模块 ====================
const Storage = {
    // 存储键名
    KEYS: {
        ROLES: 'repkg_roles',
        USERS: 'repkg_users',
        CURRENT_USER: 'repkg_current_user'
    },

    // 初始化默认数据
    initDefaultData() {
        // 默认岗位
        const defaultRoles = [
            {
                id: 'role_admin',
                name: '超级管理员',
                permissions: {
                    pages: ['home', 'game', 'repkg', 'system'],
                    actions: {
                        game: ['view', 'add', 'edit', 'delete'],
                        repkg: ['view', 'add', 'edit', 'delete'],
                        system: ['view', 'add', 'edit', 'delete']
                    }
                },
                createdAt: '2026-04-01',
                description: '系统最高权限，可访问所有功能'
            },
            {
                id: 'role_operator',
                name: '运营人员',
                permissions: {
                    pages: ['home', 'game', 'repkg'],
                    actions: {
                        game: ['view', 'add', 'edit'],
                        repkg: ['view', 'add', 'edit']
                    }
                },
                createdAt: '2026-04-01',
                description: '负责日常运营和改包操作'
            },
            {
                id: 'role_viewer',
                name: '访客',
                permissions: {
                    pages: ['home', 'game', 'repkg'],
                    actions: {
                        game: ['view'],
                        repkg: ['view']
                    }
                },
                createdAt: '2026-04-01',
                description: '仅可查看数据，无操作权限'
            }
        ];

        // 默认用户
        const defaultUsers = [
            {
                id: 'user_admin',
                username: 'admin',
                password: 'Admin123', // 实际项目中应该加密存储
                nickname: '管理员',
                realName: '系统管理员',
                phone: '13800138000',
                roleId: 'role_admin',
                platformId: 'global',
                status: 'active',
                createdAt: '2026-04-01',
                lastLogin: ''
            }
        ];

        // 如果没有数据则初始化
        if (!localStorage.getItem(this.KEYS.ROLES)) {
            localStorage.setItem(this.KEYS.ROLES, JSON.stringify(defaultRoles));
        }
        if (!localStorage.getItem(this.KEYS.USERS)) {
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(defaultUsers));
        }
    },

    // 获取岗位列表
    getRoles() {
        const roles = localStorage.getItem(this.KEYS.ROLES);
        return roles ? JSON.parse(roles) : [];
    },

    // 保存岗位列表
    saveRoles(roles) {
        localStorage.setItem(this.KEYS.ROLES, JSON.stringify(roles));
    },

    // 根据ID获取岗位
    getRoleById(id) {
        const roles = this.getRoles();
        return roles.find(r => r.id === id);
    },

    // 获取用户列表
    getUsers() {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    // 保存用户列表
    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    // 根据ID获取用户
    getUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    },

    // 根据用户名获取用户
    getUserByUsername(username) {
        const users = this.getUsers();
        return users.find(u => u.username === username);
    },

    // 获取当前登录用户
    getCurrentUser() {
        const user = localStorage.getItem(this.KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    },

    // 保存当前登录用户
    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    // 清除登录状态
    clearCurrentUser() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    }
};

// ==================== 权限管理模块 ====================
const Permission = {
    // 页面配置
    PAGES: {
        home: { name: '首页', icon: 'fa-home' },
        game: { name: '游戏管理', icon: 'fa-gamepad' },
        repkg: { name: '改包系统', icon: 'fa-pencil-square-o' },
        system: { name: '系统管理', icon: 'fa-cog' }
    },

    // 功能操作配置
    ACTIONS: {
        view: { name: '查看', icon: 'fa-eye' },
        add: { name: '新增', icon: 'fa-plus' },
        edit: { name: '编辑', icon: 'fa-edit' },
        delete: { name: '删除', icon: 'fa-trash' }
    },

    // 系统管理子页面
    SYSTEM_PAGES: {
        user: { name: '用户管理', icon: 'fa-users' },
        role: { name: '岗位管理', icon: 'fa-user-circle' }
    },

    // 检查是否有页面访问权限
    hasPageAccess(pageKey) {
        const currentUser = Storage.getCurrentUser();
        if (!currentUser) return false;

        const role = Storage.getRoleById(currentUser.roleId);
        if (!role) return false;

        // 超级管理员特殊处理
        if (role.id === 'role_admin') return true;

        return role.permissions.pages.includes(pageKey);
    },

    // 检查是否有功能操作权限
    hasActionPermission(pageKey, actionKey) {
        const currentUser = Storage.getCurrentUser();
        if (!currentUser) return false;

        const role = Storage.getRoleById(currentUser.roleId);
        if (!role) return false;

        // 超级管理员特殊处理
        if (role.id === 'role_admin') return true;

        const pageActions = role.permissions.actions[pageKey];
        return pageActions && pageActions.includes(actionKey);
    },

    // 获取当前用户的岗位信息
    getCurrentUserRole() {
        const currentUser = Storage.getCurrentUser();
        if (!currentUser) return null;
        return Storage.getRoleById(currentUser.roleId);
    },

    // 获取当前用户权限
    getCurrentPermissions() {
        const role = this.getCurrentUserRole();
        return role ? role.permissions : { pages: [], actions: {} };
    }
};

// ==================== 验证模块 ====================
const Validator = {
    // 验证岗位名称
    validateRoleName(name, excludeId = null) {
        if (!name || name.trim() === '') {
            return { valid: false, message: '请填写岗位名称' };
        }
        if (name.length < 1 || name.length > 20) {
            return { valid: false, message: '岗位名称长度为1-20个字符' };
        }
        // 检查特殊字符
        const specialChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
        if (specialChars.test(name)) {
            return { valid: false, message: '岗位名称不能包含特殊符号' };
        }
        // 检查重复
        const roles = Storage.getRoles();
        const duplicate = roles.find(r => r.name === name && r.id !== excludeId);
        if (duplicate) {
            return { valid: false, message: '岗位名称已存在，请重新输入' };
        }
        return { valid: true };
    },

    // 验证岗位权限
    validateRolePermissions(permissions) {
        if (!permissions || !permissions.pages || permissions.pages.length === 0) {
            return { valid: false, message: '请选择岗位权限' };
        }
        return { valid: true };
    },

    // 验证用户名/账号
    validateUsername(username, excludeId = null) {
        if (!username || username.trim() === '') {
            return { valid: false, message: '请填写账号' };
        }
        if (username.length < 6 || username.length > 20) {
            return { valid: false, message: '账号长度为6-20个字符' };
        }
        // 只允许字母和数字
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return { valid: false, message: '账号只能包含字母和数字' };
        }
        // 检查重复
        const users = Storage.getUsers();
        const duplicate = users.find(u => u.username === username && u.id !== excludeId);
        if (duplicate) {
            return { valid: false, message: '账号已存在，请重新输入' };
        }
        return { valid: true };
    },

    // 验证密码强度
    validatePassword(password) {
        if (!password) {
            return { valid: false, message: '请填写密码' };
        }
        if (password.length < 8) {
            return { valid: false, message: '密码长度至少8位' };
        }
        return { valid: true };
    },

    // 验证手机号
    validatePhone(phone, excludeId = null) {
        if (!phone || phone.trim() === '') {
            return { valid: true }; // 手机号是可选的
        }
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return { valid: false, message: '请输入正确的11位手机号' };
        }
        // 检查重复
        const users = Storage.getUsers();
        const duplicate = users.find(u => u.phone === phone && u.id !== excludeId);
        if (duplicate) {
            return { valid: false, message: '手机号已绑定其他账号，请重新输入' };
        }
        return { valid: true };
    },

    // 验证昵称
    validateNickname(nickname) {
        if (!nickname || nickname.trim() === '') {
            return { valid: false, message: '请填写昵称' };
        }
        if (nickname.length < 2 || nickname.length > 15) {
            return { valid: false, message: '昵称长度为2-15个字符' };
        }
        return { valid: true };
    },

    // 验证真实姓名
    validateRealName(realName) {
        if (!realName || realName.trim() === '') {
            return { valid: false, message: '请填写姓名' };
        }
        if (realName.length < 2 || realName.length > 10) {
            return { valid: false, message: '姓名长度为2-10个字符' };
        }
        // 只允许中文
        const chineseRegex = /^[\u4e00-\u9fa5]+$/;
        if (!chineseRegex.test(realName)) {
            return { valid: false, message: '姓名只能包含中文' };
        }
        return { valid: true };
    },

    // 验证用户岗位
    validateUserRole(roleId) {
        if (!roleId) {
            return { valid: false, message: '请为用户选择岗位' };
        }
        return { valid: true };
    }
};

// ==================== 通用UI模块 ====================
const UI = {
    // 显示消息提示
    showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-box message-${type}`;
        
        let icon = '';
        let bgColor = '';
        switch(type) {
            case 'success':
                icon = '<i class="fa fa-check-circle" style="margin-right: 8px;"></i>';
                break;
            case 'error':
                icon = '<i class="fa fa-times-circle" style="margin-right: 8px;"></i>';
                break;
            case 'info':
                icon = '<i class="fa fa-info-circle" style="margin-right: 8px;"></i>';
                bgColor = 'style="background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 100%);"';
                break;
            case 'warning':
                icon = '<i class="fa fa-exclamation-circle" style="margin-right: 8px;"></i>';
                bgColor = 'style="background: var(--warning);"';
                break;
        }
        
        messageDiv.innerHTML = icon + message;
        if (bgColor) messageDiv.setAttribute('style', bgColor.replace('style="', '').replace('"', ''));
        
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(messageDiv), 300);
        }, 3000);
    },

    // 切换侧边栏
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    },

    // 初始化侧边栏状态
    initSidebar() {
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.add('collapsed');
        }
    },

    // 初始化用户信息显示
    initUserInfo() {
        const currentUser = Storage.getCurrentUser();
        const role = currentUser ? Storage.getRoleById(currentUser.roleId) : null;
        
        const userNameEl = document.getElementById('userName');
        const userAvatarEl = document.getElementById('userAvatar');
        const userRoleEl = document.getElementById('userRole');
        
        if (userNameEl && currentUser) {
            userNameEl.textContent = currentUser.nickname || currentUser.username;
        }
        if (userAvatarEl && currentUser) {
            const avatarText = (currentUser.nickname || currentUser.username).charAt(0).toUpperCase();
            userAvatarEl.textContent = avatarText;
        }
        if (userRoleEl && role) {
            userRoleEl.textContent = role.name;
        }
    },

    // 初始化用户下拉菜单
    initUserDropdown() {
        const userInfo = document.getElementById('userInfo');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        if (userInfo && dropdownMenu) {
            userInfo.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            
            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }
    },

    // 检查登录状态，未登录则跳转到登录页
    checkLogin() {
        const currentUser = Storage.getCurrentUser();
        if (!currentUser) {
            window.location.href = '登录.html';
            return false;
        }
        return true;
    },

    // 退出登录
    logout() {
        Storage.clearCurrentUser();
        window.location.href = '登录.html';
    }
};

// 确保平台演示数据存在（兜底，线上环境无 localStorage 预填数据时自动注入）
(function() {
    if (!localStorage.getItem('repkg_platforms')) {
        var demoPlatforms = [
            { id: '10001', platformName: '北京字节跳动科技有限公司', companyName: '北京字节跳动科技有限公司', legalPerson: '张一鸣', platformStatus: true },
            { id: '10002', platformName: '贵州趣游部落网络科技有限公司', companyName: '贵州趣游部落网络科技有限公司', legalPerson: '邱伟', platformStatus: true },
            { id: '10003', platformName: '泉州遨游龙翔网络科技有限公司', companyName: '泉州遨游龙翔网络科技有限公司', legalPerson: '管理员', platformStatus: true },
            { id: '10004', platformName: '广州游戏科技有限公司', companyName: '广州游戏科技有限公司', legalPerson: '张三', platformStatus: true },
            { id: '10005', platformName: '深圳网络技术有限公司', companyName: '深圳网络技术有限公司', legalPerson: '李四', platformStatus: true }
        ];
        localStorage.setItem('repkg_platforms', JSON.stringify(demoPlatforms));
    }
})();

// ==================== 岗位管理模块 ====================
const RoleManager = {
    // 生成唯一ID
    generateId() {
        return 'role_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // 添加岗位
    addRole(roleData) {
        const roles = Storage.getRoles();
        const newRole = {
            id: this.generateId(),
            ...roleData,
            createdAt: new Date().toISOString().split('T')[0]
        };
        roles.push(newRole);
        Storage.saveRoles(roles);
        return newRole;
    },

    // 更新岗位
    updateRole(id, roleData) {
        const roles = Storage.getRoles();
        const index = roles.findIndex(r => r.id === id);
        if (index !== -1) {
            roles[index] = { ...roles[index], ...roleData };
            Storage.saveRoles(roles);
            return roles[index];
        }
        return null;
    },

    // 删除岗位
    deleteRole(id) {
        // 检查是否有用户关联此岗位
        const users = Storage.getUsers();
        const relatedUsers = users.filter(u => u.roleId === id);
        if (relatedUsers.length > 0) {
            return { success: false, message: '该岗位已关联账号，不可删除，请先解除账号与该岗位的关联' };
        }

        const roles = Storage.getRoles();
        const filteredRoles = roles.filter(r => r.id !== id);
        Storage.saveRoles(filteredRoles);
        return { success: true };
    },

    // 检查岗位是否被用户使用
    isRoleUsed(roleId) {
        const users = Storage.getUsers();
        return users.some(u => u.roleId === roleId);
    }
};

// ==================== 用户管理模块 ====================
const UserManager = {
    // 生成唯一ID
    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // 添加用户
    addUser(userData) {
        const users = Storage.getUsers();
        const newUser = {
            id: this.generateId(),
            ...userData,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: ''
        };
        users.push(newUser);
        Storage.saveUsers(users);
        return newUser;
    },

    // 更新用户
    updateUser(id, userData) {
        const users = Storage.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            // 不允许修改用户名和密码（密码通过重置功能修改）
            const { username, password, ...updateData } = userData;
            users[index] = { ...users[index], ...updateData };
            Storage.saveUsers(users);
            return users[index];
        }
        return null;
    },

    // 重置用户密码
    resetPassword(id, newPassword) {
        const users = Storage.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index].password = newPassword;
            Storage.saveUsers(users);
            return true;
        }
        return false;
    },

    // 删除用户
    deleteUser(id) {
        const users = Storage.getUsers();
        const currentUser = Storage.getCurrentUser();
        
        // 不能删除自己
        if (currentUser && currentUser.id === id) {
            return { success: false, message: '不能删除当前登录的账号' };
        }

        const filteredUsers = users.filter(u => u.id !== id);
        Storage.saveUsers(filteredUsers);
        return { success: true };
    },

    // 用户登录
    login(username, password) {
        const user = Storage.getUserByUsername(username);
        if (!user) {
            return { success: false, message: '账号或密码错误' };
        }
        if (user.password !== password) {
            return { success: false, message: '账号或密码错误' };
        }
        if (user.status !== 'active') {
            return { success: false, message: '账号已被禁用' };
        }

        // 更新最后登录时间
        const users = Storage.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index].lastLogin = new Date().toISOString().split('T')[0] + ' ' + 
                                       new Date().toTimeString().split(' ')[0];
            Storage.saveUsers(users);
        }

        // 保存登录状态（不保存密码）
        const { password: _, ...userWithoutPassword } = user;
        Storage.setCurrentUser(userWithoutPassword);
        
        return { success: true, user: userWithoutPassword };
    }
};

// ==================== SearchSelect 组件 ====================
window.SearchSelect = class SearchSelect {
    static injectStyles() {
        if (document.getElementById('search-select-styles')) return;
        const style = document.createElement('style');
        style.id = 'search-select-styles';
        style.textContent = `
            .search-select-wrapper {
                position: relative;
                display: inline-block;
            }
            .search-select-input-wrap {
                position: relative;
                display: flex;
                align-items: center;
            }
            .search-select-input {
                height: 36px;
                padding: 0 28px 0 10px;
                border: 1px solid var(--gray-200, #d9d9d9);
                border-radius: 6px;
                font-size: 13px;
                outline: none;
                background: #fff;
                color: var(--text-primary, #333);
                transition: border-color 0.2s;
                box-sizing: border-box;
            }
            .search-select-input:focus {
                border-color: var(--primary, #4f6ef7);
                box-shadow: 0 0 0 2px rgba(79, 110, 247, 0.15);
            }
            .search-select-input::placeholder {
                color: var(--gray-300, #bfbfbf);
            }
            .search-select-clear {
                position: absolute;
                right: 6px;
                top: 50%;
                transform: translateY(-50%);
                width: 18px;
                height: 18px;
                display: none;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: var(--gray-300, #bfbfbf);
                font-size: 14px;
                line-height: 1;
                border-radius: 50%;
                transition: color 0.2s, background 0.2s;
                user-select: none;
            }
            .search-select-clear:hover {
                color: #ff4d4f;
                background: rgba(255, 77, 79, 0.08);
            }
            .search-select-clear.visible {
                display: flex;
            }
            .search-select-dropdown {
                position: absolute;
                top: calc(100% + 4px);
                left: 0;
                min-width: 100%;
                max-height: calc(36px * 8 + 4px);
                overflow-y: auto;
                background: #fff;
                border: 1px solid var(--gray-200, #d9d9d9);
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                z-index: 10000;
                display: none;
                padding: 4px 0;
                box-sizing: border-box;
            }
            .search-select-dropdown.open {
                display: block;
            }
            .search-select-option {
                height: 36px;
                padding: 0 12px;
                display: flex;
                align-items: center;
                font-size: 13px;
                color: var(--text-primary, #333);
                cursor: pointer;
                transition: background 0.15s;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .search-select-option:hover {
                background: var(--gray-100, #f5f5f5);
            }
            .search-select-option.selected {
                color: var(--primary, #4f6ef7);
                font-weight: 600;
                background: rgba(79, 110, 247, 0.06);
            }
            .search-select-option.selected:hover {
                background: rgba(79, 110, 247, 0.1);
            }
            .search-select-empty {
                height: 36px;
                padding: 0 12px;
                display: flex;
                align-items: center;
                font-size: 13px;
                color: var(--gray-300, #bfbfbf);
                cursor: default;
            }
        `;
        document.head.appendChild(style);
    }

    constructor(containerId, options = {}) {
        SearchSelect.injectStyles();

        this.container = document.getElementById(containerId);
        this.placeholder = options.placeholder || '请选择';
        this.data = options.data || [];
        this.onChange = options.onChange || null;
        this.width = options.width || '160px';
        this.selectedValue = null;
        this.selectedLabel = '';
        this.isOpen = false;

        this._render();
        this._bindEvents();
    }

    _render() {
        this.container.classList.add('search-select-wrapper');

        this.inputWrap = document.createElement('div');
        this.inputWrap.className = 'search-select-input-wrap';

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.className = 'search-select-input';
        this.input.placeholder = this.placeholder;
        this.input.style.width = this.width;

        this.clearBtn = document.createElement('span');
        this.clearBtn.className = 'search-select-clear';
        this.clearBtn.innerHTML = '&times;';

        this.dropdown = document.createElement('div');
        this.dropdown.className = 'search-select-dropdown';
        this.dropdown.style.minWidth = this.width;

        this.inputWrap.appendChild(this.input);
        this.inputWrap.appendChild(this.clearBtn);
        this.container.appendChild(this.inputWrap);
        this.container.appendChild(this.dropdown);
    }

    _bindEvents() {
        this.input.addEventListener('focus', () => {
            this._openDropdown();
        });

        this.input.addEventListener('input', () => {
            this._filterAndRender();
        });

        this.input.addEventListener('click', () => {
            if (!this.isOpen) {
                this._openDropdown();
            }
        });

        this.clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clear();
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this._closeDropdown();
            }
        });
    }

    _openDropdown() {
        this._filterAndRender();
        this.dropdown.classList.add('open');
        this.isOpen = true;
    }

    _closeDropdown() {
        this.dropdown.classList.remove('open');
        this.isOpen = false;
        if (this.selectedValue !== null) {
            this.input.value = this.selectedLabel;
        }
    }

    _filterAndRender() {
        const keyword = this.input.value.trim().toLowerCase();
        const filtered = this.data.filter(item =>
            item.label.toLowerCase().includes(keyword)
        );
        this._renderOptions(filtered);
    }

    _renderOptions(items) {
        this.dropdown.innerHTML = '';
        if (items.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'search-select-empty';
            empty.textContent = '无匹配项';
            this.dropdown.appendChild(empty);
            return;
        }
        items.forEach(item => {
            const opt = document.createElement('div');
            opt.className = 'search-select-option';
            if (this.selectedValue !== null && item.value === this.selectedValue) {
                opt.classList.add('selected');
            }
            opt.textContent = item.label;
            opt.dataset.value = item.value;
            opt.addEventListener('click', () => {
                this._selectItem(item);
            });
            this.dropdown.appendChild(opt);
        });
    }

    _selectItem(item) {
        this.selectedValue = item.value;
        this.selectedLabel = item.label;
        this.input.value = item.label;
        this._updateClearBtn();
        this._closeDropdown();
        if (this.onChange) {
            this.onChange(item.value, item);
        }
    }

    _updateClearBtn() {
        if (this.selectedValue !== null) {
            this.clearBtn.classList.add('visible');
        } else {
            this.clearBtn.classList.remove('visible');
        }
    }

    getValue() {
        return this.selectedValue !== null ? this.selectedValue : '';
    }

    setValue(value) {
        const item = this.data.find(d => d.value === value);
        if (item) {
            this.selectedValue = item.value;
            this.selectedLabel = item.label;
            this.input.value = item.label;
        } else {
            this.selectedValue = null;
            this.selectedLabel = '';
            this.input.value = '';
        }
        this._updateClearBtn();
    }

    setData(data) {
        this.data = data || [];
        if (this.isOpen) {
            this._filterAndRender();
        }
    }

    clear() {
        this.selectedValue = null;
        this.selectedLabel = '';
        this.input.value = '';
        this._updateClearBtn();
        this._closeDropdown();
        if (this.onChange) {
            this.onChange(null, null);
        }
    }
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化默认数据
    Storage.initDefaultData();
});
