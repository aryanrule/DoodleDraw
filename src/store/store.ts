import { create } from 'zustand'

type state = {
    user : any , 
    project : any  
}

export const usePersonalStore = create<state>()((set:any) => ({
    user : null ,   // initial
    project : null , 
    updateUser : (user : any) => set((state : any) => ({user : state.user})) , 
    updateProject : (user : any) => set((state: any) => ({project : state.project}))  
}))



