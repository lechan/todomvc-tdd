<template>
  <li
    :class="{
      completed: todo.done,
      editing: isEdit
    }"
    data-testid="todo-item-li"
    @dblclick="handleEdit">
      <div data-testid="todo-view" class="view">
        <input data-testid="todo-done" class="toggle" type="checkbox" v-model="todo.done">
        <label data-testid="todo-text">{{ todo.text }}</label>
        <button data-testid="destory-btn" class="destroy" @click="handleDestory(todo.id)"></button>
      </div>
      <input data-testid="edit-input" class="edit" v-model="editValue" @blur="handleEditComplete">
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      isEdit: false,
      editValue: ''
    }
  },
  methods: {
    handleDestory (id) {
      this.$emit('destory-todo', id)
    },
    handleEdit () {
      this.isEdit = true
      this.editValue = this.todo.text
    },
    handleEditComplete () {
      this.isEdit = false
      this.$emit('edit-done', this.editValue)
    }
  }
}
</script>

<style scoped>
  .editing {
    display: block;
  }
</style>