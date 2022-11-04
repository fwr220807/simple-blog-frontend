<template>
	<div class="comment-card" :class="{ focus: isFocus }" ref="commentCard">
		<div class="avatar" ref="avatar"></div>
		<div class="content">
			<div class="content-author">
				<a class="name" :href="website || `javascript:void(0);`" :target="website ? '_blank' : ''">{{ name }}</a
				><span class="datetime">{{ datetime }}</span>
				<span class="datetime">#{{ level }}</span>
			</div>
			<div class="content-text">
				<p class="paragraph">
					<a
						class="replyToWhom"
						v-if="replyToWhom"
						@mouseover="$emit('onFocus', props.level)"
						@mouseout="$emit('outFocus', props.level)"
						@click="$emit('moveToParentComment')"
						>@{{ replyToWhom }}</a
					>{{ content }}
				</p>
			</div>
			<div class="content-reply-btn" @click="changeIsShowReply"><span v-if="!isShowRely">回复</span><span v-else>取消回复</span></div>
		</div>
	</div>
	<div class="reply"><Reply v-show="isShowRely" :id="id" @closeReply="isShowRely = !isShowRely" :isFocus="isShowRely"></Reply></div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import Reply from '../Reply/index.vue'

const props = defineProps({
	name: String,
	avatar: String,
	website: String,
	datetime: String,
	content: String,
	replyToWhom: String,
	id: Number,
	level: String,
	isFocus: Boolean,
	changeParentCommentOffsetTop: Function,
})

// 获取节点
const commentCard = ref(null)
// 如果 watch 检测到该元素为某评论的父元素且被子元素所指时 (即 props.isFocus 属性)，利用 changeParentCommentOffsetTop 将该元素的 offsetTop 回传给父组件
watch(
	() => props.isFocus,
	(value) => {
		if (value) {
			props.changeParentCommentOffsetTop(commentCard.value.offsetTop)
		}
	}
)
// onFocus 为当鼠标在 @某人 时发送的事件，使父评论高亮，outFocus 反之，moveToParentComment 为触发移动到该父评论的事件
defineEmits(['onFocus', 'outFocus', 'moveToParentComment'])

// 获取 avatar 的 DOM 节点
let avatar = ref(null)

onMounted(() => {
	avatar.value.style.backgroundImage = `url(${props.avatar})`
	avatar.value.style.backgroundSize = `contain`
})

let isShowRely = ref(false)

const changeIsShowReply = async function () {
	noScroll()
	isShowRely.value = !isShowRely.value
	await nextTick()
	canScroll()
}
//弹出框禁止滑动
const noScroll = function () {
	var mo = function (e) {
		e.preventDefault()
	}
	document.body.style.overflow = 'hidden'
	document.addEventListener('touchmove', mo, false) // 禁止页面滑动
}

//弹出框可以滑动
const canScroll = function () {
	var mo = function (e) {
		e.preventDefault()
	}
	document.body.style.overflow = '' // 出现滚动条
	document.removeEventListener('touchmove', mo, false)
}
</script>

<style scoped lang="less">
.comment-card {
	padding: 16px 0;
	display: flex;
	border-radius: 8px;
	font-size: 14px;

	.avatar {
		height: 40px;
		width: 40px;
		// background-color: pink;
		border-radius: 50%;
		margin-right: 12px;
		flex-shrink: 0;
		box-shadow: 0px 0px 8px 2px var(--light-font);
	}

	.content {
		.content-author {
			.name {
				padding-right: 10px;
				color: var(--font);
			}
			.datetime {
				padding-right: 10px;
			}
		}

		.content-text {
			.paragraph {
				margin: 1rem 0;
				color: var(--font);
				font-size: 16px;

				.replyToWhom {
					margin-right: 12px;
					color: var(--green);
				}
			}
		}

		.content-reply-btn {
			cursor: pointer;
			user-select: none;
			color: var(--font);
		}
	}
}
.reply {
	margin-left: 24px;
}
.focus {
	background-color: var(--light-transparent-theme);
	// background-color: #d2edee77;
	transition: 1s ease;
}
</style>
