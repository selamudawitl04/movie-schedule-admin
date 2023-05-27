<script>
export default{
    props: ['headers']
}
</script>

<template>
    <div>
        <table class="bg-white rounded-lg w-full shadow-primary1">
            <tr>
                <th v-for=" header in headers" :key="header" class=" mb-8 p-6 text-left border-b border-b-gray-light uppercase text-primary8">{{header}}</th>
            </tr>
            <slot></slot>
        </table>

    </div>
</template>
