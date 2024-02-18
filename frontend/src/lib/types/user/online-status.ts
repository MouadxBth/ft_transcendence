import { z } from "zod";

export const onlineStatusSchema = z.string();

export type OnlineStatusType = z.infer<typeof onlineStatusSchema>;
