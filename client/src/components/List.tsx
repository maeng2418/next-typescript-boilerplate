import * as React from 'react';
import ListItem from './ListItem';
import { User, IProps } from '../interfaces';

interface IListProps extends IProps {
  items: User[];
}

const List = ({ items }: IListProps) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
