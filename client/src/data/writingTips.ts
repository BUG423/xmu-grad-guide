/**
 * 论文撰写小贴士
 * 额外补充内容，帮助学生合理规划论文撰写时间
 */

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface WorkloadRef {
  degreeType: string;
  label: string;
  innovationPoints: number;
  wordCount: string;
  prepPeriod: string;
}

export const WRITING_TIMELINE: TimelineItem[] = [
  {
    time: '4月初',
    title: '提交送审论文',
    description: '盲审论文提交 + 查重 + 形式审查，这是硬截止日期',
  },
  {
    time: '3月中下旬',
    title: '论文终稿确认',
    description: '导师确认同意定稿，论文格式调整完毕，最终版本确定',
  },
  {
    time: '3月中旬',
    title: '第一次查重 + 送审申请',
    description: '预留查重不通过需修改的时间，同时完成系统送审申请',
  },
  {
    time: '2月下旬 - 3月',
    title: '论文修改完善',
    description: '导师审阅反馈，多轮修改打磨，格式细节调整',
  },
  {
    time: '1月 - 2月',
    title: '完成论文初稿',
    description: '⭐ 寒假是写论文的黄金时期，应在此期间完成完整初稿',
  },
  {
    time: '前一年 10-12月',
    title: '确定选题和研究框架',
    description: '尽早与导师沟通确定论文方向、章节结构和技术路线',
  },
  {
    time: '整个研二/博三',
    title: '积累研究成果',
    description: '发表小论文、完成实验、积累创新成果——这是送审的前提条件',
  },
];

export const WORKLOAD_REF: WorkloadRef[] = [
  {
    degreeType: 'academic-master',
    label: '学术型硕士',
    innovationPoints: 2,
    wordCount: '≥ 3 万字',
    prepPeriod: '6-12 个月',
  },
  {
    degreeType: 'professional-master',
    label: '专业型硕士',
    innovationPoints: 2,
    wordCount: '≥ 3 万字',
    prepPeriod: '6-12 个月',
  },
  {
    degreeType: 'academic-phd',
    label: '学术型博士',
    innovationPoints: 3,
    wordCount: '≥ 5 万字',
    prepPeriod: '12-24 个月',
  },
];

export const WRITING_ADVICE = [
  {
    title: '尽早动笔',
    desc: '不要等"准备好"再写，有想法就动笔。写作本身就是思考。',
  },
  {
    title: '先搭骨架',
    desc: '先定章节目录（到三级标题），导师确认后再填充，避免推倒重来。',
  },
  {
    title: '格式先行',
    desc: '一开始就用学校模板（Word/LaTeX），最后调格式远比想象中耗时。',
  },
  {
    title: '图表规范',
    desc: '图表是论文的"门面"，要清晰美观。中文图表标题用"图1-1"格式，英文用"Figure 1.1"。',
  },
  {
    title: '参考文献管理',
    desc: '用 Zotero / EndNote 管理文献，一键生成引用，别手动排版。',
  },
  {
    title: '定期与导师沟通',
    desc: '每 2-4 周给导师看一次进展。长期不联系容易跑偏，返工成本巨大。',
  },
  {
    title: '留足修改时间',
    desc: '初稿后至少留 2-4 周反复打磨。好论文是改出来的。',
  },
  {
    title: '查重意识',
    desc: '用自己的话写，规范引用。查重率 < 10% 是硬指标，自己已发表的小论文也要改写。',
  },
];
