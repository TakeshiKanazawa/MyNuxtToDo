<!-- todosコンポートの作成 -->

<template>
  <div>
    <!-- {{todos}} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
      <!-- @change checkの状態が変更した時にtoggleメソッドを呼び出す -->
      <input type="checkbox" 
      v-bind:checked="todo.done" 
      @change="toggle(todo)">
      <span  v-bind:class="{done:todo.done}">
      {{todo.name}}
      {{todo.created.toDate() | dateFilter}}
      </span>
      <button v-on:click="remove(todo.id)">削除ボタン</button>
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
import moment from 'moment'
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
    // todo追加
    add() {
      // store/todos.jsのactionsのaddを呼び出している
      this.$store.dispatch('todos/add',this.name)
      // フォームの入力値をクリア
      this.name = '';
    },
    // todo削除
  remove(id) {
    this.$store.dispatch('todos/remove',id)
  },
  // 
  toggle(todo) {
    this.$store.dispatch('todos/toggle',todo)
  }
},
  computed: {
    todos() {
      // storeのtodosの値を返却
      return this.$store.state.todos.todos
    }
  },
  filters: {
    dateFilter:function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>
li > span.done {
  /* 完了TODO取り消しスタイル */
  text-decoration: line-through;
}
</style>