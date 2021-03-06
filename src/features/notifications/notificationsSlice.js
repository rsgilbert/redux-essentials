import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.notifications
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        allNotificationsRead(state, action) {
            state.forEach(notif => notif.read = true)
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.forEach(notif => notif.isNew = !notif.read)
            state.push(...action.payload)
            // state.sort((a, b) => b.date.localCompare(a.date))
        }
    }
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const selectAllNotifications = state => state.notifications