import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  name?: string;
  image?: string;
  className?: string;
};

const UserAvatar = ({ name, image, className }: Props) => {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
      {image && (
        <Image
          src={image}
          alt={name || 'User name'}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <AvatarFallback className='dark:bg-white dark:text-black'>{name?.split(' ').map((n) => n[0]?.toUpperCase())}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
