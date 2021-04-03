import React from 'react';

const TreeView = (props) => {
  return (
    <div className="treeCard">
      {props.item.path}
      <div className="button-group">
        <button>edit</button>
        <button>view</button>
        <button>delete</button>
      </div>
    </div>
  );
};

export default TreeView;
