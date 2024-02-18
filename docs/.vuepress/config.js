module.exports = {
    base:'/bigdata/',
    title: '大数据文档',
    description: '大数据文档',
    markdown: {
        lineNumbers: true,
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"))
        },
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },
    plugins: [
        ['@vuepress/back-to-top'],
        ['@vuepress/active-header-links'],
        ['vuepress-plugin-code-copy', true],
        "@vuepress/nprogress",
        ["@vuepress/plugin-medium-zoom"],
        [
            '@vuepress/last-updated', // "上次更新"时间格式
            {
                transformer: (timestamp, lang) => {
                    const dayjs = require('dayjs') // https://day.js.org/
                    return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
                },
            }
        ],
        [
            '@vssue/vuepress-plugin-vssue',
            {
                platform: 'github', //v3的platform是github，v4的是github-v4
                locale: 'zh', //语言
                // 其他的 Vssue 配置
                owner: 'feihua', //github 账户名或组织名
                repo: 'bigdata', //github 一个项目的名称
                clientId: '5e975013e1a17abdcc6a',//注册的 Client ID
                clientSecret: 'af4fc8ba85b7726adda6d613388012d0be6f25aa',//注册的 Client Secret
                autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
            },
        ],
    ],
    head: [
        // 设置 favor.ico，docs/.vuepress/public 下
        [
            'link', {rel: 'icon', href: '/images/logo.png'}
        ],
    ],
    themeConfig: {
        logo: '/images/logo1.png',// 注意图片放在 public 文件夹下
        nav: [
            {text: '首页', link: '/'},
            {text: 'hadoop文档', link: '/hadoop/'},
            {text: 'kafka文档', link: '/kafka/'},
            {text: 'flume文档', link: '/flume/'},
            {text: 'maxwell文档', link: '/maxwell/'},
        ],
        sidebarDepth: 3,
        lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)
        repo: 'feihua/zero-admin', // 导航栏右侧生成Github链接
        sidebar: {
            "/summary/": [""], //这样自动生成对应文章
            '/hadoop/': [
                '',
                'jdk',
                'install',
                'cluster'
            ],
            '/kafka/': [
                '',
                'install',
                'cluster'
            ],
            '/flume/': [
                '',
                'install',
                'cluster'
            ],
            '/maxwell/': [
                '',
                'install',
                'cluster'
            ],


        }
    },
}
