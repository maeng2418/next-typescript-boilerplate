import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const IndexPage: NextPage = () => (
  <>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </>
);

export default IndexPage;
