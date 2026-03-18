import { Link } from "react-router-dom";

interface props {
    imgUrl: string,
    restaurantId: string;
}

export default function FavoriteRestaurantCard(props: props) {
    const linkTo = `/reviews/${props.restaurantId}`;
    
    return (
        <Link 
            className="cursor-pointer relative group max-w-50 h-38 rounded-xl overflow-hidden shadow-md border border-white/60"
            to={linkTo}    
        >
            <img 
                src={props.imgUrl} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={`${props.restaurantId}photo`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </Link>
    )

}