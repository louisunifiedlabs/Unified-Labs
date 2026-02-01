import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'pwy5mqmq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Queries
export async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      summary,
      coverImage,
      category,
      publishedAt,
    }`
  )
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      summary,
      coverImage,
      content,
      category,
      publishedAt,
    }`,
    { slug }
  )
}

export async function getRecentPosts(limit: number = 6) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      summary,
      coverImage,
      category,
      publishedAt,
    }`,
    { limit }
  )
}

// Type
export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  coverImage?: any
  content?: any[]
  category?: string
  publishedAt?: string
}
