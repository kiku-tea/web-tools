import { useRoutes } from "react-router-dom";
import { FileEncoderPage } from "../FileEncoderPage";

export const FileEncoderRoutes = () => {
  const routes = [
    {path:'/*', element: <FileEncoderPage></FileEncoderPage>}
  ];
  return useRoutes(routes);
}
