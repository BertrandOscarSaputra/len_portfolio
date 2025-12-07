// lib/queries.ts
import { client } from "./sanity";

export interface Work {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description?: string;
  video: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  thumbnail?: any;
  featured: boolean;
  order?: number;
  publishedAt: string;
}

// Get all works
export async function getAllWorks(): Promise<Work[]> {
  const query = `*[_type == "work"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    video {
      asset-> {
        _ref,
        url
      }
    },
    thumbnail,
    featured,
    order,
    publishedAt
  }`;

  return await client.fetch(query);
}

// Get featured works (for homepage carousel)
export async function getFeaturedWorks(): Promise<Work[]> {
  const query = `*[_type == "work" && featured == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    video {
      asset-> {
        _ref,
        url
      }
    },
    thumbnail,
    featured,
    order,
    publishedAt
  }`;

  return await client.fetch(query);
}

// Get works by category
export async function getWorksByCategory(category: string): Promise<Work[]> {
  const query = `*[_type == "work" && category == $category] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    video {
      asset-> {
        _ref,
        url
      }
    },
    thumbnail,
    featured,
    order,
    publishedAt
  }`;

  return await client.fetch(query, { category });
}

// Get single work by slug
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const query = `*[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    video {
      asset-> {
        _ref,
        url
      }
    },
    thumbnail,
    featured,
    order,
    publishedAt
  }`;

  return await client.fetch(query, { slug });
}
