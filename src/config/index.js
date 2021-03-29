const config = {}
const precessEnv = process.env.VUE_APP_MODE_ENV
config.baseUrl = process.env.VUE_APP_BASE_API
switch (precessEnv) {
    case 'production':
      config.ProManageAPIServer = 'hzhtServer/'
      break
    case 'test':
      config.ProManageAPIServer = ''
      break
    default:
      config.ProManageAPIServer = ''
  }
// config.baseUrl = 'http://demo.hinlok.com'
export const host = config
