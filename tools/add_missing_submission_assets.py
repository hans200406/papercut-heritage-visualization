from pathlib import Path
import csv
import math

from PIL import Image, ImageDraw, ImageFont


root = Path(__file__).resolve().parents[1]
data_dir = root / "data"
source = data_dir / "heritage_papercut_projects.csv"
raw_out = data_dir / "raw_heritage_papercut_projects.csv"

with source.open("r", encoding="utf-8-sig", newline="") as f:
    rows = list(csv.DictReader(f))

fieldnames = [
    "原始项目名称",
    "原始申报地区",
    "原始批次",
    "原始类别",
    "来源类型",
    "来源说明",
    "清洗动作",
    "坐标处理说明",
    "关键词处理说明",
    "清洗后项目名称",
    "清洗后省级地区",
    "清洗后地级/县级地区",
    "清洗后批次",
    "清洗后类别",
    "经度",
    "纬度",
    "视觉关键词",
]

with raw_out.open("w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    for row in rows:
        writer.writerow(
            {
                "原始项目名称": row["项目名称"],
                "原始申报地区": row["地级/县级地区"],
                "原始批次": row["批次"],
                "原始类别": row["类别"],
                "来源类型": "公开名录人工整理",
                "来源说明": "依据中国非物质文化遗产网国家级非遗代表性项目名录公开信息整理；地理与背景信息参考公开行政区资料和UNESCO中国剪纸项目介绍。",
                "清洗动作": "筛选剪纸/刻纸/凿花/过门笺相关项目；统一地区、批次和传统美术类别字段；补充坐标与视觉关键词。",
                "坐标处理说明": "按申报地或代表性传承地近似定位，仅用于信息可视化表达，不作为测绘坐标。",
                "关键词处理说明": "从项目名称、地域、民族和纹样特征中人工提炼，用于连接模块A统计分析和模块B生成艺术。",
                "清洗后项目名称": row["项目名称"],
                "清洗后省级地区": row["省级地区"],
                "清洗后地级/县级地区": row["地级/县级地区"],
                "清洗后批次": row["批次"],
                "清洗后类别": row["类别"],
                "经度": row["经度"],
                "纬度": row["纬度"],
                "视觉关键词": row["视觉关键词"],
            }
        )

notes = data_dir / "raw_source_notes.md"
notes.write_text(
    """# 原始数据来源与清洗留痕说明

## 文件说明

- `raw_heritage_papercut_projects.csv`：原始整理表/来源留痕表，保留项目在公开名录中的核心信息，并补充来源类型、来源说明、清洗动作、坐标处理说明和关键词处理说明。
- `heritage_papercut_projects.csv`：清洗后用于网页可视化的数据集。
- `papercutData.js`：由清洗后 CSV 转换而来的前端数据文件。

## 原始资料范围

本项目以中国非物质文化遗产网国家级非物质文化遗产代表性项目名录公开资料为主要依据，筛选与“剪纸、刻纸、凿花、过门笺”等相关的传统美术类项目。UNESCO Intangible Cultural Heritage 中关于 Chinese paper-cut 的项目介绍用于补充国际代表性背景；行政区公开资料用于辅助定位申报地或代表性传承地。

## 清洗与转换关系

1. 从公开名录中人工筛选剪纸相关条目，形成原始整理表。
2. 将申报地区拆分为省级地区与地级/县级地区，便于地区分布统计。
3. 将批次统一为“第一批、第二批扩展、第三批扩展、第四批扩展、第五批扩展”。
4. 将类别统一为“传统美术”。
5. 按申报地或代表性传承地补充近似经纬度，仅用于可视化表达。
6. 从项目名称、民族属性、地域民俗和纹样特征中提炼视觉关键词，用于关键词频次统计和剪纸生成艺术。

## 可信度与限制

- 项目名称、申报地区、批次和类别来自公开名录整理，适合作为课程设计的数据基础。
- 经纬度为近似定位，不用于精确地图测绘或行政边界判断。
- 视觉关键词属于设计性编码字段，目的是把数据分析结果转译为生成艺术元素，因此在报告中作为“视觉提取依据”使用。
""",
    encoding="utf-8",
)

out_dir = root / "screenshots"
out_dir.mkdir(exist_ok=True)
sketch = out_dir / "process_sketch.png"

width, height = 1600, 980
img = Image.new("RGB", (width, height), "#fff7ed")
d = ImageDraw.Draw(img)
font_path = r"C:\Windows\Fonts\msyh.ttc"
bold_path = r"C:\Windows\Fonts\msyhbd.ttc"
font_title = ImageFont.truetype(bold_path, 58)
font_h = ImageFont.truetype(bold_path, 34)
font_body = ImageFont.truetype(font_path, 25)
font_small = ImageFont.truetype(font_path, 21)

red = "#b21f2d"
deep = "#7d1420"
ink = "#251714"
muted = "#755f55"
gold = "#c99742"
line = "#e4cdb7"

for x in range(0, width, 48):
    d.line((x, 0, x, height), fill="#f1e3d3", width=1)
for y in range(0, height, 48):
    d.line((0, y, width, y), fill="#f1e3d3", width=1)

d.rectangle((42, 42, width - 42, height - 42), outline="#d9b8a5", width=3)
d.text((86, 70), "“纸上生花”课程设计过程草图", font=font_title, fill=red)
d.text((90, 148), "从公开名录数据到图表分析，再到剪纸纹样生成与滚动叙事整合", font=font_body, fill=muted)

cards = [
    ("1 原始资料", "国家级非遗名录\n剪纸/刻纸/凿花筛选\n记录来源与限制"),
    ("2 数据清洗", "统一地区与批次\n补充近似坐标\n提炼视觉关键词"),
    ("3 模块A", "省份分布柱状图\n批次结构环形图\n关键词频次统计"),
    ("4 模块B", "团花/花鸟/吉祥纹\np5.js 对称生成\n复杂度交互控制"),
    ("5 模块C", "开场吸引\n数据解释\n纹样转译与总结"),
]

xs = [90, 390, 690, 990, 1290]
y = 270
card_w, card_h = 220, 300
for i, (title, body) in enumerate(cards):
    x = xs[i]
    d.rounded_rectangle((x, y, x + card_w, y + card_h), radius=22, fill="#fffaf2", outline=line, width=3)
    d.rectangle((x, y, x + 12, y + card_h), fill=red)
    d.text((x + 28, y + 30), title, font=font_h, fill=deep)
    d.multiline_text((x + 28, y + 92), body, font=font_body, fill=ink, spacing=12)
    if i < len(cards) - 1:
        ax = x + card_w + 22
        ay = y + card_h // 2
        d.line((ax, ay, xs[i + 1] - 24, ay), fill=gold, width=7)
        d.polygon([(xs[i + 1] - 24, ay), (xs[i + 1] - 50, ay - 18), (xs[i + 1] - 50, ay + 18)], fill=gold)

d.rounded_rectangle((90, 650, 1510, 850), radius=26, fill="#fffaf2", outline=line, width=3)
d.text((130, 686), "视觉映射关系", font=font_h, fill=deep)
items = [
    ("地域/批次", "模块A图表", "理性数据"),
    ("窗花/花鸟/吉祥", "模块B生成图形", "感性艺术"),
    ("吸引-解释-转译-总结", "模块C滚动叙事", "交互体验"),
]
for i, (a, b, c) in enumerate(items):
    x = 130 + i * 455
    d.ellipse((x, 748, x + 24, 772), fill=red)
    d.text((x + 40, 736), a, font=font_body, fill=ink)
    d.text((x + 40, 775), f"{b} · {c}", font=font_small, fill=muted)

cx, cy = 1422, 154
d.ellipse((1350, 82, 1495, 227), outline="#e2bcaa", width=3)
for k in range(8):
    ang = math.radians(k * 45)
    p1 = (cx + math.cos(ang) * 22, cy + math.sin(ang) * 22)
    p2 = (cx + math.cos(ang - 0.18) * 86, cy + math.sin(ang - 0.18) * 86)
    p3 = (cx + math.cos(ang + 0.18) * 86, cy + math.sin(ang + 0.18) * 86)
    d.polygon([p1, p2, p3], fill=red)
d.ellipse((1386, 118, 1458, 190), fill="#fff7ed")
d.rectangle((1410, 142, 1436, 168), outline=red, width=8)

img.save(sketch)

print(raw_out)
print(notes)
print(sketch)
