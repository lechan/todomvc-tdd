import TodoFooter from '@/components/TodoFooter'
import { shallowMount } from '@vue/test-utils'

describe('TodoFooter.vue', () => {
  /**@type {import('@vue/test-utils').Wrapper} */
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(TodoFooter, {
      propsData: {
        todos: [{
          id: 1, text: 'a', done: true
        }, {
          id: 2, text: 'b', done: false
        }, {
          id: 3, text: 'c', done: false
        }]
      }
    })
  })

  it('任务数量展示正确', () => {
    const todosCount = wrapper.find('[data-testid="todos-count"]')
    const todos = wrapper.vm.todos
    expect(Number(todosCount.text())).toBe(todos.length)
  })

  it(`
    点击清除完成的任务按钮，
    验证是否触发clear-completed事件
  `, async () => {
    const clearCompletedBtn = wrapper.find('[data-testid="clear-btn"]')
    await clearCompletedBtn.trigger('click')
    expect(wrapper.emitted()['clear-completed']).toBeTruthy()
  })
})