import { client } from "./client"

export async function getAllPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(_createdAt desc){
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        excerpt,
        _createdAt
      }
    `)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes("Dataset") || message.includes("not found")) {
      console.warn(`Sanity blog fetch skipped: ${message}`)
    } else {
      console.error("Sanity getAllPosts failed:", message)
    }
    return []
  }
}

export async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      body,
      excerpt,
      _createdAt
    }
  `

  try {
    const post = await client.fetch(query, { slug })

    // fallback for missing mainImage
    if (post && !post.mainImage) {
      post.mainImage = undefined
    }

    return post || null
  } catch (error) {
    console.error(`Sanity getPost failed for slug=${slug}:`, error)
    return null
  }
}