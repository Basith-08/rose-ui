import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useClickOutside } from '../src/hooks/useClickOutside'
import { useToggle } from '../src/hooks/useToggle'
import { cn } from '../src/utils/cn'
import { mergeRefs } from '../src/utils/mergeRefs'

describe('@kagami.b/rose-ui utilities', () => {
    it('joins truthy class names', () => {
        expect(cn('btn', false, 'active', undefined, null, 'rounded')).toBe('btn active rounded')
    })

    it('merges function and object refs', () => {
        const objectRef = ref<HTMLElement | null>(null)
        const functionRef = vi.fn()
        const element = document.createElement('div')

        mergeRefs(objectRef, functionRef)(element)

        expect(objectRef.value).toBe(element)
        expect(functionRef).toHaveBeenCalledWith(element)
    })

    it('toggles open and close state', () => {
        const toggle = useToggle()

        expect(toggle.state.value).toBe(false)

        toggle.open()
        expect(toggle.state.value).toBe(true)

        toggle.toggle()
        expect(toggle.state.value).toBe(false)

        toggle.close()
        expect(toggle.state.value).toBe(false)
    })

    it('fires click outside handlers only for outside targets', async () => {
        const handler = vi.fn()

        const TestHarness = defineComponent({
            setup() {
                const element = ref<HTMLElement | null>(null)
                useClickOutside(element, handler)

                return { element }
            },
            render() {
                return h('div', [
                    h('div', { ref: 'element', 'data-testid': 'inside' }),
                    h('button', { 'data-testid': 'outside' }, 'outside'),
                ])
            },
        })

        const wrapper = mount(TestHarness, { attachTo: document.body })
        const inside = wrapper.get('[data-testid="inside"]')
        const outside = wrapper.get('[data-testid="outside"]')

        await inside.trigger('mousedown')
        expect(handler).not.toHaveBeenCalled()

        await outside.trigger('mousedown')
        await nextTick()
        expect(handler).toHaveBeenCalledTimes(1)

        wrapper.unmount()
    })
})
