# TSV 阅读器 SPA

一个轻量级的 TSV（Tab-Separated Values）文件阅读器，专为**翻译工作者**设计。完全在浏览器中本地运行，无需后端服务器。

## ✨ 功能特性

- **文件加载**：支持拖放上传或点击选择（`.tsv`、`.txt`、`.csv`）
- **数据展示**：以表格形式清晰展示数据，支持分页浏览
- **ID 筛选**：针对第一列，支持精确筛选或范围筛选（如 `82, 100-120`）
- **全文搜索**：在所有列中进行关键词搜索
- **列排序**：点击列标题进行升序/降序排序
- **文本换行**：可切换单元格内容是否自动换行
- **选择性导出**：可选择特定列导出为新的 TSV 文件

## 🚀 使用方法

直接在浏览器中打开 `spa.html` 即可使用。

```
双击 spa.html 文件，或拖入 Chrome 浏览器窗口
```

## 📁 项目结构

```
tsv-reader-spa/
├── spa.html              # 主入口文件
├── app.js                # 预编译的应用代码
├── README.md
└── vendor/               # 本地化静态资源
    ├── css/
    │   └── fonts.css     # Inter 字体定义
    ├── fonts/
    │   └── inter-*.woff2 # Inter 字体文件
    └── js/
        ├── tailwind.js                   # Tailwind CSS
        ├── react.production.min.js       # React 18
        └── react-dom.production.min.js   # ReactDOM 18
```

## 🔒 隐私与安全

- **纯前端应用**：所有数据处理都在用户浏览器本地完成
- **零网络请求**：所有静态资源已本地化，无需外网连接
- **无数据上传**：您的文件内容不会离开您的设备

## 🛠️ 技术栈

- React 18（生产版本）
- Tailwind CSS
- Inter 字体

## 💡 适用场景

- CAT 工具导出的 TSV 翻译文件查看
- 翻译记忆库 (TM) 数据检索
- 术语库浏览与筛选
- 批量翻译结果对比检查

## 📝 许可证

MIT License
