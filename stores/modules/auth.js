import { defineStore } from 'pinia'
import loginMutation from '@/graphql/auth/login.gql'
const authToken = useCookie('auth-token')
import jwt_decode from 'jwt-decode';
import getUser from '@/graphql/auth/getUser.gql'
import { ref } from 'vue';



// import gql from 'graphql-tag'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user:{
        id: null,
        email: null,
        firstName : null,
        lastName: null,
        image: {
            url: null
        }

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
      console.log(!!state.token)
      return !!state.token
    },
    getUser(state){
        return this.user
    }
  },
  actions: {
    setUser(user){
        this.user = user
        // console.log(this.user, 'from action part')
    },
    setToken(token){
      this.token = token
    },
    async login(payload){
      
    },
    async signup(payload){
        
    },

    async forgotPassword(){
    },
    async resetPassword(){
    },
    async autoLogin(){
        let decoded = {}
        if(authToken.value){
          decoded = jwt_decode(authToken.value);
        }
        
        if(decoded.exp * 1000 > Date.now()){
          const decoded = jwt_decode(authToken.value);
          const id = decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
          const { onResult, loading, onError, refetch } = useQuery(getUser, {id},
            () => ({
                fetchPolicy: "network-only",
                clientId: "authClient",
            }))
          onResult((result) => {
            const user = {
              ...result.data.users_by_pk
            }
            user.image = result.data.users_by_pk.image.url
            this.setUser(result.data.users_by_pk)
            this.setToken(authToken.value)
          })
          onError((error) => {
              // router.push('/error')
              console.log(error)
          })
        
        }else{
          // console.log(555555)
        }
    },
    logout(){
        this.token = null
    }
  }
})


