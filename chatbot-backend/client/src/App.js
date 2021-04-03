import React, { useState } from 'react';
import './App.css';
import { TreeEdit } from './Components/TreeEdit/treeedit';
import { TreeList } from './Components/TreeList/treelist';
import FaqList from './Components/FaqList/faqlist';

export default function App() {
  const [page, setPage] = useState('TreeList');
  return (
    <>
      <nav>
        <h1>ChatBot Admin Panel</h1>
        <ul>
          <li>
            <button onClick={() => setPage('TreeList')}>View All Trees</button>
          </li>
          <li>
            <button onClick={() => setPage('CreateTree')}>New Tree</button>
          </li>
          <li>
            <button onClick={() => setPage('FaqList')}>FAQ List</button>
          </li>
        </ul>
      </nav>
      <main>
        {page === 'TreeList' && <TreeList />}
        {page === 'CreateTree' && <TreeEdit />}
        {page === 'FaqList' && <FaqList />}
      </main>
    </>
  );
}
