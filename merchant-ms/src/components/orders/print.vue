<template>
    <div>
        <input type="button" value="打印" @click="print" />
    </div>
</template>

<script>
export default {
    methods: {
        print() {
            window.print();
        },
    },
};
</script>

<style>
div {
    margin: 220px;
    background-color: antiquewhite;
}
</style>
