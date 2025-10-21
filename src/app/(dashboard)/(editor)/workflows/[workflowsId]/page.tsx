import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        workflowsId: string;
    }>
}

const page = async ({ params }: PageProps) => {
    await requireAuth(); 
    const { workflowsId } = await params;
    console.log("Workflow ID:", workflowsId);
    return (
        <div>
            Workflow Id: {workflowsId}
        </div>
    )
}

export default page; 
