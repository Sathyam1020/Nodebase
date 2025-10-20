import { inngest } from '@/inngest/client';
import prisma from '@/lib/database';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({

  testAi: baseProcedure.mutation(async() => {
    // throw new TRPCError({ code: "BAD_REQUEST", message: "AI function is disabled temporarily."});
    await inngest.send({name: 'execute/ai'}); 
  }), 

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