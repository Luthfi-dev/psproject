import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const crypto = require('crypto')
const algorithm = 'aes-128-ctr'
const ENCRYPTION_KEY = publicRuntimeConfig.SECRET_KEY_ENCRYPTION
const IV_LENGTH = 16

function Encryption () {
  if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== 'string') {
    throw new Error('Cryptr: secret must be a non-0-length string')
  }
  this.encrypt = function encrypt (value) {
    if (value == null) {
      throw new Error('value must not be null or undefined')
    }
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv)
    let encrypted = cipher.update(value)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return `${iv.toString('hex')}f4st3r${encrypted.toString('hex')}`
  }

  this.decrypt = function decrypt (value) {
    if (value == null) {
      throw new Error('value must not be null or undefined')
    }
    const textParts = value.split('f4st3r')
    const iv = Buffer.from(textParts.shift(), 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }
}

module.exports = Encryption