import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Blog } from '../types/Blog';
import { format } from 'date-fns';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  const truncateContent = (content: string, maxLength: number = 150) => {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {blog.title || "Untitled Blog"}
          </h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            blog.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {blog.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            {blog.tags.length > 0 ? (
              blog.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No tags</span>
            )}
          </p>
        </div>
        
        <p className="text-gray-600 mb-4">{truncateContent(blog.content)}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <span>Updated: {format(new Date(blog.updated_at), 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/editor/${blog.id}`}
              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Edit size={18} />
            </Link>
            <button 
              onClick={() => onDelete(blog.id)}
              className="p-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;