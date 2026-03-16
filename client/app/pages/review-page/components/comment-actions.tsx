import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import DeleteCommentAlert from "./delete-comment-alert";
import { Menu } from "lucide-react";

interface CommentActionsProps {
    postId: string;
}

export default function CommentActions(props: CommentActionsProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    
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

            <DeleteCommentAlert
                open={isDeleteDialogOpen} 
                onOpenChange={setIsDeleteDialogOpen} 
                postId={props.postId} 
            />
        </>

    )
}