/**
 * 各学位类型毕业流程数据
 *
 * 文案原则：description 只写核心动作，举例/细节/前提条件放 warnings
 * 参考来源：informatics.xmu.edu.cn + qi-xmu.github.io/xmu-info-thesis-submission
 */
import type { DegreeType } from './degreeTypes';

export interface Material {
  name: string;
  required: boolean;
  format?: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Task {
  id: string;
  order: number;
  title: string;
  description: string;
  materials: Material[];
  links: Link[];
  warnings: string[];
  special?: string;
}

export interface Phase {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  tasks: Task[];
}

// ==================== 学术型硕士 ====================

const academicMasterPhases: Phase[] = [
  {
    id: 'am-phase-1',
    order: 1,
    title: '定稿送审',
    subtitle: '论文准备与送审',
    icon: '📝',
    tasks: [
      {
        id: 'am-1-1',
        order: 1,
        title: '毕业图像采集',
        description: '按学院通知完成毕业生图像采集，用于毕业证、学位证及学信网电子注册。',
        materials: [
          { name: '身份证', required: true },
        ],
        links: [
          { title: '学信网图像采集码', url: 'https://www.chsi.com.cn/' },
        ],
        warnings: [
          '未完成将无法进行送审申请',
          '例：2023届于2026.3.11采集，通过班群通知',
          '着装建议：白色或浅色上衣',
        ],
      },
      {
        id: 'am-1-2',
        order: 2,
        title: '科研成果审核',
        description: '系统填写科研成果 → 导师审核 → 邮件通知秘书审核。最晚答辩前完成。',
        materials: [
          { name: '图书馆检索证明（SCI/EI等需要）', required: false },
          { name: '论文全文 / 录用函（CCF论文可能仅需录用函）', required: false },
          { name: '导师手写签名扫描件', required: true },
        ],
        links: [
          { title: '科研成果规定详情', url: 'https://informatics.xmu.edu.cn/info/2301/178001.htm' },
        ],
        warnings: [
          '导师签字必须是学籍导师（系统主导师），非小导师',
          '邮件标题：科研成果审核（专利/论文/竞赛）-姓名-学号',
          '导师签字务必手写签名后扫描或拍照',
          '与学分审核、图像采集可同步进行',
          '材料要求各异，详见链接',
        ],
      },
      {
        id: 'am-1-3',
        order: 3,
        title: '学分及前置学历审核',
        description: '在研究生系统上检查学分是否全部完成，前置学历学位是否填写完整并通过审核。',
        materials: [],
        links: [
          { title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' },
        ],
        warnings: [
          '学分未修完将无法送审',
          '联培学生须检查双方学分要求',
          '与科研成果审核、图像采集可同步，无先后顺序',
        ],
      },
      {
        id: 'am-1-4',
        order: 4,
        title: '论文定稿',
        description: '论文经导师同意后定稿。硕士 ≥ 3万字，按学校模板排版。',
        materials: [
          { name: '学位论文定稿', required: true },
          { name: '延迟送审申请书（仅超期时）', required: false, format: '纸质版，导师手写签名' },
        ],
        links: [
          { title: '厦门大学研究生学位论文规范', url: 'https://gs.xmu.edu.cn/info/1631/53641.htm' },
        ],
        warnings: [
          '例：2023届送审截止日期为2026.4.10',
          '超期须额外提交《延迟送审申请书》（导师手写签名）至教秘',
          '联培学生须双方导师同意',
          '硕士预答辩由导师/实验室决定（非必须）',
        ],
      },
      {
        id: 'am-1-5',
        order: 5,
        title: '系统送审申请',
        description: '本研系统提交申请 → 导师审核 → 导出《送审申请表》PDF 并打印导师签字纸质版。',
        materials: [
          { name: '送审申请表 PDF', required: true },
          { name: '送审申请表 纸质版', required: true, format: '2份，导师签字' },
        ],
        links: [
          { title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' },
          { title: '学生操作指南', url: 'https://docs.qq.com/doc/DRWhid0tTV1VSUlpL' },
        ],
        warnings: [
          '学分完成 + 图像采集完成才有权限',
          '科研成果可在答辩前完成，不阻塞送审',
          '系统各栏目不超过限定字数',
        ],
      },
      {
        id: 'am-1-6',
        order: 6,
        title: '第一次查重（送审前查重）',
        description: '论文 PDF（全文不含声明）发教秘查重，抄送导师，附《送审申请表》。查重率 < 10% 通过。',
        materials: [
          { name: '论文 PDF（全文不含声明）', required: true, format: 'PDF < 20M' },
          { name: '送审申请表 PDF', required: true },
        ],
        links: [],
        warnings: [
          '邮件标题：论文送审前查重-学号-姓名-专业-联系电话',
          '论文命名：学号_作者_篇名_专业_导师',
          '2026年通知不查 AI 率',
          '未按规定命名不予查重',
        ],
      },
      {
        id: 'am-1-7',
        order: 7,
        title: '论文送审（盲审）',
        description: '教秘形式审查 → 盲审论文发教秘邮箱，抄送导师，走教育部平台。学硕 ≥ 2 名评阅人。',
        materials: [
          { name: '盲审论文 PDF', required: true, format: '10384_学号_LW.pdf（LW是字母）' },
          { name: '论文信息汇总表', required: true, format: 'Excel（黄色表头必填，从第5行开始填）' },
          { name: '摘要', required: true, format: '10384_学号_ZY.txt（中文即可）' },
        ],
        links: [],
        warnings: [
          '邮件命名：送审论文_姓名_学号_联系电话',
          '须删除：姓名、导师、致谢、发表论文作者部分',
          '学号中字母务必大写',
          '评审约 25 个工作日；3月底4月初前提交可赶6月批次',
          '≥ 75 分直接答辩，70-74 分修改 30 天，< 70 分需增评',
          '1人 < 70 分：增聘2人；2人及以上 < 70 分：不可答辩',
        ],
      },
    ],
  },
  {
    id: 'am-phase-2',
    order: 2,
    title: '答辩',
    subtitle: '准备与进行答辩',
    icon: '🎤',
    tasks: [
      {
        id: 'am-2-1',
        order: 1,
        title: '答辩准备',
        description: '打印若干份答辩用论文（份数 ≈ 委员数 + 导师 1 + 秘书 1）。此版非最终稿，按需打印。',
        materials: [
          { name: '打印版答辩论文', required: true },
        ],
        links: [],
        warnings: [
          '差错率（含图、表、附录）不得高于万分之二',
          '明显格式错误不在万分之二范围内——必须修改',
          '勿多打，答辩后还需修改',
        ],
      },
      {
        id: 'am-2-2',
        order: 2,
        title: '根据评阅意见修改论文',
        description: '评阅书返回后联系导师，依据评审意见修改论文，撰写《论文修改说明》（本人+导师手写签名）。',
        materials: [
          { name: '论文修改说明', required: true, format: '纸质版，本人+导师手写签名' },
        ],
        links: [],
        warnings: [
          '答辩时提交委员会参考，答辩后一并提交',
          '秘书会将评阅书发给导师并录入成绩',
        ],
      },
      {
        id: 'am-2-3',
        order: 3,
        title: '确定答辩委员会和答辩秘书',
        description: '与导师确定答辩委员会成员及秘书人选。导师将秘书名单（含姓名及教工号）发送给研究生秘书。',
        materials: [],
        links: [
          { title: '答辩安排操作指南', url: 'https://docs.qq.com/doc/DRWdPdlpHR2VlWE1U' },
        ],
        warnings: [
          '秘书须提前至少5天在系统填写答辩安排，预留时间不足不予处理',
          '秘书自行打印《学位论文评定书》《答辩情况记录表》《答辩决议》空表',
          '《学位论文优秀推荐决议书》仅推荐"优秀"者填写',
        ],
      },
      {
        id: 'am-2-4',
        order: 4,
        title: '进行答辩',
        description: '按安排进行答辩，秘书全程记录和录音。答辩后按委员会意见修改论文。',
        materials: [
          { name: '答辩论文', required: true },
          { name: '答辩 PPT', required: true },
        ],
        links: [],
        warnings: [
          '错过截止只能申请下一批次授学位',
          '硕博均需录音，刻录进光盘',
        ],
      },
    ],
  },
  {
    id: 'am-phase-3',
    order: 3,
    title: '答辩后提交材料',
    subtitle: '学位申请与材料归档',
    icon: '📦',
    tasks: [
      {
        id: 'am-3-1',
        order: 1,
        title: '论文终稿定稿',
        description: '按答辩委员会意见修改论文，导师确认后定稿。务必到系统更新论文信息，确保与最终版一致。',
        materials: [],
        links: [],
        warnings: ['联培学生须双方导师同意'],
      },
      {
        id: 'am-3-2',
        order: 2,
        title: '第二次查重（终稿查重）',
        description: '终稿全文 PDF（含封面、声明等全部组成部分，删空白页）发教秘查重，抄送导师，附《答辩决议》扫描件。查重 < 10% 方可申请学位。',
        materials: [
          { name: '终稿论文全文 PDF', required: true, format: 'PDF < 20M，删除空白页' },
          { name: '答辩决议扫描件', required: true, format: '答辩主席签字' },
        ],
        links: [],
        warnings: [
          '邮件标题：答辩后定稿查重-学号-姓名-专业-联系电话',
        ],
      },
      {
        id: 'am-3-3',
        order: 3,
        title: '系统学位申请',
        description: '系统里进行学位申请，打印《学位申请表》2 份（彩色打印签字），上传终稿。',
        materials: [
          { name: '学位申请表', required: true, format: '2份，彩色打印签字' },
          { name: '科研成果汇总表', required: true, format: '1份，系统打印签字' },
        ],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: ['系统信息须与纸质材料一致'],
      },
      {
        id: 'am-3-4',
        order: 4,
        title: '提交全部纸质材料',
        description: '按《研究生学位档案卷内目录》整理全部材料装入档案袋。封面填写完整，左上角写学号及电话。',
        materials: [
          { name: '研究生学位档案卷内目录', required: true, format: '1份（不得修改项目名称）' },
          { name: '学位论文送审申请表', required: true, format: '2份（导师签字）' },
          { name: '学位论文评阅书', required: true, format: '硕士2份（增评按实际份数）' },
          { name: '学位论文答辩审批表', required: true, format: '1份' },
          { name: '学位论文评定书', required: true, format: '3-7份（按实际份数）' },
          { name: '学位论文优秀推荐评定书', required: false, format: '仅推荐"优秀"者提交' },
          { name: '学位论文优秀推荐决议书', required: false, format: '仅推荐"优秀"者提交' },
          { name: '学位论文答辩情况记录', required: true, format: '1份' },
          { name: '学位论文答辩决议', required: true, format: '1份' },
          { name: '学位申请表', required: true, format: '2份（彩色打印签字）' },
          { name: '科研成果汇总表', required: true, format: '1份（系统打印签字）' },
          { name: '论文修改说明', required: true, format: '1份（本人+导师签名）' },
          { name: '档案袋', required: true, format: '1个' },
        ],
        links: [],
        warnings: [
          '卷内目录：院系填信息学院XXX系（全称），学位授予时间参考最近批次（6月/12月）',
          '"有无"栏全打√，"份数"栏评阅书和评定书按实际，其余填"1"',
          '毕业登记表/研究生登记表/学籍登记表/成绩登记表/学位授予决议：秘书后续补全',
          '注意每批次形式审查和材料截止时间',
          '一般要求本人亲自提交至正信楼219',
        ],
      },
      {
        id: 'am-3-5',
        order: 5,
        title: '胶装论文及光盘提交',
        description: '先交 1 本无胶装论文形式审查 → 通过后交 4 本胶装论文（有图页彩印，声明页手写签名）+ 光盘 1 份。',
        materials: [
          { name: '审查用论文', required: true, format: '1本，无须胶装，黑白' },
          { name: '胶装学位论文', required: true, format: '4本，胶装+有图彩印' },
          { name: '光盘', required: true, format: '1份，光盘笔写系/专业/学号/姓名/提交时间' },
        ],
        links: [],
        warnings: [
          '光盘内论文命名：10384_二级学科代码_学号_LW_姓名',
          '光盘内容：论文PDF+WORD各1份 + 答辩录音',
          'PDF版声明页签名后扫描嵌入；LaTeX可只放PDF',
          '前两页声明须手写签名；封面日期完整；指导教师须与系统一致',
          '逾期未提交不予上会审议',
        ],
      },
      {
        id: 'am-3-6',
        order: 6,
        title: '图书馆论文提交',
        description: '另外准备 1 本论文自行送交图书馆归档。注意不包含在提交学院的 4 本中。',
        materials: [
          { name: '学位论文', required: true, format: '1本，送图书馆' },
        ],
        links: [{ title: '厦门大学图书馆', url: 'https://library.xmu.edu.cn/' }],
        warnings: ['此本为额外份数', '打印前务必核对差错率 < 万分之二'],
      },
    ],
  },
];

// ==================== 专业型硕士 ====================

const professionalMasterPhases: Phase[] = [
  {
    id: 'pm-phase-1',
    order: 1,
    title: '定稿送审',
    subtitle: '论文准备与送审',
    icon: '📝',
    tasks: [
      {
        id: 'pm-1-1',
        order: 1,
        title: '毕业图像采集',
        description: '按学院通知完成毕业生图像采集，用于毕业证、学位证及学信网电子注册。',
        materials: [{ name: '身份证', required: true }],
        links: [{ title: '学信网图像采集码', url: 'https://www.chsi.com.cn/' }],
        warnings: [
          '未完成将无法送审',
          '例：2023届于2026.3.11采集，通过班群通知',
        ],
      },
      {
        id: 'pm-1-2',
        order: 2,
        title: '科研成果审核',
        description: '系统填写科研成果 → 导师审核 → 邮件通知秘书审核。最晚答辩前完成。',
        materials: [
          { name: '图书馆检索证明（SCI/EI等需要）', required: false },
          { name: '论文全文 / 录用函', required: false },
          { name: '导师手写签名扫描件', required: true },
        ],
        links: [
          { title: '科研成果规定详情', url: 'https://informatics.xmu.edu.cn/info/2301/178001.htm' },
        ],
        warnings: [
          '导师签字必须是学籍导师（系统主导师），非小导师',
          '邮件标题：科研成果审核（专利/论文/竞赛）-姓名-学号',
          '可与学分审核、图像采集同步进行',
        ],
      },
      {
        id: 'pm-1-3',
        order: 3,
        title: '学分及前置学历审核',
        description: '在研究生系统上检查学分及前置学历是否全部完成。',
        materials: [
          { name: '开题报告审核表 + 选题报告书', required: true, format: '专硕培养环节' },
          { name: '中期考核表 + 情况统计表', required: true, format: '专硕培养环节' },
          { name: '实习实践总结 + 实践报告表', required: true, format: '专硕培养环节' },
          { name: '学术讲座总结 + 登记表 + 截图', required: true, format: '全体研究生' },
        ],
        links: [
          { title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' },
        ],
        warnings: [
          '学分未修完无法送审',
          '专硕培养环节材料较多，请提前准备',
          '与科研成果审核、图像采集可同步，无先后顺序',
        ],
      },
      {
        id: 'pm-1-4',
        order: 4,
        title: '论文定稿',
        description: '论文经导师同意后定稿。硕士 ≥ 3万字，按学校模板排版。',
        materials: [
          { name: '学位论文定稿', required: true },
          { name: '延迟送审申请书（仅超期时）', required: false, format: '纸质版，导师手写签名' },
        ],
        links: [
          { title: '论文规范通知', url: 'https://gs.xmu.edu.cn/info/1631/53641.htm' },
        ],
        warnings: [
          '例：2023届送审截止日期为2026.4.10',
          '超期须提交《延迟送审申请书》（导师手写签名）至教秘',
        ],
      },
      {
        id: 'pm-1-5',
        order: 5,
        title: '系统送审申请',
        description: '本研系统提交申请 → 导师审核 → 导出《送审申请表》PDF 并打印导师签字纸质版。',
        materials: [
          { name: '送审申请表 PDF + 纸质版', required: true, format: '2份' },
        ],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: [
          '学分完成 + 图像采集完成才有权限',
          '科研成果可在答辩前完成，不阻塞送审',
        ],
      },
      {
        id: 'pm-1-6',
        order: 6,
        title: '第一次查重（送审前查重）',
        description: '论文 PDF（全文不含声明）发教秘查重，抄送导师，附《送审申请表》。查重率 < 10% 通过。',
        materials: [
          { name: '论文 PDF', required: true, format: 'PDF < 20M' },
          { name: '送审申请表 PDF', required: true },
        ],
        links: [],
        warnings: [
          '邮件标题：论文送审前查重-学号-姓名-专业-联系电话',
          '论文命名：学号_作者_篇名_专业_导师',
          '2026年通知不查 AI 率',
        ],
      },
      {
        id: 'pm-1-7',
        order: 7,
        title: '论文送审（盲审·双渠道）',
        description: '教秘形式审查 → 专硕双渠道送审：①教育部平台（1 名专家）②学院系统（1 名企业专家）。',
        materials: [
          { name: '盲审论文 PDF（教育部）', required: true, format: '10384_学号_LW.pdf' },
          { name: '论文信息汇总表', required: true, format: 'Excel（黄色表头必填，从第5行开始填）' },
          { name: '摘要', required: true, format: '10384_学号_ZY.txt（中文即可）' },
          { name: '盲审论文 PDF（学院系统）', required: true, format: '学号_论文名称_专业_硕士论文.pdf' },
        ],
        links: [
          { title: '学院系统（提交企业专家评审）', url: 'https://jwgs.xmu.edu.cn/H5/' },
        ],
        warnings: [
          '渠道一：教育部材料发教秘邮箱，抄送导师',
          '渠道二：登录 jwgs.xmu.edu.cn/H5/（账号学号，初始密码1234567，先改密码）',
          '邮件命名：送审论文_姓名_学号_联系电话',
          '须删除姓名、导师、致谢等个人信息',
          '评审约 25 个工作日',
          '≥ 75 分直接答辩，70-74 分修改 30 天',
        ],
      },
    ],
  },
  {
    id: 'pm-phase-2',
    order: 2,
    title: '答辩',
    subtitle: '准备与进行答辩',
    icon: '🎤',
    tasks: [
      {
        id: 'pm-2-1',
        order: 1,
        title: '答辩准备',
        description: '打印若干份答辩用论文（份数 ≈ 委员数 + 导师 1 + 秘书 1）。此版非最终稿，按需打印。',
        materials: [
          { name: '打印版答辩论文', required: true },
        ],
        links: [],
        warnings: [
          '差错率不得高于万分之二',
          '勿多打，答辩后还需修改',
        ],
      },
      {
        id: 'pm-2-2',
        order: 2,
        title: '根据评阅意见修改论文',
        description: '评阅书返回后联系导师，依据评审意见修改论文，撰写《论文修改说明》（本人+导师手写签名）。',
        materials: [
          { name: '论文修改说明', required: true, format: '纸质版，本人+导师手写签名' },
        ],
        links: [],
        warnings: ['答辩时提交委员会参考，答辩后一并提交'],
      },
      {
        id: 'pm-2-3',
        order: 3,
        title: '确定答辩委员会和答辩秘书',
        description: '与导师确定答辩委员会成员（须含企业专家）及秘书。秘书提前至少5天在系统填写安排。',
        materials: [],
        links: [],
        warnings: ['答辩委员会须包含企业专家', '预留时间不足不予处理'],
      },
      {
        id: 'pm-2-4',
        order: 4,
        title: '进行答辩',
        description: '按安排进行答辩，秘书全程记录和录音。答辩后按委员会意见修改论文。',
        materials: [
          { name: '答辩论文', required: true },
          { name: '答辩 PPT', required: true },
        ],
        links: [],
        warnings: ['错过截止只能申请下一批次', '录音刻录进光盘'],
      },
    ],
  },
  {
    id: 'pm-phase-3',
    order: 3,
    title: '答辩后提交材料',
    subtitle: '学位申请与材料归档',
    icon: '📦',
    tasks: [
      {
        id: 'pm-3-1',
        order: 1,
        title: '论文终稿定稿',
        description: '按答辩委员会意见修改论文，导师确认后定稿。务必到系统更新论文信息。',
        materials: [],
        links: [],
        warnings: [],
      },
      {
        id: 'pm-3-2',
        order: 2,
        title: '第二次查重（终稿查重）',
        description: '终稿全文 PDF（含封面、声明等，删空白页）发教秘查重，抄送导师，附《答辩决议》扫描件。查重 < 10%。',
        materials: [
          { name: '终稿论文全文 PDF', required: true, format: 'PDF < 20M' },
          { name: '答辩决议扫描件', required: true, format: '答辩主席签字' },
        ],
        links: [],
        warnings: ['邮件标题：答辩后定稿查重-学号-姓名-专业-联系电话'],
      },
      {
        id: 'pm-3-3',
        order: 3,
        title: '系统学位申请',
        description: '系统里进行学位申请，打印《学位申请表》2 份（彩色打印签字），上传终稿。',
        materials: [
          { name: '学位申请表', required: true, format: '2份，彩色打印签字' },
          { name: '科研成果汇总表', required: true, format: '1份，系统打印签字' },
        ],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: [],
      },
      {
        id: 'pm-3-4',
        order: 4,
        title: '提交全部纸质材料',
        description: '按《专业型研究生学籍学位档案卷内目录》整理材料装入档案袋。注意使用专业型目录。',
        materials: [
          { name: '专业型研究生学籍学位档案卷内目录', required: true, format: '1份' },
          { name: '学位论文送审申请表', required: true, format: '2份' },
          { name: '学位论文评阅书', required: true, format: '硕士2份（增评按实际）' },
          { name: '学位论文答辩审批表', required: true, format: '1份（秘书归档）' },
          { name: '学位论文评定书', required: true, format: '3-7份' },
          { name: '学位论文答辩情况记录', required: true, format: '1份' },
          { name: '学位论文答辩决议', required: true, format: '1份' },
          { name: '学位申请表', required: true, format: '2份（彩色打印签字）' },
          { name: '科研成果汇总表', required: true, format: '1份' },
          { name: '专业学位研究生实习实践报告表', required: true, format: '1份（秘书归档）' },
          { name: '论文修改说明', required: true, format: '1份（本人+导师签名）' },
          { name: '档案袋', required: true, format: '1个' },
        ],
        links: [],
        warnings: [
          '使用专业型目录，非学术型目录',
          '实习实践报告表为专硕特有',
          '注意每批次材料截止时间',
        ],
      },
      {
        id: 'pm-3-5',
        order: 5,
        title: '胶装论文及光盘提交',
        description: '先交 1 本无胶装论文形式审查 → 通过后交 4 本胶装论文（有图页彩印，声明页手写签名）+ 光盘 1 份。',
        materials: [
          { name: '审查用论文', required: true, format: '1本，无须胶装，黑白' },
          { name: '胶装学位论文', required: true, format: '4本，胶装+有图彩印' },
          { name: '光盘', required: true, format: '1份' },
        ],
        links: [],
        warnings: [
          '光盘内容：论文PDF+WORD + 答辩录音',
          '光盘命名：10384_二级学科代码_学号_LW_姓名',
          '声明页须手写签名',
        ],
      },
      {
        id: 'pm-3-6',
        order: 6,
        title: '图书馆论文提交',
        description: '另外准备 1 本论文自行送交图书馆归档。不包含在提交学院的 4 本中。',
        materials: [
          { name: '学位论文', required: true, format: '1本，送图书馆' },
        ],
        links: [{ title: '图书馆', url: 'https://library.xmu.edu.cn/' }],
        warnings: ['打印前核对差错率 < 万分之二'],
      },
    ],
  },
];

// ==================== 学术型博士 ====================

const academicPhdPhases: Phase[] = [
  {
    id: 'phd-phase-1',
    order: 1,
    title: '定稿送审',
    subtitle: '论文准备、预答辩与送审',
    icon: '📝',
    tasks: [
      {
        id: 'phd-1-1',
        order: 1,
        title: '毕业图像采集',
        description: '按学院通知完成毕业生图像采集。',
        materials: [{ name: '身份证', required: true }],
        links: [{ title: '学信网', url: 'https://www.chsi.com.cn/' }],
        warnings: [
          '未完成将无法送审',
          '例：2023届于2026.3.11采集，通过班群通知',
        ],
      },
      {
        id: 'phd-1-2',
        order: 2,
        title: '科研成果审核',
        description: '系统填写科研成果 → 导师审核 → 邮件通知秘书审核。最晚答辩前完成。博士要求高于硕士。',
        materials: [
          { name: '图书馆检索证明（SCI/EI等）', required: false },
          { name: '论文全文 / 录用函', required: false },
          { name: '导师手写签名扫描件', required: true },
        ],
        links: [
          { title: '科研成果规定详情', url: 'https://informatics.xmu.edu.cn/info/2301/178001.htm' },
        ],
        warnings: [
          '导师签字必须是学籍导师（系统主导师），非小导师',
          '邮件标题：科研成果审核（专利/论文/竞赛）-姓名-学号',
          '可与学分审核、图像采集同步进行',
        ],
      },
      {
        id: 'phd-1-3',
        order: 3,
        title: '学分及前置学历审核',
        description: '在研究生系统上检查学分及前置学历是否全部完成。',
        materials: [],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: [
          '与科研成果审核、图像采集可同步，无先后顺序',
          '学分 + 预答辩均通过才有权限送审申请',
        ],
      },
      {
        id: 'phd-1-4',
        order: 4,
        title: '论文初稿定稿',
        description: '论文经导师同意后定稿。博士 ≥ 5万字（英文约 80 页），按学校模板排版。',
        materials: [
          { name: '学位论文初稿', required: true },
          { name: '延迟送审申请书（仅超期时）', required: false, format: '纸质版，导师手写签名' },
        ],
        links: [
          { title: '论文规范通知', url: 'https://gs.xmu.edu.cn/info/1631/53641.htm' },
        ],
        warnings: [
          '例：2023届送审截止日期为2026.4.10',
          '超期须提交《延迟送审申请书》至教秘',
          '联培学生须双方导师同意',
        ],
      },
      {
        id: 'phd-1-5',
        order: 5,
        title: '🔑 预答辩申请',
        description: '导师同意后在本研系统提交预答辩申请。预答辩一般安排在正式答辩前 3 个月。',
        materials: [
          { name: '预答辩申请表', required: true },
          { name: '学位论文', required: true },
        ],
        links: [],
        warnings: [
          '博士必须预答辩，否则无法送审',
          '前提：课程修完 + 论文完稿 + 导师同意 + 科研成果达标',
        ],
        special: 'phd-pre-defense',
      },
      {
        id: 'phd-1-6',
        order: 6,
        title: '🔑 预答辩',
        description: '学院统一组织预答辩。通过后方可送审，之后可再次修改论文并经导师确认定稿。',
        materials: [
          { name: '预答辩申请表（附报告/PPT）', required: true },
          { name: '预答辩成绩评定表', required: true },
        ],
        links: [],
        warnings: [
          '两份材料原件答辩后一并提交',
          '《成绩评定表》扫描件发秘书邮箱',
        ],
        special: 'phd-pre-defense',
      },
      {
        id: 'phd-1-7',
        order: 7,
        title: '预答辩后修改再次定稿',
        description: '根据预答辩意见修改论文，导师确认后再次定稿。此版为送审版本。',
        materials: [],
        links: [],
        warnings: ['联培学生须双方导师同意'],
      },
      {
        id: 'phd-1-8',
        order: 8,
        title: '系统送审申请',
        description: '本研系统提交申请 → 导师审核 → 导出《送审申请表》PDF 并打印导师签字纸质版。',
        materials: [
          { name: '送审申请表 PDF + 纸质版', required: true, format: '2份' },
        ],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: [
          '学分完成 + 图像采集 + 预答辩通过才有权限',
          '科研成果可在答辩前完成',
        ],
      },
      {
        id: 'phd-1-9',
        order: 9,
        title: '第一次查重（送审前查重）',
        description: '论文 PDF（全文不含声明）发教秘查重，抄送导师，附《送审申请表》。查重率 < 10% 通过。',
        materials: [
          { name: '论文 PDF', required: true, format: 'PDF < 20M' },
          { name: '送审申请表 PDF', required: true },
        ],
        links: [],
        warnings: [
          '邮件标题：论文送审前查重-学号-姓名-专业-联系电话',
          '论文命名：学号_作者_篇名_专业_导师',
          '仅预答辩通过后方可查重',
          '2026年通知不查 AI 率',
        ],
      },
      {
        id: 'phd-1-10',
        order: 10,
        title: '论文送审（盲审）',
        description: '教秘形式审查 → 盲审论文发教秘邮箱，抄送导师，走教育部平台。博士 ≥ 3 名评阅人（校外博导/正高级）。',
        materials: [
          { name: '盲审论文 PDF', required: true, format: '10384_学号_LW.pdf（LW是字母）' },
          { name: '论文信息汇总表', required: true, format: 'Excel（黄色表头必填，从第5行开始填）' },
          { name: '摘要', required: true, format: '10384_学号_ZY.txt（中文即可）' },
        ],
        links: [],
        warnings: [
          '邮件命名：送审论文_姓名_学号_联系电话',
          '须删除姓名、导师、致谢等个人信息',
          '学号中字母务必大写',
          '评审约 35 个工作日（约 7 周）',
          '≥ 75 分直接答辩，70-74 分修改 30 天',
          '< 70 分：1人则增聘2人；2人及以上不可答辩',
          '首次不合格须至少 6 个月后重新送审',
        ],
      },
      {
        id: 'phd-1-11',
        order: 11,
        title: '🔑 博士论文质量核查',
        description: '接秘书通知 → 提交盲审论文纸质版+电子版 → 线下双向匿名评审。核查比例 ≥ 20%。',
        materials: [
          { name: '盲审论文纸质版', required: true },
          { name: '盲审论文电子版', required: true },
          { name: '核查结果反馈（如需修改）', required: false, format: '扫描件，本人+导师手写签名' },
        ],
        links: [],
        warnings: [
          '博士必须完成，否则无法答辩',
          '核查：创新性、应用价值、文献综述、结果分析、写作规范',
          '需修改的：上传反馈扫描件到系统 + 提交纸质版，审核通过后方可答辩',
        ],
        special: 'phd-quality-check',
      },
    ],
  },
  {
    id: 'phd-phase-2',
    order: 2,
    title: '答辩',
    subtitle: '质量核查与答辩',
    icon: '🎤',
    tasks: [
      {
        id: 'phd-2-1',
        order: 1,
        title: '答辩准备',
        description: '打印若干份答辩用论文（份数 ≈ 委员数 + 导师 1 + 秘书 1）。此版非最终稿，按需打印。',
        materials: [
          { name: '打印版答辩论文', required: true },
        ],
        links: [],
        warnings: [
          '差错率不得高于万分之二',
          '勿多打，答辩后还需修改',
        ],
      },
      {
        id: 'phd-2-2',
        order: 2,
        title: '根据评阅意见修改论文',
        description: '评阅书返回后联系导师，依据评审意见修改论文，撰写《论文修改说明》（本人+导师手写签名）。',
        materials: [
          { name: '论文修改说明', required: true, format: '纸质版，本人+导师手写签名' },
        ],
        links: [],
        warnings: [
          '答辩时提交委员会参考',
          '秘书将评阅书发给导师并录入成绩',
        ],
      },
      {
        id: 'phd-2-3',
        order: 3,
        title: '确定答辩委员会和答辩秘书',
        description: '与导师确定答辩委员会（≥ 5 人，含校外专家）及秘书。秘书提前至少 5 天在系统填写安排。',
        materials: [],
        links: [
          { title: '答辩安排操作指南', url: 'https://docs.qq.com/doc/DRWdPdlpHR2VlWE1U' },
        ],
        warnings: [
          '预留时间不足不予处理',
          '秘书自行打印评定书、记录表、决议空表',
        ],
      },
      {
        id: 'phd-2-4',
        order: 4,
        title: '🔑 制作答辩海报 PPT',
        description: '答辩前 2 个工作日发教秘邮箱，后续刻录进光盘。',
        materials: [
          { name: '答辩海报 PPT', required: true },
        ],
        links: [],
        warnings: ['命名：姓名-开始日期-结束日期-博士论文答辩公示'],
        special: 'phd-poster',
      },
      {
        id: 'phd-2-5',
        order: 5,
        title: '进行答辩',
        description: '按安排进行答辩，秘书全程记录和录音。答辩后按委员会意见修改论文。',
        materials: [
          { name: '答辩论文', required: true },
          { name: '答辩 PPT', required: true },
        ],
        links: [],
        warnings: [
          '错过截止只能申请下一批次',
          '录音+PPT+海报均须刻录进光盘',
        ],
      },
    ],
  },
  {
    id: 'phd-phase-3',
    order: 3,
    title: '答辩后提交材料',
    subtitle: '学位申请与材料归档',
    icon: '📦',
    tasks: [
      {
        id: 'phd-3-1',
        order: 1,
        title: '论文终稿定稿',
        description: '按答辩委员会意见修改论文，导师确认后定稿。务必到系统更新论文信息。',
        materials: [],
        links: [],
        warnings: [],
      },
      {
        id: 'phd-3-2',
        order: 2,
        title: '第二次查重（终稿查重）',
        description: '终稿全文 PDF（含封面、声明等，删空白页）发教秘查重，抄送导师，附《答辩决议》扫描件。查重 < 10%。',
        materials: [
          { name: '终稿论文全文 PDF', required: true, format: 'PDF < 20M' },
          { name: '答辩决议扫描件', required: true, format: '答辩主席签字' },
        ],
        links: [],
        warnings: ['邮件标题：答辩后定稿查重-学号-姓名-专业-联系电话'],
      },
      {
        id: 'phd-3-3',
        order: 3,
        title: '系统学位申请',
        description: '系统里进行学位申请，打印《学位申请表》2 份（彩色打印签字），上传终稿。',
        materials: [
          { name: '学位申请表', required: true, format: '2份，彩色打印签字' },
          { name: '科研成果汇总表', required: true, format: '1份，系统打印签字' },
        ],
        links: [{ title: '本研系统', url: 'https://jw.xmu.edu.cn/new/index.html' }],
        warnings: [],
      },
      {
        id: 'phd-3-4',
        order: 4,
        title: '提交全部纸质材料（含预答辩材料）',
        description: '按目录整理材料装入档案袋。博士额外提交预答辩纸质材料。',
        materials: [
          { name: '研究生学位档案卷内目录', required: true, format: '1份' },
          { name: '学位论文送审申请表', required: true, format: '2份' },
          { name: '学位论文评阅书', required: true, format: '博士3份（增评按实际）' },
          { name: '学位论文答辩审批表', required: true, format: '1份' },
          { name: '学位论文评定书', required: true, format: '3-7份' },
          { name: '学位论文答辩情况记录', required: true, format: '1份' },
          { name: '学位论文答辩决议', required: true, format: '1份' },
          { name: '学位申请表', required: true, format: '2份（彩色打印签字）' },
          { name: '科研成果汇总表', required: true, format: '1份' },
          { name: '论文修改说明', required: true, format: '1份（本人+导师签名）' },
          { name: '预答辩申请表', required: true, format: '1份（附报告/PPT）' },
          { name: '预答辩成绩评定表', required: true, format: '1份' },
          { name: '档案袋', required: true, format: '1个' },
        ],
        links: [],
        warnings: [
          '博士额外提交预答辩材料',
          '注意每批次截止时间',
        ],
      },
      {
        id: 'phd-3-5',
        order: 5,
        title: '胶装论文及光盘提交',
        description: '先交 1 本无胶装论文形式审查 → 通过后交 5 本胶装论文（有图页彩印，声明页手写签名）+ 光盘 1 份。',
        materials: [
          { name: '审查用论文', required: true, format: '1本，无须胶装，黑白' },
          { name: '胶装学位论文', required: true, format: '5本，胶装+有图彩印' },
          { name: '光盘', required: true, format: '1份，光盘笔写系/专业/学号/姓名/提交时间' },
        ],
        links: [],
        warnings: [
          '博士光盘内容：论文PDF+WORD + 答辩录音 + 答辩PPT + 海报PPT + 中英文摘要',
          '光盘命名：10384_二级学科代码_学号_LW_姓名',
          'PDF版声明页签名后扫描嵌入；LaTeX可只放PDF',
          '声明页须手写签名；逾期不予上会审议',
        ],
      },
      {
        id: 'phd-3-6',
        order: 6,
        title: '图书馆论文提交',
        description: '另外准备 1 本论文自行送交图书馆归档。不包含在提交学院的 5 本中。',
        materials: [
          { name: '学位论文', required: true, format: '1本，送图书馆' },
        ],
        links: [{ title: '图书馆', url: 'https://library.xmu.edu.cn/' }],
        warnings: ['打印前核对差错率 < 万分之二'],
      },
    ],
  },
];

// ==================== 导出 ====================

export const FLOW_DATA: Record<DegreeType, Phase[] | null> = {
  'academic-master': academicMasterPhases,
  'professional-master': professionalMasterPhases,
  'academic-phd': academicPhdPhases,
  engineering: null,
};

export function getPhases(degreeType: DegreeType): Phase[] | null {
  return FLOW_DATA[degreeType] ?? null;
}

export function getTotalTaskCount(degreeType: DegreeType): number {
  const phases = getPhases(degreeType);
  if (!phases) return 0;
  return phases.reduce((sum, p) => sum + p.tasks.length, 0);
}
