import { DataTablesOutput } from "@/model";
import axios from "axios";
import { SearchCriteria } from "./global-datatable";

export const dataTableAction = async <T,>({
    pageIndex,
    pageSize,
    searchCriteria,
    orders,
    apiUrl,
}
    : {
        pageIndex: number;
        pageSize: number;
        searchCriteria: SearchCriteria[],
        orders: string[];
        apiUrl: string;
    }) => {
    const payload = {
        draw: pageIndex + 1,
        start: pageIndex * pageSize,
        length: pageSize,
        search: {
            value: searchCriteria.find((s) => s.searchable)?.value || "", // หรือ key ที่ใช้จริง
            regex: false,
        },
        order: orders,
        columns: searchCriteria.map((search) => ({
            data: search.column,
            name: search.column,
            searchable: search.searchable,
            orderable: search.orderable,
            search: {
                value: search.value,
                regex: search.regex,
            },
        })), // optional
    };
    // logger.debug(payload);

    try {
        const res = await axios<DataTablesOutput<T>>(process.env.NEXT_PUBLIC_APP_URL+`/${apiUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: payload,
        });
        return res.data as DataTablesOutput<T>;
    } catch (error) {
        throw error;
    }
};