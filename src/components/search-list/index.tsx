import { Button, Input, Listbox, ListboxItem } from '@nextui-org/react';
import React, { useState } from 'react';

const SearchList = ({ list, onSearchResult, methodIfEmpty }: any) => {
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
            <Listbox className='p-auto ' emptyContent={``} aria-label="Элементы" onAction={(key) => handleAction(filteredItems.find((item: any) => item.id === key))}>
                {filteredItems.slice(0, 1).map((item: any, index: any) => (
                    <ListboxItem className='' key={item.id} id={item.id}>{item.name}</ListboxItem>
                ))}
            </Listbox>
            {filteredItems.length === 0 && <Button onClick={()=> {methodIfEmpty(searchTerm)}}>Создать</Button>}
        </>
    );
};

export default SearchList;
