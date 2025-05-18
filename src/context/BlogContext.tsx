import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getBlogPosts, getBlogById } from '../services/blogService';
import { Blog } from '../types/Blog';

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  refreshBlogs: () => Promise<void>;
  getBlog: (id: string) => Promise<Blog | undefined>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getBlogPosts();
      setBlogs(data);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async (id: string): Promise<Blog | undefined> => {
    try {
      const blog = await getBlogById(id);
      return blog;
    } catch (err) {
      setError('Failed to load blog');
      console.error(err);
      return undefined;
    }
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, error, refreshBlogs, getBlog }}>
      {children}
    </BlogContext.Provider>
  );
};