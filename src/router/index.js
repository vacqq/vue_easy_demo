import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import AllShow from '../components/counttable/AllShow'
import orderingAdd from '../components/counttable/OrderingAdd'
import orderingDelete from '../components/counttable/OrderingShow'
import orderingToPage from '../components/counttable/orderingToPage'
import readBookShow from '../components/readBook/readBook'
import readBookManage from '../components/readBook/readBookManage'
import readBookPage from '../components/readBook/readBookPage'
import workLogShow from '../components/workLog/workLog'
import workLogManage from '../components/workLog/workLogManage'
import workLogPage from '../components/workLog/workLogPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/library',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/ct/AllShow',
          name: 'AllShow',
          component: AllShow,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/orderingAdd',
      name: 'orderingAdd',
      component: orderingAdd
    },
    {
      path: '/orderingDelete',
      name: 'orderingDelete',
      component: orderingDelete
    },
    {
      path: '/ordering',
      name: 'orderingToPage',
      component: orderingToPage
    },
    {
      path: '/readBookShow',
      name: 'readBookShow',
      component: readBookShow
    },
    {
      path: '/readBookManage',
      name: 'readBookManage',
      component: readBookManage
    },
    {
      path: '/readBook',
      name: 'readBookPage',
      component: readBookPage
    },
    {
      path: '/workLogShow',
      name: 'workLogShow',
      component: workLogShow
    },
    {
      path: '/workLogManage',
      name: 'workLogManage',
      component: workLogManage
    },
    {
      path: '/workLog',
      name: 'workLog',
      component: workLogPage
    }
  ]
})
