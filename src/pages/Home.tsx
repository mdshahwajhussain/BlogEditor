import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import BlogList from '../components/BlogList';
import BlogStats from '../components/BlogStats';
import { useBlogContext } from '../context/BlogContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { blogs, loading, error, refreshBlogs } = useBlogContext();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Blog Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your blog posts and drafts</p>
        </div>
        
        <Link
          to="/editor"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          <PenLine className="mr-2 h-5 w-5" />
          Create New Blog
        </Link>
      </div>
      
      <BlogStats blogs={blogs} />
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <BlogList 
        blogs={blogs} 
        loading={loading} 
        refreshBlogs={refreshBlogs} 
      />
    </motion.div>
  );
};

export default Home;