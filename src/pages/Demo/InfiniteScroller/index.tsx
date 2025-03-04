import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

interface ListItem {
    id: number;
    content: string;
}

const InfiniteScroller: React.FC = () => {
    const [items, setItems] = useState<ListItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchData = async (pageNumber: number): Promise<ListItem[]> => {
        try {
            console.log(pageNumber);
            return [{ id: 1, content: "项目2" }];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const loadMore = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const newItems = await fetchData(page);
            if (newItems.length == 0) {
                setHasMore(false);
                return;
            }
            setItems((prev: ListItem[]) => {
                return [...prev, ...newItems];
            });
            setPage((prev) => {
                return prev + 1;
            });
        } finally {
            setIsLoading(false);
        }
    }, [page, isLoading]);

    return (
        <div>
            <InfiniteScroll
                pageStart={1}
                loadMore={loadMore}
                hasMore={hasMore}
                threshold={100}
                loader={
                    <div key="loading" className="loader">
                        {" "}
                        {isLoading && "加载中..."}{" "}
                    </div>
                }
            />
            {items.map((item) => (
                <div key={item.id} style={{ minWidth: "300px" }}>
                    {item.content}
                </div>
            ))}
        </div>
    );
};

export default InfiniteScroller;
