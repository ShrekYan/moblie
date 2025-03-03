import React, { useState } from "react";
import { SortableContainer, SortableElement, SortEnd } from "react-sortable-hoc";
import type { SortableElementProps, SortableContainerProps } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

// 定义可排序项属性类型
interface SortableItemProps extends SortableElementProps {
    value: string;
    index: number; // 必须显式声明 index
}

// 创建精确类型化的可排序项
const SortableItem = SortableElement<SortableItemProps>(({ value }: SortableItemProps) => (
    <li>{value}</li>
));

interface SortableListContainerProps extends SortableContainerProps {
    children: React.ReactNode;
}

// 创建精确类型化的容器组件
const SortableListContainer = SortableContainer<SortableListContainerProps>(
    ({ children }: SortableListContainerProps) => {
        return <ul>{children}</ul>;
    }
);

const SortableWrapper: React.FC = () => {
    const [items, setItems] = useState([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
    ]);

    const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
    };

    return (
        <SortableListContainer onSortEnd={handleSortEnd} axis="y" distance={5}>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </SortableListContainer>
    );
};

export default SortableWrapper;
