import { z } from "zod";

export const createStockOpnameSchema = z.object({
  // soCode: z.coerce.string({
  //   required_error: "soCode wajib diisi",
  //   invalid_type_error: "soCode harus berupa string",
  // }),
  vmId: z.coerce.number({
    required_error: "vmId wajib diisi",
    invalid_type_error: "vmId harus berupa number",
  }),
  note: z.string({
    invalid_type_error: "note id harus berupa string",
  }),
  soDateTime: z.string().datetime().pipe(z.coerce.date()),
});

export const createDetailStockOpnameSchema = z.array(
  z.object({
    etalaseId: z.coerce.number({
      required_error: "etalaseId wajib diisi",
      invalid_type_error: "etalaseId harus berupa number",
    }),
    stock: z.coerce.number({
      required_error: "stock wajib diisi",
      invalid_type_error: "stock harus berupa stock",
    }),
    realStock: z.number({
      required_error: "realStock id wajib diisi",
      invalid_type_error: "realStock id harus berupa number",
    }),
  })
);

export const processStockOpnameSchema = z.object({
  ...createStockOpnameSchema.shape,
  details: createDetailStockOpnameSchema,
});

export type createStockOpnameDTO = z.infer<typeof createStockOpnameSchema>;
export type createDetailStockOpnameDTO = z.infer<
  typeof createDetailStockOpnameSchema
>;

export type processStockOpnamePayload = z.infer<
  typeof processStockOpnameSchema
>;
