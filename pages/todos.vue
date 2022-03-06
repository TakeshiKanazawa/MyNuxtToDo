<!-- todosコンポートの作成 -->

<template>
  <div>
    <!-- {{todos}} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
      {{todo.done}}
      {{todo.name}}
      {{todo.created}}
      </li>
    </ul>
    <div class="form">
      <!-- ボタンが押されたらadd()を呼ぶ -->
      <form v-on:submit.prevent="add">
      <input v-model="name">
      <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // データの用意(新規登録データを一時格納)
  data:function() {
    return {
      name:'',
      done:false
    }
  },
  created:function() {
    // storeのtodosjsのactionのinitを読み込んでfirebaseを初期化
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      // store/todos.jsのaddを呼び出している
      this.$store.dispatch('todos/add',this.name)
      // フォームの入力値をクリア
      this.name = '';
    }
  },
  computed: {
    todos() {
      // storeのtodosの値を返却
      return this.$store.state.todos.todos
    }
  }
}


</script>