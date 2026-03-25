let dataSources = [
    {
        id: 'ds_1',
        name: 'Demo eCommerce DB',
        type: 'postgresql',
        host: 'localhost',
        port: '5432',
        user: 'admin',
        pass: 'demo',
        dbName: 'ecommerce',
        tables: [
            {
                name: 'Users',
                columns: [
                    { name: 'id', type: 'integer' },
                    { name: 'name', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'age', type: 'integer' },
                    { name: 'created_at', type: 'timestamp' }
                ]
            },
            {
                name: 'Orders',
                columns: [
                    { name: 'id', type: 'integer' },
                    { name: 'user_id', type: 'integer' },
                    { name: 'product_id', type: 'integer' },
                    { name: 'status', type: 'string' },
                    { name: 'total_amount', type: 'decimal' },
                    { name: 'order_date', type: 'timestamp' }
                ]
            },
            {
                name: 'Products',
                columns: [
                    { name: 'id', type: 'integer' },
                    { name: 'name', type: 'string' },
                    { name: 'category', type: 'string' },
                    { name: 'price', type: 'decimal' },
                    { name: 'stock', type: 'integer' }
                ]
            }
        ],
        db: {
            Users: [
                { id: 1, name: 'Alice Smith', email: 'alice@example.com', age: 28, created_at: '2023-01-15 08:30:00' },
                { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', age: 34, created_at: '2023-02-20 14:15:00' },
                { id: 3, name: 'Charlie Davis', email: 'charlie.d@example.com', age: 22, created_at: '2023-03-10 09:45:00' },
                { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 29, created_at: '2023-04-05 11:20:00' },
                { id: 5, name: 'Evan Wright', email: 'evan.w@example.com', age: 41, created_at: '2023-05-12 16:00:00' },
                { id: 6, name: 'Fiona Gallagher', email: 'fiona.g@example.com', age: 26, created_at: '2023-06-18 10:10:00' },
                { id: 7, name: 'George Miller', email: 'george.m@example.com', age: 38, created_at: '2023-07-22 13:25:00' },
                { id: 8, name: 'Hannah Lee', email: 'hannah.l@example.com', age: 31, created_at: '2023-08-30 09:05:00' }
            ],
            Products: [
                { id: 101, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 150 },
                { id: 102, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.50, stock: 85 },
                { id: 103, name: 'Running Shoes', category: 'Clothing', price: 89.00, stock: 200 },
                { id: 104, name: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, stock: 500 },
                { id: 105, name: 'Sci-Fi Novel', category: 'Books', price: 14.95, stock: 300 },
                { id: 106, name: 'Desk Lamp', category: 'Home', price: 34.50, stock: 120 },
                { id: 107, name: 'Coffee Maker', category: 'Home', price: 79.00, stock: 60 }
            ],
            Orders: [
                { id: 1001, user_id: 1, product_id: 101, status: 'Completed', total_amount: 99.99, order_date: '2023-09-01 10:00:00' },
                { id: 1002, user_id: 2, product_id: 103, status: 'Pending', total_amount: 89.00, order_date: '2023-09-02 11:30:00' },
                { id: 1003, user_id: 1, product_id: 105, status: 'Completed', total_amount: 14.95, order_date: '2023-09-05 09:15:00' },
                { id: 1004, user_id: 3, product_id: 102, status: 'Completed', total_amount: 129.50, order_date: '2023-09-10 14:20:00' },
                { id: 1005, user_id: 4, product_id: 107, status: 'Refunded', total_amount: 79.00, order_date: '2023-09-12 16:45:00' },
                { id: 1006, user_id: 5, product_id: 104, status: 'Pending', total_amount: 39.98, order_date: '2023-09-15 08:50:00' },
                { id: 1007, user_id: 6, product_id: 101, status: 'Completed', total_amount: 99.99, order_date: '2023-09-18 13:10:00' },
                { id: 1008, user_id: 2, product_id: 106, status: 'Completed', total_amount: 34.50, order_date: '2023-09-20 10:25:00' },
                { id: 1009, user_id: 7, product_id: 105, status: 'Completed', total_amount: 29.90, order_date: '2023-09-22 09:40:00' },
                { id: 1010, user_id: 8, product_id: 103, status: 'Completed', total_amount: 89.00, order_date: '2023-09-25 15:30:00' }
            ]
        }
    }
];

// Query State
const queryState = {
    columns: [], // Array of { sourceId, table, column }
    filters: []  // Array of { sourceId, table, column, operator, value }
};

// DOM Elements - Builder & General
const schemaTreeEl = document.getElementById('schema-tree');
const schemaSearchEl = document.getElementById('schema-search');
const dzColumnsEl = document.getElementById('dz-columns');
const dzFiltersEl = document.getElementById('dz-filters');
const btnClear = document.getElementById('btn-clear');
const btnRun = document.getElementById('btn-run');
const resultsThead = document.getElementById('results-thead');
const resultsTbody = document.getElementById('results-tbody');
const resultsMeta = document.getElementById('results-meta');

// Source Management Elements
const btnAddSource = document.getElementById('btn-add-source');
const sourceModal = document.getElementById('source-modal');
const closeSourceModalBtn = document.getElementById('close-source-modal');
const cancelSourceBtn = document.getElementById('cancel-source-btn');
const saveSourceBtn = document.getElementById('save-source-btn');
const btnLoadSample = document.getElementById('btn-load-sample');

const sourceIdInput = document.getElementById('source-id-input');
const sourceTablesInput = document.getElementById('source-tables-input');
const sourceNameInput = document.getElementById('source-name');
const sourceTypeSelect = document.getElementById('source-type');
const sourceDbnameInput = document.getElementById('source-dbname');
const sourceHostInput = document.getElementById('source-host');
const sourcePortInput = document.getElementById('source-port');
const sourceUserInput = document.getElementById('source-user');
const sourcePassInput = document.getElementById('source-pass');
const sourceSchemaJsonInput = document.getElementById('source-schema-json');
const sourceModalTitle = document.getElementById('source-modal-title');

// Filter Modal Elements
const filterModal = document.getElementById('filter-modal');
const closeFilterModalBtn = document.getElementById('close-filter-modal');
const cancelFilterBtn = document.getElementById('cancel-filter-btn');
const filterTitleEl = document.getElementById('filter-modal-title');
const filterOperatorSelect = document.getElementById('filter-operator-select');
const filterValueInput = document.getElementById('filter-value-input');
const saveFilterBtn = document.getElementById('save-filter-btn');

let pendingFilterItem = null;

function init() {
    renderDataSources();
    setupDragAndDrop();
    setupEventListeners();
    setupSourceManagementListeners();
}

function renderDataSources() {
    schemaTreeEl.innerHTML = '';
    dataSources.forEach(source => {
        // Source Group Wrapper
        const sourceWrapper = document.createElement('div');
        sourceWrapper.className = 'source-group';

        const sourceHeader = document.createElement('div');
        sourceHeader.className = 'source-header';
        sourceHeader.innerHTML = `
            <div><strong>${source.name}</strong> <span style="font-size: 0.75rem; color: #9ca3af;">(${source.type})</span></div>
            <div class="source-actions">
                <button class="icon-btn" onclick="editSource('${source.id}')" title="Edit">✏️</button>
                <button class="icon-btn" onclick="deleteSource('${source.id}')" title="Delete">🗑️</button>
            </div>
        `;
        sourceWrapper.appendChild(sourceHeader);

        source.tables.forEach(table => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'table-group expanded';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'table-header';
            headerDiv.innerHTML = `
                <span>🗄️ ${table.name}</span>
                <span class="toggle-icon">▼</span>
            `;
            headerDiv.addEventListener('click', () => {
                groupDiv.classList.toggle('expanded');
                const icon = headerDiv.querySelector('.toggle-icon');
                icon.textContent = groupDiv.classList.contains('expanded') ? '▼' : '▶';
            });

            const columnsList = document.createElement('div');
            columnsList.className = 'table-columns';

            if (table.columns) {
                table.columns.forEach(col => {
                    const colItem = document.createElement('div');
                    colItem.className = 'column-item';
                    colItem.draggable = true;
                    colItem.innerHTML = `
                        <span style="font-size: 10px; margin-right: 8px; color: #9ca3af;" title="${col.type}">
                            ${getTypeIcon(col.type)}
                        </span>
                        ${col.name}
                    `;
                    colItem.dataset.source = source.id;
                    colItem.dataset.sourceName = source.name;
                    colItem.dataset.table = table.name;
                    colItem.dataset.column = col.name;
                    columnsList.appendChild(colItem);
                });
            }

            groupDiv.appendChild(headerDiv);
            groupDiv.appendChild(columnsList);
            sourceWrapper.appendChild(groupDiv);
        });

        schemaTreeEl.appendChild(sourceWrapper);
    });
}

