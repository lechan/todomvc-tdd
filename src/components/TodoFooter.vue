<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong data-testid="todos-count">{{ todosCount }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected" href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button data-testid="clear-btn" class="clear-completed" @click="handleClearCompleted">Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'TodoFooter',
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    todosCount() {
      return this.todos.length
    }
  },
  methods: {
    handleClearCompleted () {
      this.$emit('clear-completed')
    }
  }
}
</script>

<style>

</style>