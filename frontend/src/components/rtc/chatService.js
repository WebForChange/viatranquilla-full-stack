import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { DataContext } from '../../contexts/DataContextProvider';

const BASE_URL = 'http://localhost:3000';

export const fetchMessages = async (userId, receiverId) => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/${userId}/${receiverId}`, {
        withCredentials: true,
      });
      console.log('Response from fetchMessages:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };

  export const sendMessage = async (receiverId, message) => {
    try {
      const response = await axios.post(`${BASE_URL}/messages/send/${receiverId}`, { message }, {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

export const fetchConversations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/messages/conversation`, {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const fetchMessagesInConversation = async (conversationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/messages/conversation/${conversationId}`, {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages in conversation:', error);
    throw error;
  }
};