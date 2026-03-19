import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";

interface ReplyComposerProps {
    open: boolean;
    onCancel: () => void;
    onSubmit?: (content: string, isAnonymous: boolean) => Promise<void> | void;
    disableAnonymous?: boolean;

    initialContent?: string;
    initialAnonymous?: boolean;
    submitLabel?: string;
    label?: string;
}

export default function ReplyComposer({
    open,
    onCancel,
    onSubmit,
    disableAnonymous = false,
    initialContent = "",
    initialAnonymous = false,
    submitLabel = "Reply",
    label = "Write a reply",
}: ReplyComposerProps) {
    const [content, setContent] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setContent(initialContent);
            setIsAnonymous(disableAnonymous ? false : initialAnonymous);
        }
    }, [open, initialContent, initialAnonymous, disableAnonymous]);

    const handleCancel = () => {
        setContent("");
        setIsAnonymous(disableAnonymous? false: initialAnonymous);
        onCancel();
    };

    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            setIsSubmitting(true);
            await onSubmit?.(content.trim(), disableAnonymous ? false : isAnonymous);
            onCancel();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0, y: -6 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-4">
                        <div className="space-y-2">
                            <Label htmlFor="reply-content" className="text-sm text-zinc-700">
                                {label}
                            </Label>

                            <Textarea
                                id="reply-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your reply here..."
                                className="min-h-[110px] resize-none border-zinc-300 focus-visible:ring-[#123c2f]"
                            />
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <Checkbox
                                id="reply-anonymous"
                                checked={disableAnonymous ? false : isAnonymous}
                                disabled={disableAnonymous}
                                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                            />
                            <Label
                                htmlFor="reply-anonymous"
                                className={`cursor-pointer text-sm ${disableAnonymous ? "text-zinc-400" : "text-zinc-700"}`}
                            >
                                Post Anonymously
                            </Label>
                        </div>

                        {disableAnonymous && (
                            <p className="mt-1 text-xs text-zinc-500">
                                Restaurant owners reply as the restaurant.
                            </p>
                        )}

                        <div className="mt-3 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="border-zinc-300 bg-white"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!content.trim() || isSubmitting}
                                className="bg-[#123c2f] text-white hover:bg-[#0f3127]"
                            >
                                {isSubmitting ? `${submitLabel}...` : submitLabel}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}