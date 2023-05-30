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
        <p class=" text-primary9">Hello {{ firstName }} (not selamu ? <span class=" text-yellow-bright">Logout</span>) </p>
        <div class=" my-8 text-primary9">
            <p>
                From your account dashboard you can view <span class=" text-yellow-bright">your recent tickets</span> , 
                manage your bookings,
                 and<span class=" text-yellow-bright"> edit your password and account details.</span> 
            </p>
        </div>

    </div>

    
    
</template>