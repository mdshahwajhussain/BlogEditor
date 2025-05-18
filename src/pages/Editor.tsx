import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Send } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { saveDraft, publishBlog } from '../services/blogService';
import { BlogFormData } from '../types/Blog';
import useAutoSave from '../hooks/useAutoSave';
import { useBlogContext } from '../context/BlogContext';
import SaveIndicator from '../components/SaveIndicator';
import { motion } from 'framer-motion';

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlog } = useBlogContext();
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    tags: '',
    status: 'draft'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { saveStatus } = useAutoSave(formData, id);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const blog = await getBlog(id);
          if (blog) {
            setFormData({
              title: blog.title,
              content: blog.content,
              tags: blog.tags.join(', '),
              status: blog.status
            });
          }
        } catch (error) {
          toast.error('Failed to load blog');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchBlog();
  }, [id, getBlog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft(formData, id);
      toast.success('Draft saved successfully');
      if (!id) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to save draft');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Content is required');
      return;
    }
    
    setIsPublishing(true);
    try {
      await publishBlog(formData, id);
      toast.success('Blog published successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to publish blog');
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {id ? 'Edit Blog' : 'Create New Blog'}
          </h1>
          <div className="flex items-center space-x-3">
            <SaveIndicator status={saveStatus} className="mr-4" />
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
        
        <form>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                placeholder="Write your blog content here..."
                className="h-64 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="technology, programming, design"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Editor;