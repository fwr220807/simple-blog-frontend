import request from '@/utils/request.js'

// 请求首页文章
export const reqHomeArticlesList = (page) =>
	request({
		url: '/article',
		method: 'get',
		params: { page },
	})

// 请求 category（tags） 列表
export const reqCategoriesList = () =>
	request({
		url: '/category',
		method: 'get',
	})

// 请求获取栏目文章
export const reqCategoryArticlesList = (page, routeName) =>
	request({
		url: '/article/category',
		method: 'get',
		params: { page, routeName },
	})

// 请求获取文章
export const reqArticle = (routeName) =>
	request({
		url: `/article/${routeName}`,
		method: 'get',
	})

// 请求添加文章
// export const reqAddArticle = (title, content, categoryId) =>
// 	request({
// 		url: `/article`,
// 		method: 'post',
// 		data: { title, content, categoryId },
// 	})

// 请求获取文章的评论
export const reqComment = (page, routeName) =>
	request({
		url: `/comment/${routeName}`,
		method: 'get',
		params: { page },
	})

// 请求添加文章评论
export const reqAddComment = (routeName, data) => {
	return request({
		url: `/comment/${routeName}`,
		method: 'post',
		data,
	})
}
