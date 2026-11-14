import { z } from "zod";

export const WEBSITE_CREATION_TOPIC = "Website creation request" as const;

export const contactTopics = [
  "Product question",
  "Installation help",
  "Bug report",
  "Feature request",
  "Press or partnership",
  WEBSITE_CREATION_TOPIC,
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name (at least 2 characters).")
    .max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(200, "Email is too long."),
  topic: z.enum(contactTopics, { errorMap: () => ({ message: "Choose a topic." }) }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(4000, "Message is too long (4,000 characters maximum)."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to the privacy information." }),
  }),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
