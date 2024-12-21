"use client"

import React, { useState } from 'react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';



const PlusMinus = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div className="flex items-center space-x-4 border-[1px] rounded-md">
            <button 
                onClick={decrement} 
                className="px-3 py-2 transition duration-200 border-r-[1px]"
            >
                <Minus size={16} className="text-black" />
            </button>
            <span className="text-[18px] font-semibold">{count}</span>
            <button 
                onClick={increment} 
                className="px-3 py-2 transition duration-200 border-l-[1px]"
            >
                <Plus size={16} className="text-black" />
            </button>
        </div>
    );
};

export default PlusMinus;