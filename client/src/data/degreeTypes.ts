/**
 * 学位类型定义
 * 3 种主流程 + 1 种另行通知（工程硕博）
 */

export type DegreeType = 'academic-master' | 'professional-master' | 'academic-phd' | 'engineering';

export interface DegreeTypeInfo {
  id: DegreeType;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  /** 是否为本系统的标准流程（false 表示另行通知） */
  isStandard: boolean;
}

export const DEGREE_TYPES: DegreeTypeInfo[] = [
  {
    id: 'academic-master',
    name: '学术型硕士',
    subtitle: 'Academic Master',
    description: '计算机科学与技术、信息与通信工程等学术学位',
    icon: '📚',
    color: '#1677ff',
    isStandard: true,
  },
  {
    id: 'professional-master',
    name: '专业型硕士',
    subtitle: 'Professional Master',
    description: '电子信息等专业学位（含计算机技术、软件工程、通信工程等）',
    icon: '💼',
    color: '#52c41a',
    isStandard: true,
  },
  {
    id: 'academic-phd',
    name: '学术型博士',
    subtitle: 'Academic PhD',
    description: '计算机科学与技术、信息与通信工程等学术学位博士',
    icon: '🎓',
    color: '#722ed1',
    isStandard: true,
  },
  {
    id: 'engineering',
    name: '工程硕博',
    subtitle: 'Engineering Master/PhD',
    description: '卓越工程师计划等工程硕博专项，毕业流程由学院另行通知',
    icon: '🔧',
    color: '#fa8c16',
    isStandard: false,
  },
];

export function getDegreeTypeInfo(id: DegreeType): DegreeTypeInfo | undefined {
  return DEGREE_TYPES.find((d) => d.id === id);
}
