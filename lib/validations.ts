import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون أكثر من 3 أحرف").max(100),
  slug: z.string().min(3, "الرابط يجب أن يكون أكثر من 3 أحرف"),
  content: z.string().min(10, "المحتوى قصير جداً"),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  categoryId: z.string().optional(),
  featuredImage: z.string().optional(),
});

export type PostValues = z.infer<typeof postSchema>;
