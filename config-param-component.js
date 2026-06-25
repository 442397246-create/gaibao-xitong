// ===========================================
// 通用配置参数组件 ConfigParameterInfoBean
// 对应 Java 实体：ConfigParameterInfoBean
// 字段：configParameterLocation, configParameterFileName,
//       configParameterContentType, configParameterJsonContent
// ===========================================

// ==================== 枚举定义 ====================
const ConfigParameterLocation = {
    ANDROIDMANIFEST: { value: 'ANDROIDMANIFEST', label: 'AndroidManifest.xml' },
    ASSETS: { value: 'ASSETS', label: 'Assets 资源目录' },
    ANDROID_METAINF: { value: 'ANDROID_METAINF', label: '安卓签名文件目录(META-INF)' },
    STRING: { value: 'STRING', label: 'String 资源目录' },
    START_INTENT: { value: 'START_INTENT', label: '启动意图' }
};
const ConfigParameterLocationList = Object.values(ConfigParameterLocation);

const ConfigParameterContentType = {
    JSON: { value: 'JSON', label: 'JSON 格式' },
    XML: { value: 'XML', label: 'XML 格式' },
    INI: { value: 'INI', label: 'INI 格式' },
    TEXT: { value: 'TEXT', label: '纯文本格式' },
    START_INTENT: { value: 'START_INTENT', label: '启动意图' }
};
const ConfigParameterContentTypeList = Object.values(ConfigParameterContentType);

// ==================== 游戏包名修改范围枚举 ====================
const PackageNameModifyScope = {
    isModifyActivity: { key: 'isModifyActivity', label: '修改 Activity 包名', defaultVal: false },
    isModifyService: { key: 'isModifyService', label: '修改 Service 包名', defaultVal: true },
    isModifyApplication: { key: 'isModifyApplication', label: '修改 Application 包名', defaultVal: false },
    isModifyReceiver: { key: 'isModifyReceiver', label: '修改 BroadcastReceiver 包名', defaultVal: true },
    isModifyPermission: { key: 'isModifyPermission', label: '修改权限相关包名', defaultVal: true },
    isModifyProvider: { key: 'isModifyProvider', label: '修改 ContentProvider 包名', defaultVal: true },
    isModifyActivityAlias: { key: 'isModifyActivityAlias', label: '修改 activity-alias 包名', defaultVal: true }
};
const PackageNameModifyScopeList = Object.values(PackageNameModifyScope);

