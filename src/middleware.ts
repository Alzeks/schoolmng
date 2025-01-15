import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './lib/settings'
import { NextResponse } from 'next/server'

//const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isPrivatRoute = createRouteMatcher(['/list(.*)'])

// export default clerkMiddleware((auth, request) => {
//   //if (!isPublicRoute(request)) {
//     if (isPrivatRoute(request)) {
//     auth().protect()
//   }
// })

//THIS and closers---------------
// function func(x: number){
//   return {
//     x: 20,//@ts-ignore
//     arrow: ()=>{console.log(this.x, x)}, 
//     baz: function(){console.log(this.x, x)},
//   }}
// const obj2=func.call({x: 30}, 10); obj2.arrow(); obj2.baz()

// function func1(x: number){//@ts-ignore
//   return ()=>{console.log('this', this.x, x)}};
//   let close=func1.call({x:7}, 3);
//   close();
//-------------------------------
// Unitf of types ----------------
//function g<T>(g: T): T{console.log(g);return g}; g('p');g(8)
//let ge=(g: string | number)=>console.log(g) ;ge('p');ge(8)
//------------------------------

const matchers = Object.keys(routeAccessMap).map(route => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route]
}))

export default clerkMiddleware((auth, request) => {
  const { sessionClaims } = auth();
  let role = (sessionClaims?.metadate as { role: string })?.role || '';
  if (!sessionClaims) { role = 'sign-in' }
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(request) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

