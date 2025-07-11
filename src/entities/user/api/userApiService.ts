import { httpClient } from '~/shared/api/httpClient';

import { GetUserResponse, UpdateUserDto } from '../userTypes';

export const userApiService = {
  getUser: async () => {
    try {
      const { data } = await httpClient.get<GetUserResponse>(
        `/v2/api/client/user/me`,
      );
      return data.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async ({ dto }: { dto: UpdateUserDto }) => {
    try {
      const response = await httpClient.patch(`/v2/api/client/user/me`, dto);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};
