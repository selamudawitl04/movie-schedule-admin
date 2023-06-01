import { defineStore } from 'pinia'
import loginMutation from '@/graphql/auth/login.gql'
const authToken = useCookie('auth-token')
import jwt_decode from 'jwt-decode';
import getUser from '@/graphql/auth/getUser.gql'
import authQuery  from '@/composables/authQuery'
import { ref } from 'vue';
// import gql from 'graphql-tag'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user_id: null,
    role: null,
    user:{
    },
    token: null
  }),
  getters:{
    
    getToken(state){
        return this.token
    },
    isLoggedIn(state){
      return !!state.token
    },
    getUser(state){
        return this.user
    },
    getRole(state){
      return this.role
    },
    getUserId(state){
      return this.user_id
    }
  },
  actions: {
    setId(id){
      this.user_id = id
    },
    setRole(role){
      this.role = role
    },

    // This function is called when the user has valid tokin, it may be token from backend
    //  or from cookie
    setUser(id){
      const { onResult, loading, onError, refetch } = authQuery(getUser, 'user', {id})
      onResult((result) => {
        this.user = {
          ...result.data.users_by_pk
        }
      })
      onError((error) => {
          console.log(error)
      })
    },
    setToken(token){
      this.token = token
    },
    logout(){
      authToken.value = null
      this.token = null
      this.user = null
    },
    // This function checks the token in cookie and if it is valid then it sets the token
    async autoLogin(){
        let decoded = {}
        if(authToken.value){
          decoded = jwt_decode(authToken.value);
          if(decoded.exp * 1000 > Date.now()){
            const decoded = jwt_decode(authToken.value);
            const id = decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
            const role = decoded["https://hasura.io/jwt/claims"]["x-hasura-role"]
            this.setToken(authToken.value)
            this.setRole(role)
            this.setUser(id)   
          }
        } 
    },
    
  }
})


