import { h } from "hyperapp";
import DropDown from "./Common/DropDown";
import LinkItem from "./Links/LinkItem";
import Links from "./Links/Links";
import ScrollHoc from "./Common/ScrollHoc";

const Search = props => {
    const doSearch = e => {
        if (e.keyCode == 13) {
            if (e.target.value.length > 0) {
                props.actions.fetchItems({
                    stateKey: "mainNav",
                    q: e.target.value,
                    tab_id: "search"
                });
            }
        }
    };
    return (
        <div>
            <div class="footer">
                <div class="pull-left">Search:</div>
                <div class="pull-left">
                    <input
                        type="text"
                        class="search-box"
                        placeholder="Search links, titles, hastags, users...almost everything"
                        value={props.state.mainNav.tabs.search.q}
                        onkeypress={doSearch}
                        oncreate={e => e.focus()}
                    />
                </div>
                <span class="clearfix" />
            </div>
            <Links
                model="mainNav.tabs.search"
                tab={props.tab}
                actions={props.actions}
                loadMore={props.actions.loadMore}
                onScroll={props.onScroll}
                state={props.state}
            />
        </div>
    );
};
export default ScrollHoc(Search);
