import { parse } from 'yaml';

const OPTIONS = { delimiters: '---', parser: parse };

const stripBomString = (str) => {
  if (typeof str === 'string' && str.charAt(0) === '\ufeff') {
    return str.slice(1);
  }
  return str;
};

const splitOnMatch = (str, match) => {
  const index = str.indexOf(match);
  const len = match.length;

  return index > -1 ? [str.slice(0, index), str.slice(index + len)] : [str, ''];
};

const main = (_str, opts) => {
  const _opts = { ...OPTIONS, ...opts };
  const delims = Array.isArray(_opts.delimiters)
    ? _opts.delimiters
    : [_opts.delimiters, _opts.delimiters];
  const str = stripBomString(_str).trim();
  const [lang, rawContent] = splitOnMatch(str, '\n');

  const [frontMatterData, content] = splitOnMatch(
    rawContent,
    delims[1] || delims[0]
  );

  return {
    data: _opts.parser(frontMatterData),
    meta: {
      original: _str,
    },
    content: content.trim(),
  };
};

export default main;
