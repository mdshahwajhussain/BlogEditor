import React from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SaveStatus } from '../hooks/useAutoSave';

interface SaveIndicatorProps {
  status: SaveStatus;
  className?: string;
}

const SaveIndicator: React.FC<SaveIndicatorProps> = ({ status, className = '' }) => {
  if (status === 'idle') return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center text-sm transition-all ${className}`}
      >
        {status === 'saving' && (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-300">Saving...</span>
          </>
        )}
        
        {status === 'saved' && (
          <>
            <Check className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400">Saved</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
            <span className="text-red-600 dark:text-red-400">Failed to save</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SaveIndicator;