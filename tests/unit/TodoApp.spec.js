import TodoApp from '@/components/TodoApp'
import { shallowMount } from '@vue/test-utils'

describe('TodoApp.vue', () => {
  /**@type {import('@vue/test-utils').Wrapper} */
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(TodoApp)
    wrapper.vm.todos = [{
      id: 1, text: 'a', done: false
    }, {
      id: 2, text: 'b', done: false
    }, {
      id: 3, text: 'c', done: false
    }]
  })
  it('任务列表展示正常', () => {
    const todoItems = wrapper.findAll('[data-testid="todo-item"]')
    expect(todoItems.length).toBe(3)
  })
})