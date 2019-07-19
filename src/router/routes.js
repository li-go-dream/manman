const Home = () => import('@/components/home')
const People = () => import('@/components/seting/people')
const Dictionary = () => import('@/components/seting/dictionary')

export default[
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        text: '监管与分析',
        ismenu: true
    },
    {
        path: '/seting',
        name: 'seting',
        text: '系统设置',
        ismenu: true,
        children:[
            {
                path: 'people',
                name: 'people',
                component: People,
                text: '人员权限管理'
            },
            {
                path: 'dictionary',
                name: 'dictionary',
                component: Dictionary,
                text: '字典管理'
            }
        ]
    }

]