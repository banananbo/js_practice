<template>
  <div>
    <p>{{ this.$store.state.test }} World!</p>
  </div>
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
    this.greeting = 'hello';
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