import { ColumnDef, RowData } from "@tanstack/react-table";
import * as Icons from "lucide-react";
import { PermissionNode } from "next-auth/jwt";
import { PageSize } from "./components/datatable/data-table";

interface GlobalPropsWithParams {
    params: Promise<{
        locale: string;
    }>;
}
interface DataTablesOutput<T> {
    draw: number,
    recordsTotal: number,
    recordsFiltered: number,
    data: T[],
    searchPanes?: any,
    error?: string;
}
interface PagedResponse<T> {
    data: T[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    isLast: boolean;
}

type StateWithoutFilterBy = {
    filter?: string;
    filterBy?: never; // 💡 ใช้ never เพื่อบอกว่าห้ามมี property นี้
};

// สภาวะที่ 2: มี filterBy (ดังนั้น globalFilter ต้องมีเสมอ)
type StateWithFilterBy<T> = {
    filter: string; // 👈 Required
    filterBy: keyof T;    // 👈 Required
};
interface BaseTableState {
    pageSize?: PageSize;       // จำนวนข้อมูลต่อหน้า
    sorting?: {              // การเรียงข้อมูล
        id: string;
        desc: boolean;
    }[];
}
type TableState<T> = BaseTableState & (StateWithoutFilterBy | StateWithFilterBy<T>);
export interface MenuModel {
    id?: string | null;
    nameEN: string;
    nameTH: string;
    url?: string | null;
    icon?: keyof typeof Icons | null;
    isVisible: boolean;
    children: MenuModel[];
    parent?: MenuModel | null;
    isGroup: boolean;
}

interface PermissionNodeWithOutTitleAndUrl extends Omit<PermissionNode, "title" | "url"> {
    menuId: string;
}
interface RoleModelWithPermission extends RoleModel {
    permissions: {
        menuId: string;
        canView: boolean;
        canCreate: boolean;
        canUpdate: boolean;
        canDelete: boolean;
    }[];
}

interface MenuPermissionNode {
    menuId: string;
    nameEN: string;
    nameTH: string;
    url: string;
    icon: string;
    menuDisplayOrder: number;
    isGroup: boolean;
    isVisible: boolean;
    canView: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    children: MenuPermissionNode[];
}


interface BaseResponse {
    status: number;
    timestamp: Date;
}
interface ResponseApi extends BaseResponse {
    message: string;
}
interface ResponseWithError extends BaseResponse {
    errors: Record<string, string[]>;
}
interface ResponseApiWithPayload<T> extends BaseResponse {
    payload: T;
}

interface RoleModel {
    id?: string | null;
    name: string;
    description?: string | null;
}



type Align = "left" | "center" | "right";

export type CustomColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<TData, TValue> & {
    alignItem?: Align;
    size?: number;
};


interface UserModel {
    id?: string | null;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    image?: string;
    // authProviders: UserAuthProviderModel[];
    roles: UserRoleModel[];
    createdAt?: string;
    updatedAt?: string;
}
