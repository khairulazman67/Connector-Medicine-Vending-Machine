import { z } from "zod";

export const processTransactionSchema = z.object({
  idVm: z.coerce.number({
    required_error: "idVm wajib diisi",
    invalid_type_error: "idVm harus berupa number",
  }),
  locationCode: z.string({
    required_error: "locationCode id wajib diisi",
    invalid_type_error: "locationCode id harus berupa string",
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
    })
  ),
});

export type processTransactionPayload = z.infer<
  typeof processTransactionSchema
>;
