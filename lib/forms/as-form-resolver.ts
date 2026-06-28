import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

export function asFormResolver<TFieldValues extends FieldValues>(
  schema: z.ZodTypeAny,
): Resolver<TFieldValues> {
  return zodResolver(schema as never) as unknown as Resolver<TFieldValues>;
}
