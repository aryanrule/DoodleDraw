
'use client'
import React from "react";
import SearchInput from "@/app/_components/SearchInput";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { usePersonalStore } from "@/store/store";
import Createfile from "@/app/_components/Createfile";


const page = () => {
  const userinfo = usePersonalStore((state) => state.user);
  return (
    <div>
      <section className="w-full h-20 flex justify-end  items-center">
        <div className="flex flex-row gap-2 items-center">
          {/* <ModeToggle /> */}
          <div>
            <SearchInput />
          </div>
          <Createfile userinfo={userinfo} />
        </div>
      </section>
        
        <div>
      </div>
    </div>
  );
};

export default page;
