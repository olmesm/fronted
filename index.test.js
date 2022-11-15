import test from 'ava';
import frontmatterParse from './index.js';

const FRONTMATTER_DOC = `
---
key: value
---
Some text`;

test('splits as expected', (t) => {
  t.deepEqual(frontmatterParse(FRONTMATTER_DOC), {
    data: { key: 'value' },
    meta: { original: FRONTMATTER_DOC },
    content: 'Some text',
  });
});

test('allows lang prefix ie yaml/toml/json', (t) => {
  const frontmatterDoc = FRONTMATTER_DOC.replace('---', '---yaml');
  t.deepEqual(frontmatterParse(frontmatterDoc), {
    data: { key: 'value' },
    meta: { original: frontmatterDoc },
    content: 'Some text',
  });
});

test.skip('allows custom engines', (t) => {
  t.is(true, true);
});
test.skip('strips delim', (t) => {
  t.is(true, true);
});
test.skip('strips custom delim', (t) => {
  t.is(true, true);
});

test('frontmatterParse#normal', (t) => {
  const x = frontmatterParse('---\ntitle: Front Matter\n---\nThis is content.');

  t.is(typeof x, 'object');
  t.is(typeof x.data, 'object');
  t.is(typeof x.content, 'string');
  t.is(x.data.title, 'Front Matter');
  t.is(x.content, 'This is content.');
});

test('frontmatterParse#json', (t) => {
  const x = frontmatterParse(
    '---\n{ "title": "Front Matter" }\n\n\n\n---\nThis is content.',
    { parser: JSON.parse }
  );
  t.is(typeof x, 'object');
  t.is(typeof x.data, 'object');
  t.is(typeof x.content, 'string');
  t.is(x.data.title, 'Front Matter');
  t.is(x.content, 'This is content.');
});

test('frontmatterParse#delimiters', (t) => {
  const x = frontmatterParse(
    '@@@@\ntitle: Front Matter\n~~~~\nThis is content.',
    {
      delimiters: ['@@@@', '~~~~'],
    }
  );

  t.is(typeof x, 'object');
  t.is(typeof x.data, 'object');
  t.is(typeof x.content, 'string');
  t.is(x.data.title, 'Front Matter');
  t.is(x.content, 'This is content.');
});

test('frontmatterParse#crlf', (t) => {
  const x = frontmatterParse(
    '---\r\ntitle: Front Matter\r\n---\r\nThis is content.'
  );

  t.is(typeof x, 'object');
  t.is(typeof x.data, 'object');
  t.is(typeof x.content, 'string');
  t.is(x.data.title, 'Front Matter');
  t.is(x.content, 'This is content.');
});
