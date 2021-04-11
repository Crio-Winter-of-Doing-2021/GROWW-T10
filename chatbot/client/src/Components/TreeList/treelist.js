import React, { useState, useEffect } from 'react';
import TreeView from './treeview';

const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const getTrees = async () => {
    try {
      const response = await fetch('/chat');
      const jsonData = await response.json();
      setTrees(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTrees();
  }, []);

  return (
    <div>
      {trees.map((tree) => (
        <TreeView item={tree} key={tree._id} />
      ))}
    </div>
  );
};

export default TreeList;
