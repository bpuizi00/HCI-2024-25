import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const blogPosts = [
	{
		id: 1,
		title: "Exploring the Dalmatian Coast: Top 5 Hidden Gems",
		description:
			"Discover the lesser-known treasures along Croatia's stunning coastline, perfect for your next adventure.",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		href: "/blog/dalmatian-coast-gems",
	},
	{
		id: 2,
		title: "How to Book the Perfect Vacation Rental",
		description:
			"Tips and tricks for finding the best stays, avoiding scams, and making the most of your trip.",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
		href: "/blog/perfect-vacation-rental",
	},
	{
		id: 3,
		title: "Family-Friendly Activities in Split",
		description:
			"A guide to the best attractions and activities for families visiting Split, Croatia.",
		image:
			"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
		href: "/blog/family-activities-split",
	},
]

export default function Blog() {
	return (
		<main>
			<NavBar />
			<div className="container mx-auto mt-8 px-4">
				<h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{blogPosts.map((post) => (
						<Link
							key={post.id}
							href={post.href}
							className="group rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col"
						>
							<div className="h-56 w-full overflow-hidden">
								<img
									src={post.image}
									alt={post.title}
									className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="p-6 flex-1 flex flex-col">
								<h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
									{post.title}
								</h2>
								<p className="text-gray-600 flex-1">
									{post.description}
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

