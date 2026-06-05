/**
 * localStorage 工具
 * 存储和读取用户的勾选进度
 */

import type { DegreeType } from '../data/degreeTypes';

const PROGRESS_PREFIX = 'grad_progress_';

export interface TaskProgress {
  [taskId: string]: {
    completed: boolean;
    completedAt?: string;
    notes?: string;
  };
}

function getKey(degreeType: DegreeType): string {
  return `${PROGRESS_PREFIX}${degreeType}`;
}

export function loadProgress(degreeType: DegreeType): TaskProgress {
  try {
    const raw = localStorage.getItem(getKey(degreeType));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(degreeType: DegreeType, progress: TaskProgress): void {
  localStorage.setItem(getKey(degreeType), JSON.stringify(progress));
}

export function toggleTask(
  degreeType: DegreeType,
  taskId: string,
  completed: boolean
): void {
  const progress = loadProgress(degreeType);
  progress[taskId] = {
    completed,
    completedAt: completed ? new Date().toISOString() : undefined,
  };
  saveProgress(degreeType, progress);
}

export function getCompletedCount(degreeType: DegreeType): number {
  const progress = loadProgress(degreeType);
  return Object.values(progress).filter((p) => p.completed).length;
}

export function getAllProgress(): Record<string, TaskProgress> {
  const all: Record<string, TaskProgress> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PROGRESS_PREFIX)) {
      const degreeType = key.replace(PROGRESS_PREFIX, '');
      all[degreeType] = loadProgress(degreeType as DegreeType);
    }
  }
  return all;
}
