import { Config } from 'config';
import { ResponseError } from 'unified-app';
import { IUnifiedAction, IUnifiedActionContext, IUnifiedApp } from '../interfaces.d.ts';


interface IActionPatterned extends IUnifiedAction {
  pattern: URLPattern;
}


export function makeRequestHandler(app: IUnifiedApp, actions: IUnifiedAction[]): Deno.ServeHandler {

  const patternedActions: IActionPatterned[] = actions.map(it => ({
    ...it,
    pattern: new URLPattern({ pathname: it.path }),
  }));


  return async (request, requestInfo) => {
    try {

      if (Config.environment.mode === 'development') {
        if (request.method === 'OPTIONS') {
          return new Response('OK', {
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Credentials': 'true',
            },
          });
        }
      }


      /* find route */
  
      const action = patternedActions.find(it =>
        it.method === request.method.toLowerCase() && it.pattern.test(request.url)
      );
  
      if (!action) {
        return new Response('path not found: ' + request.method.toLowerCase() + ' ' + URL.parse(request.url)?.pathname, {
          status: 404,
        });
      }
  
  
      /* extract context */
  
      const headers = Object.fromEntries(request.headers.entries());
      const params = action.pattern.exec(request.url)?.pathname?.groups ?? {};
      const query = Object.fromEntries(URL.parse(request.url)?.searchParams.entries() ?? []);
  
  
      let body;
  
      if (headers['content-type']?.includes('multipart/form-data')) {
        try {
          body = await request.formData();
        }
        catch {
          return new Response(`could not parse request body as multipart form data`, {
            status: 400,
          });
        }
      }
      else if (headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        try {
          body = Object.fromEntries( (await request.formData()).entries() );
        }
        catch {
          return new Response(`could not parse request body as url encoded form data`, {
            status: 400,
          });
        }
      }
      else {
  
        body = await request.text();
  
        if (headers['content-type']?.includes('application/json')) {
          try {
            body = JSON.parse(body);
          }
          catch {
            return new Response(`request indicated that content type is json but could not parse body as a json`, {
              status: 400,
            });
          }
        }
  
      }
  
  
      const context = {
        app,
        action,
        request,
        requestInfo,
        headers,
        params,
        query,
        body,
      } as unknown as IUnifiedActionContext;
  
  
      /* middlewares */
  
      for (const middleware of app.middlewares) {
        await middleware(context);
      }
  
      
      /* response */
  
      const response = await action.handler!(context);


      /* postwares */

      for (const postware of app.postwares) {
        await postware(context);
      }


      /* return response */

      const returningResponse = (
        response instanceof Response
        ? response
        : ['object', 'undefined', 'boolean', 'number'].includes(typeof response)
          ? Response.json(response)
          : new Response(String(response))
      );

      if (Config.environment.mode === 'development') {
        returningResponse.headers.set('Access-Control-Allow-Origin', '*');
        returningResponse.headers.set('Access-Control-Allow-Credentials', 'true');
        returningResponse.headers.set('Access-Control-Allow-Headers', '*');
        returningResponse.headers.set('Access-Control-Allow-Methods', '*');
      }

      return returningResponse;

    }
    catch (error) {

      const errorResponse = (error instanceof ResponseError
        ? Response.json({ error: error.label }, { status: error.status })
        : new Response((error as Error)?.message ?? 'an error occured', { status: 400 })
      );

      if (Config.environment.mode === 'development') {
        errorResponse.headers.set('Access-Control-Allow-Origin', '*');
        errorResponse.headers.set('Access-Control-Allow-Credentials', 'true');
        errorResponse.headers.set('Access-Control-Allow-Headers', '*');
        errorResponse.headers.set('Access-Control-Allow-Methods', '*');
      }

      if (error instanceof ResponseError) {
        console.error(error.message);
      }
      
      return errorResponse;

    }
  };

}