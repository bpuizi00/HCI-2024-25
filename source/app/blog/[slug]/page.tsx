import { notFound } from "next/navigation";
import { getAllBlogs } from "@/lib/contentful";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const blogPosts = await getAllBlogs();
  const blog = blogPosts.find((b: any) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <main>
      <NavBar />
      {/* Wide image section */}
      {blog.imageUrl && (
        <div className="w-full bg-gray-100 flex justify-center">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full max-w-6xl h-[420px] object-cover object-center rounded-none shadow-none"
            style={{ borderRadius: 0 }}
          />
        </div>
      )}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 font-sanspro leading-tight">{blog.title}</h1>
        <article className="prose prose-2xl max-w-none font-sanspro [&_h2]:mt-14 [&_h3]:mt-10 [&_p]:mt-8">
          {blog.description && typeof blog.description === "object"
            ? documentToReactComponents(blog.description)
            : <p>{blog.description}</p>
          }
        </article>
      </div>
      <Footer />
    </main>
  );
}