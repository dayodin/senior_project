import React from 'react';
import { render, screen } from '@testing-library/react';
// import test from "test"
import authorExists from '../helpers/authorExists';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

// test('authorExists.js', async () => {
//   const result1 = await authorExists("Oda, Eiichiro")
//   const result2 = await authorExists("Eiichiro Oda")
//   const result3 = await authorExists("Eiichiro, Oda")
//   const result4 = await authorExists("Eliska Martinez")

//   assert.equal(result1, "True")
//   assert.equal(result2, "True")
//   assert.equal(result3, "False")
//   assert.equal(result4, "False")
// })
