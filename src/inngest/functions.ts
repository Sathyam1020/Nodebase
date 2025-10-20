import prisma from "@/lib/database";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");

    await step.sleep("wait-a-moment", "5s");

    await step.sleep("wait-a-moment", "5s");

    return { message: `Hello ${event.data.email}!` };

    await step.run("create-workflow", () => {
        return prisma.workflow.create({
            data: {
                name: "test workflow from inngest"
            }
        })
    })
  },
); 