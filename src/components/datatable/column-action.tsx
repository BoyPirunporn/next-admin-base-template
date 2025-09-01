import { cn } from '@/lib/utils';
import { Edit, Eye } from 'lucide-react';
import { Button } from '../ui/button';

const ColumnAction = ({
    handleEdit,
    handleView,
    target,
    metadata,
    canEdit = true,
    canView = true
}: Readonly<{
    handleEdit: () => void;
    handleView: () => void;
    target?: string;
    metadata?: Partial<{ [key: string]: any; }>;
    canEdit?: boolean;
    canView?: boolean;
}>) => {
    return (
        <div className="flex justify-center">
            <Button className={
                cn(
                    canEdit ? "block" : "hidden"
                )
            } variant={"ghost"} onClick={() => {
                handleEdit();
            }}>
                <Edit className="w-4 h-4" />
            </Button>
            <Button className={
                cn(
                    canView ? "block" : "hidden"
                )
            } variant={"ghost"} onClick={handleView}>
                <Eye className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default ColumnAction;