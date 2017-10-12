import { h } from "hyperapp";
const Comments = props => {
    let comments = typeof props.data == "undefined" ? [] : props.data;

    const markup = comments.map(item => (
        <div class="left clearfix">
            <span class="comment-user" style={{ color: item.color }}>
                {item.nickname}
            </span>{" "}
            - <span class="user-comment">{item.comment}</span>
            <span class="comment-meta">
                <span class="comment-date grey">
                    {" "}
                    -
                    {(() => {
                        let d = "now";
                        if (item.created_at != "now") {
                            d = moment(item.created_at)
                                .add(moment().utcOffset(), "minutes")
                                .fromNow();
                        }
                        return d;
                    })()}
                </span>
            </span>
        </div>
    ));

    return <div class="comments">{markup}</div>;
};
export default Comments;
