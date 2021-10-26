const imgSrcRgx = /(<img[^>]*>)/;
const ImgPrefix = '#IMG_F';

import { Modules } from './const';

export const lightifyHtml = (html: string, maxLength: number): string => {
  const regexResult = imgSrcRgx.exec(html);

  const images = {};

  if (regexResult && regexResult.length > 1) {
    for (let i = 1; i < regexResult.length; i++) {
      const img = regexResult[i];
      const imgId = `${ImgPrefix}_${i}`;
      html = html.replace(img, imgId);
      images[imgId] = img;
    }
  }
  if (html.length > maxLength) {
    html = html.substring(0, maxLength);
  }

  for (const id of Object.keys(images)) {
    html = html.replace(id, images[id]);
  }

  let buf: string | null = null;

  const stack: Array<string> = [];

  for (let i = 0; i < html.length; i++) {
    let c = html.charAt(i);

    if (html.substr(i, 2) === '</' && i < html.length) {
      buf = '';
      i++;
      while (true) {
        if (i >= html.length) {
          break;
        }
        c = html.charAt(++i);

        if (c === '>' && stack[stack.length - 1] == buf) {
          stack.pop();
          break;
        }
        buf += c;
      }
    }

    if (c === '<') {
      buf = '';
      while (true) {
        if (i >= html.length) {
          break;
        }
        c = html.charAt(++i);
        if (c === '>' || c === ' ') {
          stack.push(buf);
          break;
        }
        buf += c;
      }
    }
  }

  for (const tag of stack.reverse()) {
    html += `</${tag}>`;
  }
  return html;
};

export const getCurrentModule = (): string => {
  let module;
  Object.keys(Modules).forEach((moduleName: string) => {
    if (Modules[moduleName].indexOf(location.pathname) != -1) {
      module = moduleName;
    }
  });
  return module;
};
