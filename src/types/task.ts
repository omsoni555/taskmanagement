export type Priority = 'high' | 'medium' | 'low';
export type Category = 'work' | 'personal' | 'health' | 'finance' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: Date;
  createdAt: Date;
}

export const categoryColors: Record<Category, string> = {
  work: 'hsl(43 74% 49%)',
  personal: 'hsl(280 70% 50%)',
  health: 'hsl(142 76% 36%)',
  finance: 'hsl(200 80% 50%)',
  other: 'hsl(40 10% 50%)',
};

export const categoryLabels: Record<Category, string> = {
  work: 'Work',
  personal: 'Personal',
  health: 'Health',
  finance: 'Finance',
  other: 'Other',
};

export const priorityLabels: Record<Priority, string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};
