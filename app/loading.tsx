import { Loader2 } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <div className='flex items-center justify-center h-20'>
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
};

export default loading;
