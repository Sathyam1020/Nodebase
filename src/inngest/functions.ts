import prisma from "@/lib/database";
import { inngest } from "./client";
import * as Sentry from "@sentry/nextjs";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI()

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {

    await step.sleep("pretend", "5s")
    console.error("This is an error log for testing Sentry integration with Vercel AI SDK");
    Sentry.logger.info("User triggered test log", { log_source: 'sentry_test'})

     const { steps } = await step.ai.wrap("gemini-generate-text",
        generateText, 
        {
            model: google('gemini-2.5-flash'),
            system: "You are a helpful assistant that helps in math.",
            prompt: "What is 2 + 2 ",
            experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true,
            }
        }
     ); 

     return steps; 
  }
); 