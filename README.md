# Blog CMS Backend - Strapi Headless CMS

A powerful headless CMS backend built with Strapi v5.23.4 for the modern blog application. This backend provides a complete content management system with RESTful APIs for blog posts, authors, categories, tags, and comments.

## 🚀 Features

### Content Management
- **Blog Posts**: Full CRUD operations with rich content support
- **Authors**: Author profiles with bio, avatar, and social links
- **Categories**: Organize posts into categories
- **Tags**: Flexible tagging system for posts
- **Comments**: Comment management with moderation capabilities
- **Media Library**: Cloudinary integration for image and file management

### Technical Features
- **Strapi v5.23.4**: Latest stable version with enhanced performance
- **SQLite Database**: Lightweight database perfect for development and small deployments
- **RESTful APIs**: Well-structured API endpoints for all content types
- **Authentication**: Token-based authentication for secure access
- **CORS Configuration**: Configured for frontend integration
- **TypeScript Support**: Full TypeScript configuration for type safety

### API Endpoints

#### Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get specific post by ID
- `GET /api/posts/slug/:slug` - Get post by slug
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

#### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get specific author
- `POST /api/authors` - Create new author (authenticated)

#### Categories & Tags
- `GET /api/categories` - Get all categories
- `GET /api/tags` - Get all tags
- `POST /api/categories` - Create category (authenticated)
- `POST /api/tags` - Create tag (authenticated)

## 🛠️ Tech Stack

- **Strapi v5.23.4** - Headless CMS framework
- **Node.js** - Runtime environment
- **SQLite** - Database (better-sqlite3)
- **TypeScript** - Type safety and better development experience
- **Cloudinary** - Media storage and optimization
- **React** - Admin panel (built into Strapi)

## 📁 Project Structure

```
blog-cms/
├── config/                  # Configuration files
│   ├── admin.ts            # Admin panel configuration
│   ├── api.ts              # API configuration
│   ├── database.ts         # Database configuration
│   ├── middlewares.ts      # Middleware configuration
│   ├── plugins.ts          # Plugin configuration (Cloudinary)
│   └── server.ts           # Server configuration
├── database/               # Database files
│   └── migrations/         # Database migrations
├── src/
│   ├── api/                # API definitions
│   │   ├── author/         # Author content type
│   │   ├── category/       # Category content type
│   │   ├── comment/        # Comment content type
│   │   ├── post/           # Post content type
│   │   └── tag/            # Tag content type
│   ├── components/         # Reusable components
│   │   └── author/         # Author component schemas
│   └── extensions/         # Extensions and customizations
├── types/                  # TypeScript type definitions
│   └── generated/          # Auto-generated types
├── public/                 # Static files
│   └── uploads/            # Local file uploads (if not using Cloudinary)
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   HOST=0.0.0.0
   PORT=1337
   
   # Security Keys (Generate strong keys for production)
   APP_KEYS="your_app_key_1,your_app_key_2"
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   TRANSFER_TOKEN_SALT=your_transfer_token_salt
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_encryption_key
   
   # Database Configuration (SQLite)
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   
   # Cloudinary Configuration (Optional)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

4. **Generate Security Keys**
   ```bash
   # Generate secure keys for production
   npm run generate-keys
   # Or use online generators for APP_KEYS, JWT secrets, etc.
   ```

### Development

1. **Start the development server**
   ```bash
   npm run develop
   ```
   
   This starts Strapi with auto-reload enabled at `http://localhost:1337`

2. **Access the Admin Panel**
   - Open `http://localhost:1337/admin`
   - Create your admin account on first visit
   - Configure content types and permissions

3. **API Documentation**
   - API endpoints: `http://localhost:1337/api`
   - Documentation: `http://localhost:1337/documentation` (if enabled)

## 🗄️ Content Types

### Post Content Type
```typescript
{
  title: string (required),
  slug: string (unique, auto-generated),
  excerpt: text (optional),
  content: richtext (required),
  coverImage: media (optional),
  category: relation to Category,
  tags: relation to Tags (many-to-many),
  author: relation to Author,
  readTime: integer (default: 5),
  featured: boolean (default: false),
  publishedAt: datetime,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Author Content Type
```typescript
{
  name: string (required),
  email: string (unique),
  bio: text,
  avatar: media,
  website: string,
  twitter: string,
  linkedin: string,
  posts: relation to Posts (one-to-many)
}
```

### Category & Tag Content Types
```typescript
// Category
{
  name: string (required),
  slug: string (unique),
  description: text,
  posts: relation to Posts (one-to-many)
}

