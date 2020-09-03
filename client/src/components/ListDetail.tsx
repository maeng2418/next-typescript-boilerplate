import * as React from 'react';
import { User, IProps } from '../interfaces';

interface IListDetailProps extends IProps {
  item: User;
}

const ListDetail = ({ item: user }: IListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
