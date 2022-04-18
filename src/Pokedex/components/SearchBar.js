import React, {useContext} from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import SearchContext from '../../helpers/context/SearchContext';

export const SearchBar = () => {

    const handleSetSearchText = useContext(SearchContext)

    return (
        <div style={{ width: '50%' }}>
            <Input size="large" placeholder="Search PokeHoum" onChange={e => handleSetSearchText(e.target.value)} prefix={<SearchOutlined />} />
        </div>
    )
}
