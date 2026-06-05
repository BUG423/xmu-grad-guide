/**
 * Zustand 全局状态管理
 * 管理当前选择的学位类型和任务勾选进度
 */

import { create } from 'zustand';
import type { DegreeType, DegreeTypeInfo } from '../data/degreeTypes';
import { DEGREE_TYPES } from '../data/degreeTypes';
import type { TaskProgress } from '../utils/storage';
import { loadProgress, toggleTask as storageToggleTask } from '../utils/storage';

interface ProgressState {
  /** 当前选择的学位类型 */
  selectedDegree: DegreeType | null;
  selectedDegreeInfo: DegreeTypeInfo | null;
  /** 各学位类型的任务进度 */
  progress: Record<string, TaskProgress>;

  // Actions
  selectDegree: (degreeType: DegreeType) => void;
  toggleTask: (taskId: string, completed: boolean) => void;
  getCompletedCount: (degreeType: DegreeType) => number;
  getTotalCount: (degreeType: DegreeType) => number;
  getPhaseProgress: (degreeType: DegreeType, phaseTaskIds: string[]) => { completed: number; total: number };
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  selectedDegree: null,
  selectedDegreeInfo: null,
  progress: {},

  selectDegree: (degreeType: DegreeType) => {
    const info = DEGREE_TYPES.find((d) => d.id === degreeType) || null;
    const progress = loadProgress(degreeType);
    set({
      selectedDegree: degreeType,
      selectedDegreeInfo: info,
      progress: { ...get().progress, [degreeType]: progress },
    });
  },

  toggleTask: (taskId: string, completed: boolean) => {
    const { selectedDegree, progress } = get();
    if (!selectedDegree) return;

    storageToggleTask(selectedDegree, taskId, completed);
    const updatedProgress = loadProgress(selectedDegree);
    set({
      progress: { ...progress, [selectedDegree]: updatedProgress },
    });
  },

  getCompletedCount: (degreeType: DegreeType) => {
    const progress = get().progress[degreeType] || loadProgress(degreeType);
    return Object.values(progress).filter((p) => p.completed).length;
  },

  getTotalCount: (_degreeType: DegreeType) => {
    // This will be computed from the flow data
    return 0; // placeholder
  },

  getPhaseProgress: (degreeType: DegreeType, phaseTaskIds: string[]) => {
    const progress = get().progress[degreeType] || {};
    const completed = phaseTaskIds.filter((id) => progress[id]?.completed).length;
    return { completed, total: phaseTaskIds.length };
  },
}));
