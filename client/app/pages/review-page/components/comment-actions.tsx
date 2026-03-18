import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import DeleteCommentAlert from "./delete-comment-alert";
import { Menu } from "lucide-react";
import { WriteReviewModal } from "../../../components/layout/review-modal";

interface CommentActionsProps {
    postId: string;
    restaurantId: string;
    post: {
        _id: string;
        rating: number;
        content: string;
        isAnonymous: boolean;
        ratePricing?: "P" | "PP" | "PPP";
        waitTime?: "No Wait" | "15-30m" | "1hr+";
        recommended?: boolean;
        pictures?: string[];
    }
}

export default function CommentActions(props: CommentActionsProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Menu size={15} className="cursor-pointer"/>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent
                    align="end"
                    className="w-20 mt-2 rounded-xl shadow-lg"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="font-normal cursor-pointer block w-full hover:bg-gray-200 rounded-md px-2 py-1"
                            onSelect={() => setIsEditModalOpen(true)}
                        >
                            Edit Review
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            className="font-normal cursor-pointer block w-full hover:bg-gray-200 rounded-md px-2 py-1"
                            onSelect={() => {
                                setIsDeleteDialogOpen(true)
                            }}  
                        >
                            Delete Review
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>

            <WriteReviewModal
                restaurantId={props.restaurantId}
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                initialData={props.post}
                isEdit={true}
            />

            <DeleteCommentAlert
                open={isDeleteDialogOpen} 
                onOpenChange={setIsDeleteDialogOpen} 
                postId={props.postId} 
            />
        </>

    )
}