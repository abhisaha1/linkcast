import { h } from "hyperapp";
import DropDown from "./Common/DropDown";

const Post = ({ state, actions }) => {
    let params = {
        title: state.post.title,
        url: state.post.url,
        comments: state.post.comments,
        thumbnail: state.post.thumbnail,
        group: state.groups.defaultGroup
    };
    const onChange = (e, key) => {
        params[key] = e.target.value.trim();

        if (e.target.tagName == "SELECT") {
            let selectedIdx = e.target.options.selectedIndex;
            params[key] = state.groups.data[selectedIdx].group_id;
        }
        actions.setPost(params);
    };
    const handlePost = e => {
        e.preventDefault();
        actions.doPost(params);
    };

    return (
        <div class="col-sm-12 pt20 form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-3 required" for="item-name">
                    Name
                </label>
                <div class="col-sm-9">
                    <input
                        type="text"
                        class="form-control"
                        value={state.post.title}
                        onkeyup={e => onChange(e, "title")}
                    />
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-3 required" for="item-url">
                    URL
                </label>
                <div class="col-sm-9">
                    <input
                        name="url"
                        type="text"
                        class="form-control"
                        value={state.post.url}
                        onkeyup={e => onChange(e, "url")}
                    />
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-3" for="item-comments">
                    Comments
                </label>
                <div class="col-sm-9">
                    <input
                        name="comments"
                        type="text"
                        class="form-control"
                        value={state.post.comments}
                        onkeyup={e => onChange(e, "comments")}
                    />
                </div>
            </div>
            <input type="hidden" id="item-thumb" />
            <div class="form-group">
                <label for="groups-dd" class="control-label col-sm-3">
                    Select Group
                </label>
                <div class="col-sm-9">
                    <DropDown
                        classes="form-control groups-dd"
                        data={state.groups.data}
                        selected={state.groups.defaultGroup}
                        onChange={e => onChange(e, "group")}
                        identifier="group_id"
                    />
                </div>
            </div>
            <div class="col-sm-9 col-sm-offset-3">
                <button
                    id="post-btn"
                    type="submit"
                    class="btn btn-default btn-sm"
                    onclick={handlePost}
                >
                    Post
                </button>
            </div>
        </div>
    );
};
export default Post;
