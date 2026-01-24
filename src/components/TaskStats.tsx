import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  };
}

const statCards = [
  { key: 'total', label: 'Total Tasks', icon: ListTodo, color: 'text-champagne' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-success' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'text-primary' },
  { key: 'highPriority', label: 'High Priority', icon: AlertTriangle, color: 'text-destructive' },
] as const;

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="glass-card p-5 hover-lift cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <card.icon className={`w-5 h-5 ${card.color}`} />
            <span className={`text-2xl font-display font-bold ${card.color}`}>
              {stats[card.key]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{card.label}</p>
        </motion.div>
      ))}

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="col-span-2 lg:col-span-4 glass-card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-primary">{completionRate}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="h-full bg-gradient-to-r from-gold-dark via-primary to-gold-light rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