// ==================== 样式注入 ===================
function injectConfigParamStyles() {
    if (document.getElementById('config-param-styles')) return;
    const style = document.createElement('style');
    style.id = 'config-param-styles';
    style.textContent = `
        /* 配置参数组件 */
        .cp-section {
            background: #fafbfc;
            border: 1px solid var(--gray-200);
            border-radius: 10px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .cp-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .cp-section-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--gray-900);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .cp-section-title i { color: var(--primary); }
        .cp-list { display: flex; flex-direction: column; gap: 12px; }
        .cp-item {
            background: white;
            border: 1px solid var(--gray-200);
            border-radius: 8px;
            padding: 14px 16px;
            position: relative;
        }
        .cp-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px dashed var(--gray-200);
        }
        .cp-item-title {
            font-size: 13px;
            font-weight: 500;
            color: var(--gray-900);
        }
        .cp-item-title .cp-index {
            display: inline-block;
            width: 22px; height: 22px; line-height: 22px;
            background: rgba(22,93,255,0.1);
            color: var(--primary);
            border-radius: 50%;
            text-align: center;
            font-size: 12px;
            margin-right: 6px;
        }
        .cp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
        }
        .cp-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .cp-field label {
            display: block;
            font-size: 12px;
            color: var(--gray-600);
            margin-bottom: 4px;
            font-weight: 500;
        }
        .cp-field input, .cp-field select, .cp-field textarea {
            width: 100%;
            padding: 7px 10px;
            border: 1px solid var(--gray-200);
            border-radius: 6px;
            font-size: 13px;
            background: white;
            transition: all 0.2s;
            font-family: inherit;
        }
        .cp-field input:focus, .cp-field select:focus, .cp-field textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(22,93,255,0.1);
        }
        .cp-field textarea {
            min-height: 70px;
            resize: vertical;
            font-family: Consolas, Monaco, monospace;
        }
        .cp-empty {
            padding: 24px;
            text-align: center;
            color: var(--gray-600);
            font-size: 13px;
            background: white;
            border: 1px dashed var(--gray-200);
            border-radius: 8px;
        }
        .cp-empty i { font-size: 28px; color: var(--gray-300); margin-bottom: 8px; display: block; }
        .cp-remove-btn {
            background: none;
            border: none;
            color: var(--danger);
            cursor: pointer;
            font-size: 13px;
            padding: 4px 8px;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .cp-remove-btn:hover { background: rgba(245,63,63,0.1); }
        .cp-add-btn {
            background: white;
            border: 1px dashed var(--primary);
            color: var(--primary);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            width: 100%;
            margin-top: 8px;
            transition: all 0.2s;
        }
        .cp-add-btn:hover { background: rgba(22,93,255,0.05); }

        /* 包名修改范围组件 */
        .pkg-scope-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            background: white;
            padding: 14px;
            border-radius: 8px;
            border: 1px solid var(--gray-200);
        }
        .pkg-scope-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px;
            background: #fafbfc;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
            color: var(--gray-900);
        }
        .pkg-scope-item:hover { background: rgba(22,93,255,0.05); }
        .pkg-scope-item input[type="checkbox"] {
            width: 16px; height: 16px; cursor: pointer;
            accent-color: var(--primary);
        }
        .pkg-scope-item .pkg-default-tag {
            margin-left: auto;
            font-size: 11px;
            color: var(--gray-600);
            background: var(--gray-200);
            padding: 1px 6px;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);
}

// ==================== 通用配置参数组件 ===================
class ConfigParamList {
    /**
     * @param {string} containerId - 容器DOM ID
     * @param {Array} initialData - 初始数据 [{location, fileName, contentType, jsonContent}]
     * @param {object} options - {title, addBtnText}
     */
    constructor(containerId, initialData = [], options = {}) {
        injectConfigParamStyles();
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.data = JSON.parse(JSON.stringify(initialData || []));
        this.title = options.title || '多配置参数';
        this.addBtnText = options.addBtnText || '+ 新增配置参数';
        this.onChange = options.onChange || null;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="cp-section">
                <div class="cp-section-header">
                    <div class="cp-section-title">
                        <i class="fa fa-list-alt"></i>
                        <span>${this.title}</span>
                        <span class="tag tag-blue" style="margin-left:6px;">${this.data.length} 项</span>
                    </div>
                </div>
                <div class="cp-list" id="${this.container.id}_list"></div>
                <button type="button" class="cp-add-btn" id="${this.container.id}_add">
                    <i class="fa fa-plus"></i> ${this.addBtnText}
                </button>
            </div>
        `;
        this._renderList();
        document.getElementById(`${this.container.id}_add`).addEventListener('click', () => this._addItem());
    }

    _renderList() {
        const list = document.getElementById(`${this.container.id}_list`);
        if (this.data.length === 0) {
            list.innerHTML = `<div class="cp-empty"><i class="fa fa-inbox"></i>暂无配置参数，点击下方按钮新增</div>`;
            return;
        }
        list.innerHTML = this.data.map((item, idx) => `
            <div class="cp-item">
                <div class="cp-item-header">
                    <div class="cp-item-title"><span class="cp-index">${idx + 1}</span>配置参数</div>
                    <button type="button" class="cp-remove-btn" data-idx="${idx}"><i class="fa fa-trash"></i> 删除</button>
                </div>
                <div class="cp-grid">
                    <div class="cp-field">
                        <label>参数位置</label>
                        <select data-idx="${idx}" data-field="configParameterLocation">
                            <option value="">请选择</option>
                            ${ConfigParameterLocationList.map(o => `<option value="${o.value}" ${item.configParameterLocation === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                        </select>
                    </div>
                    <div class="cp-field">
                        <label>参数文件名</label>
                        <input type="text" data-idx="${idx}" data-field="configParameterFileName" value="${item.configParameterFileName || ''}" placeholder="如: config.json" />
                    </div>
                    <div class="cp-field">
                        <label>参数内容格式</label>
                        <select data-idx="${idx}" data-field="configParameterContentType">
                            <option value="">请选择</option>
                            ${ConfigParameterContentTypeList.map(o => `<option value="${o.value}" ${item.configParameterContentType === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="cp-field" style="margin-top:10px;">
                    <label>参数内容 (JSON / 文本)</label>
                    <textarea data-idx="${idx}" data-field="configParameterJsonContent" placeholder='{"key": "value"}'>${item.configParameterJsonContent || ''}</textarea>
                </div>
            </div>
        `).join('');

        // 绑定删除
        list.querySelectorAll('.cp-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                this.data.splice(idx, 1);
                this._renderList();
                this._triggerChange();
            });
        });
        // 绑定字段变更
        list.querySelectorAll('[data-field]').forEach(el => {
            el.addEventListener('input', () => {
                const idx = parseInt(el.dataset.idx);
                const field = el.dataset.field;
                this.data[idx][field] = el.value;
                this._triggerChange();
            });
            el.addEventListener('change', () => {
                const idx = parseInt(el.dataset.idx);
                const field = el.dataset.field;
                this.data[idx][field] = el.value;
                this._triggerChange();
            });
        });
    }

    _addItem() {
        this.data.push({
            configParameterLocation: '',
            configParameterFileName: '',
            configParameterContentType: 'JSON',
            configParameterJsonContent: ''
        });
        this._renderList();
        this._triggerChange();
    }

    getData() { return this.data; }

    setData(data) {
        this.data = JSON.parse(JSON.stringify(data || []));
        this._renderList();
    }

    _triggerChange() {
        if (this.onChange) this.onChange(this.data);
    }
}

