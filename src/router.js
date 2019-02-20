import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './util/token'

Vue.use(Router)

let router = new Router({
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './components/login/login'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: () =>
        import(/* webpackChunkName: "retrieve" */ './components/retrieve/retrieve'),
      meta: {
        requiresAuth: false
      }
    },
    // 公告详情
    {
      path: '/gdetails/:name',
      name: 'gdetails',
      component: () =>
        import(/* webpackChunkName: "gdetails" */ './components/gdetails/gdetails'),
      meta: {
        requiresAuth: false
      }
    },
    // announcement
    {
      path: '/announcement',
      name: 'announcement',
      component: () =>
        import(/* webpackChunkName: "announcement" */ './components/announcement/announcement'),
      meta: {
        requiresAuth: false
      }
    },
    // 游戏规则
    {
      path: '/guize',
      name: 'guize',
      component: () =>
        import(/* webpackChunkName: "guize" */ './components/guize/guize'),
      meta: {
        requiresAuth: false
      }
    },
    // 红包扫雷游戏规则
    {
      path: '/rules',
      name: 'rules',
      component: () =>
        import(/* webpackChunkName: "rules" */ './components/rules/rules'),
      meta: {
        requiresAuth: false
      }
    },
    // 红包接龙游戏规则
    {
      path: '/rulesone',
      name: 'rulesone',
      component: () =>
        import(/* webpackChunkName: "rulesone" */ './components/rulesone/rulesone'),
      meta: {
        requiresAuth: false
      }
    },
    // clearance  扫雷
    {
      path: '/clearance',
      name: 'clearance',
      component: () =>
        import(/* webpackChunkName: "clearance" */ './components/clearance/clearance'),
      meta: {
        requiresAuth: false
      }
    },
    // 红包接龙  solitaire
    {
      path: '/solitaire',
      name: 'solitaire',
      component: () =>
        import(/* webpackChunkName: "solitaire" */ './components/solitaire/solitaire'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/clearance',
      name: 'clearance',
      component: () =>
        import(/* webpackChunkName: "clearance" */ './components/clearance/clearance'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/register/register'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () =>
        import(/* webpackChunkName: "index" */ './components/index/index'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/register/register'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () =>
        import(/* webpackChunkName: "task" */ './components/task/task'),
      meta: {
        requiresAuth: false
      },
      children: [
        { path: '', redirect: 'commission' },
        {
          path: 'commission',
          name: 'commission',
          component: () =>
            import(/* webpackChunkName: "commission" */ './components/task/childer/commission'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'profit',
          name: 'profit',
          component: () =>
            import(/* webpackChunkName: "profit" */ './components/task/childer/profit'),
          meta: {
            requiresAuth: false
          }
        },
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      component: () =>
        import(/* webpackChunkName: "personal" */ './components/personal/personal'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/myhone',
      name: 'myhone',
      component: () =>
        import(/* webpackChunkName: "myhone" */ './components/myhome/myhone'),
      meta: {
        requiresAuth: false
      }
    },
    // 修改个人资料
    {
      path: '/gaidata',
      name: 'gaidata',
      component: () =>
        import(/* webpackChunkName: "gaidata" */ './components/data/gaidata'),
      meta: {
        requiresAuth: false
      }
    },
    // 玩家福利
    {
      path: '/welfare',
      name: 'welfare',
      component: () =>
        import(/* webpackChunkName: "welfare" */ './components/welfare/welfare'),
      meta: {
        requiresAuth: false
      },
      // children: [
      //   { path: '', redirect: 'envelope' },
      //   {
      //     path: 'envelope',
      //     name: 'envelope',
      //     component: () =>
      //       import(/* webpackChunkName: "register" */ './components/welfare/childer/envelope.vue'),
      //     meta: {
      //       requiresAuth: false
      //     }
      //   },
      //   {
      //     path: 'nvelope',
      //     name: 'nvelope',
      //     component: () =>
      //       import(/* webpackChunkName: "register" */ './components/welfare/childer/nvelope.vue'),
      //     meta: {
      //       requiresAuth: false
      //     }
      //   },
      // ]
    },
    // xiugaiali
    {
      path: '/xiugaiali/:id',
      name: 'xiugaiali',
      component: () =>
        import(/* webpackChunkName: "xiugaiali" */ './components/zhifubao/xiugaiali.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // Transferrecord
    {
      path: '/Transferrecord',
      name: 'Transferrecord',
      component: () =>
        import(/* webpackChunkName: "Transferrecord" */ './components/Transferrecord/Transferrecord.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 红包扫雷  Mineclearance
    {
      path: '/Mineclearance/:biaoshi',
      name: 'Mineclearance',
      component: () =>
        import(/* webpackChunkName: "Mineclearance" */ './components/Mineclearance/Mineclearance.vue'),
      meta: {
        requiresAuth: false
      }
    },
    //  塞红包  saihongb
    {
      path: '/saihongb',
      name: 'saihongb',
      component: () =>
        import(/* webpackChunkName: "saihongb" */ './components/saihongb/saihongb.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // redenvelope  红包详情请
    {
      path: '/redenvelope/:id',
      name: 'redenvelope',
      component: () =>
        import(/* webpackChunkName: "redenvelope" */ './components/redenvelope/redenvelope.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 客服 Customerservice
    {
      path: '/Customerservice',
      name: 'Customerservice',
      component: () =>
        import(/* webpackChunkName: "Customerservice" */ './components/Customerservice/Customerservice.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 红包记录  envelopetorecord
    {
      path: '/envelopetorecord',
      name: 'envelopetorecord',
      component: () =>
        import(/* webpackChunkName: "envelopetorecord" */ './components/envelopetorecord/envelopetorecord.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/zhifupassworld',
      name: 'zhifupassworld',
      component: () =>
        import(/* webpackChunkName: "zhifupassworld" */ './components/zhifupassworld/zhifupassworld.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 人工充值
    {
      path: '/rengong',
      name: 'rengong',
      component: () =>
        import(/* webpackChunkName: "rengong" */ './components/rengong/rengong.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 代理商
    {
      path: '/agent',
      name: 'agent',
      component: () =>
        import(/* webpackChunkName: "agent" */ './components/agent/agent'),
      meta: {
        requiresAuth: false
      }
    },
    // set
    {
      path: '/Set',
      name: 'Set',
      component: () =>
        import(/* webpackChunkName: "Set" */ './components/Set/Set.vue'),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/gaipassword',
      name: 'gaipassword',
      component: () =>
        import(/* webpackChunkName: "gaipassword" */ './components/gaipassword/gaipassword.vue'),
      meta: {
        requiresAuth: false
      }
    },

    // 个人资料
    {
      path: '/data',
      name: 'data',
      component: () =>
        import(/* webpackChunkName: "data" */ './components/data/data'),
      meta: {
        requiresAuth: false
      }
    },
    // 提现  withdrawal
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () =>
        import(/* webpackChunkName: "withdrawal" */ './components/withdrawal/withdrawal'),
      meta: {
        requiresAuth: false
      }
    },
    // 推荐
    {
      path: '/cardy',
      name: 'cardy',
      component: () =>
        import(/* webpackChunkName: "cardy" */ './components/card/card'),
      meta: {
        requiresAuth: false
      }
    },
    // advertising
    {
      path: '/advertising',
      name: 'advertising',
      component: () =>
        import(/* webpackChunkName: "advertising" */ './components/advertising/advertising'),
      meta: {
        requiresAuth: false
      }
    },
    // 添加银行卡
    {
      path: '/add',
      name: 'add',
      component: () =>
        import(/* webpackChunkName: "add" */ './components/advertising/add'),
      meta: {
        requiresAuth: false
      }
    },
    // Promotionposter 
    {
      path: '/Promotionposter',
      name: 'Promotionposter',
      component: () =>
        import(/* webpackChunkName: "Promotionposter" */ './components/Promotionposter/Promotionposter'),
      meta: {
        requiresAuth: false,
        title: '我的世界'
      }
    },
    // 我的推荐
    {
      path: '/myrecommendation',
      name: 'myrecommendation',
      component: () =>
        import(/* webpackChunkName: "myrecommendation" */ './components/myrecommendation/myrecommendation'),
      meta: {
        requiresAuth: false
      }
    },
    // redenvelope
    // zhifubao
    {
      path: '/zhifubao',
      name: 'zhifubao',
      component: () =>
        import(/* webpackChunkName: "zhifubao" */ './components/zhifubao/zhifubao'),
      meta: {
        requiresAuth: false
      }
    },
    // 添加支付宝
    {
      path: '/addzhifubao',
      name: 'addzhifubao',
      component: () =>
        import(/* webpackChunkName: "addzhifubao" */ './components/zhifubao/addzhifu.vue'),
      meta: {
        requiresAuth: false
      }
    },
    // 修改
    {
      path: '/xiugai/:id',
      name: 'xiugai',
      component: () =>
        import(/* webpackChunkName: "xiugai" */ './components/advertising/xiugai'),
      meta: {
        requiresAuth: false
      }
    },
    // 签到
    {
      path: '/Sign',
      name: 'Sign',
      component: () =>
        import(/* webpackChunkName: "Sign" */ './components/Sign/Sign'),
      meta: {
        requiresAuth: false
      }
    },
    // 充值
    {
      path: '/topup',
      name: 'topup',
      component: () =>
        import(/* webpackChunkName: "topup" */ './components/topup/topup'),
      meta: {
        requiresAuth: false
      }
    },
    // record
    {
      path: '/record',
      name: 'record',
      component: () =>
        import(/* webpackChunkName: "record" */ './components/record/record'),
      meta: {
        requiresAuth: false
      },
      children: [
        { path: '', redirect: 'chongzhi' },
        {
          path: 'chongzhi',
          name: 'chongzhi',
          component: () =>
            import(/* webpackChunkName: "chongzhi" */ './components/record/childer/chongzhi.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'zhifu',
          name: 'zhifu',
          component: () =>
            import(/* webpackChunkName: "zhifu" */ './components/record/childer/zhifu'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'zhuangzhang',
          name: 'zhuangzhang',
          component: () =>
            import(/* webpackChunkName: "zhuangzhang" */ './components/record/childer/zhuangzhang'),
          meta: {
            requiresAuth: false
          }
        },
        // envelope
        {
          path: 'tixian',
          name: 'tixian',
          component: () =>
            import(/* webpackChunkName: "tixian" */ './components/record/childer/tixian'),
          meta: {
            requiresAuth: false
          }
        },


      ]
    },
    // 人工充值修改页面  renggongg  以前的 路由是 rengong
    {
      path: '/renggongg',
      name: 'renggongg',
      component: () =>
        import(/* webpackChunkName: "renggongg" */ './components/rengongg/renggongg'),
      meta: {
        requiresAuth: false
      }
    },
    // 发包详情 Contractdetails
    {
      path: '/Contractdetails',
      name: 'Contractdetails',
      component: () =>
        import(/* webpackChunkName: "Contractdetails" */ './components/Contractdetails/Contractdetails'),
      meta: {
        requiresAuth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!getToken()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    console.log(to.matched)
    next()
  }
})

export default router
