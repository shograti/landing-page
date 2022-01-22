import './Presentation.css'

const Presentation = (props) => {
const renderPosts=()=>{if(props.post.post_id%2==0){
    return(<><div className="text-container"><p>{props.post.post_content}</p></div><div className="img-container"><img src={props.post.post_img} alt=""/></div></>)
            } else {
                return (<><div className="img-container"><img src={props.post.post_img} alt=""/></div><div className="text-container"><p>{props.post.post_content}</p></div></>)
            }

}
    return ( 
        <div className="post-container">
            
            {renderPosts()}
            
        </div> );
}
 
export default Presentation;