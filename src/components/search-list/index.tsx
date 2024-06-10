import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import React, { useState } from 'react';

const SearchList = ({ list, onSearchResult }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(list);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = list.filter((item: any) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleAction = (item: any) => {
        onSearchResult({ id: item.id, name: item.name });
    };

    return (
        <>
            <Input
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Listbox aria-label="Элементы" onAction={(key) => handleAction(filteredItems.find((item: any) => item.id === key))}>
                {filteredItems.slice(0, 1).map((item: any, index: any) => (
                    <ListboxItem key={item.id} id={item.id}>{item.name}</ListboxItem>
                ))}
            </Listbox>
        </>
    );
};

export default SearchList;
