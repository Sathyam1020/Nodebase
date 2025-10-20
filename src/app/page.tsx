'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const page = () => {

  const trpc = useTRPC(); 
  const { data } = useQuery(trpc.getWorkflows.queryOptions()); 
  const queryClient = useQueryClient();
  
  const testAi = useMutation(trpc.testAi.mutationOptions()); 

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Workflow creation triggered!");
    }
  })); 

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      {JSON.stringify(data, null, 2)}
      <div>
        <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
      </div>
      <div>
        <Button
          onClick={() => testAi.mutate()}
          disabled={testAi.isPending}
        >
          Test AI
        </Button>
      </div>
    </div>
  )
} 

export default page;
