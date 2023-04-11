import {
  Login,
  Home,
  ManageUser,
  AdminUser,
  Register,
} from "../components/components_index";

const Unknown_user = [
  { path: "/", component: Login },
  { path: "/home", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];
const Normal_user = [
  { path: "/home", component: Home },
  { path: "/", component: Home },
];
const Manage_user = [
  { path: "/manage-user", component: ManageUser },
  { path: "/home", component: Home },
  { path: "/", component: Home },
];
const Admin_user = [
  { path: "/home", component: Home },
  { path: "/manage-user", component: ManageUser },
  { path: "/admin-user", component: AdminUser },
  { path: "/", component: Home },
];

export { Normal_user, Manage_user, Admin_user, Unknown_user };