function getTypeIcon(type) {
    if (type === 'integer' || type === 'decimal') return '#';
    if (type === 'string' || type === 'text') return 'A';
    if (type === 'timestamp' || type === 'date') return '🕒';
    return '?';
}

function setupSourceManagementListeners() {
    // Open Add Source Modal
    btnAddSource.addEventListener('click', () => {
        sourceModalTitle.textContent = 'Add Data Source';
        sourceIdInput.value = '';
        sourceNameInput.value = '';
        sourceTypeSelect.value = 'postgresql';
        sourceDbnameInput.value = '';
        sourceHostInput.value = '';
        sourcePortInput.value = '';
        sourceUserInput.value = '';
        sourcePassInput.value = '';
        sourceTablesInput.value = '';
        sourceSchemaJsonInput.value = '';
        sourceModal.classList.remove('hidden');
    });

    // Close Modals
    [closeSourceModalBtn, cancelSourceBtn].forEach(btn => {
        btn?.addEventListener('click', () => {
            sourceModal.classList.add('hidden');
        });
    });

    // Load Sample JSON logic
    btnLoadSample.addEventListener('click', () => {
        const sampleTables = [
            {
                name: 'Events',
                columns: [
                    { name: 'id', type: 'integer' },
                    { name: 'event_name', type: 'string' },
                    { name: 'user_id', type: 'integer' },
                    { name: 'timestamp', type: 'timestamp' }
                ]
            }
        ];
        sourceSchemaJsonInput.value = JSON.stringify(sampleTables, null, 2);
    });

    // Save Data Source
    saveSourceBtn.addEventListener('click', () => {
        const id = sourceIdInput.value;
        const name = sourceNameInput.value.trim();
        if (!name) {
            alert('Source name is required.');
            return;
        }

        let tablesParsed = [];
        const tablesInputStr = sourceTablesInput.value.trim();

        try {
            if (sourceSchemaJsonInput.value.trim()) {
                tablesParsed = JSON.parse(sourceSchemaJsonInput.value);
            } else if (tablesInputStr) {
                // Generate a basic schema so drag and drop works
                tablesParsed = tablesInputStr.split(',').map(name => ({
                    name: name.trim(),
                    columns: [
                        { name: 'id', type: 'integer' },
                        { name: 'name', type: 'string' },
                        { name: 'created_at', type: 'timestamp' }
                    ]
                })).filter(t => t.name !== '');
            }
        } catch (e) {
            alert('Invalid Table Schema JSON');
            return;
        }

        const sourceObj = {
            id: id || 'ds_' + Date.now(),
            name,
            type: sourceTypeSelect.value,
            host: sourceHostInput.value,
            port: sourcePortInput.value,
            user: sourceUserInput.value,
            pass: sourcePassInput.value,
            dbName: sourceDbnameInput.value,
            tables: tablesParsed,
            db: {} // Custom sources don't have mock data connected easily
        };

        if (id) {
            const idx = dataSources.findIndex(s => s.id === id);
            if (idx > -1) {
                // Keep old mock db if present so we don't nuke the demo db
                sourceObj.db = dataSources[idx].db;
                dataSources[idx] = sourceObj;
            }
        } else {
            dataSources.push(sourceObj);
        }

        renderDataSources();
        sourceModal.classList.add('hidden');
    });
}

