import { MapPin, Phone } from "lucide-react";
import { Website } from "../ui/website-row";

interface ContactProps {
    mobileNumber: string;
    websites: string[]
    address: string;
}

export function RestaurantContactInfo(props: ContactProps) {
    return (
        <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
            <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-zinc-500" />
                <span>
                    <strong>Mobile:</strong> {props.mobileNumber}
                </span>
            </div>

            <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-zinc-500" />
                <span>
                    <strong>Location:</strong> {props.mobileNumber}
                </span>
            </div>

            {props.websites.map((website) => (
                <Website url={website} />
            ))}
        </div>
    )

}