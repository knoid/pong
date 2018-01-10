const crypto = require('crypto');

const isProd = process.env.NODE_ENV === 'production';
const cache = {};

module.exports = {
  extensions: ['.css', '.scss'],
  // Same scope name as in webpack build
  generateScopedName(localName, resourcePath) {
    const [fileNameExt] = resourcePath.split('/').slice(-1);
    const [fileName] = fileNameExt.split('.');
    const className = `${fileName}-${localName}`;

    if (isProd) {
      if (!cache[className]) {
        const cipher = crypto.createHash('sha256');
        cipher.update(className);
        [cache[className]] = cipher.digest('base64').match(/[a-z][a-ce-z0-9]{3}/ig);
      }
      if (!cache[className]) {
        throw new Error(`Hash for '${className}' css class coudn't be calculated.`);
      }
      return cache[className];
    }

    return className;
  },
};
