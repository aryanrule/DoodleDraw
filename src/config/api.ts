const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
    user : {
        getUserInformation : `${API_BASE}/api/user`   , 
        createUser : `${API_BASE}/api/user` , 
        findUser : `${API_BASE}/api/user` , 
    }, 
    project : {
        createProject : `${API_BASE}/api/project` , 
          
    }
}