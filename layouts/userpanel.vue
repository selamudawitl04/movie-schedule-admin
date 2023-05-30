
<template>
    <LayoutHeader></LayoutHeader>
    <div class=" pt-48 pb-32 container mx-auto">
        <div class=" flex items-start flex-col lg:flex-row">
            <LayoutUserSideBar></LayoutUserSideBar>
            <div class=" w-full  lg:w-2/3">
                <slot/>
            </div>
        </div>
    </div>
    <layout-footer></layout-footer>
</template>

<style scoped>


</style>

