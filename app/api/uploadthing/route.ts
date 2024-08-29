import { createRouteHandler } from 'uploadthing/next'; // Updated import

import { ourFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter
});
