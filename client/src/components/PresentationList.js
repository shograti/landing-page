import Presentation from './Presentation'
import './PresentationList.css'

const PresentationList = (props) => {
    return (  
        <div className="post-list">
        {props.posts.map(post =>
             <Presentation key={post.post_id} post={post}/>)}
    </div>
    );
}
 
export default PresentationList;

