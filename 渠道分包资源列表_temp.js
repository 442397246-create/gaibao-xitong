        function openAddResourceModal() {
            currentEditId = null;
            document.getElementById('resourceModalTitle').textContent = '新增渠道出包资源';
            document.getElementById('platformId').value = '';
            const platformNameEl = document.getElementById('platformName_display');
            platformNameEl.textContent = '点击选择所属平台';
            platformNameEl.style.color = 'var(--gray-600)';
            
            document.getElementById('channelId').value = '';
            const channelNameEl = document.getElementById('channelName_display');
            channelNameEl.textContent = '点击选择渠道';
            channelNameEl.style.color = 'var(--gray-600)';
            
            document.getElementById('systemType').value = '';
            document.getElementById('resourceType').value = '';
            document.getElementById('resourceVersion').value = '';
            document.getElementById('resourceShieldDirection').value = '默认';
            document.getElementById('packageNotes').value = '';
            
            document.getElementById('config_shieldApplication').checked = false;
            document.getElementById('config_shieldPermission').checked = false;
            document.getElementById('config_shieldProvider').checked = false;
            document.getElementById('config_shieldFile').checked = false;
            document.getElementById('config_targetSdkVersion').checked = false;
            document.getElementById('config_shieldApk2').checked = false;
            document.getElementById('config_shieldUDID').checked = false;
            
            document.getElementById('param_hotVersionV4').checked = false;
            document.getElementById('param_needXWalkSDK').checked = false;
            document.getElementById('param_needVivoV7').checked = false;
            document.getElementById('param_needOppoV2').checked = false;
            document.getElementById('param_needUCV3').checked = false;
            document.getElementById('param_needQuarkSDK').checked = false;
            document.getElementById('param_needNormalUC').checked = false;
            document.getElementById('param_needBaiduSDK').checked = false;
            document.getElementById('param_needNormalHonorSDK').checked = false;
            
            document.getElementById('resourceModal').classList.add('show');
        }

        function editResource(id) {
            const resources = getResources();
            const resource = resources.find(r => r.id === id);
            if (!resource) return;

            currentEditId = id;
            document.getElementById('resourceModalTitle').textContent = '编辑渠道出包资源';
            
            document.getElementById('platformId').value = resource.platformId || '';
            const platformNameEl = document.getElementById('platformName_display');
            platformNameEl.textContent = resource.platformName || '点击选择所属平台';
            platformNameEl.style.color = resource.platformName ? 'var(--gray-900)' : 'var(--gray-600)';
            
            document.getElementById('channelId').value = resource.channelId || '';
            const channelNameEl = document.getElementById('channelName_display');
            channelNameEl.textContent = resource.channelName || '点击选择渠道';
            channelNameEl.style.color = resource.channelName ? 'var(--gray-900)' : 'var(--gray-600)';
            
            document.getElementById('systemType').value = resource.systemType || '';
            document.getElementById('resourceType').value = resource.resourceType || '';
            document.getElementById('resourceVersion').value = resource.resourceVersion || '';
            document.getElementById('resourceShieldDirection').value = resource.resourceShieldDirection || '默认';
            document.getElementById('packageNotes').value = resource.packageNotes || '';

            document.getElementById('config_shieldApplication').checked = resource.config_shieldApplication || false;
            document.getElementById('config_shieldPermission').checked = resource.config_shieldPermission || false;
            document.getElementById('config_shieldProvider').checked = resource.config_shieldProvider || false;
            document.getElementById('config_shieldFile').checked = resource.config_shieldFile || false;
            document.getElementById('config_targetSdkVersion').checked = resource.config_targetSdkVersion || false;
            document.getElementById('config_shieldApk2').checked = resource.config_shieldApk2 || false;
            document.getElementById('config_shieldUDID').checked = resource.config_shieldUDID || false;

            document.getElementById('param_hotVersionV4').checked = resource.param_hotVersionV4 || false;
            document.getElementById('param_needXWalkSDK').checked = resource.param_needXWalkSDK || false;
            document.getElementById('param_needVivoV7').checked = resource.param_needVivoV7 || false;
            document.getElementById('param_needOppoV2').checked = resource.param_needOppoV2 || false;
            document.getElementById('param_needUCV3').checked = resource.param_needUCV3 || false;
            document.getElementById('param_needQuarkSDK').checked = resource.param_needQuarkSDK || false;
            document.getElementById('param_needNormalUC').checked = resource.param_needNormalUC || false;
            document.getElementById('param_needBaiduSDK').checked = resource.param_needBaiduSDK || false;
            document.getElementById('param_needNormalHonorSDK').checked = resource.param_needNormalHonorSDK || false;

            document.getElementById('resourceModal').classList.add('show');
        }

        function closeResourceModal() {
            document.getElementById('resourceModal').classList.remove('show');
        }

        function saveResource() {
            const platformId = document.getElementById('platformId').value.trim();
            const platformNameEl = document.getElementById('platformName_display');
            const platformName = platformNameEl.textContent === '点击选择所属平台' ? '' : platformNameEl.textContent.trim();
            
            const channelId = document.getElementById('channelId').value.trim();
            const channelNameEl = document.getElementById('channelName_display');
            const channelName = channelNameEl.textContent === '点击选择渠道' ? '' : channelNameEl.textContent.trim();
            
            const systemType = document.getElementById('systemType').value;
            const resourceType = document.getElementById('resourceType').value;

            if (!platformId || !platformName) { showMessage('error', '请选择所属平台'); return; }
            if (!channelId || !channelName) { showMessage('error', '请选择渠道'); return; }
            if (!systemType) { showMessage('error', '请选择系统类型'); return; }
            if (!resourceType) { showMessage('error', '请选择出包资源类型'); return; }

            const now = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
            const currentUser = Storage.getCurrentUser();
            const operator = currentUser ? (currentUser.nickname || currentUser.username) : 'admin';

            const resourceData = {
                platformId, platformName, channelId, channelName, systemType, resourceType,
                resourceVersion: document.getElementById('resourceVersion').value.trim(),
                resourceShieldDirection: document.getElementById('resourceShieldDirection').value,
                config_shieldApplication: document.getElementById('config_shieldApplication').checked,
                config_shieldPermission: document.getElementById('config_shieldPermission').checked,
                config_shieldProvider: document.getElementById('config_shieldProvider').checked,
                config_shieldFile: document.getElementById('config_shieldFile').checked,
                config_targetSdkVersion: document.getElementById('config_targetSdkVersion').checked,
                config_shieldApk2: document.getElementById('config_shieldApk2').checked,
                config_shieldUDID: document.getElementById('config_shieldUDID').checked,
                param_hotVersionV4: document.getElementById('param_hotVersionV4').checked,
                param_needXWalkSDK: document.getElementById('param_needXWalkSDK').checked,
                param_needVivoV7: document.getElementById('param_needVivoV7').checked,
                param_needOppoV2: document.getElementById('param_needOppoV2').checked,
                param_needUCV3: document.getElementById('param_needUCV3').checked,
                param_needQuarkSDK: document.getElementById('param_needQuarkSDK').checked,
                param_needNormalUC: document.getElementById('param_needNormalUC').checked,
                param_needBaiduSDK: document.getElementById('param_needBaiduSDK').checked,
                param_needNormalHonorSDK: document.getElementById('param_needNormalHonorSDK').checked,
                packageNotes: document.getElementById('packageNotes').value.trim(),
                lastOperator: operator,
                lastOperateTime: now
            };

            const resources = getResources();
            if (currentEditId) {
                const index = resources.findIndex(r => r.id === currentEditId);
                if (index >= 0) {
                    resources[index] = { ...resources[index], ...resourceData };
                    showMessage('success', '资源更新成功');
                }
            } else {
                resourceData.id = resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 10001;
                resources.push(resourceData);
                showMessage('success', '资源创建成功');
            }

            saveResources(resources);
            closeResourceModal();
            renderResourceTable();
        }

        function downloadResource(id) {
            showMessage('success', '正在准备下载...');
        }

        function openPlatformSelectModal() {
            document.getElementById('platformSelectModal').classList.add('show');
            renderPlatformSelectTable();
        }

        function closePlatformSelectModal() {
            document.getElementById('platformSelectModal').classList.remove('show');
        }

        function renderPlatformSelectTable() {
            const keyword = document.getElementById('platformSearchInput').value.trim().toLowerCase();
            const platforms = JSON.parse(localStorage.getItem('repkg_platforms') || '[]');
            const filtered = keyword ? platforms.filter(p => p.platformName && p.platformName.toLowerCase().includes(keyword)) : platforms;

            const tbody = document.getElementById('platformSelectTableBody');
            const emptyState = document.getElementById('platformEmptyState');
            const table = document.getElementById('platformSelectTable');

            if (filtered.length === 0) {
                table.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            table.style.display = '';
            emptyState.style.display = 'none';
            tbody.innerHTML = filtered.map(p => `
                <tr>
                    <td>${p.id || '-'}</td>
                    <td>${p.platformName || '-'}</td>
                    <td>
                        <button class="ps-select-btn" onclick="selectPlatform('${p.id}', '${p.platformName}')">选择</button>
                    </td>
                </tr>
            `).join('');
        }

        function selectPlatform(id, name) {
            document.getElementById('platformId').value = id;
            const platformNameEl = document.getElementById('platformName_display');
            platformNameEl.textContent = name;
            platformNameEl.style.color = 'var(--gray-900)';
            closePlatformSelectModal();
        }

        function openChannelSelectModal() {
            const platformId = document.getElementById('platformId').value.trim();
            if (!platformId) {
                showMessage('warning', '请先选择平台');
                return;
            }
            document.getElementById('channelSelectModal').classList.add('show');
            renderChannelSelectTable();
        }

        function closeChannelSelectModal() {
            document.getElementById('channelSelectModal').classList.remove('show');
        }

        function renderChannelSelectTable() {
            const keyword = document.getElementById('channelSearchInput').value.trim().toLowerCase();
            const systemFilter = document.getElementById('channelSystemTypeFilter').value;
            const platformId = document.getElementById('platformId').value.trim();
            
            const channels = JSON.parse(localStorage.getItem('repkg_channels') || '[]');
            let filtered = channels.filter(c => c.platformId === platformId);
            if (keyword) filtered = filtered.filter(c => c.channelName && c.channelName.toLowerCase().includes(keyword));
            if (systemFilter) filtered = filtered.filter(c => c.systemType === systemFilter);

            const tbody = document.getElementById('channelSelectTableBody');
            const emptyState = document.getElementById('channelEmptyState');
            const table = document.getElementById('channelSelectTable');

            if (filtered.length === 0) {
                table.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            table.style.display = '';
            emptyState.style.display = 'none';
            tbody.innerHTML = filtered.map(c => `
                <tr>
                    <td>${c.id || '-'}</td>
                    <td>${c.channelName || '-'}</td>
                    <td>${c.systemType || '-'}</td>
                    <td>${c.platformName || '-'}</td>
                    <td>
                        <button class="ps-select-btn" onclick="selectChannel('${c.id}', '${c.channelName}')">选择</button>
                    </td>
                </tr>
            `).join('');
        }

        function selectChannel(id, name) {
            document.getElementById('channelId').value = id;
            const channelNameEl = document.getElementById('channelName_display');
            channelNameEl.textContent = name;
            channelNameEl.style.color = 'var(--gray-900)';
            closeChannelSelectModal();
        }

        function showMessage(type, message) {
            const div = document.createElement('div');
            div.className = `message-box message-${type}`;
            div.textContent = message;
            document.body.appendChild(div);
            setTimeout(() => document.body.removeChild(div), 3000);
        }

        document.addEventListener('DOMContentLoaded', function() {
            if (window.Navigation && Navigation.init) {
                Navigation.init('渠道分包资源列表');
            }
            if (!UI.checkLogin()) return;
            initDefaultData();
            UI.initUserInfo();
            UI.initUserDropdown();
            renderResourceTable();
        });
