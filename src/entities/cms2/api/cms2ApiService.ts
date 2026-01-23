import { CMS2_API_URL, createHttpClient } from '~/shared/api/httpClient';

import type {
  Cms2BreadcrumbItem,
  Cms2BreadcrumbsResponse,
  Cms2FolderApiResponse,
  Cms2FolderResponse,
  Cms2LessonApiResponse,
  Cms2LessonResponse,
  Cms2Product,
  Cms2ProductContent,
  Cms2ProductContentResponse,
  Cms2ProductsResponse,
  Cms2Progress,
  Cms2ProgressResponse,
} from '../cms2Types';

const cms2Client = createHttpClient(CMS2_API_URL);

export const cms2ApiService = {
  getProducts: async (): Promise<Cms2Product[]> => {
    try {
      const { data } = await cms2Client.get<Cms2ProductsResponse>(
        '/v2/student/products',
      );

      return data.data.products;
    } catch (error) {
      console.error('Error fetching cms2 products:', error);
      throw error;
    }
  },

  getProductContent: async (productId: number): Promise<Cms2ProductContent> => {
    try {
      const { data } = await cms2Client.get<Cms2ProductContentResponse>(
        `/v2/student/products/${productId}/content`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching cms2 product content:', error);
      throw error;
    }
  },

  getFolder: async (folderId: number): Promise<Cms2FolderResponse> => {
    try {
      const { data } = await cms2Client.get<Cms2FolderApiResponse>(
        `/v2/student/folders/${folderId}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching cms2 folder:', error);
      throw error;
    }
  },

  getLesson: async (nodeId: number): Promise<Cms2LessonResponse> => {
    try {
      const { data } = await cms2Client.get<Cms2LessonApiResponse>(
        `/v2/student/content/${nodeId}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching cms2 lesson:', error);
      throw error;
    }
  },

  getProgress: async (nodeId: number): Promise<Cms2Progress | null> => {
    try {
      const { data } = await cms2Client.get<Cms2ProgressResponse>(
        `/v2/progress/${nodeId}`,
      );

      return data.data;
    } catch (error) {
      console.error('Error fetching cms2 progress:', error);
      return null;
    }
  },

  markPageComplete: async (nodeId: number, pageId: string): Promise<void> => {
    try {
      await cms2Client.post(`/v2/progress/${nodeId}/pages/${pageId}/complete`);
    } catch (error) {
      console.error('Error marking page complete:', error);
      throw error;
    }
  },

  markLessonComplete: async (nodeId: number): Promise<void> => {
    try {
      await cms2Client.post(`/v2/progress/${nodeId}/complete`);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      throw error;
    }
  },

  getBreadcrumbs: async (nodeId: number): Promise<Cms2BreadcrumbItem[]> => {
    try {
      const { data } = await cms2Client.get<Cms2BreadcrumbsResponse>(
        `/v2/student/content/${nodeId}/breadcrumbs`,
      );

      return data.data.breadcrumbs;
    } catch (error) {
      console.error('Error fetching cms2 breadcrumbs:', error);
      return [];
    }
  },
};