// Global Edit/Delete exposed to onclick
window.editSource = function(id) {
    const source = dataSources.find(s => s.id === id);
    if (!source) return;
    sourceModalTitle.textContent = 'Edit Data Source';
    sourceIdInput.value = source.id;
    sourceNameInput.value = source.name;
    sourceTypeSelect.value = source.type;
    sourceDbnameInput.value = source.dbName;
    sourceHostInput.value = source.host;
    sourcePortInput.value = source.port;
    sourceUserInput.value = source.user;
    sourcePassInput.value = source.pass;
    sourceTablesInput.value = source.tables.map(t => t.name).join(', ');
    sourceSchemaJsonInput.value = JSON.stringify(source.tables, null, 2);
    sourceModal.classList.remove('hidden');
};

window.deleteSource = function(id) {
    if (confirm("Are you sure you want to delete this Data Source? Selected query components utilizing it will remain but won't be executable.")) {
        dataSources = dataSources.filter(s => s.id !== id);
        renderDataSources();
    }
};

function setupDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList && e.target.classList.contains('column-item')) {
            e.target.classList.add('dragging');
            const payload = {
                sourceId: e.target.dataset.source,
                sourceName: e.target.dataset.sourceName,
                table: e.target.dataset.table,
                column: e.target.dataset.column
            };
            e.dataTransfer.setData('application/json', JSON.stringify(payload));
            e.dataTransfer.effectAllowed = 'copy';
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList && e.target.classList.contains('column-item')) {
            e.target.classList.remove('dragging');
            dzColumnsEl.classList.remove('drag-over');
            dzFiltersEl.classList.remove('drag-over');
        }
    });

    [dzColumnsEl, dzFiltersEl].forEach(dz => {
        dz.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            dz.classList.add('drag-over');
        });

        dz.addEventListener('dragleave', () => {
            dz.classList.remove('drag-over');
        });

        dz.addEventListener('drop', (e) => {
            e.preventDefault();
            dz.classList.remove('drag-over');
            const dataStr = e.dataTransfer.getData('application/json');
            if (dataStr) {
                const item = JSON.parse(dataStr);
                if (dz.id === 'dz-columns') {
                    handleColumnDrop(item);
                } else if (dz.id === 'dz-filters') {
                    handleFilterDrop(item);
                }
            }
        });
    });
}

