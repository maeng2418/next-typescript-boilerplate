import React from 'react';
import Link from 'next/link';
import { IProps } from '../../interfaces';
import styles from './styles.module.css';

export const Layout = ({ children }: IProps) => (
  <div>
    <header>
      <nav>
        <Link href="/">
          <a className={styles.aT}>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);
