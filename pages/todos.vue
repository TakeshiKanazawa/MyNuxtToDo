<!-- todosコンポートの作成 -->

<template>
  <div>
    
  </div>
</template>

<script>
export default {
  created:function() {
    // storeのtodosjsのactionのinitを読み込んでfirebaseを初期化
    this.$store.dispatch('todos/init')
  }
}


</script>