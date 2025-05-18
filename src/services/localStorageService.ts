import { Blog, BlogFormData } from '../types/Blog';

const BLOGS_KEY = 'blog_posts';

export const getStoredBlogs = (): Blog[] => {
  const blogs = localStorage.getItem(BLOGS_KEY);
  return blogs ? JSON.parse(blogs) : [];
};

export const storeBlog = (blog: Blog): void => {
  const blogs = getStoredBlogs();
  const existingIndex = blogs.findIndex(b => b.id === blog.id);
  
  if (existingIndex >= 0) {
    blogs[existingIndex] = blog;
  } else {
    blogs.push(blog);
  }
  
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
};

export const deleteBlogFromStorage = (id: string): void => {
  const blogs = getStoredBlogs().filter(blog => blog.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
};

export const createBlog = (formData: BlogFormData, status: 'draft' | 'published'): Blog => {
  const newBlog: Blog = {
    id: crypto.randomUUID(),
    title: formData.title,
    content: formData.content,
    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  storeBlog(newBlog);
  return newBlog;
};