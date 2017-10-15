import { h } from "hyperapp";
import Comments from "../Comments";

const LinkItem = ({ item, user_id, actions, key, state }) => {
    let editCommentText = state.editComment.data.comment || "";

    const save = comment => {
        actions.saveEditedComment(
            document.querySelector("#comment").value.trim()
        );
    };
    return (
        <div class="left clearfix item">
            <span class="items-img pull-left">
                <span
                    class={
                        "favourite fa fa-" +
                        (item.favourite == "1" ? "star" : "star-o")
                    }
                    onclick={e => actions.handleFavourite({ e, key })}
                />
                <img
                    width="60"
                    oncreate={e =>
                        actions.lazyLoad({ e, image: item.thumbnail })}
                    src={"../../public/images/default.png"}
                />
            </span>
            <div class="items-body clearfix">
                <div class="header">
                    <a
                        href="#"
                        class="username"
                        onclick={e =>
                            actions.showProfile({ e, user_id: item.uid })}
                    >
                        <strong
                            class="primary-font"
                            color={item.color}
                            style={{ color: item.color }}
                        >
                            {item.nickname}
                        </strong>
                    </a>
                    <span class="label label-default">{item.group_name}</span>
                    <small class="pull-right text-muted">
                        <i class="fa fa-clock-o" />
                        {moment(item.created_at)
                            .add(moment().utcOffset(), "minutes")
                            .fromNow()}
                    </small>
                </div>
                <div class="item-body">
                    <div>
                        <a
                            href={item.url}
                            target="_blank"
                            class="item-link"
                            onclick={e => actions.itemClicked({ e, key })}
                        >
                            {item.title}
                        </a>
                    </div>
                    <div>
                        <span class="item-comments">{item.comments}</span>
                    </div>
                    <div class="action-items">
                        <a
                            href="#"
                            class="grey likes-item action-links"
                            onclick={e => actions.handleLike({ e, key })}
                        >
                            <i
                                class={
                                    "fa fa-" +
                                    (item.liked == 1 ? "heart" : "heart-o")
                                }
                                aria-hidden="true"
                            />
                            <span class="term likes"> {item.likes_count}</span>
                        </a>
                        <a
                            href="#"
                            class="grey comments-item action-links"
                            onclick={e => actions.showComments({ e, key })}
                        >
                            <i
                                class={
                                    "fa fa-" +
                                    (item.comments_count > 0
                                        ? "comment"
                                        : "comment-o")
                                }
                                aria-hidden="true"
                            />
                            <span class="term"> {item.comments_count}</span>
                        </a>
                        <a
                            href="#"
                            class="grey forward-item action-links"
                            onclick={e => actions.handleShare({ e, key })}
                        >
                            <i class="fa fa-share" aria-hidden="true" />
                        </a>
                        <a class="grey action-links">
                            <i class="fa fa-eye" aria-hidden="true" />
                            <span class="term"> {item.times_clicked}</span>
                        </a>
                        {item.uid == user_id && (
                            <a
                                href="#"
                                class="delete-item grey action-links"
                                onclick={e => actions.handleDelete({ e, key })}
                            >
                                <i class="fa fa-trash" aria-hidden="true" />
                            </a>
                        )}
                    </div>
                    {item.showComments && (
                        <div class="comments-section">
                            <div class="comment-wrapper">
                                <input
                                    placeholder="Comment here.."
                                    class="form-control comment-input"
                                    maxlength="140"
                                    value={editCommentText}
                                    type="text"
                                    id="comment"
                                    onkeypress={e =>
                                        actions.handleCommentInput({ e, key })}
                                />
                                {state.editComment.open && (
                                    <div class="text-right">
                                        <span
                                            class="comment-edit"
                                            onclick={save}
                                        >
                                            <i class="green fa fa-check" />
                                        </span>
                                        <span
                                            class="comment-edit"
                                            onclick={actions.deleteComment}
                                        >
                                            <i class="red fa fa-trash" />
                                        </span>
                                        <span
                                            class="comment-edit"
                                            onclick={actions.cancelCommentEdit}
                                        >
                                            <i class="fa fa-times" />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Comments
                                actions={actions}
                                user_id={user_id}
                                key={key}
                                data={item.commentList}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

module.exports = LinkItem;
