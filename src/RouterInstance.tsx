import { FC, ReactNode } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App';

type RouteItemType = {
  path: string;
  element: ReactNode;
};

/**
 * ReactRouter
 */
export const RouterInstance: FC = () => {
  const routeArray: RouteItemType[] = [
    {
      path: '*',
      element: <App />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routeArray.map((routeItem) => (
          <Route key={routeItem.path} path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
