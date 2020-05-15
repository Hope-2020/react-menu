import React from 'react';

import MenuList from 'components/MenuList';
import SearchBar from 'components/SearchBar';
import Paginate from 'components/Paginate';

const MainPage = () => {
    return (
        <main className="main__page">
            <SearchBar />
            <MenuList />
            <Paginate />
        </main>
    );
};

export default MainPage;
