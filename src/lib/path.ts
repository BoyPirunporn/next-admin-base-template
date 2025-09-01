export const RouteBuilder =  {
   
        DASHBOARD: `/dashboard`,
        SETTINGS: {
            MEMBER: {
                LIST: `/settings/members`,
                CREATE: `/settings/members/create`,
                VIEW: (id: string) => `/settings/members/${id}/view`,
                UPDATE: (id: string) => `/settings/members/${id}/update`
            },
            ROLE: {
                LIST: `/settings/roles`,
                CREATE: `/settings/roles/create`,
                VIEW: (id: string) => `/settings/roles/${id}/view`,
                UPDATE: (id: string) => `/settings/roles/${id}/update`
            },
            ACTIVITY_LOGS: {
                LIST: `/settings/activity-logs`,
                CREATE: `/settings/activity-logs/create`,
                VIEW: (id: string) => `/settings/activity-logs/${id}/view`,
                UPDATE: (id: string) => `/settings/activity-logs/${id}/update`
            }
        }
};