function handleColumnDrop(item) {
    const exists = queryState.columns.some(c => c.sourceId === item.sourceId && c.table === item.table && c.column === item.column);
    if (!exists) {
        queryState.columns.push(item);
        renderQueryState();
    }
}

function handleFilterDrop(item) {
    pendingFilterItem = item;
    filterTitleEl.textContent = `Filter ${item.sourceName} - ${item.table}.${item.column}`;
    filterValueInput.value = '';
    filterModal.classList.remove('hidden');
    filterValueInput.focus();
}

function renderQueryState() {
    renderDropzone(dzColumnsEl, queryState.columns, 'column');
    renderDropzone(dzFiltersEl, queryState.filters, 'filter');
    
    if (queryState.columns.length > 0 || queryState.filters.length > 0) {
        btnClear.style.opacity = '1';
        btnClear.style.pointerEvents = 'auto';
    } else {
        btnClear.style.opacity = '0.5';
        btnClear.style.pointerEvents = 'none';
        resetResultsTable();
    }
}

function renderDropzone(container, items, type) {
    Array.from(container.children).forEach(child => {
        if (!child.classList.contains('empty-state')) child.remove();
    });
    
    const emptyState = container.querySelector('.empty-state');
    emptyState.style.display = items.length > 0 ? 'none' : 'block';

    items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'dropped-item';
        
        if (type === 'column') {
            itemEl.innerHTML = `
                <span>${item.sourceName}: ${item.table} &middot; <strong>${item.column}</strong></span>
                <button class="remove-btn" data-index="${index}" title="Remove">&times;</button>
            `;
        } else if (type === 'filter') {
            const operatorSymbol = getOperatorSymbol(item.operator);
            itemEl.innerHTML = `
                <span>${item.sourceName}: ${item.table} &middot; <strong>${item.column}</strong></span>
                <span class="filter-badge">${operatorSymbol} ${item.value}</span>
                <button class="remove-btn" data-index="${index}" title="Remove">&times;</button>
            `;
        }
        
        itemEl.querySelector('.remove-btn').addEventListener('click', () => {
            type === 'column' ? queryState.columns.splice(index, 1) : queryState.filters.splice(index, 1);
            renderQueryState();
        });

        container.appendChild(itemEl);
    });
}

function getOperatorSymbol(op) {
    const map = { 'equals': '=', 'not_equals': '!=', 'greater_than': '>', 'less_than': '<', 'contains': 'like' };
    return map[op] || op;
}

function setupEventListeners() {
    schemaSearchEl.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        Array.from(schemaTreeEl.children).forEach(sourceGrp => {
            let srcVisible = false;
            
            Array.from(sourceGrp.querySelectorAll('.table-group')).forEach(group => {
                const tableName = group.querySelector('.table-header span').textContent.toLowerCase();
                const cols = Array.from(group.querySelectorAll('.column-item'));
                let groupVisible = tableName.includes(term);
                
                cols.forEach(col => {
                    const colName = col.textContent.toLowerCase();
                    const colVisible = colName.includes(term);
                    col.style.display = colVisible || groupVisible ? 'flex' : 'none';
                    if (colVisible) groupVisible = true;
                });
                
                group.style.display = groupVisible ? 'block' : 'none';
                if (term && groupVisible) {
                    group.classList.add('expanded');
                    srcVisible = true;
                } else if (groupVisible) {
                    srcVisible = true;
                }
            });

            sourceGrp.style.display = srcVisible || term === '' ? 'block' : 'none';
        });
    });

    [closeFilterModalBtn, cancelFilterBtn].forEach(btn => {
        btn?.addEventListener('click', () => {
            filterModal.classList.add('hidden');
            pendingFilterItem = null;
        });
    });

    saveFilterBtn.addEventListener('click', () => {
        if (pendingFilterItem) {
            queryState.filters.push({
                ...pendingFilterItem,
                operator: filterOperatorSelect.value,
                value: filterValueInput.value
            });
            renderQueryState();
            filterModal.classList.add('hidden');
            pendingFilterItem = null;
        }
    });

    btnClear.addEventListener('click', () => {
        queryState.columns = [];
        queryState.filters = [];
        renderQueryState();
    });

    btnRun.addEventListener('click', runQuery);
}

