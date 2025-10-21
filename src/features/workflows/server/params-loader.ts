import { createLoader } from "nuqs/server";
import { workflowsParams } from "@/features/workflows/params";

export const workflowsParamsLoader = createLoader(workflowsParams);