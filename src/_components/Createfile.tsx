"use client";
import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import Api_Connector from "@/config/api_connector/api_connectot";
import { API_ENDPOINTS } from "@/config/api";
import { usePersonalStore } from "@/store/store";

const Createfile = ({ userinfo }: { userinfo: any }) => {
  const updatedUser = usePersonalStore((state : any)=> state.updateUser);
  const updatedProject = usePersonalStore((state : any ) => state.updateProject);
  
  const [open, setOpen] = useState(false);
  const [filename, setfilename] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("userinfo", userinfo);
  });

  const createProject = async () => {
    try {
      //validation
      if (userinfo?.project.length >= 5 && userinfo?.plan === "free") {
        toast("Maximum File Creation Limit Reached", {
          description: "upgrade you plan to premium",
          action: {
            label: "Upgrade",
            onClick: () => router.push("/dashboard/plans"),
          },
        });
      }
      const createUsersProject : any = await Api_Connector("POST" , API_ENDPOINTS.project.createProject , {userId : userinfo?._id , fileName : filename }  , "" , "");
      console.log("createUserProject" , createUsersProject);
      updatedUser(createUsersProject?.data?.updatedUser);
      updatedProject(createUsersProject?.data?.updatedUser?.project);
      toast('Project created successfully')
      
    } catch (error) {
      console.log(error);
      toast("Problem while creating project");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className=" h-4 w-4" />
            <div className="sm:block hidden">New Project</div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Project details here. Click 'Create' when you're ready to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input
                id="name"
                placeholder="project "
                onChange={(e) => setfilename(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                createProject().then(() => setOpen(false));
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Createfile;
