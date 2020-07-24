import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { PostExcerpt } from './PostExcerpt'


export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(state => state.posts.status )
    const error = useSelector(state => state.posts.error)
    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content 
    if(postsStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if(postsStatus === 'succeeded') {
        // const orderedPosts = posts.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
        content = posts.map(postt => (
            <PostExcerpt post={postt} key={postt.id} />
        ))
    } else if(postsStatus === 'error') {
        content = <div>{ error }</div>
    }
    

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}