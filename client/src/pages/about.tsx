import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const AboutPage: NextPage = () => (
  <>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
);

export default AboutPage;
