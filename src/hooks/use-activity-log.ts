import logger from "@/lib/logger";

export function useActivityLog() {
    const log = async (action: string, target: string, metadata: any = {}) => {
        try {
            await fetch("your-api-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action,
                    target,
                    metadata: JSON.stringify(metadata),

                })
            });
        } catch (error) {
            logger.error("Log failed", error);
        }
    };

    return { log };
}