# 纸上生花：中国剪纸非遗多维信息可视化设计

《信息可视化》课程设计项目，围绕中国剪纸非遗进行数据分析、生成艺术与交互叙事整合。

## 在线/本地运行

本项目为纯前端静态网页。部署到 GitHub Pages 后可直接访问仓库 Pages 地址。

本地运行方式：

```bash
python -m http.server 8771
```

然后访问：

```text
http://127.0.0.1:8771/index.html
```

也可以直接双击 `index.html` 查看；若浏览器限制本地资源读取，建议使用上面的本地服务器方式。

## 项目模块

- 模块 A：非遗数据分析信息可视化设计，使用 ECharts 展示省份分布、批次结构和关键词频次。
- 模块 B：剪纸图形艺术信息可视化设计，使用 p5.js 生成团花、花鸟、吉祥纹等剪纸纹样。
- 模块 C：文化叙事与交互整合设计，将数据分析和生成艺术整合为滚动叙事网页。
- 模块 D：设计说明文档，包含项目背景、数据来源、处理方法、图表依据、生成逻辑和交互说明。

## 主要文件

- `index.html`：网页入口。
- `styles/main.css`：主页面样式。
- `scripts/app.js`：模块 A 图表逻辑。
- `scripts/papercut-art.js`：模块 B 生成艺术逻辑。
- `data/heritage_papercut_projects.csv`：清洗后的剪纸非遗数据集。
- `data/raw_heritage_papercut_projects.csv`：原始整理表与来源留痕表。
- `data/data_cleaning_process.docx`：原始数据来源与清洗过程说明。
- `design_report_papercut.pdf`：课程设计说明书 PDF。
- `poster_course_showcase.png`：1080 × 1920 成果展示海报。

## 技术栈

- HTML / CSS / JavaScript
- ECharts
- p5.js

## 数据说明

数据主要依据中国非物质文化遗产网国家级非遗代表性项目名录公开资料整理，筛选与剪纸、刻纸、凿花、过门笺等相关的传统美术项目。地理坐标为近似定位，仅用于信息可视化表达。
