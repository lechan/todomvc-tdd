<template>
  <section class="todoapp">
    <todo-header></todo-header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" data-testid="check-all-btn" class="toggle-all" type="checkbox" v-model="isSelectAll" @change="handleChangeSelectAll">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          data-testid="todo-item"
        ></todo-item>
      </ul>
    </section>
    <todo-footer></todo-footer>
  </section>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoItem from './TodoItem.vue'
export default {
  name: 'TodoApp',
  components: {
    TodoHeader,
    TodoFooter,
    TodoItem
  },
  data () {
    return {
      isSelectAll: false,
      todos: [{
        id: 1, text: 'a', done: true
      }, {
        id: 2, text: 'b', done: false
      }, {
        id: 3, text: 'c', done: false
      }]
    }
  },
  methods: {
    handleChangeSelectAll () {
      const isSelectAll = this.isSelectAll
      this.todos.forEach(item => item.done = isSelectAll)
    }
  }
}
</script>

<style>

</style>
