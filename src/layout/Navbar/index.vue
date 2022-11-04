<template>
	<!-- 顶部导航栏 -->
	<nav>
		<a class="lights disable-user-select" @click="changeTheme"><font-awesome-icon icon="fa-regular fa-lightbulb" /></a>
		<!-- 屏幕宽度变小后变成的侧边栏，通过添加类名的方式实现过渡动画 -->
		<ul class="navbar-menu" :class="{ 'navbar-active': navbarStore.$state.isShowBurger }">
			<li><router-link to="/home" @click="check('/home')">Home</router-link></li>
			<li>
				<!-- 点击事件触发行为后停止往上冒泡 -->
				<a class="tags" @click.stop="navbarStore.changeIsShowTags"
					>Tags
					<font-awesome-icon class="icon" icon="fa-regular fa-circle" />
					<!-- 控制 tags 展开列表的动画，可以使用 transition -->
					<transition name="tags-click">
						<div v-if="navbarStore.$state.isShowTags">
							<font-awesome-icon class="icon" icon="fa-solid fa-circle" />
							<div class="sub-menu">
								<router-link
									v-for="category in categoriesStore.categoriesList"
									:key="category.id"
									:to="`/categories/${category.routeName}`"
									@click="check(`/categories/${category.routeName}`)"
									>{{ category.title }}</router-link
								>
							</div>
						</div>
					</transition>
				</a>
			</li>
			<li><router-link to="/about">About</router-link></li>
			<li>
				<el-tooltip class="box-item" effect="dark" content="敬请期待" placement="bottom-start">
					<a>Works</a>
				</el-tooltip>
			</li>
		</ul>
		<el-tooltip class="box-item" effect="dark" content="敬请期待" placement="bottom-start">
			<a class="search">
				<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
			</a>
		</el-tooltip>

		<!-- 屏幕宽度变小后变成的侧边栏的图标，通过添加类名的方式实现过渡动画 -->
		<div class="burger" :class="{ 'burger-active': navbarStore.$state.isShowBurger }" @click.stop="navbarStore.changeIsShowBurger">
			<div class="top-line"></div>
			<div class="middle-line"></div>
			<div class="bottom-line"></div>
		</div>
	</nav>
</template>

<script setup>
import { useCategoriesStore } from '@/store/categories'
import { useNavbarStore } from '@/store/navbar'
import { useThemesStore } from '@/store/themes'

import { useRoute } from 'vue-router'

const categoriesStore = useCategoriesStore()
const navbarStore = useNavbarStore()
navbarStore.$state.isShowBurger = false

// 控制 Home 和 Category 重复点自己的路由按钮时，默认进行的第一页请求
const route = useRoute()
const check = function (value) {
	if (value == route.path) {
		navbarStore.$state.getListFunction(1)
	}
}

// 控制深色模式的开关
// 逻辑: 默认跟随系统变化 -> 如果点击，则实现手动切换，以后每次打开都会按照这个切换的来
const ThemesStore = useThemesStore()
const changeTheme = function () {
	// 如果有回调函数，则取消监听
	ThemesStore.$state.callback && ThemesStore.removeListener()

	ThemesStore.changeTheme()
}
</script>

<style scoped lang="less">
nav {
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	width: 100vw;
	z-index: 99;
	font-size: 16px;
	color: var(--font);
	background-color: var(--light-transparent-background);
	border-bottom: 1px solid var(--border);
	// 增加毛玻璃的效果
	backdrop-filter: blur(20px) saturate(180%);
	/* CSS3 抗锯齿形 让文字显示的更加清晰 */
	-webkit-font-smoothing: antialiased;

	.fa-lightbulb,
	.fa-magnifying-glass {
		flex: 1;

		margin: 0 20px;
		font-size: 16px;
	}

	.navbar-menu {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;

		li {
			position: relative;
			padding: 0 15px;
			list-style: none;

			a {
				display: block;
				text-align: center;
			}

			.tags {
				position: relative;
				padding-right: 8px;

				.icon {
					position: absolute;
					top: 7px;
					right: -8px;
					margin-left: 4px;
					font-size: 12px;
				}

				.sub-menu {
					position: absolute;
					top: 37px;
					left: 16px;
					background-color: var(--light-background);
					white-space: nowrap;
					line-height: 2;
					border: 1px solid var(--border);
					padding: 5px 12px;
					border-radius: 0 0 4px 4px;
					box-shadow: 0px 0px 4px var(--light-font);
					// transition: 0.1s ease-in-out;

					&::before {
						content: '';
						display: block;
						position: absolute;
						top: -9px;
						left: 20px;
						width: 16px;
						height: 16px;
						background-color: var(--light-background);
						transform: rotate(-45deg);
						border: 1px solid;
						border-color: var(--border) var(--border) transparent transparent;
					}
				}
			}
		}
	}

	.burger {
		display: none;
		position: absolute;
		top: 13px;
		right: 30px;

		div {
			width: 25px;
			height: 2px;
			background-color: var(--font);
			margin: 4px;
		}
	}
}

@media screen and (max-width: 768px) {
	nav {
		// 去除毛玻璃的效果
		backdrop-filter: none;
		background-color: var(--light-background);

		.navbar-menu {
			position: absolute;
			top: 50px;
			right: 0px;
			width: calc(100vw / 3);
			height: calc(100vh - 50px);
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			background-color: var(--light-background);
			transition: 0.4s ease-in-out;
			// 默认不显示
			transform: translateX(100%);

			li {
				margin: 2vh auto;
				transition: 0.5s ease-in-out;
				text-align: left;
				// 默认不显示
				transform: translateX(100px);

				&:nth-child(2) {
					margin-bottom: 0;
				}

				&:nth-child(3) {
					margin-top: 0;
				}

				.tags {
					position: static;

					.icon {
						display: none;
					}

					.sub-menu {
						position: static;
						border: none;

						&::before {
							display: none;
						}

						a {
							position: relative;
							margin: 8px auto;
							&::before {
								content: '';
								position: absolute;
								top: 12px;
								left: -10px;
								width: 4px;
								height: 4px;
								border: 1px solid var(--font);
								border-radius: 4px;
							}
						}
					}
				}
			}
		}

		.fa-magnifying-glass {
			margin-right: 80px;
		}

		.burger {
			display: block;

			div {
				transition: 0.3s ease-in-out;
			}
		}
	}

	// 侧边栏按钮过渡之后的样式
	.burger-active {
		div {
			transition: 0.3s ease-in-out 0.3s;
		}

		.top-line {
			transform: rotate(45deg) translate(4px, 4px);
		}

		.bottom-line {
			transform: rotate(-45deg) translate(4px, -4px);
		}

		.middle-line {
			opacity: 0;
			transform: translateX(10px);
			transition: 0.3s ease-in-out;
		}
	}

	// 侧边栏过渡之后的样式
	.navbar-active {
		transform: translateX(0) !important;

		li {
			transform: translateX(0) !important;
		}
	}
}
</style>
