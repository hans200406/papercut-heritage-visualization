const projects = window.PAPERCUT_PROJECTS || [];

function groupCount(items, key) {
  return Object.entries(items.reduce((acc, item) => {
    const value = item[key] || '未知';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]);
}

function keywordCount(items) {
  const counts = {};
  items.forEach(item => {
    String(item['视觉关键词'] || '').split(';').forEach(word => {
      if (!word) return;
      counts[word] = (counts[word] || 0) + 1;
    });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 18);
}

function chartTheme() {
  return {
    textStyle: { fontFamily: 'Microsoft YaHei, Arial' },
    color: ['#b21f2d', '#c99742', '#7d1420', '#d9a441', '#8c5b3f']
  };
}

echarts.registerTheme('papercut', chartTheme());

function renderProvinceChart() {
  const chart = echarts.init(document.getElementById('provinceChart'), 'papercut');
  const data = groupCount(projects, '省级地区').slice(0, 18).reverse();
  chart.setOption({
    title: { text: '剪纸类非遗项目省级分布 TOP18', left: 12, top: 8, textStyle: { color: '#251714', fontSize: 16 } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: p => `${p[0].name}<br/>项目数量：${p[0].value}` },
    grid: { left: 78, right: 28, top: 58, bottom: 28 },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(89,45,35,.12)' } }, axisLabel: { color: '#755f55' } },
    yAxis: { type: 'category', data: data.map(d => d[0]), axisLabel: { color: '#755f55' }, axisLine: { lineStyle: { color: '#bfa58a' } } },
    series: [{
      name: '项目数量',
      type: 'bar',
      data: data.map(d => d[1]),
      barWidth: 14,
      itemStyle: { borderRadius: [0, 6, 6, 0], color: '#b21f2d' },
      label: { show: true, position: 'right', color: '#7d1420' }
    }]
  });
  return chart;
}

function renderBatchChart() {
  const chart = echarts.init(document.getElementById('batchChart'), 'papercut');
  const data = groupCount(projects, '批次').map(([name, value]) => ({ name, value }));
  chart.setOption({
    title: { text: '名录批次结构', left: 'center', top: 8, textStyle: { color: '#251714', fontSize: 16 } },
    tooltip: { trigger: 'item', formatter: '{b}<br/>项目数量：{c} ({d}%)' },
    legend: { bottom: 4, textStyle: { color: '#755f55' } },
    series: [{
      name: '批次',
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '48%'],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: '#fffaf2', borderWidth: 2 },
      label: { color: '#5f4a40', formatter: '{b}\n{c}项' },
      data
    }]
  });
  return chart;
}

function renderRegionChart() {
  const chart = echarts.init(document.getElementById('regionChart'), 'papercut');
  const data = keywordCount(projects).reverse();
  chart.setOption({
    title: { text: '剪纸视觉关键词频次', left: 12, top: 8, textStyle: { color: '#251714', fontSize: 16 } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: p => `${p[0].name}<br/>出现次数：${p[0].value}` },
    grid: { left: 92, right: 28, top: 58, bottom: 28 },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(89,45,35,.12)' } }, axisLabel: { color: '#755f55' } },
    yAxis: { type: 'category', data: data.map(d => d[0]), axisLabel: { color: '#755f55' }, axisLine: { lineStyle: { color: '#bfa58a' } } },
    series: [{
      type: 'bar',
      data: data.map((d, idx) => ({ value: d[1], itemStyle: { color: idx % 2 ? '#c99742' : '#b21f2d' } })),
      barWidth: 12,
      label: { show: true, position: 'right', color: '#7d1420' }
    }]
  });
  return chart;
}

function renderInsights() {
  const province = groupCount(projects, '省级地区');
  const batch = groupCount(projects, '批次');
  const minority = projects.filter(item => /满族|苗族|水族|回族|傣族/.test(item['项目名称'] + item['视觉关键词']));
  document.getElementById('totalProjects').textContent = projects.length;
  document.getElementById('provinceCount').textContent = province.length;

  const cards = [
    {
      title: '地域分布呈现集聚',
      text: `${province[0][0]}、${province[1][0]}、${province[2][0]}等地项目数量靠前，说明剪纸传承与地方民俗、节庆和区域手工艺生态密切相关。`
    },
    {
      title: '第二批扩展最集中',
      text: `${batch[0][0]}共收录${batch[0][1]}项，占全部样本的${Math.round(batch[0][1] / projects.length * 100)}%，体现出剪纸项目在保护体系中的集中补充与细分认定。`
    },
    {
      title: '多民族样式丰富',
      text: `样本中包含${minority.length}项具有鲜明民族文化特征的项目，如满族、苗族、水族、回族、傣族剪纸，表现出中国剪纸的多元纹样谱系。`
    }
  ];

  document.getElementById('insightList').innerHTML = cards.map(card => `
    <article class="insight-card">
      <strong>${card.title}</strong>
      <p>${card.text}</p>
    </article>
  `).join('');
}

function init() {
  renderInsights();
  const charts = [renderProvinceChart(), renderBatchChart(), renderRegionChart()];
  window.addEventListener('resize', () => charts.forEach(chart => chart.resize()));
  window.__MODULE_A_READY__ = true;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
