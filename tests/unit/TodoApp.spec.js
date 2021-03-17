import TodoApp from '@/components/TodoApp'
import TodoHeader from '@/components/TodoHeader'
import TodoItem from '@/components/TodoItem'
import TodoFooter from '@/components/TodoFooter'
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

  it('任务列表长度是否正常', () => {
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

  it(`
    Header子组件触发new-todo事件，
    创建一个新的todo追加到todos数组中，
    验证todos数组的length是否+1，
    验证todos数组最后一项的id是否是自增的，
    验证todos数组最后一项的text是否是子组件事件触发时传的值
  `, async () => {
    const todos = wrapper.vm.todos
    const oldLength = todos.length
    const inputValue = 'Hello world'
    // 仅仅去操作子组件的事件，不要去获取任何子组件相关的数据
    await wrapper.findComponent(TodoHeader).vm.$emit('new-todo', inputValue)
    const lastItem = todos[oldLength]
    const subLastItemId = todos[oldLength - 1].id
    expect(todos.length).toBe(oldLength + 1)
    expect(lastItem.id).toBe(subLastItemId + 1)
    expect(lastItem.text).toBe(inputValue)
  })

  it(`
    TodoItem子组件触发destory-todo事件，
    从todos数组中删除该todo项，
    验证todos数组的length是否-1，
    验证todos数组是否还包含该id的项目
  `, async () => {
    const todos = wrapper.vm.todos
    const destoryItem = todos[0]
    const oldLength = todos.length
    let hasDestoryId = false
    await wrapper.findComponent(TodoItem).vm.$emit('destory-todo', destoryItem.id)
    todos.forEach(item => {
      if (item.id === destoryItem.id) {
        hasDestoryId = true
      }
    })
    expect(wrapper.vm.todos.length).toBe(oldLength - 1)
    expect(hasDestoryId).toBeFalsy()
  })

  it(`
    TodoItem子组件触发edit-done事件，
    将编辑后的内容更新到该todo项的text上，
    验证todos数组对应的todo项里的text是否是事件传递的数据
  `, async () => {
    const todos = wrapper.vm.todos
    const id = todos[0].id
    const editValue = 'Hello'
    await wrapper.findComponent(TodoItem).vm.$emit('edit-done', {
      id,
      text: editValue
    })
    const currentEditItem = todos.find(item => item.id === id)
    expect(currentEditItem.text).toBe(editValue)
  })

  it(`
    TodoFooter子组件触发clear-completed事件，
    验证todos数组是否过滤掉done为true的item
  `, async () => {
    const todos = wrapper.vm.todos
    await wrapper.findComponent(TodoFooter).vm.$emit('clear-completed')
    let hasDoneTruthy = false
    todos.forEach(item => {
      if (item.done) {
        hasDoneTruthy = true
      }
    })
    expect(hasDoneTruthy).toBeFalsy()
  })
})