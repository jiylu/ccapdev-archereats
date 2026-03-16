import { Banknote, Check, Clock, X, } from "lucide-react";

interface ReviewMetaProps {
    ratePricing: string;
    waitTime: string;
    recommended: boolean;
}

export default function CommentMeta(props: ReviewMetaProps) {
    const pricingHandler = () => {
        const pricingSymbol = props.ratePricing.replace(/./g, "₱"); 
        let pricingString;
        switch (pricingSymbol) {
            case '₱':
                pricingString = `${pricingSymbol} Cheap`;
                break;
            case '₱₱':
                pricingString = `${pricingSymbol} Moderate`;
                break;
            case '₱₱₱':
                pricingString = `${pricingSymbol} Expensive`;
                break;
            default:
                throw new Error(`Pricing ${props.ratePricing} is undefined.`);
        }

        return pricingString;
    }

    const waitTimeHandler = () => {
        switch (props.waitTime) {
            case 'No Wait':
                return "No Waiting Time"
            case '15-30m':
                return "15-30 Minutes"
            case '1hr+':
                return "1+ Hour"
        }
    }

    return (
        <div className="flex gap-2 mt-3 mb-3">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-amber-100 rounded-[10px] px-3 py-2">
                    <Banknote size={25} className="text-amber-600"/>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium leading-none text-amber-800">Pricing</span>
                        <span className="text-xs leading-none text-amber-600">{pricingHandler()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-teal-50 rounded-[10px] px-3 py-2">
                    <Clock size={20} className="text-teal-700" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium leading-none text-teal-900">Waiting Time</span>
                        <span className="text-xs leading-none text-teal-700">{waitTimeHandler()}</span>
                    </div>
                </div>

                <div className={`flex items-center gap-2 ${props.recommended ? "bg-green-100" : "bg-red-100"} rounded-[10px] px-3 py-2`}>
                    {props.recommended ? <Check size={20} className="text-green-700" /> :  <X size={20} className="text-red-700" />}
                    
                    <div className="flex flex-col gap-0.5">
                        <span className={`text-xs font-medium leading-none ${props.recommended ? "text-green-900" : "text-red-900"}`}>Recommend To Others?</span>
                        <span className={`text-xs leading-none ${props.recommended ? "text-green-700" : "text-red-700"}`}>{props.recommended ? "Yes" : "No"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}