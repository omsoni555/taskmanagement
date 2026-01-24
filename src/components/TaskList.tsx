import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, Category, Priority } from '@/types/task';
import { TaskItem } from './TaskItem';
import { Search, Filter, SortAsc } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'date' | 'priority' | 'name';

export function TaskList({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  const categoryButtons: { label: string; value: Category | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Health', value: 'health' },
    { label: 'Finance', value: 'finance' },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filterButtons.map((btn) => (
              <motion.button
                key={btn.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(btn.value)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  filter === btn.value
                    ? 'bg-primary text-primary-foreground gold-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <div className="flex flex-wrap items-center gap-2">
            {categoryButtons.map((btn) => (
              <motion.button
                key={btn.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryFilter(btn.value)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  categoryFilter === btn.value
                    ? 'bg-primary text-primary-foreground gold-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="glass-input px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No tasks found</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                {search ? 'Try a different search term' : 'Add a new task to get started'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
