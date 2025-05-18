export interface Blog {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  tags: string;
  status: 'draft' | 'published';
}