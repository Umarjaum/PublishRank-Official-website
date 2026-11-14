import { WEBSITE_CREATION_TOPIC } from "@/lib/contact-schema";

const WEBSITE_CREATION_INBOX = "publishrankseo@gmail.com";

export function contactRecipientForTopic(
  topic: string,
  defaultRecipient?: string,
): string | undefined {
  return topic === WEBSITE_CREATION_TOPIC ? WEBSITE_CREATION_INBOX : defaultRecipient;
}
