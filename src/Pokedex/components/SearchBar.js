import React, {useContext} from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import SearchContext from '../../helpers/context/SearchContext';

export const SearchBar = () => {

    const handleSetSearchText = useContext(SearchContext)

    return (
        <div style={{ width: '42rem' }}>
            <Input size="large" placeholder="Search Pokemon" onChange={e => handleSetSearchText(e.target.value)} prefix={<SearchOutlined />} />
        </div>
    )
}
