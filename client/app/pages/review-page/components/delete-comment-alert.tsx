import { deletePost } from "../../../api/post.api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";


interface DeleteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    postId: string;
}

export default function DeleteCommentAlert (props: DeleteProps) {  
    const handleDelete = async () => {
        await deletePost(props.postId)
        window.location.reload(); 
    }
    
    return (
        <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently your review for this restaurant.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}