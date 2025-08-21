import { create } from 'zustand'

type State = {
    user : any , 
    project : any  , 
    updateUser : (user : any ) => void , 
    updateProject : (project : any) => void ,   

}


export const usePersonalStore = create<State>((set) => ({
  user: null,
  project: null,
  updateUser: (user) => set(() => ({ user })),
  updateProject: (project) => set(() => ({ project })),
}));




