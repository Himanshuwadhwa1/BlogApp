import {format} from "date-fns";
import { Link } from "react-router-dom";
import { url } from "./utils/url";
export default function Post({_id,title,summary,cover,content,createdAt,author}){
  const url2 = url;
    return(
        <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`${url2}/` + cover} alt="" />
          </Link>
        </div>
        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{format(new Date(createdAt), "H:m, MMM d yyy")}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    )
}