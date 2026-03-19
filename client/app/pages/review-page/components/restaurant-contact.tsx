import { MapPin, Phone } from "lucide-react";
import { Website } from "../ui/website-row";

interface ContactProps {
    mobileNumber: string;
    websites: string[];
    googleMapsLink: string;
    address: string;
}

export function RestaurantContactInfo(props: ContactProps) {
    return (
        <div className="grid gap-3 text-sm text-zinc-700">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 text-zinc-500" />
                    <span>
                        <strong>Mobile:</strong> {props.mobileNumber}
                    </span>
                </div>

                <a
                    href={props.googleMapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 text-emerald-800 underline-offset-2 hover:underline"
                >
                    <MapPin className="mt-0.5 h-4 w-4 text-zinc-500" />
                    <span>
                        <strong>{props.address}</strong>
                    </span>
                </a>
            </div>

            {props.websites.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {props.websites.slice(0, 3).map((website) => (
                        <Website key={website} url={website} />
                    ))}
                </div>
            )}

        </div>
    )

}