import * as React from 'react';
import { User, IProps } from '@interfaces';

interface IListDetailProps extends IProps {
  item: User;
}

export const ListDetail: React.FC<IListDetailProps> = ({ item: user }: IListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);
