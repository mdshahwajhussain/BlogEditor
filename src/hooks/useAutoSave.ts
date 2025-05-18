import { useEffect, useRef, useState } from 'react';
import { BlogFormData } from '../types/Blog';
import { saveDraft } from '../services/blogService';
import toast from 'react-hot-toast';
import { debounce } from '../utils/debounce';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const useAutoSave = (formData: BlogFormData, blogId?: string) => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const lastSavedRef = useRef<string>('');
  
  const performSave = async () => {
    const currentData = JSON.stringify(formData);
    
    if (currentData !== lastSavedRef.current && (formData.title.trim() || formData.content.trim())) {
      try {
        setSaveStatus('saving');
        await saveDraft(formData, blogId);
        lastSavedRef.current = currentData;
        setSaveStatus('saved');
        toast.success('Draft auto-saved', {
          icon: '💾',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      } catch (error) {
        setSaveStatus('error');
        toast.error('Failed to auto-save draft');
        console.error('Auto-save error:', error);
      }
    }
  };

  // Debounced save function for typing inactivity
  const debouncedSave = debounce(performSave, 5000);

  // Set up the debounce timer for auto-save
  useEffect(() => {
    debouncedSave();
    return () => {
      debouncedSave.cancel?.();
    };
  }, [formData]);

  // Set up interval timer for periodic saves
  useEffect(() => {
    const intervalId = setInterval(performSave, 30000);
    return () => clearInterval(intervalId);
  }, [formData]);

  return { saveStatus, performSave };
};

export default useAutoSave;