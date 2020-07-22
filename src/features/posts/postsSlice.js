import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}
const initialState = [
    { id: '1', title: 'First post', content: 'Hello', dateIso: "2020-07-22T16:47:54.992Z", reactions: initialReactions },
    { id: '2', title: 'Second Post', content: 'More content', dateIso: "3030-07-22T16:47:54.992Z", reactions: initialReactions }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        dateIso: new Date().toISOString(),
                        title,
                        content, 
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } =  postsSlice.actions
export default postsSlice.reducer