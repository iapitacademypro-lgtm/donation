import { client } from "./client"

export async function getAllPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(_createdAt desc){
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      excerpt,
      _createdAt
    }
  `)
}

export async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      body,
      _createdAt
    }
  `

  const post = await client.fetch(query, { slug })

  // fallback for missing mainImage
  if (post && !post.mainImage) {
    post.mainImage = undefined
  }

  return post || null
}