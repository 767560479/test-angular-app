import { AbstractControl, FormControl, FormGroup, FormArray } from '@angular/forms';
import { isString, isArray } from 'util';
import { environment } from 'src/environments/environment';
import { NETWORK_CONFIG } from '../network/network.config';
import * as CryptoJS from 'crypto-js/crypto-js';


export function deepCopy(source: any, target: any) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source.length && source.length > 0) {
        target[key] = {};
        deepCopy(source[key], target[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
}

export function isEmpty(obj: any) {
  return obj === undefined || obj === null || (isString(obj) && obj.trim().length === 0);
}

export function isNotEmpty(obj: any) {
  return !isEmpty(obj);
}

export function toString(value: string | any): string {
  return isEmpty(value) ? '' : value.toString();
}

export function toBoolean(value: boolean | string) {
  return value === '' || (value && value !== 'false');
}


/**
 * 过滤特殊字符
 * @param source 过滤原字符串
 */
export function filterSpecialChar(source: object): string {
  if (!source) {
    return '';
  }
  const sourceString = source.toString();
  let sourceStringCode = '';
  let index = 0;
  let sourceStringTemp = '';
  // 处理回车符和制表符
  for (let i = 0; i < sourceString.length; i++) {
    if (sourceString.charCodeAt(i) === 10 || sourceString.charCodeAt(i) === 9) {
      sourceStringCode = sourceStringCode + sourceString.substring(index, i);
      index = i + 1;
    }
  }
  sourceStringCode = sourceStringCode + sourceString.substring(index, sourceString.length);
  const temp = sourceStringCode.split('\\');
  if (temp.length === 0) {
    return sourceStringCode;
  }
  // 处理转义符
  for (let i = 0; i < temp.length; i++) {
    if (i === temp.length - 1) {
      sourceStringTemp = sourceStringTemp + temp[i];
    } else {
      sourceStringTemp = sourceStringTemp + temp[i] + '\\\\';
    }
  }
  return sourceStringTemp;
}

// 判断字符串字节长度 汉字及全角符号占3
function calcByteLength(str: string, num: number = 3) {
  if (str === null || str === undefined) {
    return 0;
  }
  let nstr = '';
  while (num > 0) {
    nstr += '0';
    num--;
  }
  return (str + '').replace(/[^\x00-\xff]/g, nstr).length;
}

/**
 * 长度超过length截取前length个字节
 * @params value
 * @params length
 * @params num  一个汉字占几个字节
 */
export function cutString(value: string, length: number, num: number = 3): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (!isString(value)) {
    console.error('cutString 只支持string类型,' + value + '不是string类型');
    return value;
  }
  if (value.length > length) {
    value = value.substring(0, length);
  }
  let l: number;
  while ((l = calcByteLength(value, num)) > length) {
    value = value.substring(0, value.length - Math.ceil((l - length) / num));
  }
  return value;
}

/**
 * 格式化日期
 * @params date
 * @params fmt
 */
export function formatDate(date: Date, fmt: string = 'yyyy-MM-dd') {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 日期+天数得到新日期
 * @param date 日期
 * @param days 天数
 */
export function addDate(date: string | number | Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  const m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}


/**
 * 将表单组件标记为已操作
 * @params form 表单
 */
export function makeFormDirty(form: AbstractControl) {
  const controls = (<FormGroup>form).controls;
  Object.keys(controls).forEach(key => {
    const obj = controls[key];
    if (obj instanceof FormControl) {
      obj.markAsDirty();
      obj.updateValueAndValidity();
    } else if (obj instanceof FormArray) {
      obj.controls.forEach(sonCon => {
        makeFormDirty(sonCon);
      });
    }
  });
}


export function getAgent() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows') > -1) {
    if (userAgent.indexOf('Windows NT 10.0') > -1) {// Windows 10
      return checkBrowser(userAgent, 'win', '10.0'); // 判断浏览器
    } else if (userAgent.indexOf('Windows NT 6.4') > -1) {// Windows 10
      return checkBrowser(userAgent, 'win', '10'); // 判断浏览器
    } else if (userAgent.indexOf('Windows NT 6.3') > -1) {// Windows 8
      return checkBrowser(userAgent, 'win', '8.1'); // 判断浏览器
    } else if (userAgent.indexOf('Windows NT 6.2') > -1) {// Windows 8
      return checkBrowser(userAgent, 'win', '8'); // 判断浏览器
    } else if (userAgent.indexOf('Windows NT 6.1') > -1) {// Windows 7
      return checkBrowser(userAgent, 'win', '7');
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {// Windows Vista
      return checkBrowser(userAgent, 'win', 'Vista');
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {// Windows XP x64 Edition
      return checkBrowser(userAgent, 'win', 'XP');
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {// Windows XP
      return checkBrowser(userAgent, 'win', 'XP');
    }
  } else if (userAgent.indexOf('Mac OS X') > -1) {
    if (userAgent.indexOf('iPhone') > -1) {
      return checkBrowser(userAgent, 'Mac', 'iPhone');
    } else if (userAgent.indexOf('iPad') > -1) {
      return checkBrowser(userAgent, 'Mac', 'iPad');
    } else {
      return checkBrowser(userAgent, 'Mac', 'else');
    }
  } else if (userAgent.indexOf('Android') > -1) {
    return checkBrowser(userAgent, 'Android', '');
  }
}

function checkBrowser(userAgent, os, osversion) {
  let temp, bversion;
  if (userAgent.indexOf('Chrome') > -1) {
    if (userAgent.indexOf('OPR') > -1) {
      temp = userAgent.substring(userAgent.indexOf('OPR/') + 4);
      // 拿到User Agent String "Chrome/" 之后的字符串,结果形如"24.0.1295.0 Safari/537.15"或"24.0.1295.0"
      bversion = temp.substring(0, 2);
      return UserAgent('opera', bversion, os, osversion);
    } else {
      temp = userAgent.substring(userAgent.indexOf('Chrome/') + 7);
      // 拿到User Agent String "Chrome/" 之后的字符串,结果形如"24.0.1295.0 Safari/537.15"或"24.0.1295.0"
      bversion = temp.substring(0, 2);
      return UserAgent('Chrome', bversion, os, osversion);
    }
  } else if (userAgent.indexOf('Firefox') > -1) {
    temp = userAgent.substring(userAgent.indexOf('Firefox/') + 8);
    // 拿到User; Agent; String; 'Firefox/'; 之后的字符串, 结果形如; '16.0.1 Gecko/20121011'; 或; '16.0.1';
    bversion = temp.substring(0, 2);
    return UserAgent('Firefox', bversion, os, osversion);
  } else if (userAgent.indexOf('MSIE') > -1) {
    if (userAgent.indexOf('MSIE 10.0') > -1) {// IE 10
      return UserAgent('IE', '10', os, osversion);
    } else if (userAgent.indexOf('MSIE 9.0') > -1) {// IE 9
      return UserAgent('IE', '9', os, osversion);
    } else if (userAgent.indexOf('MSIE 8.0') > -1) {// IE 8
      return UserAgent('IE', '8', os, osversion);
    } else if (userAgent.indexOf('MSIE 7.0') > -1) {// IE 7
      return UserAgent('IE', '7', os, osversion);
    } else if (userAgent.indexOf('MSIE 6.0') > -1) {// IE 6
      return UserAgent('IE', '6', os, osversion);
    }
  } else if (userAgent.indexOf('Edge') > -1) { // IE Edge
    return UserAgent('IE', 'Edge', os, osversion);
  } else if (userAgent.indexOf('Trident/7.0') > -1) { // IE 11
    return UserAgent('IE', '11', os, osversion);
  } else if (userAgent.indexOf('Version') > -1 && userAgent.indexOf('Safari') > -1) {
    temp = userAgent.substring(userAgent.indexOf('Safari/') + 7);
    bversion = temp.substring(0, 2);
    return UserAgent('Safari', bversion, os, osversion);
  }
}

function UserAgent(browser, browserversion, os, osversion) {
  return {
    os: os,
    osv: osversion,
    br: browser,
    brv: browserversion
  };
}

/**
 * 获取分页数
 * @param total 总数
 * @param pageSize 每页大小
 */
export function GetInter(total: any, pageSize: any) {
  const pageTotal = Math.ceil(total / pageSize);
  return pageTotal;
}

// 加密方法
export function encryptedDES(data) {
  const keyHex = CryptoJS.enc.Utf8.parse(NETWORK_CONFIG.DESKey);
  // 模式为ECB padding为Pkcs7
  const encrypted = CryptoJS.DES.encrypt(data, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  // 加密出来是一个16进制的字符串
  return encrypted.ciphertext.toString();
}

// 解密方法

export function decryptedDES(data) {
  const keyHex = CryptoJS.enc.Utf8.parse(NETWORK_CONFIG.DESKey);
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(data)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  // 以utf-8的形式输出解密过后内容
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * 显示数据总量和当前数据范围获取当前页面
 * @param rang 数据范围
 * @param pageSize 页大小
 */
export function GetCurrentPage(rang: Array<any>, pageSize: number) {
  return Math.floor(rang[0] / pageSize) + 1;
}

/**
 * 创建blob对象，并利用浏览器打开url进行下载
 * @param data 文件流数据
 * @param fileName  文件名称
 * @param contentType 文件类型
 */
export function downloadFile(data, fileName, contentType) {
    const blob = new Blob([data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    // 打开新窗口方式进行下载
    // 以动态创建a标签进行下载
    if (window.navigator.msSaveBlob) {    // for ie 10 and later
      try {
        window.navigator.msSaveBlob(blob, fileName);
      } catch (e) {
        this.message.showErrorMessage(e);
      }
    } else { // 其他浏览器
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // 设置行为为下载而不是预览
      const evt = document.createEvent('MouseEvents'); // 解决firefox手动触发点击事件无效
      evt.initEvent('click', true, true);
      a.dispatchEvent(evt);
      window.URL.revokeObjectURL(url);
    }
}
