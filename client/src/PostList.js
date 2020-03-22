import React, {useEffect, useState} from 'react';

const PostList = () => {
    const [postList, setPostList] = useState([])
    useEffect(()=> {
        fetch('http://localhost:3000/api/v0.1/posts')
        .then((response) => {
            return response.json();
          })
          .then((data) => {
            setPostList(data);
          });
    },[])

    return (
        <div>
            {
                postList.map( ({title,description, author}) => {
                    return (<div>
                        <p>{title}</p>
                        <p>{description}</p>
                        <p>{author}</p>
                    </div>)
                })
            }
        </div>
    )
}

export default PostList