import TodoItem from '@/components/TodoItem'
import { shallowMount } from '@vue/test-utils'

describe('TodoItem.vue', () => {
  /**@type {import('@vue/test-utils').Wrapper} */
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          id: 1,
          text: 'abc',
          done: true
        }
      }
    })
  })

  it('任务标题展示正常', () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    expect(label.text()).toBe('abc')
  })

  it('任务完成状态checkbox检查', () => {
    const done = wrapper.find('[data-testid="todo-done"]')
    expect(done.element.checked).toBeTruthy()
  })

  it('任务完成状态className检查', () => {
    const todoItem = wrapper.find('[data-testid="todo-item-li"]')
    expect(todoItem.element.className).toBe('completed')
  })

  it('点击删除按钮，触发删除事件，并且传递的值为该todo的id', async () => {
    const destoryBtn = wrapper.find('[data-testid="destory-btn"]')
    const todo = wrapper.vm.todo
    await destoryBtn.trigger('click')
    expect(wrapper.emitted()['destory-todo']).toBeTruthy()
    expect(wrapper.emitted()['destory-todo'][0][0]).toBe(todo.id)
  })

  it(`
    双击listItem区域，
    验证是否添加了一个名称为editing的className，
    验证编辑框的内容为之前展示的数据，
    验证该input是否获取了焦点
  `, async () => {
    const todoItem = wrapper.find('[data-testid="todo-item-li"]')
    // const todoView = wrapper.find('[data-testid="todo-view"]')
    const todoEdit = wrapper.find('[data-testid="edit-input"]')
    const todo = wrapper.vm.todo
    await todoItem.trigger('dblclick')
    expect(todoItem.classes()).toContain('editing')
    // expect(todoView.isVisible()).toBeFalsy()
    expect(todoEdit.element.value).toBe(todo.text)
    // expect(todoEdit.element.focus).toBeCalled()
  })

  it('光标移出edit输入框，向外发送edit-done事件，并且去掉listItem上名称为editing的className', async () => {
    const todoItem = wrapper.find('[data-testid="todo-item-li"]')
    const todoEdit = wrapper.find('[data-testid="edit-input"]')
    const testWord = 'Hello World'
    const todo = wrapper.vm.todo
    await todoItem.trigger('dblclick')
    todoEdit.setValue(testWord)
    await todoEdit.trigger('blur')
    expect(todoItem.classes()).not.toContain('editing')
    expect(wrapper.emitted()['edit-done']).toBeTruthy()
    expect(wrapper.emitted()['edit-done'][0][0]).toMatchObject({
      id: todo.id,
      text: testWord
    })
  })
  
})