'use client'
import React from 'react'

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';



const Createfile = ({userinfo}:{userinfo : any}) => {
  
  
  const [open , setOpen] = useState(false);
  const [filename , setfilename] = useState("");

  const createProject = () => {

  }

  return (
   <>
      <Dialog open={open} onOpenChange={setOpen} >
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
            <Button type="submit" >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Createfile