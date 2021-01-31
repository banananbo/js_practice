<template>
    <p>{{ computed_greeting }} World!</p>
</template>

<script lang="ts">
export type DataType ={
      greeting:string
}

export default {
  data():DataType{
    return {
      greeting: ''
    };
  },
  created() {
    console.log("CREATED!!");
    this.greeting = 'home';
  },
  computed:{
      computed_greeting():string{
          return this.greeting;
      }
  }
}
</script>
<style scoped>
p{
    font-size: 2em;
    text-align: center;
}
</style>