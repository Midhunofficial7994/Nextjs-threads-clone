import { error, log } from "console";
import axiosInstance from "../../axios/axiosInstance";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";


export const fetchUser =createAsyncThunk("user/fetchUser",async()=>{
    const response= await axiosInstance.get('/users');
    return response.data.users;
})
export const fetchUserData=createAsyncThunk('user/fetchUserData',async(userId:string)=>{
    const response= await axiosInstance.get(`/users/${userId}`);
    return response.data.users;
});

export const loginUser= createAsyncThunk(
    'login/loginUser',
    async (userData:{username :string;password:string},{rejectWithValue})=>{
        try{
            console.log(userData)
            const response= await axiosInstance('/users/login',userData);
            return response.data;
        }
    }catch error()
)

interface User {
    id : string;
    name:string;
    followers:string[];
    following: string [];
    email:string;
    profilePic: string;
}

interface UserState {
    users:User[];
    userData:User[];
    posts:any[];
    status:"idle"   |   'loading' |  'succeeded' | 'failed';
    error : string | null;
}

const initialState: UserState={
    users:[],
   userData:[],
   posts:[],
   status:"idle",
   error:null,

};
 const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(addingCase)=>{
       
        addingCase.addCase(fetchUser.pending,(state)=>{
            state.status='loading';
        
        })


        .addCase (fetchUser.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.users=action.payload
        })

        .addCase (fetchUser.rejected,(state,action)=>{
            state.status='failed';
            state.error = action.error?.message??null;
        });

        addingCase.addCase(fetchUserData.pending,(state)=>{
                                 state.status='loading';

        })  

        .addCase(fetchUserData.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.users=action.payload
        })
        

        .addCase(fetchUserData.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error ?.message??null ;
        })
        
    }
 })

export default userSlice.reducer;