import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  product: z.string(),
  quantity: z.number(),
  total: z.number(),
  status: z.string(),
  createdAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
