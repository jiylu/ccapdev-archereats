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

export function WriteReviewModal() {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [content, setContent] = useState("")
    const [pictures, setPictures] = useState<File[]>([])
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [ratePricing, setRatePricing] = useState("P")
    const [waitTime, setWaitTime] = useState<"No Wait" | "15-30m" | "1hr+" | null >(null)
    const [recommended, setRecommended] = useState<boolean | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (files: FileList | null) => {
        const newFiles = Array.from(files || [])
        setPictures((prev) => [...prev, ...newFiles])
    }

    const handleRemove = (index: number) => {
        setPictures((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        // temp
        console.log({
            rating,
            content, 
            pictures,
            isAnonymous,
            ratePricing,
            waitTime,
            recommended,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#123524] hover:bg-[#1E4D36] text-[#E3E8E6] font-bold">
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm: max-w-[600px] bg-[#F4F6F5] rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Write a Review
                    </DialogTitle>
                </DialogHeader>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={28} className={`cursor-pointer transition-colors ${
                            (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        />
                    ))}
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
                    <input 
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <label htmlFor="anonymous">Post Anonymously</label>
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
                
                {}
            </DialogContent>
        </Dialog>
    )
}