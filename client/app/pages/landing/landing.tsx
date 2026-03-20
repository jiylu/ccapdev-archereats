import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { useEffect } from "react";
import HeroSection from "./landing-hero-section";
import FeaturedSection from "./landing-featured";
import { useRestaurants } from "../../hooks/useRestaurants";
import PageLoader from "../../components/ui/loading";

export default function Landing() {
	const { restaurants, loading } = useRestaurants();

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
