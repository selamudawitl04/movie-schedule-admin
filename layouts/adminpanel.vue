
<template>
    <div>
        <LayoutSideBar></LayoutSideBar>
        <div class="main-container">
            <div class=" py-8 px-6">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-container{
    padding-left: 21rem;
}

</style>