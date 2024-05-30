import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const imgLoader = ({ src, width, quality }) => {
  return publicRuntimeConfig.BASE_PATH+`/assets/${src}?w=${width}&q=${quality || 75}`
}
export const serverAssets = ({ src, width, quality }) => {
  return publicRuntimeConfig.ASSETS_HOST+`${src}token=${publicRuntimeConfig.TOKEN_ASSETS_HOST}&w=${width}&q=${quality || 75}`
}