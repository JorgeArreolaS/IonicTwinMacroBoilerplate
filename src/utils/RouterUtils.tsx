import { ComponentType } from 'react';
import { ExtractRouteParams, Redirect, RouteComponentProps, RouteProps } from 'react-router';

type PageRouteProps<Path extends string> = Omit<RouteProps<Path>, "component" | "children" | "path">

type PageOptions<Path extends string> = {
  path: Path
  route?: PageRouteProps<Path>
}

type RouteParams = { [K: string]: string | undefined }
type PageType = <
    Path extends string = string,
    Params extends RouteParams = ExtractRouteParams<Path, string>
  >(
  options: PageOptions<Path>, 
    component: React.FC<RouteComponentProps<Params> >
  ) => {
  path: string
  route?: Omit<RouteProps<Path>, "component" | "children">
  getPath: (params?: ExtractRouteParams<Path, string | number | boolean>) => string
}

/**
 * Build an url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
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

export const Page: PageType = (options, component) => {
  let { render, ...routeParams } = options?.route as PageRouteProps<any>
  const Component = component as any

  if( !render )
    render =  (props) => <Component {...props}/>

  return {
    path: options.path,
    route: {
      path: options.path,
      render,
      ...routeParams
    },
    getPath: (params) => buildUrl(options.path, params as any)
  }
}
