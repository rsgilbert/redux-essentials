import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First post', content: 'Hello' },
    { id: '2', title: 'Second Post', content: 'More content' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

export default postsSlice.reducer