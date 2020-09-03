import React from 'react';
import Link from 'next/link';
import { User, IProps } from '../../interfaces';

interface IListItemProps extends IProps {
  data: User;
}

export const ListItem = ({ data }: IListItemProps) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
);
