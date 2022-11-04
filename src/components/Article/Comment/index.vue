<template>
	<!-- v-if 控制数据没加载进入时，不显示，防止动画过渡时出现突变内容 -->
	<div ref="commentHead" v-if="data.pageInfo.current_page">
		<div class="headline">
			<p>共有 {{ data.commentList.length }} 条评论</p>
		</div>
		<Reply :id="data.commentRootId"></Reply>
		<div class="comment" v-for="comment in data.commentList" :key="comment.id">
			<CommentCard
				:name="comment.people.name"
				:avatar="comment.people.avatar"
				:website="comment.people.website"
				:datetime="comment.createdAt"
				:content="comment.content"
				replyToWhom=""
				:id="comment.id"
				:level="comment.level"
				:isFocus="comment.isFocus"
				:changeParentCommentOffsetTop="changeParentCommentOffsetTop"
			></CommentCard>
			<div class="comment-nest" v-for="secondaryComment in comment.secondaryComment" :key="secondaryComment.id">
				<CommentCard
					:name="secondaryComment.people.name"
					:avatar="secondaryComment.people.avatar"
					:website="secondaryComment.people.website"
					:datetime="secondaryComment.createdAt"
					:content="secondaryComment.content"
					:replyToWhom="secondaryComment.replyToWhom"
					:id="secondaryComment.id"
					:level="secondaryComment.level"
					:ref="secondaryComment.level"
					:isFocus="secondaryComment.isFocus"
					:changeParentCommentOffsetTop="changeParentCommentOffsetTop"
					@onFocus="onFocus"
					@outFocus="outFocus"
					@moveToParentComment="moveToParentComment"
				></CommentCard>
			</div>
		</div>
		<!-- 分页器，只有 1 页时隐藏分页器 -->
		<div class="pagination">
			<el-pagination
				class="custom-class"
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:page-count="data.pageInfo.total_page || 0"
				:total="data.pageInfo.total || 0"
				:hide-on-single-page="true"
			/>
		</div>
	</div>
</template>

<script setup>
import Reply from './Reply/index.vue'
import CommentCard from './CommentCard/index.vue'
import API from '@/api/index'
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref, nextTick } from 'vue'

const props = defineProps({
	articleRouteName: String,
})
// 获取评论组件的头部，用于切换评论页面时滚动到页面到头部
const commentHead = ref(null)

const data = reactive({
	commentList: [],
	pageInfo: {},
	commentRootId: 0,
	// 存储父评论节点的 offsetTop 数据
	parentCommentOffsetTop: 0,
	// 收集当前页码
	currentPage: 1,
})

const router = useRouter()
// 请求获取评论数据
const getComment = async function (page = 1) {
	try {
		let result = await API.blog.reqComment(page, props.articleRouteName)
		data.commentList = result.data
		data.pageInfo = result.meta
		data.commentRootId = result.commentRootId
		// 处理 data ，把回复谁 replyToWhom 属性和 isFocus 属性添加进去
		for (const comment of data.commentList) {
			comment['isFocus'] = false
			for (const secondaryComment of comment.secondaryComment) {
				if (secondaryComment.parentId === comment.id) {
					secondaryComment['replyToWhom'] = comment.people.name
				} else {
					// 时间复杂度 O(n) =  n
					secondaryComment['replyToWhom'] = comment.secondaryComment.find((item) => secondaryComment.parentId === item.id).people.name
				}
				secondaryComment['isFocus'] = false
			}
		}
	} catch (error) {
		router.push('/404')
	}
}

onMounted(() => {
	getComment(1)
})

// 分页器点击页数时发起获取文章请求,同时页面滑动到顶部评论
const handleCurrentChange = async function (page) {
	// ** 加 await 使得数据请求完页面发生完变化才发生滚动
	// console.log(commentHead.value.offsetHeight, document.body.clientHeight, commentHead.value.offsetTop)
	await getComment(page)

	// console.log('数据请求完了')
	await nextTick()

	// scrollIntoComment(commentHead.value, window)
	window.scrollTo({
		top: commentHead.value.offsetTop + 200,
		left: 0,
		behavior: 'smooth',
	})
}

// 子评论传回来需要修改对应控制父评论样式的 isFocus 属性
const onFocus = function (level) {
	let parentComment = findParentCommentByLevel(level)
	parentComment.isFocus = true
}
const outFocus = function (level) {
	let parentComment = findParentCommentByLevel(level)
	parentComment.isFocus = false
}
// 根据 level 查找返回对应的父 Comment
const findParentCommentByLevel = function (level) {
	const levelArr = level.split('.')
	const comment = data.commentList.find((comment) => comment.level === levelArr[0])
	// 如果是第二层级评论，则返回第一层级的评论，否则在 secondaryComment 找父评论
	if (levelArr.length === 2) {
		return comment
	} else {
		return comment.secondaryComment.find((comment) => comment.level === levelArr.slice(0, levelArr.length - 1).join('.'))
	}
}

// 当鼠标停留在所回复人时，会获取该评论的所回复评论，即父评论的节点 offsetTop 信息
const changeParentCommentOffsetTop = function (offsetTop) {
	data.parentCommentOffsetTop = offsetTop
}
// 页面文档移动到父评论的位置
const moveToParentComment = function () {
	window.scrollTo({
		top: data.parentCommentOffsetTop,
		left: 0,
		behavior: 'smooth',
	})
}
</script>

<style scoped lang="less">
.headline {
	margin-top: 2.5rem;
	padding-left: 0.75em;
	border-left: 2px solid var(--comment-sum-left-border);
}

.comment {
	.comment-nest {
		margin-left: 24px;
	}
}

.pagination {
	display: flex;
	justify-content: center;

	.custom-class {
		--el-pagination-button-color: var(--font);
		--el-pagination-button-disabled-bg-color: var(--background);
		--el-pagination-bg-color: var(--background);
		--el-pagination-hover-color: var(--pagination-hover);
		--el-pagination-text-color: var(--pagination-font);
		--el-pagination-font-size: 16px;
	}
}
</style>
