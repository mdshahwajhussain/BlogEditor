import React, { useState } from 'react';
import { Blog } from '../types/Blog';
import BlogCard from './BlogCard';
import { deleteBlog } from '../services/blogService';
import toast from 'react-hot-toast';

interface BlogListProps {
  blogs: Blog[];
  loading: boolean;
  refreshBlogs: () => Promise<void>;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, loading, refreshBlogs }) => {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        toast.success('Blog deleted successfully');
        refreshBlogs();
      } catch (error) {
        toast.error('Failed to delete blog');
        console.error(error);
      }
    }
  };
  
  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    return blog.status === filter;
  });
  
  const publishedCount = blogs.filter(blog => blog.status === 'published').length;
  const draftCount = blogs.filter(blog => blog.status === 'draft').length;
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Your Blogs</h2>
          
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({blogs.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === 'published' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === 'draft' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500">No blogs found. Click "New Blog" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;