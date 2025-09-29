import type { Schema, Struct } from '@strapi/strapi';

export interface AuthorAuthorInfo extends Struct.ComponentSchema {
  collectionName: 'components_author_author_infos';
  info: {
    description: 'Author information for blog posts';
    displayName: 'Author Info';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'author.author-info': AuthorAuthorInfo;
    }
  }
}
