import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "../../../components/ui/dialog";
import { cn } from "../../../lib/utils";

interface CommentPhotoGalleryProps {
    pictures?: string[];
}

export default function CommentPhotoGallery({
    pictures = [],
}: CommentPhotoGalleryProps) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const normalizedPictures = useMemo(() => {
        return pictures.map((picture) =>
            picture.startsWith("http")
                ? picture
                : `http://localhost:8080/${picture}`
        );
    }, [pictures]);

    if (!normalizedPictures.length) return null;

    const visiblePictures = normalizedPictures.slice(0, 3);
    const extraCount = normalizedPictures.length - 3;

    const openViewer = (index: number) => {
        setSelectedIndex(index);
        setOpen(true);
    };

    const handlePrev = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? normalizedPictures.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setSelectedIndex((prev) =>
            prev === normalizedPictures.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <div className="mt-3 flex items-center gap-2">
                {visiblePictures.map((picture, index) => {
                    const isLastVisible =
                        index === 2 && normalizedPictures.length > 3;

                    return (
                        <button
                            key={`${picture}-${index}`}
                            type="button"
                            onClick={() => openViewer(index)}
                            className={cn(
                                "relative h-20 w-20 overflow-hidden rounded-md border border-zinc-200 bg-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#123c2f]/30"
                            )}
                        >
                            <img
                                src={picture}
                                alt={`Review photo ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            />

                            {isLastVisible && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                                    <span className="text-sm font-semibold text-white">
                                        +{extraCount}
                                    </span>
                                    <span className="text-[10px] text-white/80">
                                        more
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl overflow-hidden border-zinc-200 bg-white p-0">
                    <DialogTitle className="sr-only">
                        Review photo viewer
                    </DialogTitle>

                    <div className="relative flex min-h-[420px] items-center justify-center bg-zinc-950">
                        <div className="absolute left-4 top-4 z-20 rounded-md bg-black/55 px-3 py-1 text-sm font-medium text-white">
                            Photo {selectedIndex + 1} of {normalizedPictures.length}
                        </div>

                        <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 z-20 rounded-full bg-white/90 hover:bg-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <img
                            src={normalizedPictures[selectedIndex]}
                            alt={`Review photo ${selectedIndex + 1}`}
                            className="max-h-[70vh] w-full object-contain"
                        />

                        {normalizedPictures.length > 1 && (
                            <>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="secondary"
                                    onClick={handlePrev}
                                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>

                                <Button
                                    type="button"
                                    size="icon"
                                    variant="secondary"
                                    onClick={handleNext}
                                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </>
                        )}
                    </div>

                    {normalizedPictures.length > 1 && (
                        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3">
                            <div className="mx-auto flex w-fit max-w-full gap-2 overflow-x-auto">
                                {normalizedPictures.map((picture, index) => (
                                    <button
                                        key={`${picture}-thumb-${index}`}
                                        type="button"
                                        onClick={() => setSelectedIndex(index)}
                                        className={cn(
                                            "h-14 w-14 shrink-0 overflow-hidden rounded-md border transition",
                                            selectedIndex === index
                                                ? "border-[#123c2f] ring-2 ring-[#123c2f]/20"
                                                : "border-zinc-200"
                                        )}
                                    >
                                        <img
                                            src={picture}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}