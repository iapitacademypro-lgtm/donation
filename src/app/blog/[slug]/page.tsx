import { getPost } from "@/sanity/lib/sanity.queires"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Post {
  title: string
  slug: string
  mainImage?: string
  excerpt?: string
  body: any
  _createdAt: string
}

interface Params {
  params: Promise<{ slug: string }>
}

// 🔹 Generate dynamic metadata for each blog post
export async function generateMetadata(
  { params }: Params
): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | FGRF",
      description: "The post you are looking for could not be found."
    }
  }

  return {
    title: post.title,
    description: post.excerpt || "Read this article from FGRF about our work in Africa.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Discover how donations impact lives through FGRF.",
      images: post.mainImage ? [{ url: post.mainImage }] : [],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Discover how donations impact lives through FGRF.",
      images: post.mainImage ? [post.mainImage] : []
    }
  }
}

// 🔹 Actual page content
export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post: Post | null = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Featured Image */}
      {post.mainImage && (
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-[400px] object-cover"
        />
      )}

      <div className="p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {post.title}
        </h1>

        {/* Body with pro typography */}
        <div
          className="
            prose 
            prose-lg 
            lg:prose-xl 
            prose-p:leading-relaxed 
            prose-p:text-gray-700 
            prose-headings:text-gray-900 
            prose-headings:font-bold 
            prose-a:text-cyan-600 hover:prose-a:underline 
            prose-img:rounded-xl 
            prose-li:marker:text-cyan-600 
            max-w-none
          "
        >
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
}
