import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { useEffect, useState } from "react";
import { getAllRestaurants } from "../../api/restaurant.api";
import type { Restaurant } from "../../types/restaurant";
import PageLoader from "../../components/ui/loading";
import HeroSection from "./landing-hero-section";
import FeaturedSection from "./landing-featured";

export default function Landing() {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const data = await getAllRestaurants();
				setRestaurants(data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchRestaurants();
	}, []);

	useEffect(() => {
		document.title = "Landing | ArcherEats";
	});

	if (loading) return <PageLoader />;

	return (
		<>
			<Navbar />
			<main>
				<HeroSection />
				<FeaturedSection restaurants={restaurants} />
			</main>
			<Footer />
		</>
	);
}
