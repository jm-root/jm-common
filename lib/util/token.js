var crypto = require('crypto');

module.exports = {
    /**
     * 加密
     * @param data 明文
     * @param key 密钥
     * @returns {*} 密文
     */
    enc: function(data, key) {
        var cipher = crypto.createCipher('aes-256-cbc', key);
        var encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    /**
     * 解密
     * @param data 密文
     * @param key 密钥
     * @returns {*} 明文
     */
    dec: function(data, key) {
        var decipher = crypto.createDecipher('aes-256-cbc', key);
        var dec;
        try {
            dec = decipher.update(data, 'hex', 'utf8');
            dec += decipher.final('utf8');
        } catch (err) {
            console.error('fail to decrypt data: %j key: %j', data, key);
            return null;
        }

        return dec;
    },

    /**
     * 计算哈希值
     * @param key
     * @returns {*|{type, default}}
     */
    hash: function(key) {
        var sha256 = crypto.createHash('sha256');
        sha256.update(key);
        return sha256.digest('hex');
    },

    /**
     * 生成密钥
     * @param key
     * @returns {*|{type, default}}
     */
    createKey: function(key) {
        key = key || '';
        key += Math.random() + Date.now().toString();
        return this.hash(key);
    },

    /**
     * 已经费弃, 请用enc代替
     * @deprecated
     */
    createCipher: function(data, key) {
        return this.enc(data, key);
    },

    /**
     * 已经费弃, 请用dec代替
     * @deprecated
     */
    parse: function(data, key) {
        return this.dec(data, key);
    }

};
