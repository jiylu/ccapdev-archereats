import { Link } from "lucide-react";

interface WebsiteProps {
    url: string;
}

export function Website(props: WebsiteProps) {
    // const normalizeUrl = (url: string) => {
    //     if (!url) return "";

    //     if (!/^https?:\/\//i.test(url)) {
    //         return "https://" + url;
    //     }

    //     return url;
    // }    
    const secureUrl = props.url.startsWith("http") ? props.url : `https://${props.url}`;
    const websiteName = new URL(secureUrl).hostname.replace(/^www\./, "");

    return (
        <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-emerald-800 underline-offset-2 hover:underline"
        >
            <Link className="mt-0.5 h-4 w-4 text-zinc-500" />
                <span>
                    <strong>{websiteName}</strong>
                </span>
        </a>
    )
}