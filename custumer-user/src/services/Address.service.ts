import axios from 'axios'
import Config from '../Config'

export function getAllAddresses(): Promise<string[]> {
  return axios.get(`${Config.url}/address`).then(res => res.data);
}