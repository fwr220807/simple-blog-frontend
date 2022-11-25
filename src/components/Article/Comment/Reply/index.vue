<template>
	<div class="reply-box">
		<form @submit.prevent="onSubmit">
			<div class="visitor">
				<span class="input">
					<font-awesome-icon icon="fa-regular fa-circle-user" />
					<input name="name" type="text" placeholder="昵称 *" v-model="name" />
					<span v-if="disabled" class="err-message" v-for="message in nameErrors" :key="message">{{ message
					}}</span>
				</span>
				<span class="input">
					<font-awesome-icon icon="fa-regular fa-envelope" />
					<input name="email" type="text" placeholder="邮箱 *" v-model="email" />
					<span v-if="disabled" class="err-message" v-for="message in emailErrors" :key="message">{{ message
					}}</span>
				</span>
				<span class="input">
					<font-awesome-icon icon="fa-regular fa-map" />
					<input name="website" type="text" placeholder="网站 https?://" v-model="website" />
					<span v-if="disabled" class="err-message" v-for="message in websiteErrors" :key="message">{{ message
					}}</span>
				</span>
			</div>
			<div class="reply">
				<textarea name="content" maxlength="500" ref="textarea" rows="4" placeholder="你看看我嘛ヽ\(・∀・\)ﾉ 留个评论好不好～"
					v-model="content"></textarea>
				<span v-if="disabled" class="err-message" v-for="message in contentErrors" :key="message">{{ message
				}}</span>
			</div>
			<div class="btn">
				<el-tooltip class="box-item" effect="dark" content="评论可能需要审核，审核通过后才会显示" placement="bottom-start"
					:manual="true">
					<span class="info" ref="btn">
						<font-awesome-icon icon="fa-regular fa-circle-question" />
					</span>
				</el-tooltip>
				<button class="submit-btn" :class="{ shake: disabled }">发送</button>
			</div>
		</form>
		<!-- 回复确认弹窗 -->
		<el-dialog v-model="dialogVisible" title="Tips" width="30%">
			<p>评论可能需要审核，站长审核通过后才会显示，确认发送吗？</p>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="express"> 确认 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import { string, object, setLocale } from 'yup'
import { nextTick, ref, watch } from 'vue'
// 使用按需引入的 ElMessage 需要手动引入样式
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import API from '@/api/index'
import { useRoute } from 'vue-router'
import { throttle } from 'lodash'

const props = defineProps({
	id: Number,
	isFocus: {
		type: Boolean,
		default: false,
	},
})

const textarea = ref(null)
// 监听父组件的回复组件的展开情况，展开时则把焦点聚焦到回复框 textarea 上
watch(
	() => props.isFocus,
	(value) => {
		if (value) {
			nextTick(() => {
				textarea.value.focus()
			})
		}
	}
)

const emits = defineEmits(['closeReply'])

// 初始化弹窗默认显示
const dialogVisible = ref(false)

const route = useRoute()

const express = async function () {
	let result = await API.blog.reqAddComment(route.params.articleRouteName, {
		name: name.value,
		email: email.value,
		website: website.value,
		content: content.value,
		parentId: props.id,
	})
	if (result.data) {
		ElMessage({
			message: '评论发送成功',
			type: 'success',
		})
		// 清除表单内容
		resetForm()
		// 折叠回复
		emits('closeReply')
	} else {
		ElMessage.error('评论发送失败，请稍后重试')
	}
	dialogVisible.value = false
}

// 警示错误的表单验证和控制错误信息的显示，进行节流处理
const disabled = ref(false)
const warnDisabled = throttle(
	function () {
		disabled.value = true
		setTimeout(() => {
			disabled.value = false
		}, 2500)
	},
	3000,
	{ trailing: false }
)

function onInvalidSubmit() {
	warnDisabled()
}
// 本地化表单出错时的描述
setLocale({
	mixed: {
		required: '亲，这个信息忘填了哟～',
	},
	string: {
		min: '亲，评论最少需要 ${min} 个字哦～',
		url: '亲，请填写正确格式的 url 地址～',
		email: '亲，请填写正确格式的邮箱地址～',
	},
})
// 表单的验证规则
const schema = object().shape({
	name: string().required(),
	email: string().required().email(),
	website: string().url().nullable(),
	content: string().required().min(8),
})

const { handleSubmit, resetForm } = useForm({
	validationSchema: schema,
})

// 校验表单
const onSubmit = handleSubmit(() => {
	dialogVisible.value = true
}, onInvalidSubmit)

const { value: name, errors: nameErrors } = useField('name')
const { value: email, errors: emailErrors } = useField('email')
const { value: website, errors: websiteErrors } = useField('website')
const { value: content, errors: contentErrors } = useField('content')
</script>

<style scoped lang="less">
.reply-box {
	margin-top: 1rem;
	margin-bottom: 1rem;

	.visitor {
		display: flex;
		justify-content: space-between;
		margin: 12px 0 24px 0;

		.input {
			position: relative;
			display: flex;
			align-items: center;
			width: 100%;
			padding: 4px 11px;
			border: 1px solid var(--border);
			// transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;

			svg[class*='fa-'] {
				// position: relative;
				display: inline-block;
				margin-right: 4px;
			}

			input {
				width: 100%;
				font-size: 16px;
				background-color: transparent;
			}

			&:nth-child(2) {
				margin: 0 12px;
			}

			&:hover {
				border-color: var(--input-hover);
			}

			&:focus-within {
				border-color: var(--input-focus);
			}

			.err-message {
				position: absolute;
				top: -20px;
				left: 0%;
				border: none;
				font-size: 10px;
				color: var(--error-color);
				transition: 0.4s ease;
			}
		}
	}

	.reply {
		position: relative;
		padding: 4px 11px;
		border: 1px solid var(--border);
		// transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		textarea {
			width: 100%;
			padding: 0;
			font-size: 16px;
			line-height: 1.8;
			background-color: transparent;
			vertical-align: middle;
			resize: none;
			border: none;

			&:focus {
				outline: none;
			}
		}

		&:hover {
			border-color: var(--input-hover);
		}

		&:focus-within {
			border-color: var(--input-focus);
		}

		.err-message {
			position: absolute;
			top: -20px;
			left: 0%;
			border: none;
			font-size: 10px;
			color: var(--error-color);
		}
	}

	.btn {
		display: flex;
		justify-content: space-between;

		button {
			padding: 0.5em 1em;
			margin-top: 7px;
			border: 1px solid transparent;
			font-size: 16px;
			color: var(--white);
		}

		.info {
			// width: 3em;
			// height: 3em;
			margin-top: 7px;
			border: 1px solid transparent;
			font-size: 16px;
			line-height: 1.6;
			color: var(--white);
			padding: 0.4em 0.7em;
			background-color: var(--interaction);
			border-radius: 4em;
		}

		.submit-btn {
			background-color: var(--theme);
			border-radius: 1em;
		}
	}

	.shake {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
	}

	@keyframes shake {

		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
}

@media screen and (max-width: 768px) {
	.reply-box {
		.visitor {
			flex-direction: column;
			margin: 12px 0;

			.input {
				margin: 15px 0;

				&:nth-child(2) {
					margin: 0;
				}

				.err-message {
					top: -16px;
				}
			}
		}
	}
}
</style>
