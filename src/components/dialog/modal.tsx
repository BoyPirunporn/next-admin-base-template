'use client';

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "../ui/dialog";
import { SizeModal } from "@/stores/store-model";


interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    size?: SizeModal;
    className?: string;
    children?: React.ReactNode;
    onInteractOutside?: boolean;
    showCloseButton?: boolean;
}

const sizeClass = {
    sm: "md:min-w-sm",
    md: "md:min-w-md",
    lg: "md:min-w-2xl",
    xl: "md:min-w-4xl"
};
const Modal: React.FC<ModalProps> = ({
    title,
    description = " ",
    isOpen,
    onClose,
    size = "md",
    children,
    className,
    onInteractOutside = true,
    showCloseButton = true
}) => {
   
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent
                showCloseButton={showCloseButton}
                onInteractOutside={e => {
                    if (!onInteractOutside) {
                        e.preventDefault();
                    }
                }}
                className={cn(
                    className,
                    sizeClass[size],
                    "overflow-auto max-h-[calc(100%_-_64px)]"
                )}>
                <DialogHeader>
                    <DialogTitle className="text-md">{title}</DialogTitle>
                    <DialogDescription className="text-sm">{description}</DialogDescription>
                </DialogHeader>
                <div className="overflow-auto">{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;