function resetResultsTable() {
    resultsThead.innerHTML = '';
    resultsTbody.innerHTML = '<tr><td colspan="100%" class="empty-table-state">Run a query to see results</td></tr>';
    resultsMeta.textContent = '';
}

function runQuery() {
    if (queryState.columns.length === 0) {
        alert('Please select at least one column to run the query.');
        return;
    }

    // Validation: Ensure all elements are from the same Data Source for realistic mock execution
    const sourceIds = new Set([...queryState.columns, ...queryState.filters].map(i => i.sourceId));
    if (sourceIds.size > 1) {
        alert('Cross-source querying is not supported in the mock engine. Please select columns and filters from only one Data Source.');
        return;
    }

    btnRun.textContent = 'Running...';
    btnRun.disabled = true;

    setTimeout(() => {
        executeMockSQL(Array.from(sourceIds)[0]);
        btnRun.textContent = 'Run Query';
        btnRun.disabled = false;
    }, 400);
}

function executeMockSQL(sourceId) {
    const dataSource = dataSources.find(s => s.id === sourceId);
    if (!dataSource || !dataSource.db || Object.keys(dataSource.db).length === 0) {
        // Source exists but has no mock data attached. Generate empty data set or random mock.
        resultsMeta.textContent = `0 records found (Custom Data Sources require real backend mapping)`;
        resultsThead.innerHTML = '';
        const trHead = document.createElement('tr');
        queryState.columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = `${col.table}.${col.column}`;
            trHead.appendChild(th);
        });
        resultsThead.appendChild(trHead);
        resultsTbody.innerHTML = '<tr><td colspan="100%" class="empty-table-state">No mock data mapped to this custom data source connection.</td></tr>';
        return;
    }

    const db = dataSource.db;
    const tablesInvolved = new Set([...queryState.columns, ...queryState.filters].map(i => i.table));
    
    // Naive join logic specific to demo data
    let baseData = [];
    if (tablesInvolved.has('Orders')) {
        baseData = (db.Orders || []).map(o => {
            const user = (db.Users || []).find(u => u.id === o.user_id) || {};
            const product = (db.Products || []).find(p => p.id === o.product_id) || {};
            return { Orders: o, Users: user, Products: product };
        });
    } else if (tablesInvolved.has('Users')) {
        baseData = (db.Users || []).map(u => ({ Users: u, Orders: {}, Products: {} }));
    } else if (tablesInvolved.has('Products')) {
        baseData = (db.Products || []).map(p => ({ Products: p, Users: {}, Orders: {} }));
    } else {
        baseData = [];
    }

    // Apply Filters
    let filteredData = baseData.filter(row => {
        return queryState.filters.every(f => {
            const rowValue = row[f.table] ? row[f.table][f.column] : null;
            if (rowValue === undefined || rowValue === null) return false;
            
            const strVal = String(rowValue).toLowerCase();
            const filterVal = f.value.toLowerCase();
            
            switch (f.operator) {
                case 'equals': return strVal === filterVal;
                case 'not_equals': return strVal !== filterVal;
                case 'contains': return strVal.includes(filterVal);
                case 'greater_than': return Number(rowValue) > Number(f.value);
                case 'less_than': return Number(rowValue) < Number(f.value);
                default: return true;
            }
        });
    });

    resultsMeta.textContent = `${filteredData.length} records found`;
    const trHead = document.createElement('tr');
    queryState.columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = `${col.table}.${col.column}`;
        trHead.appendChild(th);
    });
    resultsThead.innerHTML = '';
    resultsThead.appendChild(trHead);

    resultsTbody.innerHTML = '';
    if (filteredData.length === 0) {
        resultsTbody.innerHTML = '<tr><td colspan="100%" class="empty-table-state">No matching records found</td></tr>';
        return;
    }

    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        queryState.columns.forEach(col => {
            const td = document.createElement('td');
            const val = row[col.table] ? row[col.table][col.column] : '';
            td.textContent = val !== undefined ? val : 'N/A';
            tr.appendChild(td);
        });
        resultsTbody.appendChild(tr);
    });
}

// Boot up the application
document.addEventListener('DOMContentLoaded', init);
