export interface IMenuItem {
  title: string;
  id: string;
  icon?: React.ReactNode | string;
  path?: string;
  children?: IMenuItem[];
}
