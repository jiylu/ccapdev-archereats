import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import DeleteReplyAlert from "./delete-reply-alert";

interface ReplyActionsProps {
    replyId: string;
    onEdit?: () => void;
    onDelete?: () => Promise<void> | void;
}

export default function ReplyActions(props: ReplyActionsProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            await props.onDelete?.();
            setIsDeleteDialogOpen(false);
        } catch (err) {
            console.log(err);
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button type="button" className="rounded-md p-1 hover:bg-zinc-100">
                        <Menu size={15} className="cursor-pointer" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="mt-2 w-28 rounded-xl shadow-lg"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="block w-full cursor-pointer rounded-md px-2 py-1 font-normal hover:bg-gray-200"
                            onSelect={(e) => {
                                e.preventDefault();
                                props.onEdit?.();
                            }}
                        >
                            Edit Reply
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="block w-full cursor-pointer rounded-md px-2 py-1 font-normal hover:bg-gray-200"
                            onSelect={(e) => {
                                e.preventDefault();
                                setIsDeleteDialogOpen(true);
                            }}
                        >
                            Delete Reply
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <DeleteReplyAlert
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                loading={isDeleting}
            />
        </>
    );
}