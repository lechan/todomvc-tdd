<template>
  <section class="todoapp">
    <todo-header @new-todo="handleNewTodo"></todo-header>
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
          @destory-todo="handleRemoveTodo"
          @edit-done="handleEditComplete"
        ></todo-item>
      </ul>
    </section>
    <todo-footer
      :todos="todos"
      @clear-completed="handleClearCompleted"
    ></todo-footer>
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
      }],
      currentLastId: 0
    }
  },
  methods: {
    initCurrentLastId () {
      const length = this.todos.length
      let lastItem = null
      if (length) {
        lastItem = this.todos[length - 1]
        this.currentLastId = lastItem.id
      }
    },
    handleChangeSelectAll () {
      const isSelectAll = this.isSelectAll
      this.todos.forEach(item => item.done = isSelectAll)
    },
    handleNewTodo (value) {
      this.currentLastId = this.currentLastId + 1
      const item = {
        id: this.currentLastId,
        text: value,
        done: false
      }
      this.todos.push(item)
    },
    handleRemoveTodo (id) {
      this.todos.forEach((item, index) => {
        if (item.id === id) {
          this.todos.splice(index, 1)
        }
      })
    },
    handleEditComplete ({ id, text }) {
      this.todos.forEach(item => {
        if (item.id === id) {
          item.text = text
        }
      })
    },
    handleClearCompleted () {
      this.todos = this.todos.filter(item => !item.done)
    }
  },
  created () {
    this.initCurrentLastId()
  }
}
</script>

<style>

</style>
