var CryptoJS = require("crypto-js")
// Nodejs encryption with CTR
var crypto = require('crypto')
const ENCRYPTION_KEY = 'knockusanytimeincubation'   // Must be 256 bits (32 characters)
const IV_LENGTH = 16 // For AES, this is always 16

exports.encrypt =  function (text) {
  let iv = crypto.randomBytes(IV_LENGTH)
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(text)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

exports.decrypt = function (text) {
  let textParts = text.split(':')
  let iv = Buffer.from(textParts.shift(), 'hex')
  let encryptedText = Buffer.from(textParts.join(':'), 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

//Encrypt and decrypt an object like var data = [{id: 1}, {id: 2}]
 
// Encrypt object
exports.encryptObject = function (data){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
    return ciphertext
  }
  
  // Decrypt object
  exports.decryptObject = function (ciphertext){
    var bytes  = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY)
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }

  