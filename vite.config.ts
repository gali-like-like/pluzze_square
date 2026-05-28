import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver' // 引入解析器
import Icons from 'unplugin-icons/vite' // 引入图标插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
     AutoImport({
      resolvers: [ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true, // 自动安装缺失的图标包
    }),
  ],
  
})
