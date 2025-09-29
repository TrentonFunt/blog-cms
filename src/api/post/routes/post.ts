/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post', {
  config: {
    find: {
      auth: false, // Allow public access to read posts
    },
    findOne: {
      auth: false, // Allow public access to read individual posts
    },
    create: {
      auth: false, // Allow public access to create posts
    },
    update: {
      auth: false, // Allow public access to update posts
    },
    delete: {
      auth: false, // Allow public access to delete posts
    },
  }
});
