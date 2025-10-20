// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4802ce76e3459bc3229c0ecfcf519e63@o4510220749963264.ingest.de.sentry.io/4510220793806928",

  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true, 
      recordOutputs: true, 
    }), 
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"]})
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  debug: false, 
});
