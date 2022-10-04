import { FC, PropsWithChildren } from "react";

import classes from "./style.module.scss";

const Header: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.header}>{children}</div>
);

export default Header;
