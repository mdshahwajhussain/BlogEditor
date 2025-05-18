import React from 'react';
import { motion } from 'framer-motion';
import { Blog } from '../types/Blog';

interface BlogStatsProps {
  blogs: Blog[];
}

const BlogStats: React.FC<BlogStatsProps> = ({ blogs }) => {
  const publishedCount = blogs.filter(blog => blog.status === 'published').length;
  const draftCount = blogs.filter(blog => blog.status === 'draft').length;
  
  const stats = [
    { label: 'Total Blogs', count: blogs.length, color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' },
    { label: 'Published', count: publishedCount, color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' },
    { label: 'Drafts', count: draftCount, color: 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.color} rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md`}
        >
          <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
          <p className="text-3xl font-bold">{stat.count}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogStats;