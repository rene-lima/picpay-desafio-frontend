import { Config } from './config.interface'
import { environment } from 'environments/environment'

const config: Config = {
  apiBaseUrl: environment.API_BASE_URL || ''
}

export default config
