import { useWorkflowsParams } from "@/features/workflows/hooks/use-workflows-params";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Hook to fetch all workflows using suspense 

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC(); 

    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params)); 
}

// Hook to create a new workflow 
export const useCreateWorkflow = () => {
    const queryClient = useQueryClient(); 
    const trpc = useTRPC();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" created successfully!`);
            // router.push(`/workflows/${data.id}`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({})); 
        }, 
        onError: (error) => {
            toast.error(`Error creating workflow: ${error.message}`);
        }
    })); 
}

// Hook to delete a workflow by id
export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" deleted successfully!`);
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({})); 
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryFilter({ id: data.id }),
                );
            }
        })
    )
}
