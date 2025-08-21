import Sidebaar from "@/app/_components/Sidebaar";

interface DashBoardProps{
    children : React.ReactNode;
}

 const DashboardLayout : React.FC<DashBoardProps> = ({children} : {children : React.ReactNode}) => {
     return (
        <div className="flex flex-row ">
        <div className="lg:sticky fixed h-[100vh] top-0 left-0  z-50">
          <Sidebaar/>
        </div>
        <div className="flex flex-1 max-w-full justify-center">
          <div className="max-w-screen-lg w-full mx-2">
            {children}
           </div>
        </div>
      </div>
     )
}

export default DashboardLayout