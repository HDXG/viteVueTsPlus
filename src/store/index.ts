import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { UseHomeStore } from './modules/homeStore'
const IndexPinia = createPinia()
IndexPinia.use(
    createPersistedState({
        storage: window.localStorage
    })
)
export { UseHomeStore }
export default IndexPinia;
