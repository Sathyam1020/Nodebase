import prisma from '@/lib/database';
import { createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({

  //Get Workflows
  getWorkflows: protectedProcedure
    .query(({ctx}) => {
        return prisma.workflow.findMany()
    }),

  //Create workflows   
  createWorkflow: protectedProcedure.mutation(async() => {

    await inngest.send({
      name: "test/hello.world", 
      data: {
        email: "sathyamrock55@gmail.com"
      },
    }); 
    
    return {
      success: true, 
      message: "Workflow creation triggered and queued."
    }
  }) 
});
// export type definition of API
export type AppRouter = typeof appRouter;  