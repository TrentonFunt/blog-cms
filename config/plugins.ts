export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      // Allow public access to upload endpoints
      routes: {
        upload: {
          auth: false,
        },
        find: {
          auth: false,
        },
        findOne: {
          auth: false,
        },
        destroy: {
          auth: false,
        },
      },
    },
  },
});
