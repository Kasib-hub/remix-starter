import styles from "./styles/main.css";
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";
import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => [
  ...[{ rel: "stylesheet", href: styles }],
];

interface ErrorParams {
  error: Error;
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// error handling with your own error page
// export const ErrorBoundary: ErrorBoundaryComponent = ({ error }: Error) => {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//         <title>An Error Occured</title>
//       </head>
//       <body>
//         <header>
//           <MainNavigation />
//         </header>
//         <main>
//           <h1>An error occurred!</h1>
//           <p>{error.message}</p>
//           <p>
//             Back to <Link to="/">safety</Link>!
//           </p>
//         </main>
//         <Outlet />
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// };
