import { useState, useRef } from "react";
import {
    Dialog,
    DialogContent, 
    DialogHeader,
    DialogTitle, 
    DialogTrigger,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { createPost } from "../../api/post.api";
import { toast } from "sonner";

interface WriteReviewModalProps {
    restaurantId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function WriteReviewModal({ restaurantId, open, onOpenChange }: WriteReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [content, setContent] = useState("")
    const [pictures, setPictures] = useState<File[]>([])
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [ratePricing, setRatePricing] = useState<"₱" | "₱₱" | "₱₱₱" | undefined>()
    const [waitTime, setWaitTime] = useState<"No Wait" | "15-30m" | "1hr+" | undefined>()
    const [recommended, setRecommended] = useState<boolean | undefined>()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (files: FileList | null) => {
        const newFiles = Array.from(files || [])
        setPictures((prev) => [...prev, ...newFiles])
    }

    const handleRemove = (index: number) => {
        setPictures((prev) => prev.filter((_, i) => i !== index))
    }

    const convertRatePricing = (rate: string) => {
        switch(rate) {
            case "₱": return "P";
            case "₱₱": return "PP";
            case "₱₱₱": return "PPP";
            default: return undefined;
        }
    }

    const handleSubmit = async () => {
        if (!restaurantId) return;

        try {
            const post = await createPost({
            restaurant: restaurantId,
            rating,
            content,
            isAnonymous,
            ratePricing: convertRatePricing(ratePricing ?? ""),
            waitTime: waitTime ?? undefined,
            recommended: recommended ?? undefined,
            pictures,
            });

            console.log("Post created:", post);

            resetForm();
            onOpenChange(false);

            toast.success("Review submitted successfully!", { duration: 2000 });
        } catch (err: unknown) {
            console.error("Error creating post:", err);
            toast.error("Failed to submit review. Please try again.", { duration: 2000 });
        }
    };

    const resetForm = () => {
        setRating(0)
        setHoverRating(0)
        setContent("")
        setPictures([])
        setIsAnonymous(false)
        setRatePricing("₱")
        setWaitTime("No Wait")
        setRecommended(true)
    }

    return (
        <Dialog open={open} 
            onOpenChange={(isOpen) => {
                if(!isOpen) resetForm()
                onOpenChange(isOpen)
            }}>
            <DialogContent className="sm:max-w-[600px] bg-[#F4F6F5] rounded-xl p-6 max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Write a Review
                    </DialogTitle>
                </DialogHeader>

                {/* Rating */}
                <div className="flex justify-center gap-2 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const filled = (hoverRating || rating) >= star
                        return (
                        <Star
                            key={star}
                            size={28}
                            className={`cursor-pointer transition-transform hover:scale-110 ${
                            filled ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                        )
                    })}
                </div>
                
                {/* Review Text */}
                <Textarea 
                    placeholder="Write your review here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-[#E3E8E6] focus:bg-white mt-4 min-h-[120px]"
                />
                {/* Anonymous */}
                <div className="flex items-center gap-2 mt-2">
                    <Checkbox 
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(Boolean(checked))}
                        className="border-gray-700 hover:border-gray-900 checked:bg-[#123524] checked:border-[#123524] w-4 h-4"
                    />
                    <label htmlFor="anonymous" className="select-none">Post Anonymously</label>
                </div>
                
                {/* Drag & Drop Image Upload */}
                <div className="border-2 border-dashed border-gray-300 
                    rounded-md p-4 flex flex-col items-center justify-center 
                    cursor-pointer hover:border-[#123524] mt-4" 
                    onClick={() => fileInputRef.current?.click()}>
                    <p className="text-gray-500">Drag and Drop images/videos here or click to upload</p>
                    <Input
                        type="file"
                        multiple accept="image/*,video/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => e.target.files && handleFiles(e.target.files)}/>
                </div>

                {/*picturesvideos*/}
                {pictures.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {pictures.map((file, index) => (
                            <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden">
                                <img src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover"/>
                                <button onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1
                                    hover:bg-opacity-75">
                                        <X size={14}/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/*Rate Pricing*/}
                <div className="mt-4">
                    <span className="font-semibold">How was the price?</span>
                    <div className="flex gap-2 mt-1">
                        {["₱", "₱₱", "₱₱₱"].map((val) => (
                            <button key={val} onClick={() => setRatePricing(val as "₱" | "₱₱" | "₱₱₱")}
                            className={`px-3 py-1 rounded-md border ${
                                ratePricing === val ? "bg-[#123524] text-[#E3E8E6]" : "bg-gray-200"
                            }`}>
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Wait Time */}
                <div className="mt-4">
                    <span className="font-semibold">Wait Time</span>
                    <div className="flex gap-2 mt-1">
                        {["No Wait", "15-30m", "1hr+"].map((val) => (
                            <button key={val} onClick={() => setWaitTime(val as "No Wait" | "15-30m" | "1hr+")}
                            className={`px-3 py-1 rounded-md border ${
                                waitTime === val ? "bg-[#123524] text-[#E3E8E6]" : "bg-gray-200"
                            }`}>{val}</button>
                        ))}
                    </div>
                </div>
                
                {/* Recommendation */}
                <div className="mt-4">
                    <span className="font-semibold">Would you recommend the place?</span>
                    <div className="flex gap-2 mt-1">
                        {["Yes", "No"].map((val) => (
                            <button key={val} onClick={() => setRecommended(val === "Yes")}
                            className={`px-3 py-1 rounded-md border ${
                                recommended === (val === "Yes") ? "bg-[#123524] text-[#E3E8E6]" : "bg-gray-200"
                            }`}>
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cancel and Submit */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} className="bg-[#123524] hover:bg-[#1E4D36] text-[#E3E8E6]">
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}