// ==================== 包名修改范围组件 ===================
class PackageNameScope {
    /**
     * @param {string} containerId - 容器DOM ID
     * @param {object} initialData - {isModifyActivity, isModifyService...}
     * @param {object} options - {title, showDefaultTag}
     */
    constructor(containerId, initialData = null, options = {}) {
        injectConfigParamStyles();
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.title = options.title || '包名修改范围配置';
        this.showDefaultTag = options.showDefaultTag !== false;
        this.onChange = options.onChange || null;
        // 默认值按 Java 实体注释
        this.data = initialData || {
            isModifyActivity: false,
            isModifyService: true,
            isModifyApplication: false,
            isModifyReceiver: true,
            isModifyPermission: true,
            isModifyProvider: true,
            isModifyActivityAlias: true
        };
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="cp-section">
                <div class="cp-section-header">
                    <div class="cp-section-title">
                        <i class="fa fa-cubes"></i>
                        <span>${this.title}</span>
                    </div>
                </div>
                <div class="pkg-scope-grid">
                    ${PackageNameModifyScopeList.map(s => `
                        <label class="pkg-scope-item">
                            <input type="checkbox" data-key="${s.key}" ${this.data[s.key] ? 'checked' : ''} />
                            <span>${s.label}</span>
                            ${this.showDefaultTag ? `<span class="pkg-default-tag">默认${s.defaultVal ? '是' : '否'}</span>` : ''}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        this.container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                this.data[cb.dataset.key] = cb.checked;
                this._triggerChange();
            });
        });
    }

    getData() { return this.data; }
    setData(data) {
        this.data = { ...this.data, ...(data || {}) };
        this.render();
    }
    _triggerChange() { if (this.onChange) this.onChange(this.data); }
}

// 暴露到全局
window.ConfigParamList = ConfigParamList;
window.PackageNameScope = PackageNameScope;
window.ConfigParameterLocation = ConfigParameterLocation;
window.ConfigParameterContentType = ConfigParameterContentType;
