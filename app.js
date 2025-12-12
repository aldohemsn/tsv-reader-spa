// TSV Reader SPA - Production Build (Pre-compiled, No Babel)
// For translators working with TSV files

const { useState, useMemo, useRef } = React;

// --- Icons (Inlined SVG Components) ---
const IconBase = ({ children, className = "", ...props }) =>
    React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        ...props
    }, children);

const Upload = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    React.createElement("polyline", { points: "17 8 12 3 7 8" }),
    React.createElement("line", { x1: "12", x2: "12", y1: "3", y2: "15" })
);

const FileText = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
    React.createElement("polyline", { points: "14 2 14 8 20 8" })
);

const Search = (props) => React.createElement(IconBase, props,
    React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
    React.createElement("line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" })
);

const Trash2 = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
    React.createElement("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
    React.createElement("line", { x1: "10", x2: "10", y1: "11", y2: "17" }),
    React.createElement("line", { x1: "14", x2: "14", y1: "11", y2: "17" })
);

const ChevronLeft = (props) => React.createElement(IconBase, props,
    React.createElement("polyline", { points: "15 18 9 12 15 6" })
);

const ChevronRight = (props) => React.createElement(IconBase, props,
    React.createElement("polyline", { points: "9 18 15 12 9 6" })
);

const ArrowUpDown = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "m7 15 5 5 5-5" }),
    React.createElement("path", { d: "m7 9 5-5 5 5" })
);

const ArrowUp = (props) => React.createElement(IconBase, props,
    React.createElement("line", { x1: "12", x2: "12", y1: "19", y2: "5" }),
    React.createElement("polyline", { points: "5 12 12 5 19 12" })
);

const ArrowDown = (props) => React.createElement(IconBase, props,
    React.createElement("line", { x1: "12", x2: "12", y1: "5", y2: "19" }),
    React.createElement("polyline", { points: "19 12 12 19 5 12" })
);

const AlertCircle = (props) => React.createElement(IconBase, props,
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    React.createElement("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
    React.createElement("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
);

const WrapText = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M3 12h15a3 3 0 1 1 0 6h-4" }),
    React.createElement("polyline", { points: "16 16 14 18 16 20" })
);

const Hash = (props) => React.createElement(IconBase, props,
    React.createElement("line", { x1: "4", x2: "20", y1: "9", y2: "9" }),
    React.createElement("line", { x1: "4", x2: "20", y1: "15", y2: "15" }),
    React.createElement("line", { x1: "10", x2: "8", y1: "3", y2: "21" }),
    React.createElement("line", { x1: "16", x2: "14", y1: "3", y2: "21" })
);

const Download = (props) => React.createElement(IconBase, props,
    React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    React.createElement("polyline", { points: "7 10 12 15 17 10" }),
    React.createElement("line", { x1: "12", x2: "12", y1: "15", y2: "3" })
);

const X = (props) => React.createElement(IconBase, props,
    React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
);

// --- Button Component ---
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, title = '' }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm",
        danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
        success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
    };

    return React.createElement("button", {
        onClick: onClick,
        className: `${baseStyles} ${variants[variant]} ${className}`,
        disabled: disabled,
        title: title
    }, children);
};

