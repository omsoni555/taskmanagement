import { useState, useEffect } from 'react';
import { Task, Priority, Category } from '@/types/task';

const STORAGE_KEY = 'luxe-tasks';

const generateId = () => Math.random().toString(36).substring(2, 15);

const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'Review quarterly reports',
    description: 'Analyze Q4 financial statements and prepare summary',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Morning meditation',
    description: '20 minutes of mindfulness practice',
    completed: true,
    priority: 'medium',
    category: 'health',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Update investment portfolio',
    description: 'Rebalance stocks and review dividend yields',
    completed: false,
    priority: 'high',
    category: 'finance',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Plan weekend getaway',
    description: 'Research luxury resorts and book accommodation',
    completed: false,
    priority: 'low',
    category: 'personal',
    createdAt: new Date(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((t: Task) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        }));
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
    
    return { total, completed, pending, highPriority };
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getStats,
  };
}
