/**
 * 网络请求返回的数据类型
 */
export class HttpData {
    code: string; // 响应状态码，'ok'表示成功，'error'表示失败，其他值默认失败
    requestid?: string; // 请求id
    data: any; // 响应数据
    message?: string; // 消息
    table?: Array<any>; // 数组
    total?: number; // 总数
}

/**
 * 网络请求表格数据的数据类型
 */
export class HttpTableData extends HttpData {
    data: {
        total: number; // 数据总数
        table: Array<{}>; // 表格数据
    };
}

/**
 * 网络请求地址及请求方式类型
 */
export class DfNetworkOptions {
    url: string; // 请求地址
    method: 'get' | 'post'; // 请求方式
}

/**
 * 请求接口的数据类型
 */
export class NetworkData {
    data: any; // 响应数据
}

/**
 * 请求接口的Data 结构
 */
export class NetworkTableData {
    pageNum?: number;  // 当前页码     [可选]
    pageSize?: number; // 页面显示数量  [可选]
    sortCriterias?: Array<{  // 排序
        attributeName?: string,   // 排序属性名称
        isDescending?: boolean     // 是否降序
    }>;
    filterCauses?: Array<{ // 搜索内容
        attributeName?: string,  // 搜索的字段
        attributeValue?: string, // 搜索的内容
    }>;
}


