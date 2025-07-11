// api/levels.ts
import axios from 'axios';
import { BASE_URL } from './config';
import type { Level, PaginatedResponse } from '../types';

export const getLevels = async (): Promise<Level[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/levels/`);
    console.log('Raw Levels API Response:', JSON.stringify(response.data, null, 2));
    const data = response.data as PaginatedResponse<Level>;
    if (!Array.isArray(data.results)) {
      throw new Error(`Expected array in results, got ${typeof data.results}`);
    }
    return data.results;
  } catch (error: any) {
    console.error('Fetch Levels Error:', JSON.stringify({
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    }, null, 2));
    throw error;
  }
};

export const createLevel = async (data: {level: number }): Promise<Level> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/levels/`, data, {
      headers: { 'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)?.[1] || '' },
    });
    console.log('Create Level Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error: any) {
    console.error('Create Level Error:', JSON.stringify({
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    }, null, 2));
    throw error;
  }
};

export const deleteLevel = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/api/levels/${id}/`, {
      headers: { 'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)?.[1] || '' },
    });
    console.log(`Deleted Level ID: ${id}`);
  } catch (error: any) {
    console.error('Delete Level Error:', JSON.stringify({
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    }, null, 2));
    throw error;
  }
};