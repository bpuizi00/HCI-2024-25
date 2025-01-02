import { use } from 'react';

interface Product {
  id: number;
  title: string;
  body: string;
}

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const product: Product = await res.json();
  return product;
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const product = use(fetchProduct(params.id));

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight mb-10">{product.title}</h1>
      <p>{product.body}</p>
    </main>
  );
}