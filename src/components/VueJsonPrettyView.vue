<template>
    <vue-json-pretty  :data="jsonData"  :showSelectController="true" :showLength="true" :showDoubleQuotes="false" 
    > 
    </vue-json-pretty>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
const props=defineProps<{jsonData:string}>();

const emit=defineEmits(['update:jsonData']);


const jsonData=computed({
    get:()=>JSON.parse(props.jsonData),
    set:(val)=>{
        emit('update:jsonData',JSON.parse(val))
    }
})

</script>