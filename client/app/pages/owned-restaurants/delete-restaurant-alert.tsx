import { deleteRestaurant } from "../../api/restaurant.api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../components/ui/alert-dialog";

interface DeleteRestaurantAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    restaurantId: string;
}

export default function DeleteRestaurantAlert({
    open,
    onOpenChange,
    restaurantId,
}: DeleteRestaurantAlertProps) {
    const handleDelete = async () => {
        try {
            await deleteRestaurant(restaurantId);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        this restaurant.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}