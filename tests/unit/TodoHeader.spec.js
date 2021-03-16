import TodoHeader from '@/components/TodoHeader'
import { shallowMount } from '@vue/test-utils'

describe('TodoHeader.vue', () => {
  it('标题内容是 todos', () => {
    const wrapper = shallowMount(TodoHeader)
    const title = wrapper.find('[data-testid="header-title"]')
    expect(title.text()).toBe('todos')
  })

  // 由于我们要遵守UTDD单元测试的原则，因此我们只测试这一个组件内容，不要把其他组件的一些内容混入进来。
  // 比如input和下面列表项本身应该是有联动关系的，我们只需要关心点回车后是否向外发布了某个事件。
  it('添加任务，输入有效数据发布 new-todo 事件', async () => {
    const wrapper = shallowMount(TodoHeader)
    const newTodoInput = wrapper.find('[data-testid="new-todo-input"]')
    // 输入有效数据，发布 new-todo 事件
    const text = 'hello'
    newTodoInput.setValue(text)
    // 触发回车事件
    await newTodoInput.trigger('keyup.enter')
    // 断言
    expect(wrapper.emitted()['new-todo']).toBeTruthy() // 对外发布了事件
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text) // new-todo 事件的参数必须是 hello
    expect(newTodoInput.element.value).toBe('')
  })

  it('输入无效数据，不会对外发布事件', async () => {
    const wrapper = shallowMount(TodoHeader)
    const newTodoInput = wrapper.find('[data-testid="new-todo-input"]')
    // 输入无效数据，不会往外发布事件
    newTodoInput.setValue('')
    // 触发回车事件
    await newTodoInput.trigger('keyup.enter')
    // 断言
    expect(wrapper.emitted()['new-todo']).toBeFalsy() // 不对外发布事件
  })
})