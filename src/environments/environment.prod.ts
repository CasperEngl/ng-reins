import createHmac from 'create-hmac';
import * as OAuth from 'oauth-1.0a';

export const environment = {
  production: true,
  consumer: {
    key: 'ck_7bb07ccbe7ced1ad0ceb10fb5a45a90c5d9a2d04',
    secret: 'cs_ac46a1fee9066d4b4e844966e614fe6c03df6f8c',
  },
  oauth: new OAuth({
    consumer: {
      key: 'ck_7bb07ccbe7ced1ad0ceb10fb5a45a90c5d9a2d04',
      secret: 'cs_ac46a1fee9066d4b4e844966e614fe6c03df6f8c',
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return createHmac('sha1', key).update(base_string).digest('base64');
    },
  }),
};