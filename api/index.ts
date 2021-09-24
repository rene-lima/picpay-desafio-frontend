import axios from 'axios'
import BrowserStorage from '../src/assets/utils/browser-storage'
import { environment } from 'src/environments/environment'

const WEB = 'WEB'
const baseURL = environment.api
const responseType = 'json'

const instance = axios.create({ baseURL, responseType })

instance.interceptors.request.use((config) => {
  const authToken = BrowserStorage.get('token', undefined)

  config.headers.client = WEB
  if (authToken && typeof authToken === 'string') {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
}, error => Promise.reject(error))


export default instance
