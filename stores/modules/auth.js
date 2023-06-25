import { defineStore } from 'pinia'
import loginMutation from '@/graphql/auth/login.gql'
const authToken = useCookie('auth-token')
import jwt_decode from 'jwt-decode';
import getUser from '@/graphql/auth/getUser.gql'
import query  from '@/composables/query'
import { ref } from 'vue';
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null
  }),
  getters:{
    getToken(){
      return this.token
    },
    isLoggedIn(){
      return !!this.token
    },
   
  },
  actions: {
   
    // This function is called when the user has valid tokin, it may be token from backend
    //  or from cooki
    logout(){
      authToken.value = null
      this.token = null
    },

    setToken(token){
      this.token  = token
    },
    // This function checks the token in cookie and if it is valid then it sets the token
    autoLogin(){
        let decoded = {}
        if(authToken.value){
          decoded = jwt_decode(authToken.value);
          if(decoded.exp * 1000 > Date.now()){
            const decoded = jwt_decode(authToken.value);
            const role = decoded["https://hasura.io/jwt/claims"]["x-hasura-role"]
            console.log("role", role)
            if(role == "admin"){
              this.setToken(authToken.value)
            }
          }else{
            console.log("Token expired")
          }
        }else{
          console.log("No token found")
        }
    },
  }
})