import { defineStore } from 'pinia'

export const requestStore = defineStore('request', {
    state: () => ({
        selection: "",
        endpoint: "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response: null as any,
        status: "",
        responseType: null as 'country' | 'city' | null
    })
})
