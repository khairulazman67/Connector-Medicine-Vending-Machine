import { z } from "zod";

export const vendingMachineSchema = z.object({
  name: z
    .string({
      required_error: "Name tidak boleh kosong",
      invalid_type_error: "Name harus berupa string",
    })
    .min(1),
  is_paperless_hospital: z
    .boolean({
      invalid_type_error: "is_paperless_hospital harus boolean",
    })
    .default(true),
});

export type VendingMachinePayload = z.infer<typeof vendingMachineSchema>;
