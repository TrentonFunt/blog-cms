/**
 * Upload routes configuration
 * Allow public access to upload endpoints
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/upload',
      handler: 'upload.upload',
      config: {
        auth: false, // Allow public access to upload
      },
    },
    {
      method: 'GET',
      path: '/upload/files',
      handler: 'upload.find',
      config: {
        auth: false, // Allow public access to find files
      },
    },
    {
      method: 'GET',
      path: '/upload/files/:id',
      handler: 'upload.findOne',
      config: {
        auth: false, // Allow public access to find one file
      },
    },
    {
      method: 'DELETE',
      path: '/upload/files/:id',
      handler: 'upload.destroy',
      config: {
        auth: false, // Allow public access to delete files
      },
    },
  ],
};
