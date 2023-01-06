'use client';
import Input from 'ui/Input';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const Search = () => {
  return (
    <div className="search-page">
      <div className={clsx('search-input p-3')}>
        <Input placeholder="Хайх..." />
      </div>
      <b className="block text-blue px-3 pb-3">Тохирох бүтээгдэхүүнүүд</b>
    </div>
  );
};

export default Search;
