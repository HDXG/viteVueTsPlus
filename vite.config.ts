import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from "path";
import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router','vuex'],
            //存放的位置
			dts: "src/auto-import.d.ts",
		}),
    Components({
			// 引入组件的,包括自定义组件
            // 存放的位置
      dts: "src/componentsTs.d.ts",
			resolvers: [
				ElementPlusResolver({
				  importStyle: false, // css in js
				}),
        IconsResolver({}),
			],
		}),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
  })
  ],
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
