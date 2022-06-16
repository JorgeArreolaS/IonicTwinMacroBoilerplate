import { SubPages } from 'pages/List';
import { Children, ComponentType } from 'react';
import { ExtractRouteParams, Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

type PageRouteProps<Path extends string> = Omit<RouteProps<Path>, "component" | "children" | "path">

// type PageOptions<
//   Path extends string,
//   Sub extends Record<string, any> = {}
// > = 

type DefaultRouteParams = { [K: string]: string | undefined }

type PageType = <
  Path extends string,
  Params extends DefaultRouteParams = ExtractRouteParams<Path, string>,
  >(
  opts: {
    path: Path
    route?: PageRouteProps<Path>
    sub?: Record<string, ReturnType<any>>
  },
  params: React.FC<RouteComponentProps<Params>>
) => {
  path: string
  route?: Omit<RouteProps<Path>, "component" | "children">
  getPath: (params?: ExtractRouteParams<Path, string | number | boolean>) => string
  sub: { [x: string]: ReturnType<PageType> }
  Route: React.FC<{}>
}

export const Page: PageType = (options, component) => {
  let { render, ...routeParams } = options?.route as PageRouteProps<any>
  const Component = component as any

  if (!render)
    render = (props) => <Component {...props} />

  const route = {
    path: options.path,
    render,
    ...routeParams
  }

  return {
    path: options.path,
    route,
    getPath: (params) => buildUrl(options.path, params as any),
    sub: options.sub as any,
    Route: () => <>
      <Route {...route} />
    </>
  }
}

export const GetSub: React.FC<{ e: ReturnType<PageType> }> = ({ e }) => {
  return <>
    <Route {...e.route} />
  </>
}

/**
 * Build an url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   {first: 'p', last: 'q' },
    * ) // returns '/a/p/q'
    * @param path target path.
    * @param params parameters.
    */
export const buildUrl = <P extends string>(
  path: P,
  params: ExtractRouteParams<P, string | number | boolean>,
): string => {
  let ret: string = path;

  // Upcast `params` to be used in string replacement.
  const paramObj: { [i: string]: string } = params || {};

  for (const key of Object.keys(paramObj)) {
    ret = ret.replace(`:${key}`, paramObj[key]);
  }

  return ret;
};