// --- Main TSV Reader Component ---
function TSVReader() {
    // --- State ---
    const [data, setData] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortConfig, setSortConfig] = useState(null);
    const [isWrapped, setIsWrapped] = useState(false);
    
    // Export Modal State
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(new Set());

    const fileInputRef = useRef(null);

    // --- Handlers ---
    const parseTSV = (text) => {
        try {
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            
            if (lines.length === 0) {
                throw new Error("文件内容为空");
            }

            const headers = lines[0].split('\t');
            
            const rows = lines.slice(1).map(line => {
                const cells = line.split('\t');
                while (cells.length < headers.length) {
                    cells.push('');
                }
                return cells;
            });

            setData({ headers, rows });
            setError(null);
        } catch (err) {
            setError("解析失败，请确保文件为有效的 TSV 格式");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        setLoading(true);
        setFileName(file.name);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                parseTSV(text);
            }
        };
        reader.onerror = () => {
            setError("读取文件时出错");
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setLoading(true);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    parseTSV(text);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleSort = (columnIndex) => {
        let direction = 'ascending';
        
        if (sortConfig && sortConfig.key === columnIndex && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        
        setSortConfig({ key: columnIndex, direction });
    };

    const resetData = () => {
        setData(null);
        setFileName('');
        setError(null);
        setSearchTerm('');
        setIdFilter('');
        setSortConfig(null);
        setCurrentPage(1);
        setIsWrapped(false);
        setShowExportModal(false);
        setSelectedColumns(new Set());
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const toggleColumnSelection = (index) => {
        const newSelection = new Set(selectedColumns);
        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        setSelectedColumns(newSelection);
    };

    const selectAllColumns = () => {
        if (!data) return;
        setSelectedColumns(new Set(data.headers.map((_, i) => i)));
    };

    const deselectAllColumns = () => {
        setSelectedColumns(new Set());
    };

    // --- Derived State (Filtering & Sorting) ---
    const processedRows = useMemo(() => {
        if (!data) return [];

        let rows = [...data.rows];

        // 1. ID Filter
        if (idFilter.trim()) {
            const segments = idFilter.split(/[,，\s]+/).filter(Boolean);
            const exactIds = new Set();
            const ranges = [];

            segments.forEach(seg => {
                if (seg.includes('-')) {
                    const parts = seg.split('-');
                    if (parts.length === 2) {
                        const start = parseInt(parts[0], 10);
                        const end = parseInt(parts[1], 10);
                        if (!isNaN(start) && !isNaN(end)) {
                            ranges.push({ min: Math.min(start, end), max: Math.max(start, end) });
                        }
                    }
                } else {
                    exactIds.add(seg.trim());
                }
            });

            if (exactIds.size > 0 || ranges.length > 0) {
                rows = rows.filter(row => {
                    const rowIdStr = row[0] ? row[0].trim() : '';
                    
                    if (exactIds.has(rowIdStr)) return true;

                    if (ranges.length > 0) {
                        const rowIdNum = parseInt(rowIdStr, 10);
                        if (!isNaN(rowIdNum)) {
                            return ranges.some(r => rowIdNum >= r.min && rowIdNum <= r.max);
                        }
                    }
                    
                    return false;
                });
            }
        }

        // 2. Search Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            rows = rows.filter(row => 
                row.some(cell => cell.toLowerCase().includes(lowerTerm))
            );
        }

        // 3. Sort
        if (sortConfig !== null) {
            rows.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                const aNum = parseFloat(aVal);
                const bNum = parseFloat(bVal);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === 'ascending' ? aNum - bNum : bNum - aNum;
                }

                if (aVal < bVal) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return rows;
    }, [data, searchTerm, idFilter, sortConfig]);

    // --- Export Handler ---
    const executeExport = () => {
        if (!processedRows.length || !data) return;

        const columnIndices = Array.from(selectedColumns).sort((a, b) => a - b);
        
        if (columnIndices.length === 0) {
            alert("请至少选择一列进行导出");
            return;
        }

        const headerRow = columnIndices.map(i => data.headers[i]).join('\t');
        
        const dataRows = processedRows.map(row => {
            return columnIndices.map(i => row[i]).join('\t');
        }).join('\n');
        
        const tsvContent = `${headerRow}\n${dataRows}`;

        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const nameParts = fileName.split('.');
        const ext = nameParts.pop();
        const baseName = nameParts.join('.');
        link.download = `${baseName}_导出.${ext || 'tsv'}`;
        
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
        setShowExportModal(false);
    };

    // --- Pagination Logic ---
    const totalPages = Math.ceil(processedRows.length / rowsPerPage);
    const currentRows = processedRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // --- Render: Upload Screen ---
    if (!data) {
        return React.createElement("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans" },
            React.createElement("div", {
                className: "w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 text-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer group",
                onDragOver: handleDragOver,
                onDrop: handleDrop,
                onClick: () => fileInputRef.current?.click()
            },
                React.createElement("div", { className: "w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" },
                    React.createElement(Upload, { className: "w-10 h-10 text-blue-600" })
                ),
                React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "TSV 阅读器"),
                React.createElement("p", { className: "text-gray-500 mb-8 text-lg" },
                    "拖放 TSV 文件到此处，",
                    React.createElement("br"),
                    "或点击选择文件"
                ),
                React.createElement("input", {
                    type: "file",
                    accept: ".tsv,.txt,.csv",
                    ref: fileInputRef,
                    onChange: handleFileUpload,
                    className: "hidden"
                }),
                React.createElement(Button, { className: "mx-auto" }, "选择文件"),
                loading && React.createElement("p", { className: "mt-4 text-blue-600 animate-pulse" }, "正在处理文件..."),
                error && React.createElement("div", { className: "mt-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2" },
                    React.createElement(AlertCircle, { size: 20 }),
                    error
                )
            ),
            React.createElement("p", { className: "mt-8 text-sm text-gray-400" },
                "支持 .tsv、.txt、.csv 文件。所有数据处理均在本地完成，不会上传。"
            )
        );
    }

    // --- Render: Data Table Screen ---
    return React.createElement("div", { className: "min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800 relative" },
        
        // Top Bar
        React.createElement("div", { className: "bg-white shadow-sm border-b sticky top-0 z-20" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-4" },
                React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4" },
                    
                    // File Info
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("div", { className: "bg-blue-100 p-2 rounded-lg" },
                            React.createElement(FileText, { className: "text-blue-600 w-6 h-6" })
                        ),
                        React.createElement("div", null,
                            React.createElement("h1", { className: "font-bold text-lg leading-tight truncate max-w-xs" }, fileName),
                            React.createElement("p", { className: "text-xs text-gray-500" },
                                `${processedRows.length.toLocaleString()} 行（筛选后）• ${data.headers.length} 列`
                            )
                        )
                    ),

                    // Controls
                    React.createElement("div", { className: "flex items-center gap-3 flex-1 md:justify-end flex-wrap" },
                        
                        // ID Filter Input
                        React.createElement("div", { className: "relative w-full md:w-40 group" },
                            React.createElement("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" },
                                React.createElement(Hash, { className: "h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" })
                            ),
                            React.createElement("input", {
                                type: "text",
                                placeholder: "ID: 82, 100-120...",
                                className: "block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm",
                                value: idFilter,
                                onChange: (e) => { setIdFilter(e.target.value); setCurrentPage(1); },
                                title: "按 ID（第一列）筛选。多个用逗号分隔，范围用连字符"
                            })
                        ),

                        // General Search Input
                        React.createElement("div", { className: "relative w-full md:w-64 group" },
                            React.createElement("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" },
                                React.createElement(Search, { className: "h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" })
                            ),
                            React.createElement("input", {
                                type: "text",
                                placeholder: "搜索内容...",
                                className: "block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm",
                                value: searchTerm,
                                onChange: (e) => { setSearchTerm(e.target.value); setCurrentPage(1); }
                            })
                        ),
                        
                        React.createElement("div", { className: "h-8 w-px bg-gray-300 mx-1 hidden md:block" }),

                        // Wrapping Toggle
                        React.createElement(Button, {
                            variant: "secondary",
                            onClick: () => setIsWrapped(!isWrapped),
                            className: "whitespace-nowrap",
                            title: isWrapped ? "取消换行" : "启用换行"
                        },
                            React.createElement(WrapText, { size: 16, className: isWrapped ? "text-blue-600" : "text-gray-500" }),
                            React.createElement("span", { className: "hidden sm:inline" }, isWrapped ? "不换行" : "换行")
                        ),

                        // Export Button
                        React.createElement(Button, {
                            variant: "success",
                            onClick: () => setShowExportModal(true),
                            className: "whitespace-nowrap",
                            title: "选择列并导出"
                        },
                            React.createElement(Download, { size: 16 }),
                            React.createElement("span", { className: "hidden sm:inline" }, "导出")
                        ),

                        React.createElement(Button, {
                            variant: "danger",
                            onClick: resetData,
                            className: "whitespace-nowrap"
                        },
                            React.createElement(Trash2, { size: 16 }),
                            React.createElement("span", { className: "hidden sm:inline" }, "关闭")
                        )
                    )
                )
            )
        ),

        // Main Content Area
        React.createElement("main", { className: "flex-1 overflow-hidden p-4 md:p-6 max-w-8xl mx-auto w-full flex flex-col" },
            
            // Table Container
            React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden" },
                
                // Scrollable Table Area
                React.createElement("div", { className: "overflow-auto flex-1 relative" },
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50 sticky top-0 z-10" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b w-16" }, "#"),
                                data.headers.map((header, idx) =>
                                    React.createElement("th", {
                                        key: idx,
                                        onClick: () => handleSort(idx),
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-colors group select-none whitespace-nowrap"
                                    },
                                        React.createElement("div", { className: "flex items-center gap-2" },
                                            header || `列 ${idx + 1}`,
                                            React.createElement("span", { className: "text-gray-300 group-hover:text-gray-500" },
                                                sortConfig?.key === idx
                                                    ? (sortConfig.direction === 'ascending'
                                                        ? React.createElement(ArrowUp, { size: 14 })
                                                        : React.createElement(ArrowDown, { size: 14 }))
                                                    : React.createElement(ArrowUpDown, { size: 14 })
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" },
                            currentRows.length > 0
                                ? currentRows.map((row, rowIdx) =>
                                    React.createElement("tr", { key: rowIdx, className: "hover:bg-blue-50/50 transition-colors" },
                                        React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono select-none align-top" },
                                            (currentPage - 1) * rowsPerPage + rowIdx + 1
                                        ),
                                        row.map((cell, cellIdx) =>
                                            React.createElement("td", {
                                                key: cellIdx,
                                                className: `px-6 py-4 text-sm text-gray-700 align-top ${isWrapped ? 'whitespace-normal break-words min-w-[150px] max-w-3xl' : 'whitespace-nowrap max-w-xs truncate'}`,
                                                title: cell
                                            }, cell)
                                        )
                                    )
                                )
                                : React.createElement("tr", null,
                                    React.createElement("td", { colSpan: data.headers.length + 1, className: "px-6 py-12 text-center text-gray-500" },
                                        React.createElement("div", { className: "flex flex-col items-center justify-center" },
                                            React.createElement(Search, { className: "w-12 h-12 text-gray-300 mb-3" }),
                                            React.createElement("p", { className: "text-lg font-medium" }, "未找到结果"),
                                            React.createElement("p", { className: "text-sm" }, "请尝试调整筛选条件")
                                        )
                                    )
                                )
                        )
                    )
                ),

                // Footer / Pagination
                React.createElement("div", { className: "bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6" },
                    React.createElement("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm text-gray-700" },
                                "显示第 ",
                                React.createElement("span", { className: "font-medium" }, Math.min(processedRows.length, (currentPage - 1) * rowsPerPage + 1)),
                                " 至 ",
                                React.createElement("span", { className: "font-medium" }, Math.min(processedRows.length, currentPage * rowsPerPage)),
                                " 条，共 ",
                                React.createElement("span", { className: "font-medium" }, processedRows.length),
                                " 条"
                            )
                        ),
                        
                        React.createElement("div", { className: "flex items-center gap-4" },
                            React.createElement("select", {
                                value: rowsPerPage,
                                onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); },
                                className: "text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-1"
                            },
                                React.createElement("option", { value: 15 }, "15 行"),
                                React.createElement("option", { value: 50 }, "50 行"),
                                React.createElement("option", { value: 100 }, "100 行"),
                                React.createElement("option", { value: 500 }, "500 行")
                            ),

                            React.createElement("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination" },
                                React.createElement("button", {
                                    onClick: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
                                    disabled: currentPage === 1,
                                    className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                },
                                    React.createElement("span", { className: "sr-only" }, "上一页"),
                                    React.createElement(ChevronLeft, { className: "h-5 w-5", "aria-hidden": "true" })
                                ),
                                
                                React.createElement("span", { className: "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700" },
                                    `第 ${currentPage} / ${totalPages || 1} 页`
                                ),

                                React.createElement("button", {
                                    onClick: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
                                    disabled: currentPage === totalPages || totalPages === 0,
                                    className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                },
                                    React.createElement("span", { className: "sr-only" }, "下一页"),
                                    React.createElement(ChevronRight, { className: "h-5 w-5", "aria-hidden": "true" })
                                )
                            )
                        )
                    ),
                    // Mobile Pagination View
                    React.createElement("div", { className: "flex sm:hidden w-full justify-between items-center" },
                        React.createElement("button", {
                            onClick: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
                            disabled: currentPage === 1,
                            className: "px-3 py-1 border rounded text-sm disabled:opacity-50"
                        }, "上一页"),
                        React.createElement("span", { className: "text-sm text-gray-600" },
                            `${currentPage} / ${totalPages || 1}`
                        ),
                        React.createElement("button", {
                            onClick: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
                            disabled: currentPage === totalPages,
                            className: "px-3 py-1 border rounded text-sm disabled:opacity-50"
                        }, "下一页")
                    )
                )
            )
        ),

        // Export Modal
        showExportModal && React.createElement("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]" },
                React.createElement("div", { className: "p-4 border-b flex justify-between items-center" },
                    React.createElement("h3", { className: "font-bold text-lg text-gray-800" }, "导出选项"),
                    React.createElement("button", {
                        onClick: () => setShowExportModal(false),
                        className: "text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-100"
                    },
                        React.createElement(X, { size: 20 })
                    )
                ),
                React.createElement("div", { className: "p-4 bg-gray-50 border-b flex justify-between items-center text-sm" },
                    React.createElement("span", { className: "font-medium text-gray-600" }, "选择要导出的列："),
                    React.createElement("div", { className: "space-x-2" },
                        React.createElement("button", { onClick: selectAllColumns, className: "text-blue-600 hover:underline" }, "全选"),
                        React.createElement("span", { className: "text-gray-300" }, "|"),
                        React.createElement("button", { onClick: deselectAllColumns, className: "text-blue-600 hover:underline" }, "取消全选")
                    )
                ),
                React.createElement("div", { className: "p-4 overflow-y-auto flex-1" },
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
                        data.headers.map((header, idx) =>
                            React.createElement("label", {
                                key: idx,
                                className: "flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
                            },
                                React.createElement("input", {
                                    type: "checkbox",
                                    className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                                    checked: selectedColumns.has(idx),
                                    onChange: () => toggleColumnSelection(idx)
                                }),
                                React.createElement("span", { className: "text-sm text-gray-700 truncate select-none", title: header },
                                    header || `列 ${idx + 1}`
                                )
                            )
                        )
                    )
                ),
                React.createElement("div", { className: "p-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-xl" },
                    React.createElement(Button, { variant: "secondary", onClick: () => setShowExportModal(false) }, "取消"),
                    React.createElement(Button, { variant: "success", onClick: executeExport, disabled: selectedColumns.size === 0 }, "下载 TSV")
                )
            )
        )
    );
}

// --- Initialize App ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TSVReader));
