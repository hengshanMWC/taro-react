const env = process.env

const config = {
  api: {
    baseUrl: env.TARO_APP_API,
    timeout: 6000,
  },
}

export default config
