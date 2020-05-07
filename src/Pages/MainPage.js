import React from 'react';
import MenuList from 'components/MenuList';
import SearchBar from 'components/SearchBar';

const MainPage = () => {
    return (
        <main className="main__page">
            <SearchBar />
            <MenuList />
        </main>
    );
};

export default MainPage;
