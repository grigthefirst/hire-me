import React, { LegacyRef, ReactChild, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type InfiniteScrollProps<ItemType> = {
    buffer: number,
    items: ItemType[],
    template: (item: ItemType, ref?: LegacyRef<any>) => ReactChild,
    loadMore: () => void
};

const InfiniteScroll = <ItemType, >(props: InfiniteScrollProps<ItemType>) => {
    const {
        buffer,
        items,
        template,
        loadMore
    }
        = props;
    const { ref, inView, entry } = useInView();

    useEffect(() => {
        inView && loadMore();
    }, [inView, entry]);
    return (<>
        {items.map((item, index) =>
            template(item, index === items.length - buffer ? ref : null))}
    </>);
}

export default InfiniteScroll;