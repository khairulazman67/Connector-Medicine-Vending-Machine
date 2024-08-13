import { z } from "zod";

export const EtalaseCreateSchema = z.object({
  idVm: z.coerce.number({
    required_error: "idVm wajib diisi",
    invalid_type_error: "idVm harus berupa number",
  }),
  displayCode: z.string({
    required_error: "Display code wajib diisi",
    invalid_type_error: "displayCode harus berupa string",
  }),
  itemCode: z.string({
    required_error: "itemCode code wajib diisi",
    invalid_type_error: "itemCode harus berupa string",
  }),
  medicineName: z
    .string({
      required_error: "medicineName code wajib diisi",
      invalid_type_error: "medicineName harus berupa string",
    })
    .min(1),
  maxStock: z.number({
    required_error: "maxStock tidak boleh kosong",
    invalid_type_error: "maxStock harus berupa number",
  }),
  stock: z.number({
    required_error: "stock tidak boleh kosong",
    invalid_type_error: "stock harus berupa number",
  }),
});

export const EtalaseUpdateSchema = z.object({
  idVm: z.number({
    invalid_type_error: "idVm harus berupa number",
  }),
  displayCode: z.string({
    invalid_type_error: "displayCode harus berupa string",
  }),
  itemCode: z.string({
    invalid_type_error: "itemCode harus berupa string",
  }),
  medicineName: z
    .string({
      invalid_type_error: "medicineName harus berupa string",
    })
    .min(1),
  maxStock: z.number({
    invalid_type_error: "maxStock harus berupa number",
  }),
  stock: z.number({
    invalid_type_error: "stock harus berupa number",
  }),
});

export type EtalaseCreatePayload = z.infer<typeof EtalaseCreateSchema>;
export type EtalaseUpdatePayload = z.infer<typeof EtalaseUpdateSchema>;
