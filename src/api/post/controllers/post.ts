/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  // Custom method to find posts by slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    const entity = await strapi.entityService.findMany('api::post.post', {
      filters: { slug },
      populate: {
        coverImage: true,
        author: {
          populate: {
            avatar: true
          }
        }
      }
    });

    if (!entity || entity.length === 0) {
      return ctx.notFound('Post not found');
    }

    return this.sanitizeOutput(entity[0], ctx);
  },

  // Override find method to include populated fields
  async find(ctx) {
    const { query } = ctx;
    
    const entities = await strapi.entityService.findMany('api::post.post', {
      ...query,
      populate: {
        coverImage: true,
        author: {
          populate: {
            avatar: true
          }
        }
      }
    });

    return this.sanitizeOutput(entities, ctx);
  },

  // Override findOne method to include populated fields
  async findOne(ctx) {
    const { id } = ctx.params;
    
    const entity = await strapi.entityService.findOne('api::post.post', id, {
      populate: {
        coverImage: true,
        author: {
          populate: {
            avatar: true
          }
        }
      }
    });

    if (!entity) {
      return ctx.notFound('Post not found');
    }

    return this.sanitizeOutput(entity, ctx);
  }
}));
