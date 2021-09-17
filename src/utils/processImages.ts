import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import { isFile } from './saveFile';

dotenv.config();

// 指定URLのリソースをバイナリデータとして取得
export const getBinaryData = async (url: string): Promise<Buffer> => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(res.data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Base64画像データをバイナリデータとして取得
export const decodeBase64Image = (base64: string): Buffer => {
  return Buffer.from(base64.replace(/^data:\w*\/\w+;base64,/, ''), 'base64');
};

/**
 * 画像URLからファイル名取得
 * @param {string} url
 * @return {string}
 */
export const getFilename = (url: string, prefix = '', suffix = ''): string => {
  if (url.match(/^data:/)) {
    // base64 データの場合は 'base64.拡張子' というファイル名にする
    return 'base64.' + url.match(/^data:image\/([^;]+)/)[1];
  }
  // const filename = path.basename(url.match(/[^\?]+/)[0]); // クエリ文字列は削除
  const filename = path.basename(url.match(/\?.*$/)[0]); // クエリ文字列は削除

  let ext = path.extname(filename);
  let stem = path.basename(filename, ext).match(/^\d+/)[0]; // 拡張子抜きのファイル名
  // 拡張子がない場合は .jpg とする
  ext = ext === '' ? '.jpg' : ext;
  // ファイル名の長さは64文字までとする
  stem = stem.length > 64 ? stem.slice(0, 64) : stem;
  return prefix + stem + suffix + ext;
};

export const download = async (url: string, filename: string, rename = false): Promise<boolean> => {
  const dir = path.dirname(filename);
  const ext = path.extname(filename);
  // 同名ファイルを自動リネームする場合: filename + '_' + ext
  const basename = rename && isFile(filename) ? path.basename(filename, ext) + '_' + ext : path.basename(filename);
  // base64デコード
  if (url.match(/^data:/)) {
    fs.writeFileSync(path.join(dir, basename), decodeBase64Image(url), 'binary');
    return true;
  }
  // URLからダウンロード
  const buf = await getBinaryData(url);
  if (buf === null) {
    return false;
  }
  fs.writeFileSync(path.join(dir, basename), buf, 'binary');
  return true;
};
