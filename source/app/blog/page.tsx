import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { getAllBlogs } from "@/lib/contentful"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"

export default async function Blog() {
  const blogPosts = await getAllBlogs()

  return (
    <main>
      <NavBar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {blogPosts.map((post: any) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row"
            >
              <div className="h-56 md:h-48 md:w-64 w-full overflow-hidden flex-shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 flex-1">
                  {post.description
                    ? documentToPlainTextString(post.description).slice(0, 160) + "..."
                    : ""}
                </p>
                <span className="mt-4 text-blue-500 font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

