/**
 * Custom post routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/posts/slug/:slug',
      handler: 'post.findBySlug',
      config: {
        auth: false, // Allow public access
      },
    },
  ],
};
