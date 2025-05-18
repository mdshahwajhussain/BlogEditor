import { Blog, BlogFormData } from '../types/Blog';
import { createBlog, deleteBlogFromStorage, getStoredBlogs, storeBlog } from './localStorageService';

export const getBlogPosts = async (): Promise<Blog[]> => {
  return getStoredBlogs();
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const blog = getStoredBlogs().find(b => b.id === id);
  if (!blog) throw new Error('Blog not found');
  return blog;
};

export const saveDraft = async (formData: BlogFormData, id?: string): Promise<Blog> => {
  if (id) {
    const blog = await getBlogById(id);
    const updatedBlog: Blog = {
      ...blog,
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updated_at: new Date().toISOString()
    };
    storeBlog(updatedBlog);
    return updatedBlog;
  }
  
  return createBlog(formData, 'draft');
};

export const publishBlog = async (formData: BlogFormData, id?: string): Promise<Blog> => {
  if (id) {
    const blog = await getBlogById(id);
    const updatedBlog: Blog = {
      ...blog,
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: 'published',
      updated_at: new Date().toISOString()
    };
    storeBlog(updatedBlog);
    return updatedBlog;
  }
  
  return createBlog(formData, 'published');
};

export const deleteBlog = async (id: string): Promise<void> => {
  deleteBlogFromStorage(id);
};