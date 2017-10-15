import { h } from "hyperapp";
import LinkItem from "./LinkItem";

const Links = props => {
    const items = props.tab.data.rows.map((item, i) => {
        return (
            <LinkItem
                key={i}
                actions={props.actions}
                user_id={props.state.user.data.id}
                item={item}
                state={props.state}
            />
        );
    });
    return (
        <div>
            <div
                model={props.model}
                class="scroll"
                onscroll={e =>
                    props.actions.onScroll({
                        e,
                        callback: props.loadMore
                    })}
            >
                {items}
            </div>
        </div>
    );
};

export default Links;
