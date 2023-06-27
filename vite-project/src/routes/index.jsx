import { useRoutes, Link } from "react-router-dom";
import { FileEncoderRoutes } from "../features/file-encoder/routes";

export const AppRoutes = () => {
  const routes = [
    {path: '/file-encoder/*', element: <FileEncoderRoutes></FileEncoderRoutes>},
    {
      path: '/*', 
      element: (<>
        <Link to='/file-encoder/' replace>File Encoder</Link>
      </>)}
  ];
  const routeEl = useRoutes([...routes]);
  return (<>{routeEl}</>);
}
