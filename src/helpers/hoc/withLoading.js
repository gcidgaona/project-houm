import React from 'react'
import { Spin } from 'antd';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Spin size="large" />
      </div>
    )
  };
}
export default WithLoading;