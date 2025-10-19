'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";


const page = () => {
  // const { data } = authClient.useSession();
  // await requireAuth(); 
  // const data = await caller.getUsers(); 
  return (
    <div className="">
      {/* {JSON.stringify(data)} */}
      <Button
        onClick={() => authClient.signOut()}
      >
        Sign out
      </Button>

    </div>
  )
}

export default page;
