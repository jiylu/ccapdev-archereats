import { useState, useRef } from "react";
import {
    Dialog,
    DialogContent, 
    DialogHeader,
    DialogTitle, 
} from "../ui/dialog";

import { cn } from "../../lib/utils";
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

interface FormErrors {
    rating?: string
    content?: string
    ratePricing?: string;
    waitTime?: string;
    recommended?: string;
};

export function WriteReviewModal({ restaurantId, open, onOpenChange }: WriteReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [content, setContent] = useState("")
    const [pictures, setPictures] = useState<File[]>([])
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [ratePricing, setRatePricing] = useState<"₱" | "₱₱" | "₱₱₱" | undefined>()
    const [waitTime, setWaitTime] = useState<"No Wait" | "15-30m" | "1hr+" | undefined>()
    const [recommended, setRecommended] = useState<boolean | undefined>()
    
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<{
        rating?: boolean
        content?: boolean
        ratePricing?: boolean;
        waitTime?: boolean;
        recommended?: boolean;
    }>({
        rating: false, 
        content: false,
        ratePricing: false,
        waitTime: false,
        recommended: false,
    })

    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateField = (field: keyof FormErrors, value: any): string | undefined => {
        switch (field) {
            case "rating":
                return !value || value === 0 ? "Please select a rating" : undefined;
            case "content":
                return !value || value.trim() === "" ? "Please write a review" : undefined;
            case "ratePricing":
                return !value ? "Please select a price rating" : undefined;
            case "waitTime":
                return !value ? "Please select wait time" : undefined;
            case "recommended":
                return value === undefined ? "Please select if you recommend this place" : undefined;
            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            rating: validateField("rating", rating),
            content: validateField("content", content),
            ratePricing: validateField("ratePricing", ratePricing),
            waitTime: validateField("waitTime", waitTime),
            recommended: validateField("recommended", recommended),
        };

        // Remove undefined values
        Object.keys(newErrors).forEach(key => {
            if (newErrors[key as keyof FormErrors] === undefined) {
                delete newErrors[key as keyof FormErrors];
            }
        });

        setErrors(newErrors);
        
        // Mark all fields as touched on submit
        setTouched({
            rating: true,
            content: true,
            ratePricing: true,
            waitTime: true,
            recommended: true,
        });

        return Object.keys(newErrors).length === 0;
    };

    const handleFieldBlur = (field: keyof typeof touched) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        // Validate the field on blur
        const error = validateField(field, 
            field === "rating" ? rating :
            field === "content" ? content :
            field === "ratePricing" ? ratePricing :
            field === "waitTime" ? waitTime :
            field === "recommended" ? recommended : undefined
        );

        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

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

        if (!validateForm()) {
            toast.error("Please fill in all required fields", { duration: 2000 });
            return;
        }

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
        setErrors({})
        setTouched({
            rating: false,
            content: false,
            ratePricing: false,
            waitTime: false,
            recommended: false,
        })
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
                <div className="space-y-1 mt-4">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled = (hoverRating || rating) >= star
                            return (
                            <Star
                                key={star}
                                size={28}
                                className={cn(
                                    "cursor-pointer transition-transform hover:scale-110",
                                    filled ? "text-yellow-400 fill-current" : "text-gray-300",
                                    touched.rating && errors?.rating && "text-red-300"
                                )}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => {
                                    setRating(star);
                                    setTouched(prev => ({ ...prev, rating: true }));
                                    const error = validateField("rating", star);
                                    setErrors(prev => ({ ...prev, rating: error }));
                                }}
                            />
                            )
                        })}
                    </div>
                    {touched.rating && errors?.rating && (
                        <p className="text-sm text-red-500 text-center">{errors.rating}</p>
                    )}
                </div>
                
                {/* Review Text */}
                <div className="space-y-1 mt-4">
                    <Textarea 
                        placeholder="Write your review here..."
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            if (touched.content) {
                                const error = validateField("content", e.target.value);
                                setErrors(prev => ({ ...prev, content: error }));
                            }
                        }}
                        onBlur={() => handleFieldBlur("content")}
                        className={cn(
                            "bg-[#E3E8E6] focus:bg-white min-h-[120px]",
                            touched.content && errors?.content && "border-red-500 focus-visible:ring-red-500"
                        )}
                    />
                    {touched.content && errors?.content && (
                        <p className="text-sm text-red-500">{errors.content}</p>
                    )}
                </div>

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
                <div className="space-y-1 mt-4">
                    <span className="font-semibold">How was the price?</span>
                    <div className="flex gap-2 mt-1">
                        {["₱", "₱₱", "₱₱₱"].map((val) => (
                            <button 
                                key={val} 
                                onClick={() => {
                                    setRatePricing(val as "₱" | "₱₱" | "₱₱₱");
                                    setTouched(prev => ({ ...prev, ratePricing: true }));
                                    const error = validateField("ratePricing", val);
                                    setErrors(prev => ({ ...prev, ratePricing: error }));
                                }}
                                onBlur={() => handleFieldBlur("ratePricing")}
                                className={cn(
                                    "px-3 py-1 rounded-md border transition-colors",
                                    ratePricing === val 
                                        ? "bg-[#123524] text-[#E3E8E6]" 
                                        : "bg-gray-200 hover:bg-gray-300",
                                    touched.ratePricing && errors?.ratePricing && !ratePricing && "border-red-500"
                                )}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                    {touched.ratePricing && errors?.ratePricing && (
                        <p className="text-sm text-red-500">{errors.ratePricing}</p>
                    )}
                </div>

                {/* Wait Time */}
                <div className="space-y-1 mt-4">
                    <span className="font-semibold">Wait Time</span>
                    <div className="flex gap-2 mt-1">
                        {["No Wait", "15-30m", "1hr+"].map((val) => (
                            <button 
                                key={val} 
                                onClick={() => {
                                    setWaitTime(val as "No Wait" | "15-30m" | "1hr+");
                                    setTouched(prev => ({ ...prev, waitTime: true }));
                                    const error = validateField("waitTime", val);
                                    setErrors(prev => ({ ...prev, waitTime: error }));
                                }}
                                onBlur={() => handleFieldBlur("waitTime")}
                                className={cn(
                                    "px-3 py-1 rounded-md border transition-colors",
                                    waitTime === val 
                                        ? "bg-[#123524] text-[#E3E8E6]" 
                                        : "bg-gray-200 hover:bg-gray-300",
                                    touched.waitTime && errors?.waitTime && !waitTime && "border-red-500"
                                )}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                    {touched.waitTime && errors?.waitTime && (
                        <p className="text-sm text-red-500">{errors.waitTime}</p>
                    )}
                </div>
                
                {/* Recommendation */}
                <div className="space-y-1 mt-4">
                    <span className="font-semibold">Would you recommend the place?</span>
                    <div className="flex gap-2 mt-1">
                        {["Yes", "No"].map((val) => (
                            <button 
                                key={val} 
                                onClick={() => {
                                    setRecommended(val === "Yes");
                                    setTouched(prev => ({ ...prev, recommended: true }));
                                    const error = validateField("recommended", val === "Yes");
                                    setErrors(prev => ({ ...prev, recommended: error }));
                                }}
                                onBlur={() => handleFieldBlur("recommended")}
                                className={cn(
                                    "px-3 py-1 rounded-md border transition-colors",
                                    recommended === (val === "Yes") 
                                        ? "bg-[#123524] text-[#E3E8E6]" 
                                        : "bg-gray-200 hover:bg-gray-300",
                                    touched.recommended && errors?.recommended && recommended === undefined && "border-red-500"
                                )}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                    {touched.recommended && errors?.recommended && (
                        <p className="text-sm text-red-500">{errors.recommended}</p>
                    )}
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