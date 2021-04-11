import { Input, Params, Route } from './'
import { NoMatchingRouteError } from './errors'
import { isFunction } from './utils'

export class Router {
  /**
   * @param {Route[]} routes
   * @param routeInspector
   */
  constructor(routes, routeInspector = undefined) {
    this.routes = routes
    this.routeInspector = routeInspector || new RouteInspector()
  }

  // eslint-disable-next-line complexity
  processInput(input, lastRoutePath = null) {
    let routeParams = {}
    const lastRoute = this.getRouteByPath(lastRoutePath, this.routes)
    if (!lastRoute && input.path)
      routeParams.route = this.getRouteByPath(input.path, this.routes)
    if (routeParams && Object.keys(routeParams).length) {
      //get in childRoute if one has path ''
      if (routeParams.route) {
        if ('action' in routeParams.route) {
            if (lastRoutePath)
              lastRoutePath = `${lastRoutePath}/${routeParams.route.path}`
            else lastRoutePath = routeParams.route.path
            return {
              action: routeParams.route.action,
              payload: routeParams.route.payload || [],
              lastRoutePath: lastRoutePath,
            }
        } else if ('redirect' in routeParams.route) {
            lastRoutePath = routeParams.route.redirect
            const redirectRoute = this.getRouteByPath(lastRoutePath, this.routes)
            if (redirectRoute) {
              return {
                action: redirectRoute.action,
                payload: routeParams.route.payload || [],
                lastRoutePath: lastRoutePath,
              }
            }
          }
      }
    }
    const notFound = this.getRouteByPath('404', this.routes);
    return {
        action: notFound.action,
        lastRoutePath: lastRoutePath,
      }
  }

  /**
   * @param {string|null} path
   * @param {Route[]?} routeList
   * @return {null|Route}
   */
  getRouteByPath(path, routeList) {
    if (!path) return null
    let route = null
    routeList = routeList
    const [currentPath, ...childPath] = path.split('/')
    for (const r of routeList) {
      //iterate over all routeList
      if (r.path == currentPath) {
        route = r
        if (r.childRoutes && r.childRoutes.length && childPath.length > 0) {
          //evaluate childroute over next actions
          route = getRouteByPath(childPath.join('/'), r.childRoutes)
          if (route) return route
        } else if (childPath.length === 0) return route //last action and found route
      }
    }
    return null
  }
}
