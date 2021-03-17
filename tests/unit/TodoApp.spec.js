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

  it('点击全选按钮，所有的选项中的done属性都变为true或者false', async () => {
    const checkAllBtn = wrapper.find('[data-testid="check-all-btn"]')
    await checkAllBtn.trigger('click')
    const todos = wrapper.vm.todos
    let count = 0
    todos.forEach(item => {
      if (item.done) {
        count++
      }
    })
    expect(count).toBe(todos.length)
  })
})