import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import GuestRoute from 'src/components/GuestRoute';

function Routes() {
    return (
        <React.Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Redirect
                    exact
                    from="/"
                    to="/login"
                />
                <Route
                    exact
                    path="/404"
                    component={React.lazy(() => import('src/views/pages/Error404View'))}
                />

                <GuestRoute
                    exact
                    path="/login"
                    component={React.lazy(() => import('src/views/auth/LoginView'))}
                />
                <Route
                    path="/app"
                    render={(props) => (
                        <MainLayout {...props}>
                            <React.Suspense fallback={<LoadingScreen />}>
                                <Switch>
                                    <Redirect
                                        exact
                                        from="/app"
                                        to="/app/explore/stocks"
                                    />
                                    <Route
                                        exact
                                        path="/app/explore/:pageId"
                                        component={React.lazy(() => import('src/views/explore'))}
                                    />
                                    <Route
                                        exact
                                        path="/app/orders"
                                        component={React.lazy(() => import('src/views/OrderView'))}
                                    />
                                    <Route
                                        exact
                                        path="/app/stocks/:stockId"
                                        component={React.lazy(() => import('src/views/StockPageView'))}
                                    />
                                    <Route
                                        exact
                                        path="/app/mutual-funds/:mutualFundId"
                                        component={React.lazy(() => import('src/views/MutualFundPageView'))}
                                    />
                                    <Route
                                        exact
                                        path="/app/fixed-deposits/:fixedDepositId"
                                        component={React.lazy(() => import('src/views/FixedDepositsPageView'))}
                                    />
                                    <Route
                                        exact
                                        path="/app/us-stocks/:usStockId"
                                        component={React.lazy(() => import('src/views/USStocksPageView'))}
                                    />
                                    <Redirect to="/404" />
                                </Switch>
                            </React.Suspense>
                        </MainLayout>)}
                />
            </Switch>
        </React.Suspense>
    );
}

export default Routes;
