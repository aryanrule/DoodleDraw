import React from "react";
import SearchInput from "@/app/_components/SearchInput";
const page = () => {
  return (
    <div>
      <section className="w-full h-20 flex justify-end  items-center">
        <div className="flex flex-row gap-2 items-center">
          {/* <ModeToggle /> */}
          <div>
            <SearchInput />
          </div>
          {/* <Createfile userInfo={userinfo} /> */}
        </div>
      </section>


    </div>
  );
};

export default page;
