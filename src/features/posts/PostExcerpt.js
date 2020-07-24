import React from 'react'

import { Link } from 'react-router-dom'
import  { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'



export let PostExcerpt = ({ post }) => {
    const Post = (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3> 
            <PostAuthor userId={post.user}/>
            <TimeAgo dateIso={post.dateIso}/>
            <p>{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
            <ReactionButtons post={post} />
        </article>
    )

    return Post
}



