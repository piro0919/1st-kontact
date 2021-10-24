import { createClient } from "microcms-js-sdk"; // ES6

function getClient(): ReturnType<typeof createClient> {
  const client = createClient({
    apiKey: "",
    serviceDomain: "",
  });

  return client;
}

export default getClient;
