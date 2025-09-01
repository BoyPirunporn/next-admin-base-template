'use client';
import Image from "next/image";
import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
const ImageProvider = ({
    src,
    ...props
}: Omit<React.ComponentPropsWithRef<typeof Image>, "alt">) => {
    const [image, setImage] = React.useState<string | StaticImport>(process.env.NEXT_PUBLIC_DOMAIN_IMAGE + "/" + src);


    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        return (
            <div className={cn("flex items-center justify-center bg-muted text-muted-foreground",props.className)}>
                <ImageOff className="w-20 h-20" />
            </div>
        );
    }
    return (
        <Image
            src={image}
            alt="Thumbnail"
            className={cn("absolute inset-0 object-cover object-center", props.className)}
            draggable={false}
            quality={50}
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            fill
            onError={() => setHasError(true)}
        />
    );
};

export default ImageProvider;