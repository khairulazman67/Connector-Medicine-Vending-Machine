import { z } from "zod";

export const processTransactionSchema = z.object({
  vmId: z.coerce.number({
    required_error: "vmId wajib diisi",
    invalid_type_error: "vmId harus berupa number",
  }),
  barcode: z.string({
    required_error: "barcode id wajib diisi",
    invalid_type_error: "barcode id harus berupa string",
  }),

  medicine: z.array(
    z.object({
      itemCode: z.string({
        required_error: "itemCode id wajib diisi",
        invalid_type_error: "itemCode id harus berupa string",
      }),
      amount: z.number({
        required_error: "amount wajib diisi",
        invalid_type_error: "amount harus berupa number",
      }),
      usageRules: z.string({
        required_error: "usageRules wajib diisi",
        invalid_type_error: "usageRules harus berupa string",
      }),
    })
  ),

  headerPrint: z
    .object({
      row1: z.string({
        invalid_type_error: "row1 id harus berupa string",
      }),
      row2: z.string({
        invalid_type_error: "row2 id harus berupa string",
      }),
      row3: z.string({
        invalid_type_error: "row3 id harus berupa string",
      }),
      row4: z.string({
        invalid_type_error: "row4 id harus berupa string",
      }),
    })
    .optional(),
});

export type processTransactionPayload = z.infer<
  typeof processTransactionSchema
>;
