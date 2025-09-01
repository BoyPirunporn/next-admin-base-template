import * as Icons from "lucide-react";

export type IconName = keyof typeof Icons;

function RenderIcon({ name }: { name: IconName; }) {
    const IconComponent = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>;
    if (!IconComponent) return null;
    return <IconComponent />;

}

export default RenderIcon;