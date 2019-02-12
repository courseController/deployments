<template>
    <div :style="{color}">
        <i class="fas fa-check-circle"></i>
    </div>
</template>

<script>
    export default {
      name: 'check',
      props: ['tog'],
      computed: {
        color: function(){
          return (this.tog) ? '#009900' : '#dedede';
        }
      }
    }
</script>
<style scoped>
    div{
        font-size: 35px;
        cursor: pointer;
    }
</style>
