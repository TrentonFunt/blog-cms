export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:1338', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:1338'],
      credentials: true,
      headers: '*',
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
