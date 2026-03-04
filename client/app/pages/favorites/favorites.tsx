import Navbar from "../../components/layout/navbar";
import { useEffect } from "react";
import FavoritesCard from "./favorites-card";

interface Favorite {
    name: string;
    image: string;
    rating: number;
    description: string;
    link: string;
}

const favorites: Favorite[] = [
    {
        name: "La Toca",
        image: "https://images.summitmedia-digital.com/spotph/images/2023/10/06/la-toca-taqueria-1-1696586016.jpeg",
        rating: 4.67,
        description: "Mexican place near Razon",
        link: "",
    },
    {
        name: "The Barn",
        image: "https://static.where-e.com/Philippines/Metro_Manila/Malate/The-Barn_d37b8917af87015c57f0fe6e360d1b9d.jpg",
        rating: 4.5,
        description: "Casual Dining Place",
        link: "",
    },
    {
      name: "El Poco Cantina",
      image: "https://od2-workbench-api.abs-cbn.com/api/upload-raw/20251105081156/9aacb347-e65e-42ab-8b5b-8a5b44b4ee01.jpg",
      rating: 4.5,
      description: "Good Taco Place",
      link: "",
    },
    {
      name: "Tagpuan Berde",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoq8xTuXqO8FLoq5VGJ1TsOOYLWk7csm97TOCNYVIru2GJiCOuvtlQGA5VcU6-JoiqJKGFXKLPmgcR2pQybC61CPf0fwQVtQiWF6nzLM-6qHeWwLLnj6gqVSa5HIk2Zm--4ZSD-=s1360-w1360-h1020-rw",
      rating: 4.5,
      description: "Filipino Diner near Razon",
      link: "",
    },
    {
      name: "Tinuhog ni Benny",
      image: "https://s3-media0.fl.yelpcdn.com/bphoto/SBk46rZy3INseCrm17r01A/o.jpg",
      rating: 4.5,
      description: "Barbecue House across DLSU",
      link: "",
    },
];

export default function Favorites () {
    
    useEffect(() => {
        document.title="Favorites | ArcherEats";
    }, [])

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <section className="px-6 md:px-24 py-12">
                <h1 className="text-4xl text-center font-bold text-[#123c2f] mb-4">Your Favorites</h1>
                <hr className="border-[#123c2f]"/>
            

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    {favorites.map((place) => (
                        <FavoritesCard
                            key={place.name}
                            name={place.name}
                            image={place.image}
                            rating={place.rating}
                            description={place.description}
                            link={place.link}
                        />
                    ))}
                </div>
            </section>
        </div> 
    );
}