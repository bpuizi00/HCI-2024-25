// filepath: /C:/Users/Puizina/Downloads/HCI-2024-25-main/HCI-2024-25-main/assignments/treci/src/app/blog/page.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  body: string;
}

async function fetchProducts(page: number): Promise<Product[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
  const products: Product[] = await res.json();
  return products;
}

export default function BlogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      const newProducts = await fetchProducts(page);
      setProducts(newProducts);
    }
    loadProducts();
  }, [page]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight mb-10">Blog</h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="p-6 bg-white rounded-lg shadow-md">
            <Link href={`/blog/${product.id}`}>
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p>{product.body}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-10 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
}