'use client'

import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows"
import { useWorkflowsParams } from "@/features/workflows/hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import type { Workflow as WorkflowPrisma } from "@/generated/prisma"; 
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
export const WorkflowsList = () => {
    // throw new Error("test")
    const workflows = useSuspenseWorkflows(); 

    if ( workflows.data.items.length === 0 ) {
        return (
            <WorkflowsEmpty />
        )
    }

    return (
        <EntityList
            items={workflows.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow}/>}
            emptyView={<WorkflowsEmpty />}
        />
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

    const createWorkflow = useCreateWorkflow(); 
    const { handleError, modal } = useUpgradeModal();

    const router = useRouter(); 

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            }, 
            onError: (error) => {
                console.error("Error creating workflow:", error);
                handleError(error); 
            }
        })
    }

    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New Workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    )
}

export const WorkflowsSeaerch = () => {

    const [params, setParams] = useWorkflowsParams(); 
    const { searchValue, onSearchChange } = useEntitySearch({
        params, 
        setParams
    })

    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Workflows"
        />
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows(); 
    const [params, setParams] = useWorkflowsParams(); 
    return (
        <div>
            <EntityPagination
                disabled={workflows.isFetching}
                totalPages={workflows.data.totalPages}
                page={workflows.data.page}
                onPageChange={(page) => setParams({ ...params, page })}
            />
        </div>
    )
}

export const WorkflowsContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSeaerch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsLoading = () => {
    console.log("WorkflowsLoading rendered");
    return <LoadingView entity="Loading" message="Loading Workflows"/>;
}

export const WorkflowsError = () => {
    return <ErrorView entity="Error" message="Error loading workflows"/>
}

export const WorkflowsEmpty = () => {

    const createWorkflow = useCreateWorkflow(); 
    const { handleError, modal } = useUpgradeModal();
    const router = useRouter(); 

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error); 
            }, 
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            }
        })
    }

    return (
        <>
            {modal}
            <EmptyView
                onNew={handleCreate}
                message="You haven't created any workflows yet. Get started by creating your first workflow. "
            />
        </>
    )
}

export const WorkflowItem = ({
    data, 
}: {data: WorkflowPrisma}) => {
    const removeWorkflow = useRemoveWorkflow(); 
    const handleRemove = () => {
        removeWorkflow.mutate({ id: data.id });
    }
    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={
                <>
                    Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true})}{" "}
                    &bull; Created{" "}
                    {formatDistanceToNow(data.createdAt, {addSuffix: true})}
                </>
            }
            image={
                <div className="size-8 flex items-center jusitfy-center">
                    <WorkflowIcon className="size-5 text-muted-foreground"/>
                </div>
            }
            onRemove={handleRemove}
            isRemoving={removeWorkflow.isPending}
        />
    )
}