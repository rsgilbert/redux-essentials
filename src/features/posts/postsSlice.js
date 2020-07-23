import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}
// const initialState = [
//     { id: '1', title: 'First post', content: 'Hello', dateIso: "2020-07-22T16:47:54.992Z", reactions: initialReactions },
//     { id: '2', title: 'Second Post', content: 'More content', dateIso: "3030-07-22T16:47:54.992Z", reactions: initialReactions }
// ]

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                // return {
                //     payload: {
                //         id: nanoid(),
                //         dateIso: new Date().toISOString(),
                //         title,
                //         content, 
                //         user: userId
                //     }
                // }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } =  postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)