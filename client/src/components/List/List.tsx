import * as React from 'react';
import ListItem from '@components/ListItem';
import { User, IProps } from '@interfaces';

interface IListProps extends IProps {
  items: User[];
}

export const List: React.FC<IListProps> = ({ items }: IListProps) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);
