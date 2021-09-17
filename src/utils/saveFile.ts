import path = require('path');
import fs = require('fs');

// 指定パスがディレクトリか判定
export const isDirectory = (target: string): boolean => {
  try {
    return fs.statSync(target).isDirectory();
  } catch (error) {
    return false;
  }
};

// 指定パスがファイルか判定
export const isFile = (target: string): boolean => {
  try {
    return fs.statSync(target).isFile();
  } catch (error) {
    return false;
  }
};

// saveFileDir: /assets/image/
export function saveFile(saveFileDir: string, saveFileName: string, data: any): boolean {
  const dirPath = path.join(process.cwd(), saveFileDir);
  if (!fs.existsSync(dirPath)) {
    console.log('save dir path not found!!');
    fs.mkdirSync(dirPath);
  }

  const savePath = `${dirPath}/${saveFileName}`;
  try {
    if (isFile(savePath)) {
      fs.unlinkSync(savePath);
    }

    fs.writeFileSync(savePath, JSON.stringify(data, undefined, 2), 'utf-8');
    if (Array.isArray(data)) {
      console.log(`passed data for ${saveFileName} is array and the length is ...`, data.length);
    } else if (typeof data === 'object') {
      console.log(`passed data for ${saveFileName} isNot array But object`);
    } else {
      console.log(`passed data for ${saveFileName} is array Nor object`);
    }
    return true;
  } catch (error) {
    console.error('Erorr occured during saving a file!');
    console.error(error);
    return false;
  }
}
