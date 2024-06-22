import { Button, Input, Listbox, ListboxItem } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const SearchList = ({ list, onSearchResult, methodIfEmpty }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(list);

    useEffect(() => {
        setFilteredItems(list);
        const sortedItems = [...filteredItems].sort((a: any, b: any) => {
            return b._count.postTags - a._count.postTags });
            setFilteredItems(sortedItems);
    }, [list]);

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
            <Listbox className="p-auto" aria-label="Элементы" onAction={(key) => handleAction(filteredItems.find((item: any) => item.id === key))}>
                {filteredItems.slice(0, 5).map((item: any) => (
                    <ListboxItem
                        className="bg-gray-100 my-1"
                        key={item.id}
                        id={item.id}
                        textValue={item.name}
                    >
                        <div className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <div className="text-sm text-gray-600">
                                <span>Подписчиков: {item._count.userTags}</span>
                                <span className="ml-2">Упоминаний: {item._count.postTags}</span>
                            </div>
                        </div>
                    </ListboxItem>
                ))}
            </Listbox>
            {filteredItems.length === 0 && methodIfEmpty && <Button onClick={() => { methodIfEmpty(searchTerm) }}>Создать</Button>}
        </>
    );
};

export default SearchList;
