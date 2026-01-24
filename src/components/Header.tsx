import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onAddTask: () => void;
}

export function Header({ onAddTask }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient-gold">
            Luxe Tasks
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-11">
          Elevate your productivity with elegance
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddTask}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-dark via-primary to-gold-light text-primary-foreground font-semibold transition-all duration-300 gold-glow hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Add Task
      </motion.button>
    </motion.header>
  );
}
