<template>
  <header class="header">
    <h1 data-testid="header-title">todos</h1>
    <input
      data-testid="new-todo-input"
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  methods: {
    handleNewTodo (e) {
      const { value } = e.target
      if (value.trim().length) {
        this.$emit('new-todo', value)
        e.target.value = ''
      }
    }
  }
}
</script>

<style>

</style>