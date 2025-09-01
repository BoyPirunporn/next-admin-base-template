import "next-auth";

declare module 'next-auth' {
    interface DefaultUser { }
    interface User {
        accessToken: string;
        refreshToken: string;
        accessTokenExpires?: number;
        firstName: string;
        lastName: string;
        image: string;
        roles: string[];
        permissions: PermissionNode[];
        verifyEmail:boolean;
    }

    interface Session {
        user: Omit<User, "id"> | null;
        accessToken: string;
        refreshToken: string;
        permissions: PermissionNode[];
        roles: string[];
        error?: string;
        verifyEmail:boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        // id?: string;
        exp?: number;
        lat?: number;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
        permissions: PermissionNode[];
        firstName: string;
        lastName: string;
        image: string;
        roles: string[];
        verifyEmail:boolean;
    }
    type PermissionNode = {
        menuId?:string | null;
        title: string;
        url: string;
        canView: boolean;
        canCreate: boolean;
        canUpdate: boolean;
        canDelete: boolean;
    };
}