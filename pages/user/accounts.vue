<!-- The header -->
<script setup>
const firstName = ref("Selamu")
const lastName =  ref('Dawit')
const email = ref('selamudev@gmail.com')

definePageMeta({
    layout: "userpanel",
});

</script>

<template>
    <div class=" lg:ml-6  w-full">
        <form action="">
            <!-- first name and last name -->
            <div class=" w-full  mb-4  flex">
                <div  class=" w-full mr-4 text-primary9 ">
                    <label for="first_name" >First Name<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="text" id="first_name" v-model="firstName" class="w-full border border-gray p-3 ">
                </div>
                <div class=" w-full ml-4 text-primary9">
                    <label for="last_name">Last Name<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="text" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
                </div>
            </div>
            <div class=" my-4  text-primary9">
                <label for="last_name">Display Name <span class=" text-red font-bold  text-lg">*</span></label>
                <input type="text" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
                <p>This will be how your name will be displayed in the account section and in reviews</p>
            </div>
            <div class=" w-full text-primary9">
                <label for="last_name">Email Address<span class=" text-red font-bold  text-lg">*</span></label>
                <input type="text" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
            </div>

            <!-- Password Change -->
            <div class=" relative p-4 border border-gray mt-6">
                <p class=" text-primary9 absolute -top-3 z-30 bg-white">Change Password</p>
                <div class=" my-6 w-full text-primary9">
                    <label for="last_name">Current password (leave blank to leave unchanged)<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
                </div>
                <div class=" my-6 w-full text-primary9">
                    <label for="last_name">New password (leave blank to leave unchanged)<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
                </div>
                <div class=" mt-6 w-full text-primary9">
                    <label for="last_name">Confirm new password<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="last_name" v-model="lastName" class="w-full border border-gray p-3 ">
                </div>
                
            </div>
            <div class=" m-0 bg-gray-dark py-4 w-48 text-center font-bold text-white">
                <button>Save Changes</button>
            </div>

        </form>

    </div>

    
    
</template>