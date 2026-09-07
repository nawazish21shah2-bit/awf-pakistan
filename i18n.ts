import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale === "ur" ? "ur" : "en";
  const messages = (await import("./messages/" + currentLocale + ".json")).default;
  return {
    locale: currentLocale,
    messages,
  };
});
