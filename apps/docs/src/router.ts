import { createRouter, createWebHistory } from 'vue-router'

import ComponentsPage from './pages/ComponentsPage.vue'
import HomePage from './pages/HomePage.vue'
import InstallPage from './pages/InstallPage.vue'
import TokensPage from './pages/TokensPage.vue'

export const docsNavigation = [
    { label: 'Overview', to: '/' },
    { label: 'Install', to: '/install' },
    { label: 'Components', to: '/components' },
    { label: 'Tokens', to: '/tokens' },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/install',
            name: 'install',
            component: InstallPage,
        },
        {
            path: '/components',
            name: 'components',
            component: ComponentsPage,
        },
        {
            path: '/tokens',
            name: 'tokens',
            component: TokensPage,
        },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})
