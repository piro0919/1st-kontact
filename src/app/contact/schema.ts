import z from "zod";

export const sendEmailSchema = z.object({
  budget: z.string().min(1),
  client: z.string().min(1),
  content: z.string().min(1),
  date: z.string().min(1),
  email: z.email().min(1),
  homepage: z.url().min(1),
  isAgree: z.boolean().refine((val) => val === true),
  media: z.string().min(1),
  name: z.string().min(1),
  others: z.string().min(1),
  release: z.string().min(1),
});
