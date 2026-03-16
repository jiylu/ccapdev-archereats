import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel";

interface HeroImageProps {
    restaurantName: string;
    photos: string[];
}

export default function HeroImage (props: HeroImageProps) {

    return (
        <Carousel 
            className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
            opts={{ loop: true }}
        >
            <CarouselContent>
                    {props.photos.map((url, index) => (
                        <CarouselItem key={index}>
                            <img
                                src={url}
                                alt={`${props.restaurantName} heroimg${index}`}
                                className="h-[280px] w-full object-cover sm:h-[360px]"
                            />
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
        </Carousel>
    )
}