import React from 'react';
import { RequestContext } from '../contexts';
import { NoMatchingRouteError } from './errors';

export default class ReactBot {
    constructor({
        routes,
        defaultRoutes
    }) {
        this.routes = [...routes, ...defaultRoutes]
    }

    async renderReactActions({ request, actions }) {
        const renderedActions = []
        let props
        let renderedAction
        for (const Action of actions) {
            if (Action) {
                props = Action.botInit ? await Action.botInit(request) : {}
                renderedAction = (
                    <RequestContext.Provider value={request}>
                        <Action {...props} />
                    </RequestContext.Provider>
                )
                renderedActions.push(renderedAction)
            }
        }
        return renderedActions
    }

    async input({ input, session, lastRoutePath }) {
        session = session || {}

        const output = this.processInput(input, lastRoutePath)

        const request = {
            session: session || {},
            params: output.params || [],
            input: input,
            lastRoutePath,
        }

        const actions = [output.action]

        const response = await this.renderReactActions({ request, actions })

        lastRoutePath = output.lastRoutePath

        return { input, response, session, lastRoutePath }
    }

    getRouteByPath(path, routeList = null) {
        if (!path) return null
        let route = null
        routeList = routeList || this.routes
        const [currentPath, ...childPath] = path.split('/')
        for (const r of routeList) {
            //iterate over all routeList
            if (r.path === currentPath) {
                route = r
                if (r.childRoutes && r.childRoutes.length && childPath.length > 0) {
                    //evaluate childroute over next actions
                    route = this.getRouteByPath(childPath.join('/'), r.childRoutes)
                    if (route) return route
                } else if (childPath.length === 0) return route //last action and found route
            }
        }
        return null
    }

    processInput(input, lastRoutePath = null) {
        let routeParams = {}
        let brokenFlow = false
        console.log(input);
        const lastRoute = this.getRouteByPath(lastRoutePath, this.routes)
        if (!lastRoute && input.payload.path)
            routeParams.route = this.getRouteByPath(input.payload.path, this.routes)
        if (lastRoute && lastRoute.childRoutes && !routeParams.route)
            //get route depending of current ChildRoute
            routeParams.route = this.getRouteByPath(input.payload.path, lastRoute.childRoutes)
        if (!routeParams || !Object.keys(routeParams).length) {
            /*
                we couldn't find a route in the state of the lastRoute, so let's find in
                the general conf.route
              */
            brokenFlow = Boolean(lastRoutePath)
            routeParams.route = this.getRouteByPath(input.payload.path, this.routes)
        }
        console.log(brokenFlow)
        if (routeParams && Object.keys(routeParams).length) {
            if (routeParams.route) {
                if ('action' in routeParams.route) {
                    if (lastRoutePath && !brokenFlow)
                        lastRoutePath = `${lastRoutePath}/${routeParams.route.path}`
                    else lastRoutePath = routeParams.route.path
                    return {
                        action: routeParams.route.action,
                        params: routeParams.route.params || [],
                        lastRoutePath: lastRoutePath,
                    }
                } else if ('redirect' in routeParams.route) {
                    lastRoutePath = routeParams.route.redirect
                    const redirectRoute = this.getRouteByPath(lastRoutePath, this.routes)
                    if (redirectRoute) {
                        return {
                            action: redirectRoute.action,
                            params: redirectRoute.params || [],
                            lastRoutePath: lastRoutePath,
                        }
                    }
                }
            }
        }
        const notFound = this.getRouteByPath('404', this.routes)
        if (!notFound) throw new NoMatchingRouteError(input)
        if (lastRoute) {
            return {
                action: notFound.action,
                lastRoutePath: lastRoutePath,
            }
        } else {
            lastRoutePath = null
            return {
                action: notFound.action,
                lastRoutePath: lastRoutePath,
            }
        }
    }

}