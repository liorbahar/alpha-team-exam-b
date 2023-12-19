import axios from 'axios'
import Config from '../Config'
import ActievChat from './types/Chat';

export function getAllActiveChats(): Promise<ActievChat[]> {
  return axios.get(`${Config.url}/chat`).then(res => res.data);
}