// Tag
{
  name: string (required),
  slug: string (unique),
  color: string (hex color),
  posts: relation to Posts (many-to-many)
}
```

## 🔧 Configuration

### Database Configuration
The project uses SQLite for development and can be easily switched to PostgreSQL for production:

```typescript
// config/database.ts
export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  const connections = {
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    // PostgreSQL configuration available for production
  };
};
```

### Cloudinary Integration
```typescript
// config/plugins.ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
```

### CORS Configuration
```typescript
// config/middlewares.ts - Configured for frontend integration
export default [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:5173', 'your-production-frontend-url'],
    },
  },
  // ... other middlewares
];
```

## 🚀 Deployment

### Railway Deployment (Recommended)

1. **Prepare for production**
   ```bash
   npm run build
   ```

2. **Environment Variables for Railway**
   ```env
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=${PORT}
   
   # Security (generate strong keys)
   APP_KEYS=production_key_1,production_key_2
   API_TOKEN_SALT=production_api_token_salt
   ADMIN_JWT_SECRET=production_admin_jwt_secret
   TRANSFER_TOKEN_SALT=production_transfer_token_salt
   JWT_SECRET=production_jwt_secret
   ENCRYPTION_KEY=production_encryption_key
   
   # Database (SQLite works on Railway)
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=/app/data/database.db
   
   # Cloudinary (recommended for production)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

3. **Deploy to Railway**
   - Connect your GitHub repository to Railway
   - Set environment variables in Railway dashboard
   - Deploy automatically on push to main branch

### Alternative Deployment Options
- **Render**: Supports SQLite with persistent storage
- **DigitalOcean App Platform**: Full support for Strapi
- **VPS/Self-hosted**: Complete control over environment

## 📊 API Authentication

### Creating API Tokens

1. **In Strapi Admin**
   - Go to Settings → API Tokens
   - Create new token with appropriate permissions
   - Use token in frontend requests

2. **Using API Tokens**
   ```javascript
   // Frontend API calls
   const response = await fetch('http://localhost:1337/api/posts', {
     headers: {
       'Authorization': `Bearer ${YOUR_API_TOKEN}`,
       'Content-Type': 'application/json',
     },
   });
   ```

## 🔒 Security

### Production Security Checklist
- [ ] Generate strong, unique keys for all environment variables
- [ ] Configure CORS for production domains only
- [ ] Set up proper user permissions and roles
- [ ] Use HTTPS in production
- [ ] Regular security updates for dependencies
- [ ] Database backups configured
- [ ] File upload restrictions in place

## 📈 Performance

### Optimization Tips
- **Database Indexing**: Proper indexing for frequently queried fields
- **Media Optimization**: Use Cloudinary for automatic image optimization
- **Caching**: Enable Strapi's built-in caching mechanisms
- **Pagination**: Implement pagination for large datasets

## 🧪 Development Commands

```bash
# Development with auto-reload
npm run develop

# Production build
npm run build

# Production start
npm start

# Strapi console
npm run console

# Deploy (if configured)
npm run deploy

# Upgrade Strapi
npm run upgrade
```

## 🔧 Troubleshooting

### Common Issues

1. **Port 1337 already in use**
   ```bash
   # Kill process on port 1337
   lsof -ti:1337 | xargs kill -9
   ```

2. **Database connection issues**
   - Check DATABASE_CLIENT and related env variables
   - Ensure .tmp directory has write permissions

3. **Cloudinary upload issues**
   - Verify Cloudinary credentials
   - Check file size and format restrictions

4. **CORS errors from frontend**
   - Update middlewares.ts with correct frontend URL
   - Restart Strapi after configuration changes

## 📚 Learn More

- [Strapi Documentation](https://docs.strapi.io) - Official Strapi documentation
- [Strapi v5 Migration Guide](https://docs.strapi.io/dev-docs/migration-guides) - Migration guides
- [Strapi Cloud](https://cloud.strapi.io) - Official hosting platform
- [Strapi Community](https://discord.strapi.io) - Join the community

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Backend API for Tiwa's Blog - Built with Strapi 🚀**
