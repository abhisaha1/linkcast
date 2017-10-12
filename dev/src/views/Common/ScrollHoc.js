import { h } from "hyperapp";

const ScrollHoc = Component => props => {
    const onScroll = e => {
        props.onScroll({
            e,
            callback: props.loadMore
        });
    };

    return <Component {...props} onScroll={onScroll} />;
};

export default ScrollHoc;
