import React from 'react';

const Heading = ({
    title,
    description
}: {
    title: string;
    description?: string;
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">{title}</h1>
            </div>
            <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">{description}</p>
        </div>
    );
};

export default Heading;