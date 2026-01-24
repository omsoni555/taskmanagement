import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, Calendar } from 'lucide-react';
import { Task, categoryLabels, priorityLabels } from '@/types/task';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityClasses = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
};

export function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-4 ${priorityClasses[task.priority]} hover-lift group`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/40 hover:border-primary'
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="w-3.5 h-3.5 text-primary-foreground" />
            </motion.div>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-foreground transition-all duration-300 ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
              {categoryLabels[task.category]}
            </span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                task.priority === 'high'
                  ? 'bg-destructive/20 text-destructive'
                  : task.priority === 'medium'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {priorityLabels[task.priority]}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(task.dueDate, 'MMM d')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
