import { string, z } from "zod";

export const exampleSchema = z.object({
  name: z.string().min(3),
});

export const signUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
});

export const signInSchema = signUpSchema.omit({ name: true });
export const mutateCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string(),
  tagline: z.string().min(5),
  description: z.string().min(10),
});
export const mutateContentSchema = z
  .object({
    title: z.string().min(5),
    type: z.string().min(3, { message: "Type is required" }),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const parseVideoId = z.string().min(4).safeParse(val.youtubeId);
    const parseText = z.string().min(4).safeParse(val.text);

    if (!parseVideoId.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Youtube ID is required",
        path: ["youtubeId"],
      });
    }
    if (!parseText.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content text is required",
        path: ["text"],
      });
    }
  });
export const mutateStudentSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
});
