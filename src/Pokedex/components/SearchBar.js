import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export const SearchBar = () => {
    return (
        <div style={{ width: '42rem' }}>
            <Input size="large" placeholder="Search Pokemon" prefix={<SearchOutlined />} />
        </div>
    )
}
