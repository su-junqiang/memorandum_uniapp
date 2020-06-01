import fly from '../../utils/fly.js';


//获取该用户所有文件列表
export function getData(payload) {
	return fly.post('/**',payload)
}
