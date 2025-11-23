import { createClient, type MicroCMSSchemaInfer } from "microcms-ts-sdk";
import env from "@/env";

const client = createClient<MicroCMS.Endpoints>({
  serviceDomain: env.MICRO_CMS_SERVICE_DOMAIN,
  apiKey: env.MICRO_CMS_API_KEY,
});

export type Schema = MicroCMSSchemaInfer<typeof client>;

export default client;
