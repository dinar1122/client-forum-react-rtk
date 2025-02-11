import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  count: number;
  Icon: IconType;
  color?: string;
};

export const MetaData = ({ count, Icon, color = '' }: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer ">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l ">{count}</p>
      )}
      <p className="text-default-400 text-3xl hover:scale-125 ease-in duration-100">
        <Icon color={color} />
      </p>
    </div>
  );
};
