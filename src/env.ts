import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  client: {},
  runtimeEnv: {},
  server: {},
});

export default env;
