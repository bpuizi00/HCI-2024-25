import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/404picture.webp"
        alt="Not found"
        width={300}
        height={200}
        className="mb-8"
      />
      <a href="/" className="mt-4 px-6 py-2 border border-blue-500 rounded text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-colors">Go back home</a>
    </div>
  )
}