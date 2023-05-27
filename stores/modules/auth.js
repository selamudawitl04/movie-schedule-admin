import { defineStore } from 'pinia'
import loginMutation from '@/graphql/auth/login.gql'
const authToken = useCookie('auth-token')


// import { useQuery, useMutation } from '~/.nuxt/imports'
// import getMovies from '@/graphql/query/movies.gql'


// import gql from 'graphql-tag'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user:{
        id: null,
        email: null,
        firstName : null,
        lastName: null,
        image: null,
    },
    token: null
  }),
  getters:{
    getUserId(state){
        return this.state.userId
    },
    getToken(state){
        return this.token
    },
    isLoggedIn(state){
        return !!state.token
    },
    getUser(state){
        return this.user
    }
  },
  mutations:{
    setToken(state, token){
        state.token = token
    },
    setUser(state, user){
        if(!!state.token){
            state.userId = id
            
        }else{
            state.userId = null
        }
    }
},
  actions: {
    setUser(user){
        this.user = user
        // console.log(this.user, 'from action part')
    },
    async login(payload){
        const data = {
            email: payload.email,
            password: payload.password
        }
        const {mutate, onDone, loading, onError } = useMutation(
            loginMutation, {data},
            () => ({
              fetchPolicy: "network-only"
            //   clientId: 'authClient'
            })
        );
        console.log(mutate)
        onDone((result) => {
            console.log(result)
            // check if result has value
            if (result.value && result.value.data) {

                authToken.value = 'Bearer '+ result.value.data.login.token
                // store token on cookie and  set token
                this.token = result.value.data.login.token
                // delete token from user data
                delete result.value.data.login.token 
                // store user data
                this.user = result.value.data.login
                user.value = result.value.data.user  
            }
        });
        onError((error) => {
            console.log(error)
            const err = new Error(error.message) ;
            throw err
        });
    },
    async signup(variables){
        // variables.firstName = variables.name.split(" ")[0]
        // variables.lastName = variables.name.split(" ")[1]
        // delete variables.name
        
        // // execute signup mutation
        // const {result, onResult, onError} = await useMutation(authMutation.signup(), variables) 
        // onResult((result) => { 
        //     // check if result has value
        //     if (result.value && result.value.data) {
        //         // store token on cookie and  set token
        //         this.token = result.value.data.signup.token
        //         // delete token from user data
        //         delete result.value.data.signup.token   
        //         // store user data  
        //         this.user = result.value.data.signup
        //         user.value = result.value.data.user
        //         console.log(user.value) // Output: { id: '123', name: 'John Doe', email: 'john@example.com' }
        //     }
        // })
        // onError((error) => {
        //     const err = new Error(error.message) ;
        //     throw err  
        // })
    },

    async forgotPassword(){
    },
    async resetPassword(){
    },
    async autoLogin(){
        // get token and user id from cookies and assign user
    },
    logout(){
        // delete token from cookie and set token null
        this.setToken(null)
    }
  }
})


