import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Button from '../src/components/Button/Button.vue'
import Input from '../src/components/Input/Input.vue'
import Modal from '../src/components/Modal/Modal.vue'

describe('@basith-08/rose-ui components', () => {
    it('renders Button with loading state semantics', () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
            },
            slots: {
                default: 'Save',
            },
        })

        expect(wrapper.get('button').attributes('aria-busy')).toBe('true')
        expect(wrapper.text()).toContain('Save')
    })

    it('renders Input with label and hint text', () => {
        const wrapper = mount(Input, {
            props: {
                id: 'email',
                label: 'Email',
                hint: 'We will never share it.',
                modelValue: '',
            },
        })

        expect(wrapper.get('label').attributes('for')).toBe('email')
        expect(wrapper.text()).toContain('Email')
        expect(wrapper.text()).toContain('We will never share it.')
    })

    it('renders Modal with dialog semantics and close affordance', async () => {
        const trigger = document.createElement('button')
        document.body.appendChild(trigger)
        trigger.focus()

        const wrapper = mount(Modal, {
            attachTo: document.body,
            props: {
                modelValue: true,
                title: 'Delete item',
                description: 'This action cannot be undone.',
            },
        })

        await wrapper.vm.$nextTick()

        const dialog = wrapper.get('[role="dialog"]')
        const labelledBy = dialog.attributes('aria-labelledby')
        const describedBy = dialog.attributes('aria-describedby')

        expect(dialog.attributes('aria-modal')).toBe('true')
        expect(labelledBy).toBeTruthy()
        expect(describedBy).toBeTruthy()
        expect(wrapper.get(`#${labelledBy}`).text()).toBe('Delete item')
        expect(wrapper.get(`#${describedBy}`).text()).toBe('This action cannot be undone.')
        expect(document.activeElement?.getAttribute('aria-label')).toBe('Close dialog')

        await wrapper.get('button[aria-label="Close dialog"]').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

        wrapper.unmount()

        expect(document.activeElement).toBe(trigger)
        trigger.remove()
    })

    it('closes Modal on escape when enabled', async () => {
        const wrapper = mount(Modal, {
            attachTo: document.body,
            props: {
                modelValue: true,
                closeOnEscape: true,
            },
        })

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
        wrapper.unmount()
    })
})
