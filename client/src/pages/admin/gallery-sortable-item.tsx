
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { GalleryImage } from "@shared/schema";

interface SortableGalleryItemProps {
    image: GalleryImage;
    onDelete: (id: string) => void;
}

export function SortableGalleryItem({ image, onDelete }: SortableGalleryItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative group rounded-lg overflow-hidden cursor-move touch-none"
        >
            <img
                src={image.imageUrl}
                alt={image.caption || ""}
                className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking delete
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        onPointerDown={(e) => e.stopPropagation()} // Prevent drag inside dialog
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader>
                            <DialogTitle>Delete Gallery Image</DialogTitle>
                        </DialogHeader>
                        <p className="text-muted-foreground">
                            Are you sure you want to delete this image? This action cannot be undone.
                        </p>
                        <div className="flex gap-2 justify-end mt-4">
                            <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                            <Button
                                variant="destructive"
                                onClick={() => onDelete(image.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Visual indicator for index/order if needed, or just rely on position */}
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Order: {image.order}
            </div>
        </div>
    );
}
