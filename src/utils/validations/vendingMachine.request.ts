import { z } from "zod";

export const vendingMachineSchema = z.object({
  name: z
    .string({
      required_error: "Name tidak boleh kosong",
      invalid_type_error: "Name harus berupa string",
    })
    .min(1),
  url: z.string({
    required_error: "Url tidak boleh kosong",
    invalid_type_error: "url harus berupa string",
  }),
  fasyankesId: z
    .number({
      required_error: "idFasyankes tidak boleh kosong",
      invalid_type_error: "idFasyankes harus berupa number",
    })
    .min(1),
  isPaperlessHospital: z
    .boolean({
      invalid_type_error: "isPaperlessHospital harus boolean",
    })
    .default(true),
});

export type VendingMachinePayload = z.infer<typeof vendingMachineSchema>;
